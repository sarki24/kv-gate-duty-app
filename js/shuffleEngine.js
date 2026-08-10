/**
 * shuffleEngine.js
 * Constraint Satisfaction Algorithm for Gate Duty App
 * 
 * Supports any teacher count >= 7 (including 38 teachers).
 * 42 weekly slots (7 daily posts x 6 days: Monday-Saturday).
 * 
 * Rules:
 * 1. One teacher per post per day.
 * 2. Regular teacher: max 1 duty/week.
 * 3. Contractual teacher: max 2 duties/week.
 * 4. Fairness: give everyone at most 1 duty first; assign 2nd duty to Contractual only when needed.
 * 5. No consecutive days for the same teacher (if 2 duties, |day1 - day2| > 1).
 * 6. No teacher gets > 1 duty on the same day.
 * 7. Gate preference: fill Gate 1 and Gate 2 (Entry & Exit) mostly with REGULAR teachers; contractual on gates only when regulars run out.
 * 8. Primary/Secondary ignored for scheduling.
 */

export const POST_DEFINITIONS = [
  { id: 'p0', timeGroup: 'Entry', timeText: '07:00–07:30 AM', name: 'Gate 1', isGate: true },
  { id: 'p1', timeGroup: 'Entry', timeText: '07:00–07:30 AM', name: 'Gate 2', isGate: true },
  { id: 'p2', timeGroup: 'Lunch Break', timeText: '10:40–11:00 AM', name: 'Near Chemistry Lab', isGate: false },
  { id: 'p3', timeGroup: 'Lunch Break', timeText: '10:40–11:00 AM', name: 'Near 6B', isGate: false },
  { id: 'p4', timeGroup: 'Lunch Break', timeText: '10:40–11:00 AM', name: 'Assembly Ground', isGate: false },
  { id: 'p5', timeGroup: 'Exit', timeText: '01:44–02:00 PM', name: 'Gate 1', isGate: true },
  { id: 'p6', timeGroup: 'Exit', timeText: '01:44–02:00 PM', name: 'Gate 2', isGate: true }
];

export const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/**
 * Main shuffle entry point
 * @param {Array} teachers List of teacher objects { id, name, category, level }
 * @returns {Object} { success: boolean, roster: Array[postIndex][dayIndex], errorMsg: string }
 */
export function generateWeeklyRoster(teachers) {
  if (!teachers || teachers.length === 0) {
    return {
      success: false,
      errorMsg: 'Teacher list is empty! Please add your teachers first in the Manage Teachers tab.'
    };
  }

  const totalPosts = POST_DEFINITIONS.length * DAYS.length; // 7 * 6 = 42

  const regulars = teachers.filter(t => t.category === 'Regular');
  const contractuals = teachers.filter(t => t.category === 'Contractual');

  // Pre-flight validation checks
  const maxPossibleCapacity = regulars.length * 1 + contractuals.length * 2;
  if (maxPossibleCapacity < totalPosts) {
    const deficit = totalPosts - maxPossibleCapacity;
    return {
      success: false,
      errorMsg: `Cannot cover all 42 weekly duty slots. With ${teachers.length} teachers (${regulars.length} Regular, ${contractuals.length} Contractual), available capacity is ${maxPossibleCapacity} duties. To reach 42 duties, please set at least ${contractuals.length + deficit} teachers as "Contractual" (so they can take 2 duties/week).`
    };
  }

  if (teachers.length < 7) {
    return {
      success: false,
      errorMsg: `At least 7 unique teachers are required to cover the 7 daily posts. You currently have ${teachers.length}.`
    };
  }

  const dutiesNeeded2nd = Math.max(0, totalPosts - teachers.length);
  if (dutiesNeeded2nd > contractuals.length) {
    return {
      success: false,
      errorMsg: `To cover all 42 weekly posts with ${teachers.length} teachers, ${dutiesNeeded2nd} teacher(s) must take a 2nd duty during the week. You currently have ${contractuals.length} Contractual teacher(s). Please edit at least ${dutiesNeeded2nd} teacher(s) to "Contractual" category.`
    };
  }

  // Attempt randomized backtracking up to 20 times
  const MAX_ATTEMPTS = 20;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = attemptShuffle(teachers, regulars, contractuals, totalPosts, dutiesNeeded2nd);
    if (result.success) {
      return result;
    }
  }

  return {
    success: false,
    errorMsg: 'Could not generate a valid schedule satisfying non-consecutive day rules with current distribution. Please try clicking Shuffle again or adjusting Contractual teacher count.'
  };
}

function attemptShuffle(allTeachers, regularsInput, contractualsInput, totalPosts, dutiesNeeded2nd) {
  const regulars = shuffleArray([...regularsInput]);
  const contractuals = shuffleArray([...contractualsInput]);

  const teacherMaxDuty = new Map();
  
  let activeTeachers = [];
  if (allTeachers.length >= totalPosts) {
    const combined = shuffleArray([...allTeachers]);
    activeTeachers = combined.slice(0, totalPosts);
    activeTeachers.forEach(t => teacherMaxDuty.set(t.id, 1));
  } else {
    activeTeachers = [...allTeachers];
    activeTeachers.forEach(t => teacherMaxDuty.set(t.id, 1));
    
    // Pick dutiesNeeded2nd contractual teachers to get 2 duties max
    const selectedFor2nd = contractuals.slice(0, dutiesNeeded2nd);
    selectedFor2nd.forEach(t => teacherMaxDuty.set(t.id, 2));
  }

  const slots = [];
  for (let d = 0; d < DAYS.length; d++) {
    for (let p = 0; p < POST_DEFINITIONS.length; p++) {
      slots.push({
        day: d,
        post: p,
        isGate: POST_DEFINITIONS[p].isGate
      });
    }
  }

  // Gate posts prioritized
  slots.sort((a, b) => (b.isGate ? 1 : 0) - (a.isGate ? 1 : 0));

  const rosterGrid = Array(POST_DEFINITIONS.length).fill(null).map(() => Array(DAYS.length).fill(null));
  const teacherAssignedDays = new Map();
  const teacherAssignedCount = new Map();

  activeTeachers.forEach(t => {
    teacherAssignedDays.set(t.id, new Set());
    teacherAssignedCount.set(t.id, 0);
  });

  let steps = 0;
  const MAX_STEPS = 20000;

  function solve(slotIdx) {
    steps++;
    if (steps > MAX_STEPS) return false;
    if (slotIdx === slots.length) return true;

    const { day, post, isGate } = slots[slotIdx];

    const candidates = activeTeachers.filter(t => {
      const currentCount = teacherAssignedCount.get(t.id);
      const maxCount = teacherMaxDuty.get(t.id);
      if (currentCount >= maxCount) return false;

      const daysSet = teacherAssignedDays.get(t.id);
      if (daysSet.has(day)) return false;

      for (const assignedDay of daysSet) {
        if (Math.abs(assignedDay - day) <= 1) return false;
      }

      return true;
    });

    if (candidates.length === 0) return false;

    const sortedCandidates = shuffleArray([...candidates]).sort((a, b) => {
      if (isGate) {
        if (a.category === 'Regular' && b.category !== 'Regular') return -1;
        if (a.category !== 'Regular' && b.category === 'Regular') return 1;
      } else {
        if (a.category === 'Contractual' && b.category !== 'Contractual') return -1;
        if (a.category !== 'Contractual' && b.category === 'Contractual') return 1;
      }
      return 0;
    });

    for (const teacher of sortedCandidates) {
      rosterGrid[post][day] = teacher;
      teacherAssignedCount.set(teacher.id, teacherAssignedCount.get(teacher.id) + 1);
      teacherAssignedDays.get(teacher.id).add(day);

      if (solve(slotIdx + 1)) return true;

      rosterGrid[post][day] = null;
      teacherAssignedCount.set(teacher.id, teacherAssignedCount.get(teacher.id) - 1);
      teacherAssignedDays.get(teacher.id).delete(day);
    }

    return false;
  }

  const solved = solve(0);
  if (solved) {
    return {
      success: true,
      roster: rosterGrid
    };
  }

  return { success: false };
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

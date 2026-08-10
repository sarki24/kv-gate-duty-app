/**
 * teacherStore.js
 * Manages teacher records, custom order, and LocalStorage persistence.
 */

const STORAGE_KEYS = {
  TEACHERS: 'gate_duty_teachers_v1',
  ROSTER: 'gate_duty_roster_v1',
  WEEK_START: 'gate_duty_week_start_v1'
};

export class TeacherStore {
  constructor() {
    this.teachers = this.loadTeachers();
  }

  loadTeachers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load teachers from localStorage', e);
    }
    return [];
  }

  saveTeachers() {
    try {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(this.teachers));
    } catch (e) {
      console.error('Failed to save teachers to localStorage', e);
    }
  }

  getTeachers() {
    return [...this.teachers];
  }

  addTeacher(name, category, level) {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    const teacher = {
      id: 'tech_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: trimmedName,
      category: category === 'Contractual' ? 'Contractual' : 'Regular',
      level: level === 'Secondary' ? 'Secondary' : 'Primary'
    };

    this.teachers.push(teacher);
    this.saveTeachers();
    return teacher;
  }

  bulkAddTeachers(teacherList) {
    const added = [];
    for (const item of teacherList) {
      const name = (item.name || '').trim();
      if (!name) continue;
      const teacher = {
        id: 'tech_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name,
        category: item.category === 'Contractual' ? 'Contractual' : 'Regular',
        level: item.level === 'Secondary' ? 'Secondary' : 'Primary'
      };
      this.teachers.push(teacher);
      added.push(teacher);
    }
    this.saveTeachers();
    return added;
  }

  updateTeacher(id, name, category, level) {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.teachers[index].name = name.trim();
    this.teachers[index].category = category === 'Contractual' ? 'Contractual' : 'Regular';
    this.teachers[index].level = level === 'Secondary' ? 'Secondary' : 'Primary';

    this.saveTeachers();
    return true;
  }

  reorderTeachers(newOrderedIds) {
    const map = new Map(this.teachers.map(t => [t.id, t]));
    const reordered = [];

    for (const id of newOrderedIds) {
      if (map.has(id)) {
        reordered.push(map.get(id));
        map.delete(id);
      }
    }

    for (const remaining of map.values()) {
      reordered.push(remaining);
    }

    this.teachers = reordered;
    this.saveTeachers();
  }

  deleteTeacher(id) {
    this.teachers = this.teachers.filter(t => t.id !== id);
    this.saveTeachers();
    
    // Clean up roster grid in localStorage if present
    const saved = this.loadSavedRoster();
    if (saved.roster) {
      const updatedRoster = saved.roster.map(row => 
        row.map(cellId => cellId === id ? null : cellId)
      );
      this.saveRoster(updatedRoster, saved.weekStart);
    }
  }

  clearAllTeachers() {
    this.teachers = [];
    this.saveTeachers();
    this.saveRoster(null, null);
  }

  getStats() {
    const total = this.teachers.length;
    let regularCount = 0;
    let contractualCount = 0;
    let primaryCount = 0;
    let secondaryCount = 0;

    for (const t of this.teachers) {
      if (t.category === 'Regular') regularCount++;
      else if (t.category === 'Contractual') contractualCount++;

      if (t.level === 'Primary') primaryCount++;
      else if (t.level === 'Secondary') secondaryCount++;
    }

    return {
      total,
      regularCount,
      contractualCount,
      primaryCount,
      secondaryCount
    };
  }

  saveRoster(rosterData, weekStartDate) {
    try {
      if (rosterData === null) {
        localStorage.removeItem(STORAGE_KEYS.ROSTER);
      } else {
        localStorage.setItem(STORAGE_KEYS.ROSTER, JSON.stringify(rosterData));
      }
      if (weekStartDate) {
        localStorage.setItem(STORAGE_KEYS.WEEK_START, weekStartDate);
      }
    } catch (e) {
      console.error('Failed to save roster', e);
    }
  }

  loadSavedRoster() {
    try {
      const rosterData = localStorage.getItem(STORAGE_KEYS.ROSTER);
      const weekStartDate = localStorage.getItem(STORAGE_KEYS.WEEK_START);
      return {
        roster: rosterData ? JSON.parse(rosterData) : null,
        weekStart: weekStartDate || null
      };
    } catch (e) {
      console.error('Failed to load saved roster', e);
      return { roster: null, weekStart: null };
    }
  }
}

/* ==========================================================================
   PM SHRI KV BHAWANIPATNA - GATE & LUNCH DUTY APP JS ENGINE
   ========================================================================== */

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Service Worker Registration for PWA / Mobile App
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(err => {
      console.log('SW registration failed:', err);
    });
  });
}

// --------------------------------------------------------------------------
// OFFICIAL PM SHRI KV BHAWANIPATNA STAFF SEED DATA (50 Staff Members)
// --------------------------------------------------------------------------
const DEFAULT_TEACHERS = [
  { id: "t1",  name: "Sh. Bhimsen Panda", category: "Regular", level: "Secondary" },
  { id: "t2",  name: "Sh. Niranjan Sahoo", category: "Regular", level: "Secondary" },
  { id: "t3",  name: "Sh. S.K Buddhia", category: "Regular", level: "Secondary" },
  { id: "t4",  name: "Sh. Biplab Ghosh", category: "Regular", level: "Secondary" },
  { id: "t5",  name: "Sh. Rajkumar", category: "Regular", level: "Secondary" },
  { id: "t6",  name: "Ms. Hena Fatma", category: "Regular", level: "Secondary" },
  { id: "t7",  name: "Ms. Nisha Yadav", category: "Regular", level: "Secondary" },
  { id: "t8",  name: "Sh. Bhabani Bag", category: "Regular", level: "Secondary" },
  { id: "t9",  name: "Sh. S.K Kisan", category: "Regular", level: "Secondary" },
  { id: "t10", name: "Sh. Achyut Mishra", category: "Regular", level: "Secondary" },
  { id: "t11", name: "Sh. Jyotish Putel", category: "Regular", level: "Secondary" },
  { id: "t12", name: "Sh. Saurav Sarki", category: "Regular", level: "Secondary" },
  { id: "t13", name: "Mrs. Nipa Biswas", category: "Regular", level: "Secondary" },
  { id: "t14", name: "Smt. Supriya Kumari", category: "Regular", level: "Secondary" },
  { id: "t15", name: "Sh. Nitesh Chandel", category: "Regular", level: "Secondary" },
  { id: "t16", name: "Sh. Om Prakash Samal", category: "Regular", level: "Secondary" },
  { id: "t17", name: "Sh. Sandeep Kumar", category: "Regular", level: "Secondary" },
  { id: "t18", name: "Sh. Rajendra Meena", category: "Regular", level: "Primary" },
  { id: "t19", name: "Smt. Nirupama Nayak", category: "Regular", level: "Primary" },
  { id: "t20", name: "Sh. H.K Kanher", category: "Regular", level: "Primary" },
  { id: "t21", name: "Sh. Bidyadhar Sahu", category: "Regular", level: "Primary" },
  { id: "t22", name: "Sh. Sambit Barik", category: "Regular", level: "Primary" },
  { id: "t23", name: "Sh. Harekrishna Dang", category: "Regular", level: "Primary" },
  { id: "t24", name: "Ms. Sakshi", category: "Regular", level: "Primary" },
  { id: "t25", name: "Smt. Shivani Rehal", category: "Regular", level: "Primary" },
  { id: "t26", name: "Ms. Twinkle Rustagi", category: "Regular", level: "Primary" },
  { id: "t27", name: "Sh. Nishant Singh", category: "Regular", level: "Primary" },
  { id: "t28", name: "Sh. Hari Munda", category: "Regular", level: "Secondary" },
  { id: "t29", name: "Sh. Sachin", category: "Regular", level: "Secondary" },
  { id: "t30", name: "Sh. Parikhit Kata", category: "Regular", level: "Secondary" },
  { id: "t31", name: "Ms. Rajeswary Acharya", category: "Regular", level: "Secondary" },
  { id: "t32", name: "Sh. Debesh K Mishra", category: "Regular", level: "Secondary" },
  { id: "t33", name: "Ms. Sunanda Panigrahi", category: "Regular", level: "Secondary" },
  { id: "t34", name: "Sh. Khusiram Putel", category: "Regular", level: "Secondary" },
  { id: "t35", name: "Ms. Tanushree Pujhari", category: "Regular", level: "Secondary" },
  { id: "t36", name: "Sh. R.C Mishra", category: "Contractual", level: "Secondary" },
  { id: "t37", name: "Sh. Manoj K Rout", category: "Contractual", level: "Secondary" },
  { id: "t38", name: "Sh. Sarat Dip", category: "Contractual", level: "Primary" },
  { id: "t39", name: "Mrs. Nikita Acharya", category: "Contractual", level: "Secondary" },
  { id: "t40", name: "Ms. Soumya Swain", category: "Contractual", level: "Primary" },
  { id: "t41", name: "Sh. Makbul Naik", category: "Contractual", level: "Primary" },
  { id: "t42", name: "Sh. Lilamber Sahu", category: "Contractual", level: "Primary" },
  { id: "t43", name: "Sh. Mihir Pratap Sahu", category: "Contractual", level: "Primary" },
  { id: "t44", name: "Ms. Kabita Kabyashree", category: "Contractual", level: "Primary" },
  { id: "t45", name: "Mrs. Bharati Pradhan", category: "Contractual", level: "Primary" },
  { id: "t46", name: "Sh. M.S Rana", category: "Contractual", level: "Secondary" },
  { id: "t47", name: "Sh. Soumya R. Pradhan", category: "Contractual", level: "Secondary" },
  { id: "t48", name: "Ms. Madhusmita Senapati", category: "Contractual", level: "Secondary" },
  { id: "t49", name: "Ms. Lipika Naik", category: "Contractual", level: "Secondary" },
  { id: "t50", name: "Mrs. Abhisikta Baral", category: "Contractual", level: "Secondary" }
];

const DEFAULT_ROSTER_ASSIGNMENTS = {
  "Monday_gate_entry1": "t16",
  "Monday_gate_entry2": "t14",
  "Monday_gate_exit1": "t2",
  "Monday_gate_exit2": "t24",
  "Monday_lunch_chem": "t45",
  "Monday_lunch_class6b": "t36",
  "Monday_lunch_assembly": "t47",

  "Tuesday_gate_entry1": "t8",
  "Tuesday_gate_entry2": "t11",
  "Tuesday_gate_exit1": "t10",
  "Tuesday_gate_exit2": "t27",
  "Tuesday_lunch_chem": "t35",
  "Tuesday_lunch_class6b": "t38",
  "Tuesday_lunch_assembly": "t40",

  "Wednesday_gate_entry1": "t22",
  "Wednesday_gate_entry2": "t6",
  "Wednesday_gate_exit1": "t21",
  "Wednesday_gate_exit2": "t23",
  "Wednesday_lunch_chem": "t36",
  "Wednesday_lunch_class6b": "t37",
  "Wednesday_lunch_assembly": "t45",

  "Thursday_gate_entry1": "t13",
  "Thursday_gate_entry2": "t4",
  "Thursday_gate_exit1": "t15",
  "Thursday_gate_exit2": "t3",
  "Thursday_lunch_chem": "t32",
  "Thursday_lunch_class6b": "t39",
  "Thursday_lunch_assembly": "t41",

  "Friday_gate_entry1": "t5",
  "Friday_gate_entry2": "t26",
  "Friday_gate_exit1": "t34",
  "Friday_gate_exit2": "t1",
  "Friday_lunch_chem": "t35",
  "Friday_lunch_class6b": "t33",
  "Friday_lunch_assembly": "t44",

  "Saturday_gate_entry1": "t17",
  "Saturday_gate_entry2": "t9",
  "Saturday_gate_exit1": "t7",
  "Saturday_gate_exit2": "t19",
  "Saturday_lunch_chem": "t41",
  "Saturday_lunch_class6b": "t49",
  "Saturday_lunch_assembly": "t31"
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Default Post Definitions
const DEFAULT_GATE_POSTS = [
  { key: "gate_entry1", label: "Entry Gate 1", time: "07:00–07:30 AM" },
  { key: "gate_entry2", label: "Entry Gate 2", time: "07:00–07:30 AM" },
  { key: "gate_exit1",  label: "Exit Gate 1",  time: "01:44–02:00 PM" },
  { key: "gate_exit2",  label: "Exit Gate 2",  time: "01:44–02:00 PM" }
];

const DEFAULT_LUNCH_POSTS = [
  { key: "lunch_chem",     label: "Near Chemistry Lab", time: "10:40–11:00 AM" },
  { key: "lunch_class6b",   label: "Near Class 6B",      time: "10:40–11:00 AM" },
  { key: "lunch_assembly", label: "Assembly Ground",    time: "10:40–11:00 AM" }
];

// --------------------------------------------------------------------------
// APP STATE
// --------------------------------------------------------------------------
let teachers = [];
let logoDataUrl = "";
let weekStartingDate = "";
let rosterAssignments = {};
let rosterNote = "";
let gatePosts = [...DEFAULT_GATE_POSTS];
let lunchPosts = [...DEFAULT_LUNCH_POSTS];
let activeStatCategory = null;
let extractedTeachersPreview = [];
let draggedRowIndex = null;

// --------------------------------------------------------------------------
// INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadLogoFromStorage();
  loadTeachersFromStorage();
  loadGate2PriorityFromStorage();
  loadPostConfigFromStorage();
  loadRosterNoteFromStorage();
  initDatePicker();
  loadRosterFromStorage();
  
  // Auto-fill full roster if empty on first visit
  const assignedCount = rosterAssignments ? Object.keys(rosterAssignments).length : 0;
  if (!rosterAssignments || assignedCount < 42) {
    if (teachers.length > 0) {
      const res = executeConstraintShuffle();
      if (res.success) {
        rosterAssignments = res.assignments;
        saveRosterToStorage();
      }
    }
  }

  renderAll();
  setupEventListeners();
});

// --------------------------------------------------------------------------
// STORAGE FUNCTIONS
// --------------------------------------------------------------------------
function loadTeachersFromStorage() {
  const versionKey = "gate_duty_teachers_v3";
  const saved = localStorage.getItem(versionKey);
  if (saved !== null) {
    try { 
      teachers = JSON.parse(saved); 
      if (!teachers || teachers.length < 40) {
        teachers = [...DEFAULT_TEACHERS];
        saveTeachersToStorage();
      }
    } catch (e) { 
      teachers = [...DEFAULT_TEACHERS]; 
      saveTeachersToStorage();
    }
  } else {
    teachers = [...DEFAULT_TEACHERS];
    saveTeachersToStorage();
  }
}

function saveTeachersToStorage() {
  localStorage.setItem("gate_duty_teachers_v3", JSON.stringify(teachers));
}

function loadPostConfigFromStorage() {
  const savedConfig = localStorage.getItem("gate_duty_post_config");
  if (savedConfig) {
    try {
      const parsed = JSON.parse(savedConfig);
      if (parsed.gatePosts) gatePosts = parsed.gatePosts;
      if (parsed.lunchPosts) lunchPosts = parsed.lunchPosts;
    } catch (e) {
      gatePosts = [...DEFAULT_GATE_POSTS];
      lunchPosts = [...DEFAULT_LUNCH_POSTS];
    }
  } else {
    gatePosts = [...DEFAULT_GATE_POSTS];
    lunchPosts = [...DEFAULT_LUNCH_POSTS];
  }
}

function savePostConfigToStorage() {
  localStorage.setItem("gate_duty_post_config", JSON.stringify({ gatePosts, lunchPosts }));
}

function loadLogoFromStorage() {
  const savedLogo = localStorage.getItem("gate_duty_logo");
  if (savedLogo) logoDataUrl = savedLogo;
}

function saveLogoToStorage(dataUrl) {
  logoDataUrl = dataUrl;
  localStorage.setItem("gate_duty_logo", dataUrl);
}

function loadRosterFromStorage() {
  const savedRoster = localStorage.getItem("gate_duty_roster");
  if (savedRoster) {
    try { rosterAssignments = JSON.parse(savedRoster); } catch (e) { rosterAssignments = { ...DEFAULT_ROSTER_ASSIGNMENTS }; }
  } else {
    rosterAssignments = { ...DEFAULT_ROSTER_ASSIGNMENTS };
  }
}

function saveRosterToStorage() {
  localStorage.setItem("gate_duty_roster", JSON.stringify(rosterAssignments));
}

function loadRosterNoteFromStorage() {
  const savedNote = localStorage.getItem("gate_duty_note");
  if (savedNote !== null) {
    rosterNote = savedNote;
  } else {
    rosterNote = "Note: All staff members are requested to report to their designated duty posts 5 minutes prior to scheduled start time.";
  }
  const noteInput = document.getElementById("rosterNoteInput");
  if (noteInput) noteInput.value = rosterNote;
}

function saveRosterNoteToStorage(text) {
  rosterNote = text;
  localStorage.setItem("gate_duty_note", text);
}

function initDatePicker() {
  const dateInput = document.getElementById("weekStartingDate");
  const savedDate = localStorage.getItem("gate_duty_week_start");
  
  if (savedDate) {
    weekStartingDate = savedDate;
  } else {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    weekStartingDate = monday.toISOString().split('T')[0];
  }
  
  dateInput.value = weekStartingDate;
  dateInput.addEventListener("change", (e) => {
    weekStartingDate = e.target.value;
    localStorage.setItem("gate_duty_week_start", weekStartingDate);
    renderRosterTables();
  });
}

// --------------------------------------------------------------------------
// UI RENDERERS
// --------------------------------------------------------------------------
function renderAll() {
  renderLogo();
  renderStats();
  renderTeacherTable();
  renderRosterTables();
}

function renderLogo() {
  const imgEl = document.getElementById("kvLogoImg");
  const placeholderEl = document.getElementById("logoPlaceholder");

  const pdfImg1 = document.getElementById("pdfLogoImg1");
  const pdfPlaceholder1 = document.getElementById("pdfLogoPlaceholder1");
  const pdfImg2 = document.getElementById("pdfLogoImg2");
  const pdfPlaceholder2 = document.getElementById("pdfLogoPlaceholder2");

  if (logoDataUrl) {
    imgEl.src = logoDataUrl;
    imgEl.classList.remove("hidden");
    placeholderEl.classList.add("hidden");

    if (pdfImg1) { pdfImg1.src = logoDataUrl; pdfImg1.classList.remove("hidden"); }
    if (pdfPlaceholder1) pdfPlaceholder1.classList.add("hidden");
    if (pdfImg2) { pdfImg2.src = logoDataUrl; pdfImg2.classList.remove("hidden"); }
    if (pdfPlaceholder2) pdfPlaceholder2.classList.add("hidden");
  } else {
    imgEl.classList.add("hidden");
    placeholderEl.classList.remove("hidden");

    if (pdfImg1) pdfImg1.classList.add("hidden");
    if (pdfPlaceholder1) pdfPlaceholder1.classList.remove("hidden");
    if (pdfImg2) { pdfImg2.classList.add("hidden"); }
    if (pdfPlaceholder2) pdfPlaceholder2.classList.remove("hidden");
  }
}

function renderStats() {
  const total = teachers.length;
  const regular = teachers.filter(t => t.category === "Regular").length;
  const contractual = teachers.filter(t => t.category === "Contractual").length;
  const primary = teachers.filter(t => t.level === "Primary").length;
  const secondary = teachers.filter(t => t.level === "Secondary").length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statRegular").textContent = regular;
  document.getElementById("statContractual").textContent = contractual;
  document.getElementById("statPrimary").textContent = primary;
  document.getElementById("statSecondary").textContent = secondary;
}

function renderTeacherTable() {
  const tbody = document.getElementById("teacherTableBody");
  tbody.innerHTML = "";

  if (teachers.length === 0) {
    const tr = document.createElement("tr");
    tr.className = "empty-template-row";
    tr.innerHTML = `
      <td class="col-drag" style="color: #cbd5e1;"><i class="fa-solid fa-plus"></i></td>
      <td class="col-sno">1</td>
      <td>
        <input type="text" id="inlineNewTeacherName" class="form-input" placeholder="Type Teacher Name here..." style="padding: 0.4rem 0.6rem; font-size: 0.85rem;">
      </td>
      <td>
        <select id="inlineNewTeacherCategory" class="form-select" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;">
          <option value="Regular">Regular</option>
          <option value="Contractual">Contractual</option>
        </select>
      </td>
      <td>
        <select id="inlineNewTeacherLevel" class="form-select" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;">
          <option value="Primary">Primary</option>
          <option value="Secondary" selected>Secondary</option>
        </select>
      </td>
      <td class="col-actions">
        <button class="btn btn-primary" onclick="saveInlineTeacher()" style="padding: 0.35rem 0.65rem; font-size: 0.8rem;" title="Save Teacher">
          <i class="fa-solid fa-check"></i> Add
        </button>
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  teachers.forEach((t, idx) => {
    const tr = document.createElement("tr");
    tr.className = "teacher-row";
    tr.draggable = true;
    tr.dataset.index = idx;

    tr.innerHTML = `
      <td class="col-drag"><i class="fa-solid fa-grip-vertical"></i></td>
      <td class="col-sno">${idx + 1}</td>
      <td><strong>${escapeHtml(t.name)}</strong></td>
      <td><span class="badge ${t.category === 'Regular' ? 'badge-regular' : 'badge-contractual'}">${t.category}</span></td>
      <td><span class="badge ${t.level === 'Primary' ? 'badge-primary' : 'badge-secondary'}">${t.level}</span></td>
      <td class="col-actions">
        <button class="action-btn edit" title="Edit Teacher" onclick="openEditTeacherModal(${idx})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="action-btn delete" title="Delete Teacher" onclick="deleteTeacher(${idx})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;

    tr.addEventListener("dragstart", handleDragStart);
    tr.addEventListener("dragover", handleDragOver);
    tr.addEventListener("dragleave", handleDragLeave);
    tr.addEventListener("drop", handleDrop);
    tr.addEventListener("dragend", handleDragEnd);

    tbody.appendChild(tr);
  });
}

function saveInlineTeacher() {
  const nameInput = document.getElementById("inlineNewTeacherName");
  const catInput = document.getElementById("inlineNewTeacherCategory");
  const levelInput = document.getElementById("inlineNewTeacherLevel");

  if (!nameInput || !nameInput.value.trim()) {
    showAlert("Please enter a teacher name!", "warning");
    return;
  }

  const name = nameInput.value.trim();
  const category = catInput.value;
  const level = levelInput.value;

  const newId = "t_" + Date.now();
  teachers.push({ id: newId, name, category, level });

  saveTeachersToStorage();
  renderAll();
  showAlert(`Added teacher "${name}"!`, "info");
}

function renderRosterTables() {
  renderGateDutyTable();
  renderLunchDutyTable();
  renderPdfPrintTables();
  validateRosterWarnings();
}

function getFormattedDateForDay(dayIdx) {
  if (!weekStartingDate) return "";
  const start = new Date(weekStartingDate);
  start.setDate(start.getDate() + dayIdx);
  const dayNum = start.getDate();
  const monthStr = start.toLocaleString('default', { month: 'short' });
  return `${dayNum} ${monthStr}`;
}

function getTeacherNameById(tid) {
  if (!tid) return "";
  const t = teachers.find(item => item.id === tid);
  return t ? t.name : "";
}

function renderGateDutyTable() {
  const headRow = document.getElementById("webGateHeadRow");
  if (headRow) {
    let headHtml = `<th class="col-weekday dark-brown-header">Weekday</th>`;
    gatePosts.forEach(post => {
      headHtml += `<th class="col-post dark-brown-header">${escapeHtml(post.label)}<br><small>(${escapeHtml(post.time)})</small></th>`;
    });
    headRow.innerHTML = headHtml;
  }

  const tbody = document.getElementById("gateDutyTbody");
  tbody.innerHTML = "";

  WEEKDAYS.forEach((day, dayIdx) => {
    const tr = document.createElement("tr");
    const dateStr = getFormattedDateForDay(dayIdx);

    let rowHtml = `
      <td class="col-weekday light-brown-weekday">
        <span class="weekday-name">${day}</span>
        <span class="weekday-date">${dateStr}</span>
      </td>
    `;

    gatePosts.forEach(post => {
      const cellKey = `${day}_${post.key}`;
      const assignedId = rosterAssignments[cellKey] || "";
      rowHtml += `<td>${renderTeacherSelect(cellKey, assignedId)}</td>`;
    });

    tr.innerHTML = rowHtml;
    tbody.appendChild(tr);
  });
}

function renderLunchDutyTable() {
  const headRow = document.getElementById("webLunchHeadRow");
  if (headRow) {
    let headHtml = `<th class="col-weekday dark-brown-header">Weekday</th>`;
    lunchPosts.forEach(post => {
      headHtml += `<th class="col-post dark-brown-header">${escapeHtml(post.label)}<br><small>(${escapeHtml(post.time)})</small></th>`;
    });
    headRow.innerHTML = headHtml;
  }

  const tbody = document.getElementById("lunchDutyTbody");
  tbody.innerHTML = "";

  WEEKDAYS.forEach((day, dayIdx) => {
    const tr = document.createElement("tr");
    const dateStr = getFormattedDateForDay(dayIdx);

    let rowHtml = `
      <td class="col-weekday light-brown-weekday">
        <span class="weekday-name">${day}</span>
        <span class="weekday-date">${dateStr}</span>
      </td>
    `;

    lunchPosts.forEach(post => {
      const cellKey = `${day}_${post.key}`;
      const assignedId = rosterAssignments[cellKey] || "";
      rowHtml += `<td>${renderTeacherSelect(cellKey, assignedId)}</td>`;
    });

    tr.innerHTML = rowHtml;
    tbody.appendChild(tr);
  });
}

function renderPdfPrintTables() {
  const pdfGateHeader1 = document.getElementById("pdfGateHeaderRow1");
  const pdfGateHeader2 = document.getElementById("pdfGateHeaderRow2");
  if (pdfGateHeader1 && pdfGateHeader2) {
    let row1 = `<th rowspan="2" class="pdf-th-weekday">Weekday</th>`;
    let row2 = "";
    gatePosts.forEach(post => {
      row1 += `<th colspan="2" class="pdf-th-post">${escapeHtml(post.label)}<br><small style="font-weight:normal; font-size: 8pt;">(${escapeHtml(post.time)})</small></th>`;
      row2 += `<th class="pdf-th-sub">Teacher Name</th><th class="pdf-th-sub">Sign</th>`;
    });
    pdfGateHeader1.innerHTML = row1;
    pdfGateHeader2.innerHTML = row2;
  }

  const gatePdfTbody = document.getElementById("pdfGateDutyTbody");
  if (gatePdfTbody) {
    gatePdfTbody.innerHTML = "";
    WEEKDAYS.forEach((day, dayIdx) => {
      const tr = document.createElement("tr");
      const dateStr = getFormattedDateForDay(dayIdx);
      let rowHtml = `<td class="pdf-weekday-cell">${day}<br><small style="font-weight:normal">${dateStr}</small></td>`;

      gatePosts.forEach(post => {
        const cellKey = `${day}_${post.key}`;
        const tid = rosterAssignments[cellKey] || "";
        const cleanName = getTeacherNameById(tid);
        rowHtml += `<td class="pdf-name-cell"><strong>${escapeHtml(cleanName)}</strong></td><td class="pdf-sign-cell"></td>`;
      });

      tr.innerHTML = rowHtml;
      gatePdfTbody.appendChild(tr);
    });
  }

  const pdfLunchHeader1 = document.getElementById("pdfLunchHeaderRow1");
  const pdfLunchHeader2 = document.getElementById("pdfLunchHeaderRow2");
  if (pdfLunchHeader1 && pdfLunchHeader2) {
    let row1 = `<th rowspan="2" class="pdf-th-weekday">Weekday</th>`;
    let row2 = "";
    lunchPosts.forEach(post => {
      row1 += `<th colspan="2" class="pdf-th-post">${escapeHtml(post.label)}<br><small style="font-weight:normal; font-size: 8pt;">(${escapeHtml(post.time)})</small></th>`;
      row2 += `<th class="pdf-th-sub">Teacher Name</th><th class="pdf-th-sub">Sign</th>`;
    });
    pdfLunchHeader1.innerHTML = row1;
    pdfLunchHeader2.innerHTML = row2;
  }

  const lunchPdfTbody = document.getElementById("pdfLunchDutyTbody");
  if (lunchPdfTbody) {
    lunchPdfTbody.innerHTML = "";
    WEEKDAYS.forEach((day, dayIdx) => {
      const tr = document.createElement("tr");
      const dateStr = getFormattedDateForDay(dayIdx);
      let rowHtml = `<td class="pdf-weekday-cell">${day}<br><small style="font-weight:normal">${dateStr}</small></td>`;

      lunchPosts.forEach(post => {
        const cellKey = `${day}_${post.key}`;
        const tid = rosterAssignments[cellKey] || "";
        const cleanName = getTeacherNameById(tid);
        rowHtml += `<td class="pdf-name-cell"><strong>${escapeHtml(cleanName)}</strong></td><td class="pdf-sign-cell"></td>`;
      });

      tr.innerHTML = rowHtml;
      lunchPdfTbody.appendChild(tr);
    });
  }
}

function renderTeacherSelect(cellKey, selectedId) {
  let optionsHtml = `<option value="">-- Unassigned --</option>`;
  
  teachers.forEach(t => {
    const isSelected = t.id === selectedId ? "selected" : "";
    optionsHtml += `<option value="${t.id}" ${isSelected}>${escapeHtml(t.name)}</option>`;
  });

  return `<select class="roster-cell-select" data-cellkey="${cellKey}" onchange="handleCellChange(this)">
    ${optionsHtml}
  </select>`;
}

// --------------------------------------------------------------------------
// CLEAR ALL TEACHERS CONFIRMATION ENGINE
// --------------------------------------------------------------------------
function openClearConfirmModal() {
  document.getElementById("clearConfirmModal").classList.remove("hidden");
}

function closeClearConfirmModal() {
  document.getElementById("clearConfirmModal").classList.add("hidden");
}

function executeClearAllTeachers() {
  teachers = [];
  rosterAssignments = {};
  saveTeachersToStorage();
  saveRosterToStorage();
  closeClearConfirmModal();
  closeStatDropdownPanel();
  renderAll();
  showAlert("All teacher names cleared! 1 clean empty row ready for custom entries.", "info");
}

// --------------------------------------------------------------------------
// MOBILE MODAL ENGINE
// --------------------------------------------------------------------------
function openMobileModal() {
  document.getElementById("mobileModal").classList.remove("hidden");
}

function closeMobileModal() {
  document.getElementById("mobileModal").classList.add("hidden");
}

function copyMobileLink() {
  const linkText = document.getElementById("mobileDirectLink").href;
  navigator.clipboard.writeText(linkText).then(() => {
    showAlert("Mobile link copied to clipboard!", "info");
  }).catch(() => {
    showAlert("Link: " + linkText, "info");
  });
}

// --------------------------------------------------------------------------
// DASHBOARD STAT CARD CLICK & DROPDOWN LIST ENGINE
// --------------------------------------------------------------------------
function setupDashboardCardListeners() {
  const cards = document.querySelectorAll(".stat-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      if (activeStatCategory === cat) {
        closeStatDropdownPanel();
      } else {
        openStatDropdownCategory(cat);
      }
    });
  });
}

function openStatDropdownCategory(cat) {
  activeStatCategory = cat;

  document.querySelectorAll(".stat-card").forEach(c => {
    if (c.dataset.category === cat) c.classList.add("active");
    else c.classList.remove("active");
  });

  let filtered = [];
  let titleText = "";

  if (cat === "all") {
    filtered = [...teachers];
    titleText = `All Teachers (${teachers.length})`;
  } else if (cat === "Regular" || cat === "Contractual") {
    filtered = teachers.filter(t => t.category === cat);
    titleText = `${cat} Teachers (${filtered.length})`;
  } else if (cat === "Primary" || cat === "Secondary") {
    filtered = teachers.filter(t => t.level === cat);
    titleText = `${cat} Level Teachers (${filtered.length})`;
  }

  const titleEl = document.getElementById("statDropdownTitle");
  titleEl.innerHTML = `<i class="fa-solid fa-list-check"></i> ${titleText}`;

  const listEl = document.getElementById("statDropdownList");
  listEl.innerHTML = "";

  if (filtered.length === 0) {
    listEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No teachers found in this category.</p>`;
  } else {
    filtered.forEach((t, i) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "teacher-chip";
      itemDiv.innerHTML = `
        <span class="chip-name">${i + 1}. ${escapeHtml(t.name)}</span>
        <div class="chip-badges">
          <span class="badge ${t.category === 'Regular' ? 'badge-regular' : 'badge-contractual'}">${t.category}</span>
          <span class="badge ${t.level === 'Primary' ? 'badge-primary' : 'badge-secondary'}">${t.level}</span>
        </div>
      `;
      listEl.appendChild(itemDiv);
    });
  }

  document.getElementById("statDropdownPanel").classList.remove("hidden");
}

function closeStatDropdownPanel() {
  activeStatCategory = null;
  document.querySelectorAll(".stat-card").forEach(c => c.classList.remove("active"));
  document.getElementById("statDropdownPanel").classList.add("hidden");
}

// --------------------------------------------------------------------------
// BULK IMPORT ENGINE (EXCEL, PDF, WORD, IMAGE OCR, CSV, TEXT)
// --------------------------------------------------------------------------
function openBulkImportModal() {
  extractedTeachersPreview = [];
  document.getElementById("bulkPreviewSection").classList.add("hidden");
  document.getElementById("btnConfirmBulkImport").classList.add("hidden");
  document.getElementById("fileParsingStatus").classList.add("hidden");
  document.getElementById("pasteTextInput").value = "";
  switchImportTab('file');
  document.getElementById("bulkImportModal").classList.remove("hidden");
}

function closeBulkImportModal() {
  document.getElementById("bulkImportModal").classList.add("hidden");
}

function switchImportTab(tabName) {
  const tabFile = document.getElementById("tabFileImport");
  const tabText = document.getElementById("tabTextImport");
  const contentFile = document.getElementById("importTabFile");
  const contentText = document.getElementById("importTabText");

  if (tabName === 'file') {
    tabFile.classList.add("active");
    tabText.classList.remove("active");
    contentFile.classList.remove("hidden");
    contentText.classList.add("hidden");
  } else {
    tabText.classList.add("active");
    tabFile.classList.remove("active");
    contentText.classList.remove("hidden");
    contentFile.classList.add("hidden");
  }
}

function setupBulkImportListeners() {
  const dropArea = document.getElementById("fileDropArea");
  const fileInput = document.getElementById("bulkFileInput");

  document.getElementById("btnOpenBulkImportModal").addEventListener("click", openBulkImportModal);

  dropArea.addEventListener("click", () => fileInput.click());

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-over");
  });

  dropArea.addEventListener("dragleave", () => dropArea.classList.remove("drag-over"));

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    if (files.length > 0) processUploadedFile(files[0]);
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) processUploadedFile(e.target.files[0]);
  });
}

function processUploadedFile(file) {
  const statusEl = document.getElementById("fileParsingStatus");
  const statusText = document.getElementById("parsingStatusText");
  statusEl.classList.remove("hidden");

  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv")) {
    statusText.textContent = "Parsing Excel / CSV spreadsheet...";
    parseExcelOrCsv(file);
  } else if (fileName.endsWith(".pdf")) {
    statusText.textContent = "Extracting text from PDF document...";
    parsePdfFile(file);
  } else if (fileName.endsWith(".docx")) {
    statusText.textContent = "Extracting text from Word document...";
    parseWordFile(file);
  } else if (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".webp") || fileName.endsWith(".bmp")) {
    statusText.textContent = "Scanning image text using OCR Engine, please wait...";
    parseImageFile(file);
  } else {
    statusText.textContent = "Parsing text file...";
    parseTextFile(file);
  }
}

function parseImageFile(file) {
  if (!window.Tesseract) {
    handleExtractionError("Tesseract OCR library not loaded. Ensure internet connection is active.");
    return;
  }

  Tesseract.recognize(file, 'eng', {
    logger: m => {
      if (m.status === 'recognizing text') {
        const pct = Math.round((m.progress || 0) * 100);
        document.getElementById("parsingStatusText").textContent = `Scanning Image OCR: ${pct}% complete...`;
      }
    }
  }).then(({ data: { text } }) => {
    const lines = text.split(/\r?\n/);
    const extracted = [];
    lines.forEach(l => {
      const tObj = extractTeacherFromLine(l);
      if (tObj) extracted.push(tObj);
    });
    handleExtractionSuccess(extracted);
  }).catch(err => {
    handleExtractionError("OCR Image Recognition failed. Please try a clearer image.");
  });
}

function parseExcelOrCsv(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const extracted = [];
      jsonRows.forEach(row => {
        if (!row || row.length === 0) return;
        const rowStr = row.join(" ");
        const teacherObj = extractTeacherFromLine(rowStr, row);
        if (teacherObj) extracted.push(teacherObj);
      });

      handleExtractionSuccess(extracted);
    } catch (err) {
      handleExtractionError("Failed to parse Excel/CSV file. Ensure file format is valid.");
    }
  };
  reader.readAsArrayBuffer(file);
}

function parsePdfFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const typedarray = new Uint8Array(e.target.result);
    pdfjsLib.getDocument(typedarray).promise.then(pdf => {
      const maxPages = pdf.numPages;
      let count = 0;
      let fullText = "";

      for (let i = 1; i <= maxPages; i++) {
        pdf.getPage(i).then(page => {
          page.getTextContent().then(textContent => {
            const pageText = textContent.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
            count++;
            if (count === maxPages) {
              const lines = fullText.split(/\r?\n/);
              const extracted = [];
              lines.forEach(l => {
                const tObj = extractTeacherFromLine(l);
                if (tObj) extracted.push(tObj);
              });
              handleExtractionSuccess(extracted);
            }
          });
        });
      }
    }).catch(err => handleExtractionError("Could not extract text from PDF file."));
  };
  reader.readAsArrayBuffer(file);
}

function parseWordFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(result => {
      const lines = result.value.split(/\r?\n/);
      const extracted = [];
      lines.forEach(l => {
        const tObj = extractTeacherFromLine(l);
        if (tObj) extracted.push(tObj);
      });
      handleExtractionSuccess(extracted);
    }).catch(err => handleExtractionError("Could not extract text from Word .docx file."));
  };
  reader.readAsArrayBuffer(file);
}

function parseTextFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const lines = e.target.result.split(/\r?\n/);
    const extracted = [];
    lines.forEach(l => {
      const tObj = extractTeacherFromLine(l);
      if (tObj) extracted.push(tObj);
    });
    handleExtractionSuccess(extracted);
  };
  reader.readAsText(file);
}

function parsePastedText() {
  const raw = document.getElementById("pasteTextInput").value;
  if (!raw.trim()) {
    showAlert("Please paste text containing teacher names first!", "warning");
    return;
  }
  const lines = raw.split(/\r?\n/);
  const extracted = [];
  lines.forEach(l => {
    const tObj = extractTeacherFromLine(l);
    if (tObj) extracted.push(tObj);
  });
  handleExtractionSuccess(extracted);
}

function extractTeacherFromLine(lineStr, rawRowArray = null) {
  if (!lineStr || typeof lineStr !== 'string') return null;

  let cleanLine = lineStr.trim();
  if (cleanLine.length < 3) return null;

  const lower = cleanLine.toLowerCase();
  if (lower.includes("sl.no") || lower.includes("s.no") || lower.includes("teacher name") || lower.includes("signature") || lower.includes("total")) {
    return null;
  }

  let category = "Regular";
  if (lower.includes("contractual") || lower.includes("contract") || lower.includes("part time") || lower.includes("[c]") || lower.includes("(c)")) {
    category = "Contractual";
  }

  let level = "Secondary";
  if (lower.includes("primary") || lower.includes("prt") || lower.includes("balvatika") || lower.includes("prm")) {
    level = "Primary";
  }

  let name = cleanLine;
  name = name.replace(/^[\d\.\s\-]+/, '');
  name = name.replace(/regular|contractual|contract|primary|secondary|prt|tgt|pgt/gi, '');
  name = name.replace(/\[.*?\]|\(.*?\)/g, '');
  name = name.trim();

  if (name.length < 3) return null;

  return { name, category, level };
}

function handleExtractionSuccess(extractedList) {
  document.getElementById("fileParsingStatus").classList.add("hidden");

  if (!extractedList || extractedList.length === 0) {
    showAlert("No valid teacher names could be extracted from the file/image. Try pasting plain text.", "warning");
    return;
  }

  extractedTeachersPreview = extractedList;
  renderBulkPreviewTable();
  document.getElementById("bulkPreviewSection").classList.remove("hidden");
  document.getElementById("btnConfirmBulkImport").classList.remove("hidden");
}

function handleExtractionError(errMsg) {
  document.getElementById("fileParsingStatus").classList.add("hidden");
  showAlert(errMsg, "error");
}

function renderBulkPreviewTable() {
  document.getElementById("previewCount").textContent = extractedTeachersPreview.length;
  const tbody = document.getElementById("previewTableBody");
  tbody.innerHTML = "";

  extractedTeachersPreview.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>
        <input type="text" class="table-input" value="${escapeHtml(item.name)}" onchange="updatePreviewItemName(${idx}, this.value)">
      </td>
      <td>
        <select class="table-select" onchange="updatePreviewItemCategory(${idx}, this.value)">
          <option value="Regular" ${item.category === 'Regular' ? 'selected' : ''}>Regular</option>
          <option value="Contractual" ${item.category === 'Contractual' ? 'selected' : ''}>Contractual</option>
        </select>
      </td>
      <td>
        <select class="table-select" onchange="updatePreviewItemLevel(${idx}, this.value)">
          <option value="Primary" ${item.level === 'Primary' ? 'selected' : ''}>Primary</option>
          <option value="Secondary" ${item.level === 'Secondary' ? 'selected' : ''}>Secondary</option>
        </select>
      </td>
      <td>
        <button class="action-btn delete" onclick="deletePreviewItem(${idx})" title="Remove item"><i class="fa-solid fa-xmark"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updatePreviewItemName(idx, val) {
  if (extractedTeachersPreview[idx]) extractedTeachersPreview[idx].name = val.trim();
}

function updatePreviewItemCategory(idx, val) {
  if (extractedTeachersPreview[idx]) extractedTeachersPreview[idx].category = val;
}

function updatePreviewItemLevel(idx, val) {
  if (extractedTeachersPreview[idx]) extractedTeachersPreview[idx].level = val;
}

function deletePreviewItem(idx) {
  extractedTeachersPreview.splice(idx, 1);
  renderBulkPreviewTable();
}

function confirmBulkImport() {
  if (!extractedTeachersPreview || extractedTeachersPreview.length === 0) {
    showAlert("No teachers to import!", "warning");
    return;
  }

  const mode = document.querySelector('input[name="importMode"]:checked').value;

  const newTeachers = extractedTeachersPreview.map((item, i) => ({
    id: "t_bulk_" + Date.now() + "_" + i,
    name: item.name,
    category: item.category,
    level: item.level
  }));

  if (mode === "replace") {
    teachers = newTeachers;
  } else {
    teachers = [...teachers, ...newTeachers];
  }

  saveTeachersToStorage();
  closeBulkImportModal();
  renderAll();
  showAlert(`Successfully imported ${newTeachers.length} teachers!`, "info");
}

// --------------------------------------------------------------------------
// EVENT HANDLERS & NAVIGATION LISTENERS
// --------------------------------------------------------------------------
function setupEventListeners() {
  document.getElementById("logoWrapper").addEventListener("click", () => {
    document.getElementById("logoFileInput").click();
  });

  document.getElementById("logoFileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        saveLogoToStorage(event.target.result);
        renderLogo();
        showAlert("School logo uploaded and saved successfully!", "info");
      };
      reader.readAsDataURL(file);
    }
  });

  const noteInput = document.getElementById("rosterNoteInput");
  if (noteInput) {
    noteInput.addEventListener("input", (e) => saveRosterNoteToStorage(e.target.value));
  }

  setupDashboardCardListeners();
  setupBulkImportListeners();

  // Mobile Access Button
  const btnMobile = document.getElementById("btnMobileAccess");
  if (btnMobile) {
    btnMobile.addEventListener("click", openMobileModal);
  }

  // Scroll to Manage Teachers button in Top Toolbar
  const scrollBtn = document.getElementById("btnScrollManageTeachers");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      const targetSection = document.getElementById("teacherMgmtSection");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Clear All Teachers Button
  const btnClearAll = document.getElementById("btnClearAllTeachers");
  if (btnClearAll) {
    btnClearAll.addEventListener("click", openClearConfirmModal);
  }

  // Find & Replace Buttons (Top Toolbar + Beside Clear All Names)
  document.querySelectorAll(".btn-find-replace, #btnOpenFindReplaceModal, #btnTopFindReplace").forEach(btn => {
    btn.addEventListener("click", openFindReplaceModal);
  });

  // Buttons
  document.getElementById("btnEditTimings").addEventListener("click", openTimingsModal);
  document.getElementById("btnShuffle").addEventListener("click", handleShuffleClick);
  document.getElementById("btnExportPDF").addEventListener("click", exportPDF);
  document.getElementById("btnOpenAddModal").addEventListener("click", () => openAddTeacherModal());
  document.getElementById("btnResetDefault").addEventListener("click", resetDefaultSeed);

  // Forms
  document.getElementById("timingsForm").addEventListener("submit", handleTimingsFormSubmit);
  document.getElementById("teacherForm").addEventListener("submit", handleTeacherFormSubmit);
}

// --------------------------------------------------------------------------
// BATCH FIND & REPLACE ENGINE
// --------------------------------------------------------------------------
function openFindReplaceModal() {
  document.getElementById("findTextInput").value = "";
  document.getElementById("replaceTextInput").value = "";
  document.getElementById("matchCaseCheckbox").checked = false;
  updateFindReplacePreview();
  document.getElementById("findReplaceModal").classList.remove("hidden");
}

function closeFindReplaceModal() {
  document.getElementById("findReplaceModal").classList.add("hidden");
}

function updateFindReplacePreview() {
  const findText = document.getElementById("findTextInput").value;
  const replaceText = document.getElementById("replaceTextInput").value;
  const matchCase = document.getElementById("matchCaseCheckbox").checked;
  const previewBox = document.getElementById("findReplacePreviewBox");

  if (!findText) {
    previewBox.innerHTML = `<i class="fa-solid fa-info-circle"></i> Type text in 'Find Text' to see live replacement preview.`;
    return;
  }

  let count = 0;
  const sampleMatches = [];

  teachers.forEach(t => {
    let matches = false;
    if (matchCase) {
      matches = t.name.includes(findText);
    } else {
      matches = t.name.toLowerCase().includes(findText.toLowerCase());
    }

    if (matches) {
      count++;
      if (sampleMatches.length < 4) {
        let newName = "";
        if (matchCase) {
          newName = t.name.replaceAll(findText, replaceText);
        } else {
          const regex = new RegExp(escapeRegExp(findText), 'gi');
          newName = t.name.replace(regex, replaceText);
        }
        sampleMatches.push(`<li><strong>${escapeHtml(t.name)}</strong> &rarr; <span style="color: #16a34a; font-weight: 600;">${escapeHtml(newName)}</span></li>`);
      }
    }
  });

  if (count === 0) {
    previewBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #d97706;"></i> No matching teacher names found.`;
  } else {
    let html = `<div style="margin-bottom: 6px;"><strong>Found ${count} matching teacher name(s):</strong></div>`;
    html += `<ul style="margin-left: 1.2rem; margin-top: 4px; font-size: 0.8rem; line-height: 1.4;">${sampleMatches.join("")}</ul>`;
    if (count > 4) {
      html += `<div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">...and ${count - 4} more.</div>`;
    }
    previewBox.innerHTML = html;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function executeFindReplace() {
  const findText = document.getElementById("findTextInput").value;
  const replaceText = document.getElementById("replaceTextInput").value;
  const matchCase = document.getElementById("matchCaseCheckbox").checked;

  if (!findText) {
    showAlert("Please enter text to find!", "warning");
    return;
  }

  let updatedCount = 0;

  teachers.forEach(t => {
    let matches = false;
    if (matchCase) {
      matches = t.name.includes(findText);
    } else {
      matches = t.name.toLowerCase().includes(findText.toLowerCase());
    }

    if (matches) {
      if (matchCase) {
        t.name = t.name.replaceAll(findText, replaceText);
      } else {
        const regex = new RegExp(escapeRegExp(findText), 'gi');
        t.name = t.name.replace(regex, replaceText);
      }
      updatedCount++;
    }
  });

  if (updatedCount === 0) {
    showAlert("No matches found to replace.", "warning");
    return;
  }

  saveTeachersToStorage();
  closeFindReplaceModal();
  renderAll();
  showAlert(`Successfully updated ${updatedCount} teacher name(s) in bulk!`, "info");
}

function openTimingsModal() {
  gatePosts.forEach(p => {
    const lblInput = document.getElementById(`post_${p.key}_label`);
    const timeInput = document.getElementById(`post_${p.key}_time`);
    if (lblInput) lblInput.value = p.label;
    if (timeInput) timeInput.value = p.time;
  });

  lunchPosts.forEach(p => {
    const lblInput = document.getElementById(`post_${p.key}_label`);
    const timeInput = document.getElementById(`post_${p.key}_time`);
    if (lblInput) lblInput.value = p.label;
    if (timeInput) timeInput.value = p.time;
  });

  document.getElementById("timingsModal").classList.remove("hidden");
}

function closeTimingsModal() {
  document.getElementById("timingsModal").classList.add("hidden");
}

function handleTimingsFormSubmit(e) {
  e.preventDefault();

  gatePosts.forEach(p => {
    const lblVal = document.getElementById(`post_${p.key}_label`).value.trim();
    const timeVal = document.getElementById(`post_${p.key}_time`).value.trim();
    if (lblVal) p.label = lblVal;
    if (timeVal) p.time = timeVal;
  });

  lunchPosts.forEach(p => {
    const lblVal = document.getElementById(`post_${p.key}_label`).value.trim();
    const timeVal = document.getElementById(`post_${p.key}_time`).value.trim();
    if (lblVal) p.label = lblVal;
    if (timeVal) p.time = timeVal;
  });

  savePostConfigToStorage();
  closeTimingsModal();
  renderRosterTables();
  showAlert("Duty post names and timings updated successfully!", "info");
}

function handleCellChange(selectEl) {
  const cellKey = selectEl.dataset.cellkey;
  const val = selectEl.value;

  if (val) {
    rosterAssignments[cellKey] = val;
  } else {
    delete rosterAssignments[cellKey];
  }

  saveRosterToStorage();
  renderPdfPrintTables();
  validateRosterWarnings();
}

function validateRosterWarnings() {
  const selects = document.querySelectorAll(".roster-cell-select");
  selects.forEach(s => s.classList.remove("has-warning"));

  const dayTeacherMap = {};

  WEEKDAYS.forEach((day, dayIdx) => {
    dayTeacherMap[dayIdx] = {};
    const allPosts = [...gatePosts, ...lunchPosts];
    
    allPosts.forEach(post => {
      const cellKey = `${day}_${post.key}`;
      const tid = rosterAssignments[cellKey];
      if (tid) {
        if (!dayTeacherMap[dayIdx][tid]) dayTeacherMap[dayIdx][tid] = [];
        const el = document.querySelector(`.roster-cell-select[data-cellkey="${cellKey}"]`);
        if (el) dayTeacherMap[dayIdx][tid].push(el);
      }
    });
  });

  WEEKDAYS.forEach((day, dayIdx) => {
    Object.keys(dayTeacherMap[dayIdx]).forEach(tid => {
      if (dayTeacherMap[dayIdx][tid].length > 1) {
        dayTeacherMap[dayIdx][tid].forEach(el => el.classList.add("has-warning"));
      }
    });
  });
}

// --------------------------------------------------------------------------
// SHUFFLE ALGORITHM (CONSTRAINT SATISFACTION PROBLEM SOLVER)
// --------------------------------------------------------------------------
function handleShuffleClick() {
  if (teachers.length === 0) {
    showAlert("Please add teachers before shuffling!", "warning");
    return;
  }

  const result = executeConstraintShuffle();
  if (result.success) {
    rosterAssignments = result.assignments;
    saveRosterToStorage();
    renderRosterTables();
    showAlert("Weekly roster successfully shuffled following all 8 rules!", "info");
  } else {
    showAlert(`Shuffle Failed: ${result.error}`, "error");
  }
}

function executeConstraintShuffle() {
  const totalSlots = 42;
  const regularTeachers = teachers.filter(t => t.category === "Regular");
  const contractualTeachers = teachers.filter(t => t.category === "Contractual");

  const maxCapacity = regularTeachers.length * 1 + contractualTeachers.length * 2;
  if (maxCapacity < totalSlots) {
    return {
      success: false,
      error: `Not enough staff capacity! Required ${totalSlots} duty slots. Current staff (${regularTeachers.length} Regular, ${contractualTeachers.length} Contractual) can only provide ${maxCapacity} maximum duties.`
    };
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    const solution = solveRosterCSP(regularTeachers, contractualTeachers);
    if (solution) {
      return { success: true, assignments: solution };
    }
  }

  return {
    success: false,
    error: `Could not satisfy non-consecutive day & gate priority constraints with current teacher list. Try adding more teachers.`
  };
}

let enableGate2RegularPriority = true; // Min 5 Regular teachers in Gate 2, Mostly Contractual in Gate 1

function loadGate2PriorityFromStorage() {
  const saved = localStorage.getItem("gate2_regular_priority");
  if (saved !== null) {
    enableGate2RegularPriority = (saved === "true");
  }
  const toggleEl = document.getElementById("gate2RegularToggle");
  if (toggleEl) toggleEl.checked = enableGate2RegularPriority;
}

function toggleGate2RegularPriority(enabled) {
  enableGate2RegularPriority = enabled;
  localStorage.setItem("gate2_regular_priority", enabled ? "true" : "false");
  showAlert(`Gate 2 Priority rule ${enabled ? 'ENABLED (Gate 2: ALWAYS Permanent/Regular Teachers). Rest: Unanimously Mixed' : 'DISABLED (Standard Random Shuffle)'}.`, "info");
}

function solveRosterCSP(regulars, contractuals) {
  const assignments = {};
  const teacherAssignedDays = {};
  const teacherDutyCount = {};

  teachers.forEach(t => {
    teacherAssignedDays[t.id] = new Set();
    teacherDutyCount[t.id] = 0;
  });

  WEEKDAYS.forEach((dayName, dayIdx) => {
    gatePosts.forEach(post => {
      let forcedType = null;
      if (enableGate2RegularPriority) {
        if (post.key.includes("2")) {
          // Gate 2 (Entry Gate 2 & Exit Gate 2): ALWAYS Permanent / Regular Teachers
          forcedType = "Regular";
        }
      }
      slotsToFill.push({ dayIdx, dayName, postKey: post.key, forcedType });
    });

    lunchPosts.forEach(post => {
      slotsToFill.push({ dayIdx, dayName, postKey: post.key, forcedType: null });
    });
  });

  const shuffledSlots = shuffleArray(slotsToFill);

  function backtrack(slotIndex) {
    if (slotIndex >= shuffledSlots.length) {
      return true;
    }

    const slot = shuffledSlots[slotIndex];
    const { dayIdx, dayName, postKey, forcedType } = slot;
    const cellKey = `${dayName}_${postKey}`;

    const regEligible = regulars.filter(t => isEligible(t, dayIdx, 1));
    const conEligible = contractuals.filter(t => isEligible(t, dayIdx, 2));

    let candidates = [];

    if (forcedType === "Regular") {
      candidates = shuffleArray(regEligible);
    } else if (forcedType === "Contractual") {
      candidates = shuffleArray(conEligible);
    } else {
      candidates = shuffleArray([...regEligible, ...conEligible]);
    }

    for (const teacher of candidates) {
      assignments[cellKey] = teacher.id;
      teacherAssignedDays[teacher.id].add(dayIdx);
      teacherDutyCount[teacher.id]++;

      if (backtrack(slotIndex + 1)) return true;

      delete assignments[cellKey];
      teacherAssignedDays[teacher.id].delete(dayIdx);
      teacherDutyCount[teacher.id]--;
    }

    return false;
  }

  function isEligible(teacher, dayIdx, maxDutiesAllowed) {
    if (teacherDutyCount[teacher.id] >= maxDutiesAllowed) return false;
    if (teacherAssignedDays[teacher.id].has(dayIdx)) return false;
    if (teacherAssignedDays[teacher.id].has(dayIdx - 1)) return false;
    if (teacherAssignedDays[teacher.id].has(dayIdx + 1)) return false;
    return true;
  }

  if (backtrack(0)) return assignments;
  return null;
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --------------------------------------------------------------------------
// DRAG AND DROP REORDERING ENGINE
// --------------------------------------------------------------------------
function handleDragStart(e) {
  draggedRowIndex = parseInt(this.dataset.index);
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  this.classList.add("drag-over");
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");
  const targetIndex = parseInt(this.dataset.index);

  if (draggedRowIndex !== null && draggedRowIndex !== targetIndex) {
    const movedTeacher = teachers.splice(draggedRowIndex, 1)[0];
    teachers.splice(targetIndex, 0, movedTeacher);

    saveTeachersToStorage();
    renderStats();
    renderTeacherTable();
    renderRosterTables();
    if (activeStatCategory) openStatDropdownCategory(activeStatCategory);
  }
}

function handleDragEnd(e) {
  this.classList.remove("dragging");
  document.querySelectorAll(".teacher-row").forEach(r => r.classList.remove("drag-over"));
  draggedRowIndex = null;
}

// --------------------------------------------------------------------------
// TEACHER CRUD MODAL
// --------------------------------------------------------------------------
function openAddTeacherModal() {
  document.getElementById("modalTitle").textContent = "Add New Teacher";
  document.getElementById("teacherId").value = "";
  document.getElementById("teacherName").value = "";
  document.getElementById("teacherCategory").value = "Regular";
  document.getElementById("teacherLevel").value = "Secondary";
  document.getElementById("teacherModal").classList.remove("hidden");
}

function openEditTeacherModal(idx) {
  const t = teachers[idx];
  document.getElementById("modalTitle").textContent = "Edit Teacher";
  document.getElementById("teacherId").value = t.id;
  document.getElementById("teacherName").value = t.name;
  document.getElementById("teacherCategory").value = t.category;
  document.getElementById("teacherLevel").value = t.level;
  document.getElementById("teacherModal").classList.remove("hidden");
}

function closeTeacherModal() {
  document.getElementById("teacherModal").classList.add("hidden");
}

function handleTeacherFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("teacherId").value;
  const name = document.getElementById("teacherName").value.trim();
  const category = document.getElementById("teacherCategory").value;
  const level = document.getElementById("teacherLevel").value;

  if (!name) return;

  if (id) {
    const t = teachers.find(item => item.id === id);
    if (t) {
      t.name = name;
      t.category = category;
      t.level = level;
    }
  } else {
    const newId = "t_" + Date.now();
    teachers.push({ id: newId, name, category, level });
  }

  saveTeachersToStorage();
  closeTeacherModal();
  renderAll();
  if (activeStatCategory) openStatDropdownCategory(activeStatCategory);
  showAlert("Teacher details saved successfully!", "info");
}

function deleteTeacher(idx) {
  if (confirm(`Are you sure you want to delete "${teachers[idx].name}"?`)) {
    teachers.splice(idx, 1);
    saveTeachersToStorage();
    renderAll();
    if (activeStatCategory) openStatDropdownCategory(activeStatCategory);
    showAlert("Teacher removed.", "info");
  }
}

function resetDefaultSeed() {
  if (confirm("Restore teacher list back to official PM SHRI KV BHAWANIPATNA 50 staff list? Any custom additions will be overwritten.")) {
    teachers = [...DEFAULT_TEACHERS];
    saveTeachersToStorage();
    renderAll();
    closeStatDropdownPanel();
    showAlert("Teacher list restored to official 50 staff list.", "info");
  }
}

// --------------------------------------------------------------------------
// PDF EXPORT ENGINE (EXACTLY 2 A4 LANDSCAPE PAGES)
// --------------------------------------------------------------------------
function exportPDF() {
  const pdfContainer = document.getElementById("pdfExportContainer");
  
  const dateInput = document.getElementById("weekStartingDate").value;
  let dateText = "";
  if (dateInput) {
    const startDate = new Date(dateInput);
    const endDate = new Date(dateInput);
    endDate.setDate(startDate.getDate() + 5);

    const formatStr = (d) => `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
    dateText = `Week Starting: ${formatStr(startDate)} to ${formatStr(endDate)}`;
  }

  document.getElementById("pdfDateRange1").textContent = dateText;
  document.getElementById("pdfDateRange2").textContent = dateText;

  const noteContent = document.getElementById("rosterNoteInput").value.trim();
  const pdfNote1 = document.getElementById("pdfNoteDisplay1");
  const pdfNote2 = document.getElementById("pdfNoteDisplay2");

  if (noteContent) {
    pdfNote1.textContent = noteContent;
    pdfNote1.classList.remove("hidden");
    pdfNote2.textContent = noteContent;
    pdfNote2.classList.remove("hidden");
  } else {
    pdfNote1.classList.add("hidden");
    pdfNote2.classList.add("hidden");
  }

  renderPdfPrintTables();

  pdfContainer.classList.remove("hidden");

  const opt = {
    margin:       [0.12, 0.15, 0.12, 0.15],
    filename:     `Gate_and_Lunch_Duty_Roster_${weekStartingDate || 'Weekly'}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, windowWidth: 1080 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' },
    pagebreak:    { mode: ['css', 'legacy'] }
  };

  html2pdf().set(opt).from(pdfContainer).save().then(() => {
    pdfContainer.classList.add("hidden");
    showAlert("PDF Roster exported successfully with clean formatting!", "info");
  }).catch(err => {
    pdfContainer.classList.add("hidden");
    showAlert("Failed to generate PDF. Please try printing via browser.", "error");
  });
}

// --------------------------------------------------------------------------
// UTILITY FUNCTIONS
// --------------------------------------------------------------------------
function showAlert(msg, type = "info") {
  const banner = document.getElementById("alertBanner");
  const msgEl = document.getElementById("alertMessage");
  const iconEl = document.getElementById("alertIcon");

  banner.className = `alert-banner ${type}`;
  msgEl.textContent = msg;

  if (type === "info") iconEl.className = "fa-solid fa-circle-check";
  else if (type === "warning") iconEl.className = "fa-solid fa-triangle-exclamation";
  else iconEl.className = "fa-solid fa-circle-exclamation";

  banner.classList.remove("hidden");
  setTimeout(() => closeAlert(), 6000);
}

function closeAlert() {
  document.getElementById("alertBanner").classList.add("hidden");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

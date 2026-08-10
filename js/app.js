/**
 * app.js
 * Main Controller for Gate Duty App (Drag & Drop Reordering Support)
 */

import { TeacherStore } from './teacherStore.js';
import { generateWeeklyRoster, POST_DEFINITIONS, DAYS } from './shuffleEngine.js';
import { exportRosterToPDF } from './pdfExporter.js';

class App {
  constructor() {
    this.store = new TeacherStore();
    this.currentRoster = null; // Grid [postIdx][dayIdx] = teacherId or null
    this.searchQuery = '';
    this.draggedRow = null;

    this.initDOM();
    this.bindEvents();
    this.initDate();
    this.render();
  }

  initDOM() {
    // Stats elements
    this.statTotal = document.getElementById('statTotal');
    this.statPrimary = document.getElementById('statPrimary');
    this.statSecondary = document.getElementById('statSecondary');
    this.tabTeacherCount = document.getElementById('tabTeacherCount');

    // Controls
    this.shuffleBtn = document.getElementById('shuffleBtn');
    this.exportPdfBtn = document.getElementById('exportPdfBtn');
    this.weekStartInput = document.getElementById('weekStartInput');
    this.weekRangeDisplay = document.getElementById('weekRangeDisplay');
    this.alertBanner = document.getElementById('alertBanner');
    this.alertBannerText = document.getElementById('alertBannerText');
    
    // Table Bodies
    this.gateRosterTableBody = document.getElementById('gateRosterTableBody');
    this.lunchRosterTableBody = document.getElementById('lunchRosterTableBody');

    // Teacher Management elements
    this.addTeacherForm = document.getElementById('addTeacherForm');
    this.teacherNameInput = document.getElementById('teacherNameInput');
    this.teacherCategorySelect = document.getElementById('teacherCategorySelect');
    this.teacherLevelSelect = document.getElementById('teacherLevelSelect');
    
    this.bulkPasteTextarea = document.getElementById('bulkPasteTextarea');
    this.bulkAddBtn = document.getElementById('bulkAddBtn');

    this.teacherSearchInput = document.getElementById('teacherSearchInput');
    this.teacherTableBody = document.getElementById('teacherTableBody');
    this.clearAllTeachersBtn = document.getElementById('clearAllTeachersBtn');

    // Modal elements
    this.editTeacherModal = document.getElementById('editTeacherModal');
    this.editTeacherForm = document.getElementById('editTeacherForm');
    this.editTeacherId = document.getElementById('editTeacherId');
    this.editTeacherName = document.getElementById('editTeacherName');
    this.editTeacherCategory = document.getElementById('editTeacherCategory');
    this.editTeacherLevel = document.getElementById('editTeacherLevel');
    this.closeEditModalBtn = document.getElementById('closeEditModalBtn');
    this.cancelEditModalBtn = document.getElementById('cancelEditModalBtn');
  }

  initDate() {
    const savedData = this.store.loadSavedRoster();
    let initialDate = new Date();

    if (savedData.weekStart) {
      this.weekStartInput.value = savedData.weekStart;
    } else {
      const dayOfWeek = initialDate.getDay();
      const distanceToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
      const monday = new Date(initialDate);
      monday.setDate(initialDate.getDate() + distanceToMonday);

      const yyyy = monday.getFullYear();
      const mm = String(monday.getMonth() + 1).padStart(2, '0');
      const dd = String(monday.getDate()).padStart(2, '0');
      this.weekStartInput.value = `${yyyy}-${mm}-${dd}`;
    }

    this.updateWeekRangeDisplay();
    if (savedData.roster) {
      this.currentRoster = savedData.roster;
    }
  }

  updateWeekRangeDisplay() {
    const val = this.weekStartInput.value;
    if (!val) {
      this.weekRangeDisplay.textContent = '';
      return;
    }

    const startDate = new Date(val);
    if (isNaN(startDate.getTime())) {
      this.weekRangeDisplay.textContent = '';
      return;
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);

    const opts = { month: 'short', day: 'numeric' };
    this.weekRangeDisplay.textContent = `(${startDate.toLocaleDateString('en-US', opts)} – ${endDate.toLocaleDateString('en-US', opts)})`;
  }

  bindEvents() {
    // Tabs Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        e.currentTarget.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        this.refreshIcons();
      });
    });

    // Date Change
    this.weekStartInput.addEventListener('change', () => {
      this.updateWeekRangeDisplay();
      this.saveRosterState();
      this.renderRosterTable();
    });

    // Add Teacher Form
    this.addTeacherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.teacherNameInput.value;
      const category = this.teacherCategorySelect.value;
      const level = this.teacherLevelSelect.value;

      const newTeacher = this.store.addTeacher(name, category, level);
      if (newTeacher) {
        this.teacherNameInput.value = '';
        this.render();
      }
    });

    // Bulk Add
    this.bulkAddBtn.addEventListener('click', () => {
      const text = this.bulkPasteTextarea.value;
      if (!text.trim()) return;

      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length === 0) return;

      const selectedCategory = this.teacherCategorySelect.value;
      const selectedLevel = this.teacherLevelSelect.value;

      const items = lines.map(line => ({
        name: line,
        category: selectedCategory,
        level: selectedLevel
      }));

      this.store.bulkAddTeachers(items);
      this.bulkPasteTextarea.value = '';
      this.render();
    });

    // Search Filter
    this.teacherSearchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderTeacherTable();
    });

    // Clear All Teachers
    this.clearAllTeachersBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all saved teachers?')) {
        this.store.clearAllTeachers();
        this.currentRoster = null;
        this.render();
      }
    });

    // Edit Modal events
    this.closeEditModalBtn.addEventListener('click', () => this.hideEditModal());
    this.cancelEditModalBtn.addEventListener('click', () => this.hideEditModal());
    this.editTeacherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = this.editTeacherId.value;
      const name = this.editTeacherName.value;
      const category = this.editTeacherCategory.value;
      const level = this.editTeacherLevel.value;

      this.store.updateTeacher(id, name, category, level);
      this.hideEditModal();
      this.render();
    });

    // Shuffle Button
    this.shuffleBtn.addEventListener('click', () => {
      this.handleShuffle();
    });

    // Export PDF Button
    this.exportPdfBtn.addEventListener('click', () => {
      exportRosterToPDF(this.currentRoster, this.weekStartInput.value, this.store);
    });

    // Drag & Drop event listeners on Teacher Table Body
    this.teacherTableBody.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dragging = this.teacherTableBody.querySelector('.dragging');
      if (!dragging) return;

      const afterElement = getDragAfterElement(this.teacherTableBody, e.clientY);
      if (afterElement == null) {
        this.teacherTableBody.appendChild(dragging);
      } else {
        this.teacherTableBody.insertBefore(dragging, afterElement);
      }

      this.updateSerialNumbers();
    });

    this.teacherTableBody.addEventListener('drop', (e) => {
      e.preventDefault();
      const dragging = this.teacherTableBody.querySelector('.dragging');
      if (dragging) {
        dragging.classList.remove('dragging');
      }

      // Reorder teachers in store based on DOM sequence
      const rows = Array.from(this.teacherTableBody.querySelectorAll('.teacher-row'));
      const newOrderedIds = rows.map(r => r.dataset.id);
      this.store.reorderTeachers(newOrderedIds);

      this.updateSerialNumbers();
      this.renderRosterTable();
    });
  }

  updateSerialNumbers() {
    const rows = Array.from(this.teacherTableBody.querySelectorAll('.teacher-row'));
    rows.forEach((row, idx) => {
      const serialCell = row.querySelector('.serial-num');
      if (serialCell) {
        serialCell.textContent = idx + 1;
      }
    });
  }

  handleShuffle() {
    this.hideAlert();
    const teachers = this.store.getTeachers();

    const result = generateWeeklyRoster(teachers);
    if (!result.success) {
      this.showAlert(result.errorMsg);
      return;
    }

    const grid = result.roster.map(row => row.map(cell => cell ? cell.id : null));
    this.currentRoster = grid;
    this.saveRosterState();
    this.renderRosterTable();
  }

  saveRosterState() {
    this.store.saveRoster(this.currentRoster, this.weekStartInput.value);
  }

  showAlert(msg) {
    this.alertBannerText.textContent = msg;
    this.alertBanner.style.display = 'flex';
    this.refreshIcons();
  }

  hideAlert() {
    this.alertBanner.style.display = 'none';
  }

  showEditModal(teacher) {
    this.editTeacherId.value = teacher.id;
    this.editTeacherName.value = teacher.name;
    this.editTeacherCategory.value = teacher.category;
    this.editTeacherLevel.value = teacher.level;
    this.editTeacherModal.classList.add('active');
  }

  hideEditModal() {
    this.editTeacherModal.classList.remove('active');
  }

  render() {
    this.renderStats();
    this.renderTeacherTable();
    this.renderRosterTable();
    this.refreshIcons();
  }

  renderStats() {
    const stats = this.store.getStats();
    this.statTotal.textContent = stats.total;
    this.statPrimary.textContent = stats.primaryCount;
    this.statSecondary.textContent = stats.secondaryCount;
    this.tabTeacherCount.textContent = stats.total;
  }

  renderTeacherTable() {
    const allTeachers = this.store.getTeachers();
    const filtered = allTeachers.filter(t => 
      t.name.toLowerCase().includes(this.searchQuery) ||
      t.category.toLowerCase().includes(this.searchQuery) ||
      t.level.toLowerCase().includes(this.searchQuery)
    );

    this.teacherTableBody.innerHTML = '';

    if (filtered.length === 0) {
      this.teacherTableBody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="empty-state">
              <div class="empty-state-icon">👥</div>
              <h4>No teachers found</h4>
              <p>${allTeachers.length === 0 ? 'Your teacher list is currently empty. Use the form on the left to add teachers.' : 'No teachers match your search filter.'}</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach((t, index) => {
      const tr = document.createElement('tr');
      tr.className = 'teacher-row draggable-row';
      tr.setAttribute('draggable', 'true');
      tr.setAttribute('data-id', t.id);

      const lvlBadge = t.level === 'Primary'
        ? `<span class="badge badge-primary">Primary</span>`
        : `<span class="badge badge-secondary">Secondary</span>`;

      const catBadge = t.category === 'Regular'
        ? `<span class="badge badge-regular">Regular</span>`
        : `<span class="badge badge-contractual">Contractual</span>`;

      tr.innerHTML = `
        <td style="white-space:nowrap; cursor:grab;">
          <i data-lucide="grip-vertical" class="drag-handle" style="vertical-align:middle; width:16px; margin-right:4px; opacity:0.6;"></i>
          <span class="serial-num">${index + 1}</span>
        </td>
        <td style="font-weight:600; color:var(--text-main);">${escapeHtml(t.name)}</td>
        <td>${lvlBadge}</td>
        <td>${catBadge}</td>
        <td style="text-align:right;">
          <div class="action-btns" style="justify-content:flex-end;">
            <button type="button" class="btn btn-outline btn-sm edit-btn" data-id="${t.id}"><i data-lucide="edit-3"></i></button>
            <button type="button" class="btn btn-danger btn-sm del-btn" data-id="${t.id}"><i data-lucide="trash-2"></i></button>
          </div>
        </td>
      `;

      tr.addEventListener('dragstart', (e) => {
        tr.classList.add('dragging');
        e.dataTransfer.setData('text/plain', t.id);
        e.dataTransfer.effectAllowed = 'move';
      });

      tr.addEventListener('dragend', () => {
        tr.classList.remove('dragging');
        this.updateSerialNumbers();
      });

      tr.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.showEditModal(t);
      });

      tr.querySelector('.del-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`Delete teacher "${t.name}"?`)) {
          this.store.deleteTeacher(t.id);
          this.render();
        }
      });

      this.teacherTableBody.appendChild(tr);
    });
  }

  renderRosterTable() {
    this.gateRosterTableBody.innerHTML = '';
    this.lunchRosterTableBody.innerHTML = '';

    const teachers = this.store.getTeachers();
    const teacherMap = new Map(teachers.map(t => [t.id, t]));

    if (!this.currentRoster || this.currentRoster.length !== POST_DEFINITIONS.length) {
      this.currentRoster = Array(POST_DEFINITIONS.length).fill(null).map(() => Array(DAYS.length).fill(null));
    }

    const dayDates = [];
    const val = this.weekStartInput.value;
    if (val) {
      const startDate = new Date(val);
      if (!isNaN(startDate.getTime())) {
        for (let i = 0; i < 6; i++) {
          const d = new Date(startDate);
          d.setDate(startDate.getDate() + i);
          dayDates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
      }
    }

    const gatePostIndices = [0, 1, 5, 6];
    const lunchPostIndices = [2, 3, 4];

    DAYS.forEach((dayName, dayIdx) => {
      const dateSubtext = dayDates[dayIdx] ? `<div style="font-size:0.75rem; color:var(--accent-primary); font-weight:600;">${dayDates[dayIdx]}</div>` : '';
      const dayLabelHtml = `
        <td style="font-weight:700; color:var(--text-main); background:rgba(15, 23, 42, 0.6); padding-left:1rem;">
          ${dayName}
          ${dateSubtext}
        </td>
      `;

      // 1. Gate Row
      const gateTr = document.createElement('tr');
      let gateRowHtml = dayLabelHtml;
      gatePostIndices.forEach(postIdx => {
        gateRowHtml += `<td id="gate_cell_${dayIdx}_${postIdx}"></td>`;
      });
      gateTr.innerHTML = gateRowHtml;
      this.gateRosterTableBody.appendChild(gateTr);

      gatePostIndices.forEach(postIdx => {
        const cellTd = gateTr.querySelector(`#gate_cell_${dayIdx}_${postIdx}`);
        this.buildCellDropdown(cellTd, postIdx, dayIdx, teachers, teacherMap);
      });

      // 2. Lunch Row
      const lunchTr = document.createElement('tr');
      let lunchRowHtml = dayLabelHtml;
      lunchPostIndices.forEach(postIdx => {
        lunchRowHtml += `<td id="lunch_cell_${dayIdx}_${postIdx}"></td>`;
      });
      lunchTr.innerHTML = lunchRowHtml;
      this.lunchRosterTableBody.appendChild(lunchTr);

      lunchPostIndices.forEach(postIdx => {
        const cellTd = lunchTr.querySelector(`#lunch_cell_${dayIdx}_${postIdx}`);
        this.buildCellDropdown(cellTd, postIdx, dayIdx, teachers, teacherMap);
      });
    });
  }

  buildCellDropdown(cellTd, postIdx, dayIdx, teachers, teacherMap) {
    const assignedId = this.currentRoster[postIdx][dayIdx];

    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'cell-select-wrapper';

    const select = document.createElement('select');
    select.className = 'cell-select';

    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = '— Select —';
    select.appendChild(emptyOpt);

    teachers.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.name} (${t.level} • ${t.category})`;
      if (t.id === assignedId) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });

    this.updateSelectStyle(select, assignedId, teacherMap);

    select.addEventListener('change', (e) => {
      const newId = e.target.value || null;
      this.currentRoster[postIdx][dayIdx] = newId;
      this.updateSelectStyle(select, newId, teacherMap);
      this.saveRosterState();
    });

    selectWrapper.appendChild(select);
    cellTd.appendChild(selectWrapper);
  }

  updateSelectStyle(selectEl, assignedId, teacherMap) {
    selectEl.classList.remove('category-regular', 'category-contractual', 'unassigned');

    if (!assignedId) {
      selectEl.classList.add('unassigned');
      return;
    }

    const teacher = teacherMap.get(assignedId);
    if (!teacher) {
      selectEl.classList.add('unassigned');
      return;
    }

    if (teacher.category === 'Regular') {
      selectEl.classList.add('category-regular');
    } else if (teacher.category === 'Contractual') {
      selectEl.classList.add('category-contractual');
    }
  }

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Drag & drop helper positioning calculation
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.teacher-row:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', () => {
  window.gateDutyApp = new App();
});

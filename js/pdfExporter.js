/**
 * pdfExporter.js
 * Transposed A4 Landscape PDF Exporter with Separated Gate & Lunch Duty Tables
 * PM SHRI K.V. BHAWANIPATNA - GATE & LUNCH DUTY ROSTER
 */

import { POST_DEFINITIONS, DAYS } from './shuffleEngine.js';

export function exportRosterToPDF(rosterData, weekStartStr, teacherStore) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF library is loading or blocked. Please check your connection or refresh the page.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Calculate Date Range string
  let weekSubtitle = 'WEEKLY DUTY ROSTER';
  let dayDates = [];
  
  if (weekStartStr) {
    const startDate = new Date(weekStartStr);
    if (!isNaN(startDate.getTime())) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 5);

      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const startFmt = startDate.toLocaleDateString('en-US', options);
      const endFmt = endDate.toLocaleDateString('en-US', options);
      weekSubtitle = `GATE & LUNCH DUTY ROSTER (${startFmt} – ${endFmt})`;

      for (let i = 0; i < 6; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        dayDates.push(d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }));
      }
    }
  }

  // Official PDF Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text('PM SHRI K.V. BHAWANIPATNA', 148.5, 12, { align: 'center' });

  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text(weekSubtitle, 148.5, 17.5, { align: 'center' });

  const now = new Date();
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`Date: ${now.toLocaleDateString()}`, 283, 12, { align: 'right' });

  const allTeachersMap = new Map(teacherStore.getTeachers().map(t => [t.id, t]));

  // Post Indices
  // Gate: p0 (Entry G1), p1 (Entry G2), p5 (Exit G1), p6 (Exit G6)
  // Lunch: p2 (Chem Lab), p3 (Near 6B), p4 (Assembly)

  // --- TABLE 1: GATE DUTIES ROSTER ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241); // Indigo
  doc.text('1. GATE DUTIES ROSTER (ENTRY & EXIT GATES)', 14, 23);

  const gateColumns = [
    { header: 'Day / Date', dataKey: 'dayName' },
    { header: 'Entry Gate 1\n(07:00–07:30)', dataKey: 'p0' },
    { header: 'Entry Gate 2\n(07:00–07:30)', dataKey: 'p1' },
    { header: 'Exit Gate 1\n(01:44–02:00)', dataKey: 'p5' },
    { header: 'Exit Gate 2\n(01:44–02:00)', dataKey: 'p6' }
  ];

  const gateRows = DAYS.map((dayName, dIdx) => {
    const dateStr = dayDates[dIdx] ? ` (${dayDates[dIdx]})` : '';
    const rowObj = { dayName: `${dayName}${dateStr}` };

    [0, 1, 5, 6].forEach(pIdx => {
      const assignedId = rosterData && rosterData[pIdx] ? rosterData[pIdx][dIdx] : null;
      let cellText = '— Unassigned —';
      if (assignedId) {
        const teacher = typeof assignedId === 'object' ? assignedId : allTeachersMap.get(assignedId);
        if (teacher) {
          cellText = `${teacher.name} [${teacher.category === 'Regular' ? 'Reg' : 'Con'}]`;
        }
      }
      rowObj[`p${pIdx}`] = cellText;
    });

    return rowObj;
  });

  doc.autoTable({
    columns: gateColumns,
    body: gateRows,
    startY: 25,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      cellPadding: 2
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      valign: 'middle',
      halign: 'center',
      cellPadding: 2.2
    },
    columnStyles: {
      dayName: { fillColor: [248, 250, 252], fontStyle: 'bold', halign: 'left', cellWidth: 32 }
    },
    didParseCell: function(data) {
      if (data.section === 'body' && data.column.dataKey !== 'dayName') {
        if (data.cell.text[0] && data.cell.text[0].includes('[Reg]')) {
          data.cell.styles.fillColor = [240, 253, 244];
        } else if (data.cell.text[0] && data.cell.text[0].includes('[Con]')) {
          data.cell.styles.fillColor = [254, 243, 199];
        }
      }
    },
    margin: { left: 14, right: 14 }
  });

  const gateFinalY = doc.lastAutoTable.finalY;

  // --- TABLE 2: LUNCH BREAK DUTIES ROSTER ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(217, 119, 6); // Amber
  doc.text('2. LUNCH BREAK DUTIES ROSTER (10:40–11:00 AM)', 14, gateFinalY + 6);

  const lunchColumns = [
    { header: 'Day / Date', dataKey: 'dayName' },
    { header: 'Near Chemistry Lab', dataKey: 'p2' },
    { header: 'Near 6B', dataKey: 'p3' },
    { header: 'Assembly Ground', dataKey: 'p4' }
  ];

  const lunchRows = DAYS.map((dayName, dIdx) => {
    const dateStr = dayDates[dIdx] ? ` (${dayDates[dIdx]})` : '';
    const rowObj = { dayName: `${dayName}${dateStr}` };

    [2, 3, 4].forEach(pIdx => {
      const assignedId = rosterData && rosterData[pIdx] ? rosterData[pIdx][dIdx] : null;
      let cellText = '— Unassigned —';
      if (assignedId) {
        const teacher = typeof assignedId === 'object' ? assignedId : allTeachersMap.get(assignedId);
        if (teacher) {
          cellText = `${teacher.name} [${teacher.category === 'Regular' ? 'Reg' : 'Con'}]`;
        }
      }
      rowObj[`p${pIdx}`] = cellText;
    });

    return rowObj;
  });

  doc.autoTable({
    columns: lunchColumns,
    body: lunchRows,
    startY: gateFinalY + 8,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      cellPadding: 2
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59],
      valign: 'middle',
      halign: 'center',
      cellPadding: 2.2
    },
    columnStyles: {
      dayName: { fillColor: [248, 250, 252], fontStyle: 'bold', halign: 'left', cellWidth: 32 }
    },
    didParseCell: function(data) {
      if (data.section === 'body' && data.column.dataKey !== 'dayName') {
        if (data.cell.text[0] && data.cell.text[0].includes('[Reg]')) {
          data.cell.styles.fillColor = [240, 253, 244];
        } else if (data.cell.text[0] && data.cell.text[0].includes('[Con]')) {
          data.cell.styles.fillColor = [254, 243, 199];
        }
      }
    },
    margin: { left: 14, right: 14, bottom: 25 }
  });

  // --- SIGNATURE SECTION (AT BOTTOM RIGHT) ---
  const lunchFinalY = Math.min(doc.lastAutoTable.finalY + 16, 185);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  const sigPositions = [
    { label: 'TIME TABLE I/C', xStart: 130, xEnd: 170, textX: 150 },
    { label: 'DISCIPLINE I/C', xStart: 180, xEnd: 220, textX: 200 },
    { label: 'PRINCIPAL',      xStart: 230, xEnd: 275, textX: 252.5 }
  ];

  sigPositions.forEach(sig => {
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.4);
    doc.line(sig.xStart, lunchFinalY, sig.xEnd, lunchFinalY);

    doc.text(sig.label, sig.textX, lunchFinalY + 4.5, { align: 'center' });
  });

  // Footer Note
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`PM SHRI K.V. BHAWANIPATNA • Page ${i} of ${pageCount}`, 14, 202);
  }

  // Save PDF file
  const filename = weekStartStr ? `PM_SHRI_KV_Duty_Roster_${weekStartStr}.pdf` : 'PM_SHRI_KV_Duty_Roster.pdf';
  doc.save(filename);
}

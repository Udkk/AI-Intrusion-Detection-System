import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportReport(result) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("CyberSentinel IDS Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  doc.text(`Total Records: ${result.summary.total_records}`, 14, 42);
  doc.text(`Threats: ${result.summary.total_attacks}`, 14, 50);
  doc.text(`Normal Traffic: ${result.summary.normal_traffic}`, 14, 58);
  doc.text(
    `Average Confidence: ${result.summary.average_confidence}%`,
    14,
    66
  );

  autoTable(doc, {
    startY: 78,
    head: [["Attack", "Count"]],
    body: Object.entries(result.attack_distribution),
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    head: [["Row", "Actual", "Prediction", "Confidence"]],
    body: result.preview.map((r) => [
      r.row,
      r.actual,
      r.prediction,
      `${r.confidence}%`,
    ]),
  });

  doc.save("CyberSentinel_Report.pdf");
}
export function download(file, filename, type = 'text/csv;charset=utf-8;') {
  // BOM az ékezetes karakterekhez (Excel!)
  const blob = new Blob([`\uFEFF${file}`], {
    type,
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function printTable(html, name) {
  const printWindow = window.open('', '_blank');
  if (!printWindow)
    return;

  const doc = printWindow.document;

  doc.head.innerHTML = `
    <title>${name}</title>
    <style>
      @page {
        size: landscape;
      }

      body { font-family: Arial; }
      p { font-size: 12pt; }
      h1 { font-size: 24pt; font-weight: bold; margin-bottom: 16pt; }
      table { width: 100%; border-collapse: collapse; }
      table th { border-bottom: 2pt solid black; padding: 4pt; }
      table td { border-bottom: 1pt solid lightgrey; padding: 4pt; }
    </style>
  `;

  doc.body.innerHTML = `<h1>${name}</h1>${html}`;

  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

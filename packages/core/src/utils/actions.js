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

export function printTable(html, name, createdAt = '') {
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
      h1 { text-transform: capitalize }
      table { width: 100%; border-collapse: collapse; }
      table th { border-bottom: 2pt solid black; padding: 4pt; }
      table td { border-bottom: 1pt solid lightgrey; padding: 4pt; }

      table.explanation {
        width: auto;
        font-size: 8pt;
        margin-top: 24pt;

        td:first-of-type {
          font-weight: 900;
        }
      }
    </style>
  `;

  doc.body.innerHTML = `<h3>${createdAt}</h3><h1>${name}</h1>${html}`;

  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

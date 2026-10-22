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

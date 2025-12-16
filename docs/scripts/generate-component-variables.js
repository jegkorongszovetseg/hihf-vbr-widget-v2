import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const componentsDir = path.resolve(__dirname, '../../packages/shared/assets/css/components');
const outputFile = path.resolve(__dirname, '../styles/component-variables.md');

function extractLayerVariables(cssContent) {
  const match = cssContent.match(/@layer\s+components\.variables\s*\{([\s\S]*?)^\}/m);
  if (match) {
    return match[0];
  }
  return null;
}

function formatComponentName(filename) {
  return filename
    .replace('.css', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateMarkdown() {
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

  let markdown = `---
outline: deep
---

# Komponens CSS Változók

Lehetséges az egyes összetevők egyedi beállítása is.
Minden komponenshez tartozó CSS változók a \`@layer components.variables\` blokkban találhatók.

::: tip A fájlodban ezeket a CSS változókat testreszabhatod

\`\`\`css
* {
  --mvw-avatar-border-color: light-dark(var(--mvw-color-primary-100), var(--mvw-color-primary-700));
}
\`\`\`
:::

`;

  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const variables = extractLayerVariables(content);

    if (variables) {
      const componentName = formatComponentName(file);
      markdown += `## ${componentName}\n\n`;
      markdown += `Fájl: \`${file}\`\n\n`;
      markdown += '```css\n';
      markdown += variables.trim();
      markdown += '\n```\n\n';
    }
  }

  fs.writeFileSync(outputFile, markdown);
  console.log(`Generated: ${outputFile}`);
}

generateMarkdown();

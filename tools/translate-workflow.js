#!/usr/bin/env node

/**
 * Workflow Translation Script
 *
 * Translates YAML and Markdown files in BMM workflows from English to Korean
 * Preserves structure, technical terms, and code blocks
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Translation dictionary for consistent terminology
const TERMINOLOGY = {
  'Agent': '에이전트',
  'Workflow': '워크플로우',
  'Module': '모듈',
  'Template': '템플릿',
  'Checklist': '체크리스트',
  'Epic': '에픽',
  'Story': '스토리',
  'Sprint': '스프린트',
  'PRD': 'PRD',
  'Tech Spec': '기술 사양',
  'Architecture': '아키텍처',
  'Implementation': '구현',
  'Planning': '기획',
  'Analysis': '분석',
  'Solutioning': '솔루션 작업',
  'Product Requirements Document': '제품 요구사항 문서',
  'Technical Specification': '기술 사양서',
};

// Fields to translate in YAML files
const YAML_TRANSLATE_FIELDS = [
  'description',
  'title',
  'role',
  'identity',
  'communication_style',
  'principles',
  'goal',
];

// Fields to preserve (never translate)
const YAML_PRESERVE_FIELDS = [
  'name',
  'trigger',
  'workflow',
  'exec',
  'action',
  'installed_path',
  'config_source',
  'output_folder',
];

/**
 * Check if a string contains Korean characters
 */
function hasKorean(text) {
  return /[가-힣]/.test(text);
}

/**
 * Check if text appears to be a path, variable, or technical identifier
 */
function isTechnicalIdentifier(text) {
  if (!text || typeof text !== 'string') return false;

  // Check for common patterns
  return (
    text.includes('/') ||           // File paths
    text.includes('{') ||           // Variables
    text.includes('_') ||           // Snake case identifiers
    text.match(/^[a-z-]+$/) ||     // Kebab case identifiers
    text.match(/^[A-Z_]+$/) ||     // Constants
    text.includes('.yaml') ||       // File extensions
    text.includes('.md') ||
    text.includes('http')           // URLs
  );
}

/**
 * Simple translation function (placeholder - in real use, call Claude API)
 * For now, returns the text with a marker showing it needs translation
 */
function translateText(text, context = {}) {
  if (!text || typeof text !== 'string') return text;
  if (hasKorean(text)) return text;
  if (isTechnicalIdentifier(text)) return text;

  // Apply terminology dictionary
  let translated = text;
  for (const [en, ko] of Object.entries(TERMINOLOGY)) {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    translated = translated.replace(regex, ko);
  }

  // Mark for manual review if not fully translated
  if (translated === text && text.length > 5) {
    return `[TODO: ${text}]`;
  }

  return translated;
}

/**
 * Translate YAML object recursively
 */
function translateYamlObject(obj, keyPath = []) {
  if (Array.isArray(obj)) {
    return obj.map((item, index) =>
      translateYamlObject(item, [...keyPath, index])
    );
  }

  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKeyPath = [...keyPath, key];

      // Check if this field should be translated
      const shouldTranslate = YAML_TRANSLATE_FIELDS.some(field =>
        key.toLowerCase().includes(field.toLowerCase())
      );

      const shouldPreserve = YAML_PRESERVE_FIELDS.some(field =>
        key.toLowerCase().includes(field.toLowerCase())
      );

      if (shouldPreserve) {
        result[key] = value;
      } else if (shouldTranslate && typeof value === 'string') {
        result[key] = translateText(value, { keyPath: newKeyPath });
      } else {
        result[key] = translateYamlObject(value, newKeyPath);
      }
    }
    return result;
  }

  return obj;
}

/**
 * Translate YAML file
 */
function translateYamlFile(filePath) {
  console.log(`Translating YAML: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf8');

  // Check if already translated
  if (hasKorean(content)) {
    console.log(`  ⏭️  Already contains Korean, skipping`);
    return false;
  }

  try {
    const doc = yaml.load(content);
    const translated = translateYamlObject(doc);

    // Write back with preserved formatting
    const output = yaml.dump(translated, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      quotingType: '"',
    });

    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`  ✅ Translated`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

/**
 * Translate Markdown file
 * Preserves code blocks, links, and technical identifiers
 */
function translateMarkdownFile(filePath) {
  console.log(`Translating Markdown: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already translated
  if (hasKorean(content)) {
    console.log(`  ⏭️  Already contains Korean, skipping`);
    return false;
  }

  // Preserve code blocks
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Preserve inline code
  const inlineCodes = [];
  content = content.replace(/`[^`]+`/g, (match) => {
    inlineCodes.push(match);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // Preserve links
  const links = [];
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    links.push({ text, url });
    return `__LINK_${links.length - 1}__`;
  });

  // Translate remaining text
  const lines = content.split('\n');
  const translatedLines = lines.map(line => {
    // Skip if line is technical identifier
    if (isTechnicalIdentifier(line.trim())) return line;

    // Translate headings
    if (line.startsWith('#')) {
      const match = line.match(/^(#+)\s+(.+)$/);
      if (match) {
        const [, hashes, text] = match;
        return `${hashes} ${translateText(text)}`;
      }
    }

    // Translate list items
    if (line.match(/^\s*[-*]\s+/)) {
      return line.replace(/^(\s*[-*]\s+)(.+)$/, (_, prefix, text) => {
        return `${prefix}${translateText(text)}`;
      });
    }

    // Translate regular text
    return translateText(line);
  });

  content = translatedLines.join('\n');

  // Restore preserved content
  links.forEach(({ text, url }, index) => {
    content = content.replace(
      `__LINK_${index}__`,
      `[${translateText(text)}](${url})`
    );
  });

  inlineCodes.forEach((code, index) => {
    content = content.replace(`__INLINE_CODE_${index}__`, code);
  });

  codeBlocks.forEach((block, index) => {
    content = content.replace(`__CODE_BLOCK_${index}__`, block);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ Translated`);
  return true;
}

/**
 * Process directory recursively
 */
function processDirectory(dirPath, stats = { yaml: 0, md: 0, skipped: 0 }) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath, stats);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.yaml')) {
        const translated = translateYamlFile(fullPath);
        if (translated) stats.yaml++;
        else stats.skipped++;
      } else if (entry.name.endsWith('.md')) {
        const translated = translateMarkdownFile(fullPath);
        if (translated) stats.md++;
        else stats.skipped++;
      }
    }
  }

  return stats;
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node translate-workflow.js <directory>');
    console.log('Example: node translate-workflow.js src/modules/bmm/workflows/2-plan-workflows/prd');
    process.exit(1);
  }

  const targetDir = args[0];

  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Directory not found: ${targetDir}`);
    process.exit(1);
  }

  console.log(`\n🌐 Starting translation of: ${targetDir}\n`);

  const stats = processDirectory(targetDir);

  console.log(`\n📊 Translation Summary:`);
  console.log(`  YAML files translated: ${stats.yaml}`);
  console.log(`  Markdown files translated: ${stats.md}`);
  console.log(`  Files skipped (already translated): ${stats.skipped}`);
  console.log(`\n✨ Translation complete!`);
  console.log(`⚠️  Note: Review [TODO: ...] markers for manual translation\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  translateYamlFile,
  translateMarkdownFile,
  processDirectory,
};

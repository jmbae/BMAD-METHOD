# BMAD-METHOD Korean Translation Mapping (v4.41.0)

This document records all Korean translations from v4.41.0 before upgrading to v6 structure.

## Translation Date

Created: 2025-01-13
Version: v4.41.0 → v6.0.0-alpha.8 upgrade

## Translated Files (20 files)

### Core Documentation (3 files)

1. **README.md** - 전체 한글 번역 (Full Korean translation)
2. **HOW_TO_USE.md** - 전체 한글 번역 (Full Korean translation)
3. **CLAUDE.md** - 전체 한글 번역 (Full Korean translation)

### Workflow Files (6 files)

Located in: `bmad-core/workflows/` → Will migrate to: `.bmad/bmm/workflows/`

4. **brownfield-fullstack.yaml** - 한글 설명 및 지시사항
5. **brownfield-service.yaml** - 한글 설명 및 지시사항
6. **brownfield-ui.yaml** - 한글 설명 및 지시사항
7. **greenfield-fullstack.yaml** - 한글 설명 및 지시사항
8. **greenfield-service.yaml** - 한글 설명 및 지시사항
9. **greenfield-ui.yaml** - 한글 설명 및 지시사항

### Template Files (8 files)

Located in: `bmad-core/templates/` → Will migrate to: `.bmad/bmm/templates/`

10. **story-tmpl.yaml** - 한글 템플릿
11. **qa-gate-tmpl.yaml** - 한글 템플릿
12. **project-brief-tmpl.yaml** - 한글 템플릿
13. **prd-tmpl.yaml** - 한글 템플릿
14. **market-research-tmpl.yaml** - 한글 템플릿
15. **fullstack-architecture-tmpl.yaml** - 한글 템플릿
16. **front-end-spec-tmpl.yaml** - 한글 템플릿
17. **front-end-architecture-tmpl.yaml** - 한글 템플릿

### Task & Tool Files (3 files)

18. **common/tasks/create-doc.md** - 한글 지시사항 포함
19. **tools/installer/bin/bmad.js** - 한글 메시지 포함
20. **tools/installer/lib/installer.js** - 한글 메시지 포함

## V6 Structure Changes

### Major Directory Changes

```
OLD (v4.41.0):                    NEW (v6.0.0):
bmad-core/                        .bmad/
├── agents/                       ├── _cfg/
├── tasks/                        │   ├── manifest.yaml
├── templates/                    │   ├── agent-manifest.csv
├── workflows/                    │   ├── files-manifest.csv
└── core-config.yaml              │   └── workflow-manifest.csv
                                  ├── bmb/ (BMad Builder)
                                  └── bmm/ (BMad Method)
                                      ├── agents/
                                      ├── templates/
                                      ├── workflows/
                                      └── config.yaml
```

## Translation Strategy for V6 Upgrade

1. **Accept all upstream changes** (English versions)
2. **Re-translate files** based on new v6 structure
3. **Update file paths** to match new .bmad/ organization
4. **Add new v6 content** translations as discovered

## Backup Information

- **Backup Branch**: `translation-v4-backup`
- **Original Version**: v4.41.0
- **Commits Behind Upstream**: 253
- **Commits Ahead of Upstream**: 10

## Notes

- All translations are **inline** (not separate .ko files)
- Translation style: Direct replacement of English with Korean
- No i18n framework used
- Translations focused on user-facing content and documentation

## Recovery Instructions

If rollback needed:

```bash
git checkout translation-v4-backup
git checkout -b main-restored
git branch -D main
git branch -m main-restored main
```

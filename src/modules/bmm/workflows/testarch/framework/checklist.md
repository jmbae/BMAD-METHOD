# 테스트 프레임워크 설정 - 검증 체크리스트

이 체크리스트는 프레임워크 워크플로우가 성공적으로 완료되고 모든 산출물이 품질 기준을 충족하는지 확인합니다.

---

## 전제 조건

워크플로우 시작 전:

- [ ] 프로젝트 루트에 유효한 `package.json` 포함
- [ ] 기존 최신 E2E 프레임워크 감지되지 않음 (`playwright.config.*`, `cypress.config.*`)
- [ ] 프로젝트 유형 식별 가능 (React, Vue, Angular, Next.js, Node 등)
- [ ] 번들러 식별 가능 (Vite, Webpack, Rollup, esbuild) 또는 해당 없음
- [ ] 사용자가 디렉토리 및 파일 생성 권한 보유

---

## 프로세스 단계

### 단계 1: 사전 검사

- [ ] package.json 성공적으로 읽기 및 파싱
- [ ] 프로젝트 유형 올바르게 추출
- [ ] 번들러 식별 (또는 백엔드 프로젝트의 경우 N/A로 표시)
- [ ] 프레임워크 충돌 감지되지 않음
- [ ] 아키텍처 문서 위치 확인 (사용 가능한 경우)

### 단계 2: 프레임워크 선택

- [ ] 프레임워크 자동 감지 로직 실행
- [ ] 프레임워크 선택 정당화됨 (Playwright vs Cypress)
- [ ] 프레임워크 선호도 존중됨 (명시적으로 설정된 경우)
- [ ] 사용자에게 프레임워크 선택 및 근거 통지

### 단계 3: 디렉토리 구조

- [ ] `tests/` 루트 디렉토리 생성
- [ ] `tests/e2e/` 디렉토리 생성 (또는 사용자 선호 구조)
- [ ] `tests/support/` 디렉토리 생성 (중요 패턴)
- [ ] `tests/support/fixtures/` 디렉토리 생성
- [ ] `tests/support/fixtures/factories/` 디렉토리 생성
- [ ] `tests/support/helpers/` 디렉토리 생성
- [ ] `tests/support/page-objects/` 디렉토리 생성 (해당하는 경우)
- [ ] 모든 디렉토리가 올바른 권한 보유

**참고**: 테스트 구성은 유연합니다 (e2e/, api/, integration/). **support/** 폴더가 핵심 패턴입니다.

### 단계 4: 구성 파일

- [ ] Framework config file created (`playwright.config.ts` or `cypress.config.ts`)
- [ ] Config file uses TypeScript (if `use_typescript: true`)
- [ ] Timeouts configured correctly (action: 15s, navigation: 30s, test: 60s)
- [ ] Base URL configured with environment variable fallback
- [ ] Trace/screenshot/video set to retain-on-failure
- [ ] Multiple reporters configured (HTML + JUnit + console)
- [ ] Parallel execution enabled
- [ ] CI-specific settings configured (retries, workers)
- [ ] Config file is syntactically valid (no compilation errors)

### Step 5: Environment Configuration

- [ ] `.env.example` created in project root
- [ ] `TEST_ENV` variable defined
- [ ] `BASE_URL` variable defined with default
- [ ] `API_URL` variable defined (if applicable)
- [ ] Authentication variables defined (if applicable)
- [ ] Feature flag variables defined (if applicable)
- [ ] `.nvmrc` created with appropriate Node version

### Step 6: Fixture Architecture

- [ ] `tests/support/fixtures/index.ts` created
- [ ] Base fixture extended from Playwright/Cypress
- [ ] Type definitions for fixtures created
- [ ] mergeTests pattern implemented (if multiple fixtures)
- [ ] Auto-cleanup logic included in fixtures
- [ ] Fixture architecture follows knowledge base patterns

### Step 7: Data Factories

- [ ] At least one factory created (e.g., UserFactory)
- [ ] Factories use @faker-js/faker for realistic data
- [ ] Factories track created entities (for cleanup)
- [ ] Factories implement `cleanup()` method
- [ ] Factories integrate with fixtures
- [ ] Factories follow knowledge base patterns

### Step 8: Sample Tests

- [ ] Example test file created (`tests/e2e/example.spec.ts`)
- [ ] Test uses fixture architecture
- [ ] Test demonstrates data factory usage
- [ ] Test uses proper selector strategy (data-testid)
- [ ] Test follows Given-When-Then structure
- [ ] Test includes proper assertions
- [ ] Network interception demonstrated (if applicable)

### Step 9: Helper Utilities

- [ ] API helper created (if API testing needed)
- [ ] Network helper created (if network mocking needed)
- [ ] Auth helper created (if authentication needed)
- [ ] Helpers follow functional patterns
- [ ] Helpers have proper error handling

### Step 10: Documentation

- [ ] `tests/README.md` created
- [ ] Setup instructions included
- [ ] Running tests section included
- [ ] Architecture overview section included
- [ ] Best practices section included
- [ ] CI integration section included
- [ ] Knowledge base references included
- [ ] Troubleshooting section included

### Step 11: Package.json Updates

- [ ] Minimal test script added to package.json: `test:e2e`
- [ ] Test framework dependency added (if not already present)
- [ ] Type definitions added (if TypeScript)
- [ ] Users can extend with additional scripts as needed

---

## Output Validation

### Configuration Validation

- [ ] Config file loads without errors
- [ ] Config file passes linting (if linter configured)
- [ ] Config file uses correct syntax for chosen framework
- [ ] All paths in config resolve correctly
- [ ] Reporter output directories exist or are created on test run

### Test Execution Validation

- [ ] Sample test runs successfully
- [ ] Test execution produces expected output (pass/fail)
- [ ] Test artifacts generated correctly (traces, screenshots, videos)
- [ ] Test report generated successfully
- [ ] No console errors or warnings during test run

### Directory Structure Validation

- [ ] All required directories exist
- [ ] Directory structure matches framework conventions
- [ ] No duplicate or conflicting directories
- [ ] Directories accessible with correct permissions

### File Integrity Validation

- [ ] All generated files are syntactically correct
- [ ] No placeholder text left in files (e.g., "TODO", "FIXME")
- [ ] All imports resolve correctly
- [ ] No hardcoded credentials or secrets in files
- [ ] All file paths use correct separators for OS

---

## Quality Checks

### Code Quality

- [ ] Generated code follows project coding standards
- [ ] TypeScript types are complete and accurate (no `any` unless necessary)
- [ ] No unused imports or variables
- [ ] Consistent code formatting (matches project style)
- [ ] No linting errors in generated files

### Best Practices Compliance

- [ ] Fixture architecture follows pure function → fixture → mergeTests pattern
- [ ] Data factories implement auto-cleanup
- [ ] Network interception occurs before navigation
- [ ] Selectors use data-testid strategy
- [ ] Artifacts only captured on failure
- [ ] Tests follow Given-When-Then structure
- [ ] No hard-coded waits or sleeps

### Knowledge Base Alignment

- [ ] Fixture pattern matches `fixture-architecture.md`
- [ ] Data factories match `data-factories.md`
- [ ] Network handling matches `network-first.md`
- [ ] Config follows `playwright-config.md` or `test-config.md`
- [ ] Test quality matches `test-quality.md`

### Security Checks

- [ ] No credentials in configuration files
- [ ] .env.example contains placeholders, not real values
- [ ] Sensitive test data handled securely
- [ ] API keys and tokens use environment variables
- [ ] No secrets committed to version control

---

## Integration Points

### Status File Integration

- [ ] `bmm-workflow-status.md` exists
- [ ] Framework initialization logged in Quality & Testing Progress section
- [ ] Status file updated with completion timestamp
- [ ] Status file shows framework: Playwright or Cypress

### Knowledge Base Integration

- [ ] Relevant knowledge fragments identified from tea-index.csv
- [ ] Knowledge fragments successfully loaded
- [ ] Patterns from knowledge base applied correctly
- [ ] Knowledge base references included in documentation

### Workflow Dependencies

- [ ] Can proceed to `ci` workflow after completion
- [ ] Can proceed to `test-design` workflow after completion
- [ ] Can proceed to `atdd` workflow after completion
- [ ] Framework setup compatible with downstream workflows

---

## Completion Criteria

**All of the following must be true:**

- [ ] All prerequisite checks passed
- [ ] All process steps completed without errors
- [ ] All output validations passed
- [ ] All quality checks passed
- [ ] All integration points verified
- [ ] Sample test executes successfully
- [ ] User can run `npm run test:e2e` without errors
- [ ] Documentation is complete and accurate
- [ ] No critical issues or blockers identified

---

## Post-Workflow Actions

**User must complete:**

1. [ ] Copy `.env.example` to `.env`
2. [ ] Fill in environment-specific values in `.env`
3. [ ] Run `npm install` to install test dependencies
4. [ ] Run `npm run test:e2e` to verify setup
5. [ ] Review `tests/README.md` for project-specific guidance

**Recommended next workflows:**

1. [ ] Run `ci` workflow to set up CI/CD pipeline
2. [ ] Run `test-design` workflow to plan test coverage
3. [ ] Run `atdd` workflow when ready to develop stories

---

## Rollback Procedure

If workflow fails and needs to be rolled back:

1. [ ] Delete `tests/` directory
2. [ ] Remove test scripts from package.json
3. [ ] Delete `.env.example` (if created)
4. [ ] Delete `.nvmrc` (if created)
5. [ ] Delete framework config file
6. [ ] Remove test dependencies from package.json (if added)
7. [ ] Run `npm install` to clean up node_modules

---

## Notes

### Common Issues

**Issue**: Config file has TypeScript errors

- **Solution**: Ensure `@playwright/test` or `cypress` types are installed

**Issue**: Sample test fails to run

- **Solution**: Check BASE_URL in .env, ensure app is running

**Issue**: Fixture cleanup not working

- **Solution**: Verify cleanup() is called in fixture teardown

**Issue**: Network interception not working

- **Solution**: Ensure route setup occurs before page.goto()

### Framework-Specific Considerations

**Playwright:**

- Requires Node.js 18+
- Browser binaries auto-installed on first run
- Trace viewer requires running `npx playwright show-trace`

**Cypress:**

- Requires Node.js 18+
- Cypress app opens on first run
- Component testing requires additional setup

### Version Compatibility

- [ ] Node.js version matches .nvmrc
- [ ] Framework version compatible with Node.js version
- [ ] TypeScript version compatible with framework
- [ ] All peer dependencies satisfied

---

**Checklist Complete**: Sign off when all items checked and validated.

**Completed by:** {name}
**Date:** {date}
**Framework:** { Playwright / Cypress or something else}
**Notes:** {notes}

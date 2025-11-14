# BMAD-METHOD v6 한글 번역 진행 상황

**프로젝트**: BMAD-METHOD v4.41.0 → v6.0.0-alpha.8 업그레이드 및 한글화
**시작일**: 2025-01-13
**최종 업데이트**: 2025-01-13

## 📊 전체 진행 현황

### 완료된 작업

- **총 번역 파일**: 11개
- **커밋 수**: 4개
- **진행률**: 3% (11/382 파일)

### 파일별 상태

| 카테고리       | 완료   | 전체    | 진행률 |
| -------------- | ------ | ------- | ------ |
| 핵심 문서      | 1      | 1       | 100%   |
| Core 에이전트  | 1      | 1       | 100%   |
| BMM 에이전트   | 8      | 8       | 100%   |
| BMM 워크플로우 | 0      | 207     | 0%     |
| BMB 모듈       | 0      | 58      | 0%     |
| CIS 모듈       | 0      | 26      | 0%     |
| BMGD 모듈      | 0      | 52      | 0%     |
| 문서           | 0      | 31      | 0%     |
| **합계**       | **11** | **382** | **3%** |

---

## ✅ 완료된 번역 (11개 파일)

### 1. 핵심 문서 (1개)

- ✅ `/README.md` - 프로젝트 메인 문서

### 2. Core 모듈 (1개)

- ✅ `/src/core/agents/bmad-master.agent.yaml` - BMad Master 에이전트

### 3. BMM 모듈 에이전트 (8개)

- ✅ `/src/modules/bmm/agents/analyst.agent.yaml` - Mary (비즈니스 분석가)
- ✅ `/src/modules/bmm/agents/architect.agent.yaml` - Winston (아키텍트)
- ✅ `/src/modules/bmm/agents/dev.agent.yaml` - Amelia (개발자 에이전트)
- ✅ `/src/modules/bmm/agents/pm.agent.yaml` - John (제품 관리자)
- ✅ `/src/modules/bmm/agents/sm.agent.yaml` - Bob (스크럼 마스터)
- ✅ `/src/modules/bmm/agents/tea.agent.yaml` - Murat (마스터 테스트 아키텍트)
- ✅ `/src/modules/bmm/agents/tech-writer.agent.yaml` - Paige (테크니컬 라이터)
- ✅ `/src/modules/bmm/agents/ux-designer.agent.yaml` - Sally (UX 디자이너)

### 4. 제거된 v4 파일 (2개)

- ✅ `HOW_TO_USE.md` - v6에서 모듈별 문서로 분산됨
- ✅ `claude.md` - v6에서 제거됨 (소문자 버전)

---

## 📋 우선순위별 번역 계획

### Priority 1: 핵심 사용자 경험 (HIGH) - 34개 파일

**예상 시간**: 8-10시간

#### BMM Analysis Workflows (16 files)

- `1-analysis/brainstorm-project/` (4 files: workflow.yaml, instructions.md, template.md, README.md)
- `1-analysis/domain-research/` (4 files: workflow.yaml, instructions.md, template.md, checklist.md)
- `1-analysis/product-brief/` (4 files: workflow.yaml, instructions.md, template.md, checklist.md)
- `1-analysis/research/` (4 files: workflow.yaml, instructions.md, template.md, checklist.md)

#### BMM Planning Workflows (18 files)

- `2-plan-workflows/prd/` (5 files: workflow.yaml, instructions.md, prd-template.md, epics-template.md, checklist.md)
- `2-plan-workflows/prd/create-epics-and-stories/` (3 files: workflow.yaml, instructions.md, template.md)
- `2-plan-workflows/tech-spec/` (5 files: workflow.yaml, instructions.md, template-quick.md, template-full.md, checklist.md)
- `2-plan-workflows/create-ux-design/` (5 files: workflow.yaml, instructions.md, template.md, checklist.md, README.md)

### Priority 2: 구현 워크플로우 (HIGH) - 31개 파일

**예상 시간**: 6-8시간

#### BMM Implementation Phase (31 files)

- `4-implementation/create-story/` (3 files)
- `4-implementation/dev-story/` (3 files)
- `4-implementation/sprint-planning/` (3 files)
- `4-implementation/story-ready/` (2 files)
- `4-implementation/story-done/` (2 files)
- `4-implementation/code-review/` (3 files)
- `4-implementation/retrospective/` (3 files)
- `4-implementation/correct-course/` (2 files)
- `4-implementation/story-context/` (3 files)
- `4-implementation/epic-tech-context/` (3 files)
- Others (4 files)

### Priority 3: 솔루션 & 테스트 (MEDIUM) - 41개 파일

**예상 시간**: 8-10시간

#### Solutioning Phase (10 files)

- `3-solutioning/architecture/` (6 files: workflow, instructions, templates, checklist, patterns)
- `3-solutioning/solutioning-gate-check/` (4 files)

#### Test Architecture (31 files)

- `testarch/framework/` (4 files)
- `testarch/trace/` (4 files)
- `testarch/ci/` (5 files)
- `testarch/atdd/` (4 files)
- `testarch/automate/` (3 files)
- `testarch/test-design/` (4 files)
- `testarch/test-review/` (3 files)
- `testarch/nfr-assess/` (4 files)

### Priority 4: 전문 모듈 (MEDIUM) - 136개 파일

**예상 시간**: 20-25시간

#### CIS Module (26 files)

- 5 agents: brainstorming-coach, creative-problem-solver, design-thinking-coach, innovation-strategist, storyteller
- 4 workflows: design-thinking, innovation-strategy, problem-solving, storytelling
- Supporting docs and team configs

#### BMGD Module (52 files)

- 4 agents: game-architect, game-designer, game-dev, game-scrum-master
- Preproduction workflows (2)
- Design workflows + 20 game type guides
- Technical workflows (1)

#### BMB Module (58 files)

- 1 agent: bmad-builder
- 10 core workflows: audit, convert-legacy, create-agent, create-module, create-workflow, edit-\*, module-brief, redoc
- Supporting guides and context files

### Priority 5: 문서 & 부가 자료 (LOW) - 140개 파일

**예상 시간**: 15-20시간

#### Documentation (31 files)

- Root docs: CONTRIBUTING.md, CHANGELOG.md, v6-open-items.md
- User guides: agent-customization-guide.md, web-bundles guides
- IDE guides (12 files)
- Installer/bundler docs (8 files)

#### BMM Documentation & Status (remaining ~90 files)

- document-project/ workflows
- techdoc/ workflows
- workflow-status/ system
- Additional templates and checklists

#### Configuration Files (~19 files)

- install-config.yaml files
- Team configuration files
- Manifest files

---

## 🔧 번역 가이드라인

### YAML 파일 번역 규칙

1. **번역 대상**:
   - `title`: 에이전트/워크플로우 제목
   - `description`: 설명 텍스트
   - `persona.role`: 역할
   - `persona.identity`: 정체성
   - `persona.communication_style`: 커뮤니케이션 스타일
   - `persona.principles`: 원칙
   - `critical_actions`: 핵심 작업 (사용자 대면 텍스트)
   - `menu[].description`: 메뉴 설명

2. **번역 제외**:
   - YAML 키 이름
   - `trigger`: 명령어 트리거
   - `workflow`: 파일 경로
   - `exec`: 실행 경로
   - 변수명 (예: `{bmad_folder}`, `{user_name}`)
   - 기술 식별자

### Markdown 파일 번역 규칙

1. **번역 대상**:
   - 모든 헤딩 (#, ##, ###)
   - 본문 텍스트
   - 리스트 항목
   - 표 내용
   - 인용문
   - 이미지 alt 텍스트

2. **번역 제외**:
   - 코드 블록 (```로 감싸진 부분)
   - 파일 경로
   - URL 링크
   - 명령어 (예: `npm run build`)
   - 변수명과 기술 식별자

### 용어 일관성

| English        | Korean      | 비고                          |
| -------------- | ----------- | ----------------------------- |
| Agent          | 에이전트    |                               |
| Workflow       | 워크플로우  |                               |
| Module         | 모듈        |                               |
| Template       | 템플릿      |                               |
| Checklist      | 체크리스트  |                               |
| Epic           | 에픽        |                               |
| Story          | 스토리      |                               |
| Sprint         | 스프린트    |                               |
| PRD            | PRD         | Product Requirements Document |
| Tech Spec      | 기술 사양   |                               |
| Architecture   | 아키텍처    |                               |
| Implementation | 구현        |                               |
| Planning       | 기획        |                               |
| Analysis       | 분석        |                               |
| Solutioning    | 솔루션 작업 |                               |

---

## 📈 예상 일정

### 전체 번역 완료 시나리오

| 단계          | 기간      | 파일 수 | 누적 완료율 |
| ------------- | --------- | ------- | ----------- |
| Week 1 (완료) | -         | 11      | 3%          |
| Week 2-3      | 8-10시간  | +34     | 12%         |
| Week 4        | 6-8시간   | +31     | 20%         |
| Week 5        | 8-10시간  | +41     | 31%         |
| Week 6-8      | 20-25시간 | +136    | 67%         |
| Week 9-11     | 15-20시간 | +140    | 100%        |

**총 예상 시간**: 57-73시간 (약 7-9주, 주당 8시간 작업 기준)

---

## 🎯 권장 접근 방식

### 단계별 진행 (추천)

현재까지 핵심 에이전트 번역이 완료되어 **기본 사용은 가능한 상태**입니다.

**단계 1**: Priority 1 (Analysis & Planning) 완료

- 사용자가 가장 자주 접하는 워크플로우
- 프로젝트 시작 단계에서 필수

**단계 2**: Priority 2 (Implementation) 완료

- 개발 사이클의 핵심 워크플로우
- 에이전트와 함께 가장 많이 사용

**단계 3**: Priority 3 (Solutioning & Testing) 완료

- 아키텍처 및 품질 보증
- 고급 사용자용

**단계 4**: Priority 4-5 (전문 모듈 & 문서) 선택적 진행

- 특정 도메인 사용자를 위한 모듈
- 문서는 필요에 따라 점진적으로

---

## 🔄 백업 및 롤백

### 백업 정보

- **백업 브랜치**: `translation-v4-backup`
- **백업 포함 내용**: v4 한글 번역 20개 파일
- **매핑 문서**: `TRANSLATION_MAPPING_V4.md`

### 롤백 방법

```bash
# v4로 완전히 돌아가기
git checkout translation-v4-backup
git checkout -b main-restored
git branch -D main
git branch -m main-restored main
```

---

## 📝 커밋 히스토리

1. **012515b2**: Translation mapping file 생성
2. **a38856a0**: Upstream v6 병합 (253 commits)
3. **8b09b8ff**: README.md 한글 번역
4. **fc684031**: v4 문서 파일 제거
5. **6dce0000**: Week 1 Foundation 에이전트 번역 (9 files)

---

## 🤝 기여 가이드

### 번역 참여 방법

1. 이 문서의 "Priority" 섹션에서 번역할 파일 선택
2. 위의 "번역 가이드라인" 준수
3. 파일별로 작은 커밋 생성
4. 커밋 메시지에 번역한 파일 목록 포함

### 품질 검증

- [ ] YAML 구조 유지 확인
- [ ] 기술 용어 일관성 확인
- [ ] 링크 및 경로 무결성 확인
- [ ] 마크다운 렌더링 확인
- [ ] 에이전트 페르소나 톤 유지 확인

---

## 📞 문의 및 이슈

번역 관련 문의사항은 다음을 통해:

- GitHub Issues: [BMAD-METHOD Issues](https://github.com/bmad-code-org/BMAD-METHOD/issues)
- Discord: [BMadCode Community](https://discord.gg/gk8jAdXWmj)

---

**마지막 업데이트**: 2025-01-13
**문서 버전**: 1.0
**작성자**: Claude Code AI

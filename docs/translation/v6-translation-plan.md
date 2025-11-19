# BMAD-METHOD v6 한국어 번역 계획서

**작성일**: 2025-01-14
**버전**: v6 (src/modules 기반 새 구조)
**목적**: v6 모듈 시스템의 체계적인 한국어 번역

---

## 📋 v6 구조 개요

### v6 vs v4 차이점

- **v4**: `.bmad-core/` 기반, 단일 파일 에이전트
- **v6**: `src/modules/` 기반, YAML 정의 + 워크플로우 시스템
- **파일 수**: v4 58개 → v6 343개 파일
- **구조**: 모듈화된 워크플로우 중심 아키텍처

### v6 주요 모듈

1. **bmm** (BMAD Method Module) - 핵심 방법론
2. **bmb** (BMAD Builder) - 빌더 도구
3. **bmgd** (게임 개발 모듈)
4. **cis** (기타 모듈)

---

## 🎯 v6 번역 우선순위

### Priority 1: 핵심 모듈 (bmm)

**중요도**: 최우선
**파일 수**: ~150개

#### 1.1 에이전트 정의 (8개)

**위치**: `src/modules/bmm/agents/`

| 파일                   | 상태         | 예상 작업      |
| ---------------------- | ------------ | -------------- |
| analyst.agent.yaml     | 🟡 부분 번역 | 메뉴 설명 번역 |
| pm.agent.yaml          | 🟡 부분 번역 | 메뉴 설명 번역 |
| architect.agent.yaml   | 🟡 부분 번역 | 메뉴 설명 번역 |
| ux-designer.agent.yaml | 🔲 미확인    | 전체 확인 필요 |
| dev.agent.yaml         | 🔲 미확인    | 전체 확인 필요 |
| sm.agent.yaml          | 🔲 미확인    | 전체 확인 필요 |
| tea.agent.yaml         | 🔲 미확인    | 전체 확인 필요 |
| tech-writer.agent.yaml | 🔲 미확인    | 전체 확인 필요 |

#### 1.2 워크플로우 파일 (31개)

**위치**: `src/modules/bmm/workflows/`

**카테고리별 분류**:

- **1-analysis**: 분석 워크플로우 (4-5개)
- **2-plan-workflows**: 계획 워크플로우 (10-12개)
  - PRD 생성
  - UX 디자인
  - Tech Spec
  - 에픽/스토리 생성
- **3-solutioning**: 솔루션 설계 (5-7개)
  - 아키텍처 생성
  - 솔루션 게이트 체크
- **4-implementation**: 구현 워크플로우 (5-8개)
- **workflow-status**: 상태 관리 (2-3개)
- **testarch**: 테스트 아키텍처 (5-6개)

각 워크플로우는 다음 파일 포함:

- workflow.yaml - 워크플로우 정의
- instructions.md - 실행 지침
- checklist.md - 검증 체크리스트
- template.md - 문서 템플릿 (일부)
- README.md - 설명 (일부)

---

### Priority 2: 빌더 모듈 (bmb)

**중요도**: 높음
**파일 수**: ~50개

#### 2.1 BMad Builder 에이전트

- bmad-builder.agent.yaml

#### 2.2 BMad Builder 워크플로우 (~10개)

- create-module
- create-workflow
- create-agent
- edit-module
- edit-workflow
- edit-agent
- convert-legacy
- audit-workflow
- module-brief
- redoc

---

### Priority 3: 확장 모듈

**중요도**: 중간
**파일 수**: ~140개

#### 3.1 게임 개발 모듈 (bmgd)

- 게임 개발 특화 에이전트 및 워크플로우

#### 3.2 기타 모듈 (cis 등)

- 추가 도메인 특화 모듈

---

### Priority 4: 핵심 시스템

**중요도**: 높음
**파일 수**: ~20개

#### 4.1 Core 워크플로우

- party-mode
- brainstorming
- 기타 공통 워크플로우

#### 4.2 Core 태스크

- adv-elicit.xml
- 기타 공통 태스크

---

## 📊 v6 번역 작업량 추정

### 전체 통계

| 카테고리       | 파일 수  | 예상 라인 수 | 우선순위 |
| -------------- | -------- | ------------ | -------- |
| bmm 에이전트   | 8        | ~400         | 최우선   |
| bmm 워크플로우 | 31       | ~4,000       | 최우선   |
| bmm 지원 파일  | ~110     | ~3,500       | 높음     |
| bmb 전체       | ~50      | ~2,000       | 높음     |
| bmgd 전체      | ~70      | ~2,500       | 중간     |
| Core 시스템    | ~20      | ~800         | 높음     |
| 기타 모듈      | ~54      | ~1,800       | 낮음     |
| **합계**       | **~343** | **~15,000**  | -        |

### 예상 일정

- **bmm 모듈**: 7-10일
- **bmb 모듈**: 3-4일
- **Core 시스템**: 2일
- **확장 모듈**: 5-7일 (선택적)
- **총 예상 기간**: 17-23일 (확장 모듈 제외 시 12-16일)

---

## 🔄 v6 번역 전략

### 단계별 접근

#### Phase 1: bmm 에이전트 (1-2일)

1. 모든 에이전트 YAML 파일 검토
2. 메뉴 설명 번역
3. 페르소나 설명 번역 (필요시)

#### Phase 2: bmm 핵심 워크플로우 (5-7일)

1. **1-analysis** 워크플로우 (1일)
2. **2-plan-workflows** 워크플로우 (2-3일)
3. **3-solutioning** 워크플로우 (1-2일)
4. **4-implementation** 워크플로우 (1-2일)

각 워크플로우별 번역:

- workflow.yaml의 설명 필드
- instructions.md 전체
- checklist.md 전체
- template.md 전체 (있는 경우)

#### Phase 3: bmb 빌더 모듈 (3-4일)

1. bmad-builder 에이전트
2. 빌더 워크플로우 10개

#### Phase 4: Core 시스템 (2일)

1. party-mode 워크플로우
2. brainstorming 워크플로우
3. 공통 태스크

#### Phase 5: 확장 모듈 (선택적, 5-7일)

1. bmgd 게임 개발 모듈
2. 기타 특화 모듈

---

## 📝 v6 번역 가이드라인

### YAML 파일 번역

**번역 대상**:

- `title`: 제목
- `description`: 설명
- `persona.*`: 페르소나 관련 필드
- `menu[].description`: 메뉴 항목 설명
- `workflow.name`: 워크플로우 이름
- `workflow.description`: 워크플로우 설명

**번역 제외**:

- `id`, `trigger`, `workflow`, `exec` 등 경로 및 식별자
- `metadata.name`: 에이전트 이름 (Mary, John 등)
- `metadata.module`: 모듈 ID

### 마크다운 파일 번역

**번역 대상**:

- 모든 제목 (# Heading)
- 모든 본문 텍스트
- 리스트 항목
- 표 내용
- LLM 지침 블록 `[[LLM: ...]]`

**번역 제외**:

- 코드 블록 (주석 제외)
- 파일 경로
- 변수명

---

## 🎯 v6 번역 Phase별 계획

### Phase 1: bmm 에이전트 (우선순위 1)

**목표**: 모든 bmm 에이전트 100% 한글화
**예상 기간**: 1-2일
**파일**: 8개

### Phase 2: bmm 워크플로우 - 분석 및 계획 (우선순위 1)

**목표**: 1-analysis + 2-plan-workflows 완성
**예상 기간**: 3-4일
**파일**: ~15개 워크플로우 × 4개 파일 = ~60개

### Phase 3: bmm 워크플로우 - 솔루션 및 구현 (우선순위 1)

**목표**: 3-solutioning + 4-implementation 완성
**예상 기간**: 2-3일
**파일**: ~12개 워크플로우 × 4개 파일 = ~48개

### Phase 4: bmb 빌더 모듈 (우선순위 2)

**목표**: BMAD 빌더 시스템 한글화
**예상 기간**: 3-4일
**파일**: ~50개

### Phase 5: Core 및 기타 (우선순위 3)

**목표**: 공통 시스템 및 확장 모듈
**예상 기간**: 4-6일 (선택적)
**파일**: ~90개

---

## 📌 v6 번역 체크포인트

### Week 1 (Phase 1-2)

- [ ] bmm 에이전트 8개 완료
- [ ] 분석 워크플로우 완료
- [ ] 계획 워크플로우 50% 완료

### Week 2 (Phase 2-3)

- [ ] 계획 워크플로우 100% 완료
- [ ] 솔루션 워크플로우 완료
- [ ] 구현 워크플로우 완료

### Week 3 (Phase 4-5)

- [ ] bmb 빌더 모듈 완료
- [ ] Core 시스템 완료
- [ ] 확장 모듈 (선택적)

---

## 🔍 v6 번역 시작 전 조사 사항

### 확인 필요

1. v6의 모든 에이전트 번역 상태
2. 주요 워크플로우 번역 상태
3. 템플릿 파일 번역 상태
4. 기존 v4 번역 재사용 가능 여부

### 샘플 검토

다음 파일들을 샘플로 먼저 검토:

- [ ] src/modules/bmm/agents/\*.agent.yaml (8개)
- [ ] src/modules/bmm/workflows/2-plan-workflows/prd/\*.md
- [ ] src/modules/bmm/workflows/3-solutioning/architecture/\*.md
- [ ] src/modules/bmb/workflows/create-workflow/\*.md

---

## 💡 v6 번역 최적화 전략

### 재사용 전략

1. **v4 번역 활용**: 유사한 개념/용어는 v4 번역 참조
2. **일관성 유지**: v4와 동일한 용어 체계 사용
3. **모듈별 병렬**: 독립적인 모듈은 병렬 번역 가능

### 효율화 방안

1. **템플릿 우선**: 자주 사용되는 템플릿 먼저 번역
2. **지침 집중**: instructions.md를 우선적으로 번역
3. **체크리스트 후순위**: 검증 도구는 나중에 번역

---

## 📊 예상 작업량

### 최소 범위 (핵심만)

- bmm 에이전트 + 주요 워크플로우
- 예상 파일: ~100개
- 예상 기간: 7-10일

### 표준 범위 (권장)

- bmm 전체 + bmb 전체 + Core
- 예상 파일: ~200개
- 예상 기간: 12-16일

### 완전 범위 (모든 모듈)

- 모든 모듈 포함
- 예상 파일: ~343개
- 예상 기간: 20-25일

---

## 🚀 다음 단계

### 즉시 수행

1. v6 에이전트 파일 전체 검토
2. 주요 워크플로우 샘플 검토
3. 번역 상태 상세 파악

### 번역 시작 준비

1. v6 용어 사전 준비
2. v4 용어와 매핑
3. 번역 도구 및 자동화 검토

---

**문서 버전**: 1.0
**상태**: 계획 수립 완료
**다음**: 상세 조사 및 Phase 1 시작

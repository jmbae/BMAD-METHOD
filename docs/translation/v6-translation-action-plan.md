# BMAD-METHOD v6 번역 실행 계획

**작성일**: 2025-01-14
**현황**: 핵심 파일 대부분 번역 완료, 일부 영문 워크플로우 발견
**목표**: v6 100% 한글화 완성

---

## 📊 현재 상태 요약

### ✅ 완료 확인된 영역

1. **bmm 에이전트 (8개)**: 100% 번역 완료
2. **주요 워크플로우**: 약 50% 한글 확인
3. **번역 품질**: v4 수준으로 우수

### 🔴 번역 필요 영역 (확인됨)

**영문 제목 워크플로우**: 15개 발견

#### 계획 워크플로우 (1개)

- create-ux-design/instructions.md (일부 한글)

#### 테스트 아키텍처 워크플로우 (8개)

1. trace/instructions.md
2. framework/instructions.md
3. ci/instructions.md
4. test-review/instructions.md
5. automate/instructions.md
6. atdd/instructions.md
7. nfr-assess/instructions.md
8. test-design/instructions.md

#### 구현 워크플로우 (4개)

1. code-review/instructions.md
2. retrospective/instructions.md
3. sprint-planning/instructions.md
4. story-done/instructions.md

#### 기타 (2개)

- 추가 확인 필요

### ⚠️ 미확인 영역

1. **Checklist 파일** (~30개): 번역 상태 미확인
2. **Template 파일** (~20개): 번역 상태 미확인
3. **README 파일** (~15개): 번역 상태 미확인
4. **Workflow.yaml** (31개): description 필드 번역 상태 미확인

---

## 🎯 v6 번역 실행 계획

### Phase A: 영문 워크플로우 Instructions 번역 (우선)

**대상**: 15개 instructions.md 파일
**예상 작업량**: 각 100-300줄, 총 ~2,000줄
**예상 기간**: 1-2일

#### A-1: 테스트 아키텍처 워크플로우 (8개)

높은 우선순위 - QA 시스템 핵심

#### A-2: 구현 워크플로우 (4개)

높은 우선순위 - 개발 프로세스 핵심

#### A-3: 기타 워크플로우 (3개)

중간 우선순위

---

### Phase B: Checklist 파일 검증 및 번역

**대상**: ~30개 checklist.md 파일
**방법**: 샘플 조사 → 전수 번역
**예상 기간**: 1-2일

**접근법**:

1. 5개 샘플 파일 검토
2. 번역 패턴 파악
3. 필요시 전체 번역

---

### Phase C: Template 파일 검증 및 번역

**대상**: ~20개 template.md 파일
**방법**: 샘플 조사 → 필요시 번역
**예상 기간**: 1일

---

### Phase D: Workflow YAML description 번역

**대상**: 31개 workflow.yaml의 description 필드
**방법**: 일괄 검토 및 번역
**예상 기간**: 0.5일

---

### Phase E: README 파일 번역 (선택)

**대상**: ~15개 README.md
**우선순위**: 낮음 (참조 문서)
**예상 기간**: 0.5-1일

---

## 📅 실행 일정

### Week 1

- **Day 1**: Phase A 완료 (Instructions 번역)
- **Day 2**: Phase B 시작 (Checklist 검증)
- **Day 3**: Phase B 완료 + Phase C (Template 검증)

### Week 2

- **Day 4**: Phase D (YAML description)
- **Day 5**: Phase E (선택적, README)
- **총 예상**: 3-5일

---

## 🚀 즉시 실행 가능한 작업

### Task 1: 영문 Instructions 번역 (15개)

**우선순위**: 최우선
**예상 시간**: 3-4시간 (병렬 작업)

**방법**:

1. 15개 파일 병렬로 읽기
2. 영문 제목 및 본문 식별
3. 일괄 번역 적용
4. 검증 및 커밋

### Task 2: Checklist 샘플 조사 (5개)

**우선순위**: 높음
**예상 시간**: 30분

**샘플 대상**:

- prd/checklist.md
- tech-spec/checklist.md
- architecture/checklist.md
- create-story/checklist.md
- code-review/checklist.md

### Task 3: 전체 상태 보고서 작성

**우선순위**: 높음
**예상 시간**: 30분

---

## 💡 효율화 전략

### 병렬 처리

1. **Instructions 번역**: 3-5개씩 그룹화하여 병렬 번역
2. **Checklist 검증**: 카테고리별 병렬 검토
3. **YAML 수정**: 일괄 검색 및 번역

### 자동화 가능성

1. **제목 추출**: 스크립트로 영문 제목 자동 추출
2. **번역 적용**: 패턴 기반 일괄 번역
3. **검증**: 번역 후 자동 검증

---

## 📋 실행 체크리스트

### Phase A: Instructions 번역

- [ ] testarch 워크플로우 8개
- [ ] implementation 워크플로우 4개
- [ ] 기타 워크플로우 3개

### Phase B: Checklist 파일

- [ ] 샘플 5개 조사
- [ ] 번역 상태 파악
- [ ] 필요시 전체 번역

### Phase C: Template 파일

- [ ] 샘플 조사
- [ ] 번역 상태 파악
- [ ] 필요시 번역

### Phase D: YAML Description

- [ ] workflow.yaml 31개 확인
- [ ] description 필드 번역

### Phase E: README (선택)

- [ ] 필요성 평가
- [ ] 필요시 번역

---

## 🎯 최종 목표

### 완료 기준

- [ ] 모든 instructions.md 100% 한글
- [ ] 모든 checklist.md 검증 완료
- [ ] 모든 template.md 검증 완료
- [ ] 모든 workflow.yaml description 한글
- [ ] v6 전체 번역 상태 문서화

### 성공 지표

- **번역 완료율**: 100% (핵심 파일)
- **품질 점수**: v4 수준 유지
- **일관성**: v4와 용어 통일

---

**문서 버전**: 1.0
**상태**: 실행 계획 수립 완료
**다음**: Phase A 시작 (영문 Instructions 번역)

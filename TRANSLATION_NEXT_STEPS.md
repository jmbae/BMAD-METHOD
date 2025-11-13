# BMAD-METHOD v6 한글 번역 다음 단계

**현재 상태**: Week 1 Foundation 완료 (3% 진행)
**마지막 업데이트**: 2025-01-13

## 🎯 즉시 실행 가능한 다음 단계

### Phase 2: 핵심 워크플로우 번역 (우선순위 HIGH)

다음 번역을 진행하려면 아래 명령을 Claude Code에 요청하세요:

```
Priority 2로 계속 진행: BMM Analysis & Planning 워크플로우 34개 파일 번역해줘
```

#### 번역할 파일 목록 (34 files)

**1-Analysis Workflows (16 files):**

1. `src/modules/bmm/workflows/1-analysis/brainstorm-project/`
   - workflow.yaml
   - instructions.md
   - template.md
   - README.md

2. `src/modules/bmm/workflows/1-analysis/domain-research/`
   - workflow.yaml
   - instructions.md
   - template.md
   - checklist.md

3. `src/modules/bmm/workflows/1-analysis/product-brief/`
   - workflow.yaml
   - instructions.md
   - template.md
   - checklist.md

4. `src/modules/bmm/workflows/1-analysis/research/`
   - workflow.yaml
   - instructions.md
   - template.md
   - checklist.md

**2-Planning Workflows (18 files):**

5. `src/modules/bmm/workflows/2-plan-workflows/prd/`
   - workflow.yaml
   - instructions.md
   - prd-template.md
   - epics-template.md
   - checklist.md

6. `src/modules/bmm/workflows/2-plan-workflows/prd/create-epics-and-stories/`
   - workflow.yaml
   - instructions.md
   - template.md

7. `src/modules/bmm/workflows/2-plan-workflows/tech-spec/`
   - workflow.yaml
   - instructions.md
   - template-quick.md
   - template-full.md
   - checklist.md

8. `src/modules/bmm/workflows/2-plan-workflows/create-ux-design/`
   - workflow.yaml
   - instructions.md
   - template.md
   - checklist.md
   - README.md

---

## 🚀 빠른 진행 옵션

### 옵션 A: 전체 자동화 번역
전체 372개 파일을 한 번에 번역하려면:

```
나머지 모든 파일 (372개) 자동 번역 스크립트 만들어서 실행해줘.
워크플로우 instructions, templates, checklists 우선으로 번역하고,
각 모듈별로 커밋 만들어줘.
```

**장점**: 빠른 완료 (몇 시간)
**단점**: 품질 검증에 시간 필요

### 옵션 B: 모듈별 순차 진행
모듈 하나씩 완성도 높게 번역:

```
CIS 모듈 전체 (26개 파일) 번역해줘 - 에이전트, 워크플로우, 문서 모두
```

**장점**: 모듈 단위 완성도
**단점**: 전체 완료까지 시간 소요

### 옵션 C: 점진적 우선순위 기반
필요한 것부터 하나씩:

```
workflow-init, prd, architecture, dev-story 워크플로우만 먼저 번역해줘
```

**장점**: 실용적, 즉시 사용 가능
**단점**: 일부 기능은 영어로 남음

---

## 📊 모듈별 번역 명령어

### BMM 모듈 완성
```
BMM 모듈 전체 워크플로우 번역해줘:
- Analysis workflows (16 files)
- Planning workflows (18 files)
- Solutioning workflows (10 files)
- Implementation workflows (31 files)
- Test Architecture workflows (31 files)
- Documentation workflows (remaining files)
```

### CIS 모듈 완성
```
CIS (Creative Intelligence Suite) 모듈 전체 번역해줘:
- 5개 에이전트
- 4개 워크플로우
- 문서 및 템플릿
```

### BMGD 모듈 완성
```
BMGD (Game Development) 모듈 전체 번역해줘:
- 4개 게임 에이전트
- 게임 워크플로우
- 20개 게임 장르 가이드
```

### BMB 모듈 완성
```
BMB (BMad Builder) 모듈 전체 번역해줘:
- bmad-builder 에이전트
- 10개 메타 개발 워크플로우
- 가이드 문서
```

---

## 💡 권장 진행 순서

**즉시 사용 가능하도록 만들기 (40% 완성도 목표):**

1. ✅ Foundation 에이전트 (완료)
2. ⏳ **다음**: BMM Analysis & Planning (34 files) → 15% 완성
3. ⏳ BMM Implementation (31 files) → 23% 완성
4. ⏳ BMM Solutioning (10 files) → 26% 완성
5. ⏳ 핵심 문서 (10 files) → 29% 완성
6. ⏳ CIS 모듈 (26 files) → 36% 완성
7. ⏳ 나머지는 선택적/점진적

**이 순서로 진행하면 핵심 기능 사용에 필요한 모든 파일이 한글화됩니다.**

---

## 🔍 번역 품질 체크리스트

각 번역 완료 후 확인:
- [ ] YAML 파일이 유효한가? (`npm run validate:schemas`)
- [ ] 기술 용어가 일관되게 번역되었는가?
- [ ] 에이전트 페르소나가 자연스러운가?
- [ ] 링크가 깨지지 않았는가?
- [ ] 마크다운 렌더링이 정상인가?
- [ ] 코드 블록이 보존되었는가?
- [ ] 명령어 트리거가 변경되지 않았는가?

---

## 📦 자동화 스크립트 (선택사항)

대량 번역을 위한 자동화가 필요하다면:

```
번역 자동화 스크립트 만들어줘:
1. 모든 .agent.yaml 파일 찾기
2. 번역 대상 필드만 추출
3. Claude API로 번역
4. YAML 구조 검증
5. 파일 업데이트
6. 모듈별로 커밋 생성
```

---

**다음 번역 시작**: 위의 "즉시 실행 가능한 다음 단계" 명령 중 하나를 Claude Code에 요청하세요.

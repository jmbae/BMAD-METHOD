# 통합 에픽 및 스토리 생성

<workflow>

<critical>모든 퀵 플로우 프로젝트에 대해 에픽 + 스토리를 생성합니다</critical>
<critical>항상 생성: epics.md + 스토리 파일들 ({{story_count}}에 따라 1-5개 스토리)</critical>
<critical>tech-spec.md 완료 후 실행됩니다</critical>
<critical>스토리 형식은 story-context 및 dev-story 워크플로우와의 호환성을 위해 create-story 템플릿과 일치해야 합니다</critical>

<step n="1" goal="기술 사양 로드 및 구현 컨텍스트 추출">

<action>완료된 tech-spec.md 파일을 {default_output_file}에서 읽기</action>
<action>{workflow-status}에서 bmm-workflow-status.yaml 로드 (존재하는 경우)</action>
<action>워크플로우 변수에서 story_count 가져오기 (1-5)</action>
<action>{sprint_artifacts} 디렉토리가 존재하는지 확인</action>

<action>tech-spec 구조에서 추출:

**"변경 사항" 섹션에서:**

- 문제 정의 및 솔루션 개요
- 범위 (내/외)

**"구현 세부사항" 섹션에서:**

- 소스 트리 변경사항
- 기술적 접근 방식
- 통합 지점

**"구현 가이드" 섹션에서:**

- 구현 단계
- 테스트 전략
- 수락 기준
- 시간 추정

**"개발 컨텍스트" 섹션에서:**

- 버전이 포함된 프레임워크 의존성
- 기존 코드 참조
- 내부 의존성

**"개발자 리소스" 섹션에서:**

- 파일 경로
- 주요 코드 위치
- 테스트 위치

이 풍부한 컨텍스트를 사용하여 포괄적이고 구현 준비가 된 에픽과 스토리를 생성합니다.
</action>

</step>

<step n="2" goal="에픽 슬러그 및 구조 생성">

<action>tech-spec의 전체 기능/변경사항을 기반으로 에픽 생성</action>

<action>기능 이름에서 에픽 슬러그 파생:

- 최대 2-3단어 사용
- 케밥 케이스 형식
- 사용자 중심, 구현 중심 아님

예시:

- "OAuth 통합" → "oauth-integration"
- "로그인 버그 수정" → "login-fix"
- "사용자 프로필 페이지" → "user-profile"
  </action>

<action>{{epic_slug}}로 저장 - 모든 스토리 파일 이름에 사용됩니다</action>

<action>스토리 수에 따라 에픽 세부사항 조정:

**단일 스토리의 경우 (story_count == 1):**

- 에픽은 최소한 - 충분한 구조만
- 목표: 달성하려는 것에 대한 간략한 진술
- 범위: 고수준 경계
- 성공 기준: 핵심 결과

**여러 스토리의 경우 (story_count > 1):**

- 에픽은 상세함 - 완전한 분해
- 목표: 포괄적인 목적 및 가치 진술
- 범위: 내/외 예시가 있는 명확한 경계
- 성공 기준: 측정 가능하고 테스트 가능한 결과
- 스토리 맵: 에픽 → 스토리의 시각적 표현
- 구현 순서: 의존성을 포함한 논리적 순서
  </action>

</step>

<step n="3" goal="에픽 문서 생성">

<action>{epics_template}을 사용하여 {epics_file} 초기화</action>

<action>tech-spec 컨텍스트에서 에픽 메타데이터 채우기:

**에픽 제목:** 사용자 대면 결과 (구현 세부사항이 아님)

- 좋음: "OAuth 통합", "로그인 버그 수정", "아이콘 안정성"
- 나쁨: "recommendedLibraries.ts 업데이트", "auth 서비스 리팩토링"

**에픽 목표:** 사용자/비즈니스에 중요한 이유

**에픽 범위:** tech-spec 범위 섹션의 명확한 경계

**에픽 성공 기준:** tech-spec 수락 기준의 측정 가능한 결과

**의존성:** tech-spec 통합 지점 및 의존성에서
</action>

<template-output file="{epics_file}">project_name</template-output>
<template-output file="{epics_file}">date</template-output>
<template-output file="{epics_file}">epic_title</template-output>
<template-output file="{epics_file}">epic_slug</template-output>
<template-output file="{epics_file}">epic_goal</template-output>
<template-output file="{epics_file}">epic_scope</template-output>
<template-output file="{epics_file}">epic_success_criteria</template-output>
<template-output file="{epics_file}">epic_dependencies</template-output>

</step>

<step n="4" goal="스토리로 지능적으로 분해">

<action>tech-spec 구현 단계를 분석하고 스토리 분해 생성

**story_count == 1의 경우:**

- 모든 구현을 포함하는 단일 포괄적인 스토리 생성
- 제목: 제공 가능한 결과에 초점
- 작업: tech-spec 구현 단계에 직접 매핑
- 예상 포인트: 일반적으로 1-5포인트

**story_count > 1의 경우:**

- 구현을 논리적 스토리 경계로 분해
- 각 스토리는 다음을 충족해야 합니다:
  - 독립적으로 가치 있음 (작동하는 기능 제공)
  - 테스트 가능 (명확한 수락 기준 있음)
  - 순차적으로 순서가 정해짐 (순방향 의존성 없음)
  - 적절한 크기 (많은 작은 것보다 2-4개 스토리 선호)

**스토리 순서 규칙 (중요):**

1. 기초 → 구축 → 테스트 → 다듬기
2. 데이터베이스 → API → UI
3. 백엔드 → 프론트엔드
4. 핵심 → 개선
5. 어떤 스토리도 이후 스토리에 의존할 수 없습니다!

순서 검증: 각 스토리 N은 스토리 1...N-1에만 의존해야 합니다
</action>

<action>각 스토리 위치에 대해 (1부터 {{story_count}}까지):

1. **tech-spec 작업에서 스토리 범위 결정**
   - 관련 구현 단계 그룹화
   - 스토리가 시스템을 작동 상태로 유지하는지 확인

2. **스토리 제목 생성**
   - 사용자 중심 제공물
   - 능동적이고 명확한 언어
   - 좋음: "OAuth 백엔드 통합", "OAuth UI 컴포넌트"
   - 나쁨: "OAuth 코드 작성", "파일 업데이트"

3. **수락 기준 추출**
   - tech-spec 테스트 전략 및 수락 기준에서
   - 번호가 매겨져야 함 (AC #1, AC #2 등)
   - 구체적이고 테스트 가능해야 함
   - 해당하는 경우 Given/When/Then 형식 사용

4. **작업을 구현 단계에 매핑**
   - 이 스토리에 대한 tech-spec 구현 단계 분해
   - 체크박스 목록 생성
   - AC 번호 참조: (AC: #1), (AC: #2)

5. **스토리 포인트 추정**
   - 1포인트 = < 1일 (2-4시간)
   - 2포인트 = 1-2일
   - 3포인트 = 2-3일
   - 5포인트 = 3-5일
   - 모든 스토리의 총합은 tech-spec 추정과 일치해야 함
     </action>

</step>

<step n="5" goal="스토리 파일 생성">

<for-each story="1 to story_count">
  <action>story_filename = "story-{{epic_slug}}-{{n}}.md"로 설정</action>
  <action>story_path = "{sprint_artifacts}/{{story_filename}}"로 설정</action>

<action>{user_story_template}을 사용하여 스토리 파일 생성</action>

<action>스토리를 다음으로 채우기:

**스토리 헤더:**

- N.M 형식 (N은 퀵 플로우의 경우 항상 1, M은 스토리 번호)
- 제목: 사용자 중심 제공물
- 상태: Draft

**사용자 스토리:**

- [역할]로서 (개발자, 사용자, 관리자, 시스템 등)
- [기능/변경사항]을(를) 원합니다
- 그래서 [이점/가치]이(가) 가능합니다

**수락 기준:**

- 번호가 매겨진 목록 (AC #1, AC #2, ...)
- 구체적이고, 측정 가능하며, 테스트 가능
- tech-spec 테스트 전략 및 수락 기준에서 파생
- 이 스토리의 모든 성공 조건 커버

**작업/하위 작업:**

- tech-spec 구현 단계에 매핑된 체크박스 목록
- 각 작업은 AC 번호 참조: (AC: #1)
- 명시적인 테스트 작업 포함

**기술 요약:**

- 이 스토리에 대한 고수준 접근 방식
- 주요 기술적 결정
- 관련된 파일/모듈

**프로젝트 구조 노트:**

- files_to_modify: tech-spec "개발자 리소스 → 파일 경로"에서
- test_locations: tech-spec "개발자 리소스 → 테스트 위치"에서
- story_points: 예상 노력
- dependencies: 전제조건 (다른 스토리, 시스템, 데이터)

**주요 코드 참조:**

- tech-spec "개발 컨텍스트 → 관련 기존 코드"에서
- tech-spec "개발자 리소스 → 주요 코드 위치"에서
- 가능한 경우 특정 파일:줄 참조

**컨텍스트 참조:**

- tech-spec.md에 링크 (주요 컨텍스트 문서)
- 노트: 기술 사양에는 브라운필드 분석, 프레임워크 버전, 패턴 등이 포함됨

**Dev 에이전트 기록:**

- 빈 섹션 (dev-story 실행 중 채워짐)
- 사용된 에이전트 모델
- 디버그 로그 참조
- 완료 노트
- 수정된 파일
- 테스트 결과

**리뷰 노트:**

- 빈 섹션 (코드 리뷰 중 채워짐)
  </action>

<template-output file="{{story_path}}">story_number</template-output>
<template-output file="{{story_path}}">story_title</template-output>
<template-output file="{{story_path}}">user_role</template-output>
<template-output file="{{story_path}}">capability</template-output>
<template-output file="{{story_path}}">benefit</template-output>
<template-output file="{{story_path}}">acceptance_criteria</template-output>
<template-output file="{{story_path}}">tasks_subtasks</template-output>
<template-output file="{{story_path}}">technical_summary</template-output>
<template-output file="{{story_path}}">files_to_modify</template-output>
<template-output file="{{story_path}}">test_locations</template-output>
<template-output file="{{story_path}}">story_points</template-output>
<template-output file="{{story_path}}">time_estimate</template-output>
<template-output file="{{story_path}}">dependencies</template-output>
<template-output file="{{story_path}}">existing_code_references</template-output>
</for-each>

</step>

<step n="6" goal="스토리 맵 생성 및 에픽 완성" if="story_count > 1">

<action>에픽 → 스토리 계층을 보여주는 시각적 스토리 맵 생성

포함:

- 상단에 에픽 제목
- 포인트 추정과 함께 나열된 스토리
- 의존성 표시
- 순서 검증 확인

예시:

```
에픽: OAuth 통합 (8포인트)
├── 스토리 1.1: OAuth 백엔드 (3포인트)
│   의존성: 없음
│
├── 스토리 1.2: OAuth UI 컴포넌트 (3포인트)
│   의존성: 스토리 1.1
│
└── 스토리 1.3: OAuth 테스트 및 다듬기 (2포인트)
    의존성: 스토리 1.1, 1.2
```

</action>

<action>총합 계산:

- 모든 스토리의 총 스토리 포인트
- 예상 타임라인 (일반적으로 하루에 1-2포인트)
  </action>

<action>{epics_file}에 추가:

- 스토리 요약
- 스토리 맵 시각화
- 구현 순서
- 총 포인트 및 타임라인
  </action>

<template-output file="{epics_file}">story_map</template-output>
<template-output file="{epics_file}">story_summaries</template-output>
<template-output file="{epics_file}">total_points</template-output>
<template-output file="{epics_file}">estimated_timeline</template-output>
<template-output file="{epics_file}">implementation_sequence</template-output>

</step>

<step n="7" goal="스토리 품질 검증">

<critical>항상 검증 실행 - 선택 사항이 아닙니다!</critical>

<action>품질 표준에 대해 모든 스토리 검증:

**스토리 순서 검증 (중요):**

- 각 스토리 N에 대해 스토리 N+1 이상에 의존하지 않는지 확인
- 확인: 스토리를 1→2→3→... 순서로 구현할 수 있습니까?
- 순서가 유효하지 않은 경우: 문제 식별, 재정렬 제안, 사용자 확인 요청

**수락 기준 품질:**

- 모든 AC가 번호가 매겨짐 (AC #1, AC #2, ...)
- 각 AC가 구체적이고 테스트 가능 ("잘 작동", "좋음", "빠르게 수행" 없음)
- AC가 Given/When/Then 또는 동등한 구조 사용
- 모든 성공 조건이 커버됨

**스토리 완전성:**

- 모든 스토리가 tech-spec 구현 단계에 매핑됨
- 스토리 포인트가 tech-spec 시간 추정과 일치
- 의존성이 명확하게 문서화됨
- 각 스토리에 테스트 가능한 AC 있음
- 파일과 위치가 tech-spec 개발자 리소스를 참조함

**템플릿 준수:**

- 모든 필수 섹션 존재
- Dev 에이전트 기록 섹션 존재 (비어 있어도)
- 컨텍스트 참조가 tech-spec.md에 링크됨
- 스토리 번호가 N.M 형식을 따름
  </action>

<check if="validation issues found">
  <output>⚠️ **스토리 검증 문제:**

{{issues_list}}

**권장 수정:**
{{fixes}}

자동으로 수정할까요? (예/아니오)</output>

<ask>수정 적용? (예/아니오)</ask>

  <check if="yes">
    <action>수정 적용 (스토리 재정렬, 모호한 AC 재작성, 누락된 세부사항 추가)</action>
    <action>재검증</action>
    <output>✅ 수정 후 검증 통과!</output>
  </check>
</check>

<check if="validation passes">
  <output>✅ **스토리 검증 통과!**

**품질 점수:**

- 순서: ✅ 유효 (순방향 의존성 없음)
- AC 품질: ✅ 모두 구체적이고 테스트 가능
- 완전성: ✅ 모든 tech spec 작업 커버됨
- 템플릿 준수: ✅ 모든 섹션 존재

스토리가 구현 준비 완료!</output>
</check>

</step>

<step n="8" goal="워크플로우 상태 업데이트 및 완료">

<action>bmm-workflow-status.yaml 업데이트 (존재하는 경우):

- tech-spec을 완료로 표시
- 스토리 순서 추적 초기화
- 첫 번째 스토리를 TODO로 설정
- 에픽 슬러그 및 스토리 수 추적
  </action>

<output>**✅ 에픽 및 스토리 생성 완료!**

**에픽:** {{epic_title}} ({{epic_slug}})
**총 스토리:** {{story_count}}
{{#if story_count > 1}}**총 포인트:** {{total_points}}
**예상 타임라인:** {{estimated_timeline}}{{/if}}

**생성된 파일:**

- `{epics_file}` - 에픽 구조{{#if story_count == 1}} (최소한){{/if}}
- `{sprint_artifacts}/story-{{epic_slug}}-1.md`{{#if story_count > 1}}
- `{sprint_artifacts}/story-{{epic_slug}}-2.md`{{/if}}{{#if story_count > 2}}
- story-{{epic_slug}}-{{story_count}}.md까지{{/if}}

**다음 단계:**
모든 스토리가 tech-spec.md를 주요 컨텍스트로 참조합니다. DEV 에이전트로 바로 개발을 진행할 수 있습니다!

스토리 파일은 다음을 위해 준비되었습니다:

- 직접 구현 (dev-story 워크플로우)
- 선택적 컨텍스트 생성 (복잡한 경우 story-context 워크플로우)
- 스프린트 계획 조직 (멀티 스토리 조정을 위한 sprint-planning 워크플로우)
  </output>

</step>

</workflow>

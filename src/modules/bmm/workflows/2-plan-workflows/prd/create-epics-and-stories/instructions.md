# 에픽 및 스토리 분해 - 의도 기반 구현 계획

<critical>워크플로우 실행 엔진은 다음에 의해 관리됨: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>반드시 이미 로드하고 처리했어야 함: {installed_path}/workflow.yaml</critical>
<critical>이 워크플로우는 요구사항을 개발 에이전트를 위한 작은 스토리로 변환합니다</critical>
<critical>모든 스토리는 단일 개발 에이전트가 한 번의 집중 세션에서 완료할 수 있어야 합니다</critical>
<critical>모든 응답을 {communication_language}로 전달하고 {user_skill_level}에 맞춰 조정하세요</critical>
<critical>모든 문서를 {document_output_language}로 생성하세요</critical>
<critical>살아있는 문서: 작업하면서 지속적으로 epics.md에 작성 - 끝까지 기다리지 마세요</critical>
<critical>workflow.yaml의 input_file_patterns에 지정된 입력 문서 - 워크플로우 엔진이 자동으로 퍼지 매칭, 전체 vs 샤딩 문서 검색 처리</critical>

<workflow>

<step n="1" goal="PRD 로드 및 요구사항 추출">
<action>{user_name}님의 에픽 및 스토리 계획 작업을 환영합니다

필수 문서 로드 (퍼지 매치, 전체 및 샤딩 문서 모두 처리):

- PRD.md (필수)
- domain-brief.md (존재하는 경우)
- product-brief.md (존재하는 경우)

PRD에서 추출:

- 모든 기능 요구사항
- 비기능 요구사항
- 도메인 고려사항 및 규정 준수 요구사항
- 프로젝트 유형 및 복잡도
- MVP vs 성장 vs 비전 범위 경계

컨텍스트 이해:

- 이 제품을 특별하게 만드는 요소 (매직)
- 기술적 제약사항
- 사용자 유형 및 목표
- 성공 기준</action>
  </step>

<step n="2" goal="자연스러운 그룹핑에서 에픽 구조 제안">
<action>요구사항을 분석하고 자연스러운 에픽 경계 식별

의도: 이 제품에 의미 있는 유기적 그룹핑 찾기

자연스러운 패턴 찾기:

- 응집력 있게 함께 작동하는 기능들
- 연결되는 사용자 여정
- 클러스터를 이루는 비즈니스 역량
- 관련된 도메인 요구사항 (규정 준수, 검증, 보안)
- 함께 구축되어야 하는 기술 시스템

기술 레이어가 아닌 가치를 기반으로 에픽 이름 지정:

- 좋음: "사용자 온보딩", "콘텐츠 발견", "규정 준수 프레임워크"
- 피하기: "데이터베이스 레이어", "API 엔드포인트", "프론트엔드"

각 에픽은:

- 명확한 비즈니스 목표 및 사용자 가치를 가져야 함
- 독립적으로 가치가 있어야 함
- 3-8개의 관련 역량 포함
- 응집력 있는 단계로 전달 가능해야 함

그린필드 프로젝트의 경우:

- 첫 번째 에픽은 반드시 기반 구축 (프로젝트 설정, 핵심 인프라, 배포 파이프라인)
- 기반은 모든 후속 작업을 가능하게 함

복잡한 도메인의 경우:

- 전용 규정 준수/규제 에픽 고려
- 검증 및 안전 요구사항을 논리적으로 그룹화
- 전문성 요구사항 명시

다음을 보여주는 에픽 구조 제시:

- 명확한 가치 진술이 있는 에픽 제목
- 각 에픽의 상위 수준 범위
- 제안된 순서
- 이러한 그룹핑이 의미 있는 이유</action>

<template-output>epics_summary</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="3" goal="각 에픽을 작은 스토리로 분해" repeat="for-each-epic">
<action>에픽 {{N}}을 작고 구현 가능한 스토리로 분해

의도: 단일 개발 에이전트 완료에 적합한 크기의 스토리 생성

각 에픽에 대해 생성:

- 에픽 제목: `epic_title_{{N}}`
- 에픽 목표/가치: `epic_goal_{{N}}`
- 모든 스토리를 반복 패턴 `story_title_{{N}}_{{M}}`로 각 스토리 M에 대해

에픽 1 (기반)에 대한 중요사항:

- 스토리 1.1은 반드시 프로젝트 설정/인프라 초기화여야 함
- 설정 항목: 저장소 구조, 빌드 시스템, 배포 파이프라인 기본, 핵심 종속성
- 모든 후속 스토리의 기반 생성
- 참고: 아키텍처 워크플로우가 기술적 세부사항 구체화

각 스토리는 BDD 스타일 승인 기준을 따라야 함:

**스토리 패턴:**
As a [사용자 유형],
I want [특정 역량],
So that [명확한 가치/이점].

**BDD를 사용한 승인 기준:**
Given [전제조건 또는 초기 상태]
When [동작 또는 트리거]
Then [기대 결과]

And [필요한 추가 기준]

**전제조건:** 이전 스토리만 (절대 순방향 종속성 없음)

**기술 노트:** 구현 지침, 영향받는 컴포넌트, 규정 준수 요구사항

스토리가 다음을 만족하는지 확인:

- 수직으로 분할됨 (한 레이어만이 아닌 완전한 기능 제공)
- 순차적으로 정렬됨 (논리적 진행, 순방향 종속성 없음)
- 가능한 경우 독립적으로 가치 있음
- 단일 세션 완료에 충분히 작음
- 자율 구현에 충분히 명확함

에픽 {{N}}의 각 스토리에 대해, 다음 패턴으로 변수 출력:

- story_title_{{N}}_1, story_title_{{N}}_2, 등
- 각각 포함: 사용자 스토리, BDD 승인 기준, 전제조건, 기술 노트</action>

<template-output>epic_title_{{N}}</template-output>
<template-output>epic_goal_{{N}}</template-output>

<action>에픽 {{N}}의 각 스토리 M에 대해, 스토리 콘텐츠 생성</action>
<template-output>story-title-{{N}}_{{M}}</template-output>

<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="4" goal="에픽 분해 검토 및 최종화">
<action>완성된 에픽 분해를 품질 및 완전성 측면에서 검토

검증:

- PRD의 모든 기능 요구사항이 스토리로 다뤄짐
- 에픽 1이 적절한 기반을 구축함
- 모든 스토리가 수직으로 분할됨
- 순방향 종속성이 없음
- 스토리 크기가 단일 세션 완료에 적합함
- BDD 승인 기준이 명확하고 테스트 가능함
- 도메인/규정 준수 요구사항이 적절히 분산됨
- 순서가 점진적 가치 전달을 가능하게 함

{user_name}님께 확인:

- 에픽 구조가 의미 있음
- 스토리 분해가 실행 가능함
- 종속성이 명확함
- BDD 형식이 명확성을 제공함
- 아키텍처 및 구현 단계 준비됨</action>

<template-output>epic_breakdown_summary</template-output>
</step>

</workflow>

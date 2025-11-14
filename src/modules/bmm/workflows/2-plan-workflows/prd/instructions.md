# PRD 워크플로우 - 의도 기반 제품 기획

<critical>워크플로우 실행 엔진은 {project-root}/{bmad_folder}/core/tasks/workflow.xml에 의해 관리됩니다</critical>
<critical>{installed_path}/workflow.yaml을 이미 로드하고 처리해야 합니다</critical>
<critical>이 워크플로우는 의도 기반 기획(INTENT-DRIVEN PLANNING)을 사용합니다 - 제품 유형과 컨텍스트에 유기적으로 적응합니다</critical>
<critical>모든 응답을 {communication_language}로 전달하고 {user_skill_level}에 깊이 적응합니다</critical>
<critical>모든 문서를 {document_output_language}로 생성합니다</critical>
<critical>살아있는 문서: 발견하는 즉시 PRD.md에 지속적으로 작성합니다 - 끝까지 기다리지 마세요</critical>
<critical>기본 원칙: 제품의 마법을 찾아 전체에 녹여내기 - 특별함이 모든 섹션에 영감을 줘야 합니다</critical>
<critical>워크플로우 yaml의 input_file_patterns에 지정된 입력 문서 - 워크플로우 엔진이 자동으로 퍼지 매칭, 전체 vs 샤드된 문서 검색을 처리합니다</critical>

<workflow>

<step n="0" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>{status_file} 존재 여부 확인</action>

<action if="status file not found">standalone_mode = true 설정</action>

<check if="status file found">
  <action>{status_file} 전체 파일 로드</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"prd" 워크플로우 상태 확인</action>
  <action>YAML 메타데이터에서 project_track 가져오기</action>
  <action>완료되지 않은 첫 번째 워크플로우 찾기 (다음 예상 워크플로우)</action>

  <check if="project_track is Quick Flow">
    <output>**Quick Flow 트랙 - 리디렉션 중**

Quick Flow 프로젝트는 구현 중심 기획을 위해 tech-spec 워크플로우를 사용합니다.
PRD는 포괄적인 요구사항이 필요한 BMad Method와 Enterprise Method 트랙을 위한 것입니다.</output>
<action>종료하고 tech-spec 워크플로우 제안</action>
</check>

  <check if="prd status is file path (already completed)">
    <output>⚠️ PRD가 이미 완료됨: {{prd status}}</output>
    <ask>재실행하면 기존 PRD를 덮어씁니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 다음 단계를 보려면 workflow-status를 사용하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false 설정</action>
</check>
</step>

<step n="1" goal="발견 - 프로젝트, 도메인, 비전">
<action>{user_name}을 환영하고 종합적인 발견을 시작한 다음 모든 컨텍스트 수집:
1. 프로젝트 컨텍스트를 위해 workflow-status.yaml 확인 (있는 경우)
2. 기존 문서 찾기 (제품 브리프, 도메인 브리프, 리서치)
3. 프로젝트 유형 및 도메인 복잡도 감지

참조 로드:
{installed_path}/project-types.csv
{installed_path}/domain-complexity.csv

자연스러운 대화를 통해:
"무엇을 만들고 싶은지 말씀해주세요 - 누구를 위해 어떤 문제를 해결하나요?"

이중 감지:
프로젝트 유형 신호: API, 모바일, 웹, CLI, SDK, SaaS
도메인 복잡도 신호: 의료, 금융, 정부, 교육, 항공우주

특별 라우팅:
게임 감지 시 → BMGD 모듈(BMad Game Development)이 필요함을 사용자에게 알림
복잡한 도메인 감지 시 → 도메인 리서치 옵션 제공:
A) domain-research 워크플로우 실행 (철저함)
B) 빠른 웹 검색 (기본)
C) 사용자가 컨텍스트 제공
D) 일반 지식으로 계속

다음과 같은 질문으로 마법을 일찍 포착: "이 제품에 대해 가장 흥미로운 점은 무엇인가요?", "사용자가 이것을 사랑하게 만들 것은 무엇인가요?", "사람들이 '와우'라고 할 순간은 무엇인가요?"

이 흥분이 PRD 전체에 걸쳐 엮일 스레드가 됩니다.</action>

<template-output>vision_alignment</template-output>
<template-output>project_classification</template-output>
<template-output>project_type</template-output>
<template-output>domain_type</template-output>
<template-output>complexity_level</template-output>
<check if="complex domain">
<template-output>domain_context_summary</template-output>
</check>
<template-output>product_magic_essence</template-output>
<template-output>product_brief_path</template-output>
<template-output>domain_brief_path</template-output>
<template-output>research_documents</template-output>
</step>

<step n="2" goal="성공 정의">
<action>이 특정 제품에 대해 성공이 무엇인지 정의

의도: 일반적인 지표가 아닌 의미 있는 성공 기준

컨텍스트에 적응:

- 소비자: 사용자 만족, 참여, 유지
- B2B: ROI, 효율성, 도입
- 개발자 도구: 개발자 경험, 커뮤니티
- 규제: 규정 준수, 안전, 검증

구체적으로 만들기:

- 나쁨: "10,000명 사용자"
- 좋음: "매일 의존하는 100명의 파워 유저"

- 나쁨: "99.9% 가동 시간"
- 좋음: "중요한 작업 중 데이터 손실 없음"

마법 녹여내기:

- "성공은 사용자가 [특별한 순간]을 경험하고 [원하는 결과]를 얻는 것을 의미합니다"</action>

<template-output>success_criteria</template-output>
<check if="business focus">
<template-output>business_metrics</template-output>
</check>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="3" goal="범위 정의">
<action>스마트 범위 협상 - 최적점 찾기

범위 게임:

1. "유용하려면 무엇이 작동해야 하나요?" → MVP
2. "경쟁력을 갖추려면 무엇이 필요한가요?" → 성장
3. "꿈의 버전은 무엇인가요?" → 비전

범위 확대에 대화로 도전:

- "출시 후로 미룰 수 있나요?"
- "개념 증명에 필수적인가요?"

복잡한 도메인의 경우:

- MVP에 규정 준수 최소 요구사항 포함
- 단계 간 규제 관문 기록</action>

<template-output>mvp_scope</template-output>
<template-output>growth_features</template-output>
<template-output>vision_features</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="4" goal="도메인별 탐색" optional="true">
<action>복잡한 도메인이 감지되거나 domain-brief가 존재하는 경우에만

모든 것을 형성할 도메인 요구사항 종합:

- 규제 요구사항
- 규정 준수 요구사항
- 산업 표준
- 안전/위험 요소
- 필요한 검증
- 특별한 전문 지식 필요

다음에 정보 제공:

- 필수 기능
- 중요한 비기능 요구사항
- 개발 순서 지정 방법
- 필요한 검증</action>

<check if="complex domain">
  <template-output>domain_considerations</template-output>
</check>
</step>

<step n="5" goal="혁신 발견" optional="true">
<action>해당하는 경우 진정으로 새로운 패턴 식별

혁신 신호 청취:

- "이런 것은 존재하지 않습니다"
- "[X]가 작동하는 방식을 재고하고 있습니다"
- "처음으로 [A]와 [B]를 결합합니다"

깊이 탐구:

- 무엇이 독특한가요?
- 어떤 가정에 도전하고 있나요?
- 어떻게 검증하나요?
- 대안은 무엇인가요?

<WebSearch if="novel">{concept} innovations {date}</WebSearch></action>

<check if="innovation detected">
  <template-output>innovation_patterns</template-output>
  <template-output>validation_approach</template-output>
</check>
</step>

<step n="6" goal="프로젝트별 심층 분석">
<action>감지된 프로젝트 유형에 따라 특정 요구사항 깊이 탐구

CSV에서 프로젝트 유형 요구사항을 로드하고 자연스럽게 확장.

API/백엔드의 경우:

- 엔드포인트, 메서드, 매개변수 매핑
- 인증 및 권한 부여 정의
- 오류 코드 및 속도 제한 지정
- 데이터 스키마 문서화

모바일의 경우:

- 플랫폼 요구사항 (iOS/Android/둘 다)
- 필요한 장치 기능
- 오프라인 기능
- 스토어 규정 준수

SaaS B2B의 경우:

- 다중 테넌트 아키텍처
- 권한 모델
- 구독 계층
- 중요한 통합

[다른 유형에 대해 계속...]

항상 제품 마법과 연결:
"[요구사항]이 [특별한 것]을 어떻게 향상시키나요?"</action>

<template-output>project_type_requirements</template-output>

<!-- 프로젝트 유형에 따른 동적 섹션 -->
<check if="API/Backend project">
  <template-output>endpoint_specification</template-output>
  <template-output>authentication_model</template-output>
</check>

<check if="Mobile project">
  <template-output>platform_requirements</template-output>
  <template-output>device_features</template-output>
</check>

<check if="SaaS B2B project">
  <template-output>tenant_model</template-output>
  <template-output>permission_matrix</template-output>
</check>
</step>

<step n="7" goal="UX 원칙" if="project has UI or UX">
  <action>제품에 UI가 있는 경우에만

UX를 가볍게 터치 - 전체 디자인이 아님:

- 시각적 개성
- 주요 상호작용 패턴
- 중요한 사용자 플로우

"사용하는 느낌이 어때야 하나요?"
"분위기는 어떤가요 - 전문적, 재미있음, 미니멀?"

마법과 연결:
"UI는 [디자인 접근 방식]을 통해 [특별한 순간]을 강화해야 합니다"</action>

  <check if="has UI">
    <template-output>ux_principles</template-output>
    <template-output>key_interactions</template-output>
  </check>
</step>

<step n="8" goal="기능 요구사항 종합">
<action>발견한 모든 것을 명확한 기능 요구사항으로 변환

종합:

- 범위의 핵심 기능
- 도메인 필수 기능
- 프로젝트 유형별 요구사항
- 혁신 요구사항

기술이 아닌 기능별로 구성:

- 사용자 관리 ("인증 시스템"이 아님)
- 콘텐츠 검색 ("검색 알고리즘"이 아님)
- 팀 협업 ("웹소켓"이 아님)

각 요구사항:

- 구체적이고 측정 가능
- 사용자 가치와 연결
- 승인 기준 포함
- 도메인 제약 기록

마법 스레드:
특별한 경험을 제공하는 요구사항 강조</action>

<template-output>functional_requirements_complete</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="9" goal="비기능 요구사항 발견">
<action>이 제품에 중요한 비기능 요구사항만 문서화

성능: 사용자 대면 영향이 있는 경우에만
보안: 민감한 데이터를 처리하는 경우에만
확장성: 성장이 예상되는 경우에만
접근성: 폭넓은 청중의 경우에만
통합: 시스템 연결의 경우에만

각 비기능 요구사항:

- 이 제품에 중요한 이유
- 구체적이고 측정 가능한 기준
- 도메인 기반 요구사항

적용되지 않는 카테고리는 건너뛰세요!</action>

<!-- 논의된 섹션만 출력 -->
<check if="performance matters">
  <template-output>performance_requirements</template-output>
</check>
<check if="security matters">
  <template-output>security_requirements</template-output>
</check>
<check if="scale matters">
  <template-output>scalability_requirements</template-output>
</check>
<check if="accessibility matters">
  <template-output>accessibility_requirements</template-output>
</check>
<check if="integration matters">
  <template-output>integration_requirements</template-output>
</check>
</step>

<step n="10" goal="PRD 검토 및 에픽으로 전환">
<action>함께 구축한 PRD 검토

"캡처한 내용을 검토해봅시다:

- 비전: [요약]
- 성공: [주요 지표]
- 범위: [MVP 하이라이트]
- 요구사항: [개수] 기능, [개수] 비기능
- 특별 고려사항: [도메인/혁신]

이것이 제품 비전을 포착하나요?"</action>

<template-output>prd_summary</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>

<action>PRD 검토 및 개선 완료 후:

"훌륭합니다! 이제 이러한 요구사항을 구현 가능한 에픽과 스토리로 나눠야 합니다.

에픽 분해를 위해 두 가지 옵션이 있습니다:

1. 에픽에 집중하는 새 세션 시작 (복잡한 프로젝트에 권장)
2. 여기서 계속 (지금 요구사항을 에픽으로 변환)

어느 것을 선호하시나요?"

새 세션의 경우:
"새 세션에서 에픽 기획을 시작하려면:

1. 여기서 작업 저장
2. 새로 시작하고 실행: workflow epics-stories
3. PRD를 로드하고 에픽 분해 생성

각 세션을 집중적이고 관리 가능하게 유지합니다."

계속의 경우:
"여기서 에픽 분해를 계속합시다..."
[epics-stories 하위 워크플로우 진행]
워크플로우 상태에 따라 project_track 설정 (BMad Method 또는 Enterprise Method)
에픽 분해 문서를 위한 epic_details 생성</action>

<template-output>project_track</template-output>
<template-output>epic_details</template-output>
</step>

<step n="11" goal="PRD 완료 및 다음 단계 제안">
<template-output>product_magic_summary</template-output>

<check if="standalone_mode != true">
  <action>{status_file} 전체 파일 로드</action>
  <action>workflow_status["prd"] = "{default_output_file}" 업데이트</action>
  <action>모든 주석과 구조를 보존하여 파일 저장</action>
</check>

<output>**✅ PRD 완료, {user_name}님!**

제품 요구사항이 문서화되고 구현 준비가 완료되었습니다.

**생성됨:**

- **PRD.md** - {project_type}와 {domain}에 맞춰진 완전한 요구사항

**다음 단계:**

1. **에픽 분해** (필수)
   실행: `workflow create-epics-and-stories` 요구사항을 구현 가능한 스토리로 분해

2. **UX 디자인** (UI가 있는 경우)
   실행: `workflow ux-design` 상세 사용자 경험 디자인

3. **아키텍처** (권장)
   실행: `workflow create-architecture` 기술 아키텍처 결정

제품의 마법 - {product_magic_summary} - PRD 전체에 걸쳐 녹아있으며 이후 모든 작업을 안내할 것입니다.
</output>
</step>

</workflow>

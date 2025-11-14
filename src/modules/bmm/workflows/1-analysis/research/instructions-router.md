# 연구 워크플로우 라우터 지침

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project_root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>{communication_language}로 소통하고 {document_output_language}로 문서 생성</critical>
<critical>웹 연구가 활성화됨 - 항상 현재 {{current_year}} 데이터 사용</critical>

<critical>🚨 환각 방지 프로토콜 - 필수 🚨</critical>
<critical>검증된 소스 없이 정보를 제시하지 마세요 - 소스를 찾을 수 없으면 "이에 대한 신뢰할 수 있는 데이터를 찾을 수 없습니다"라고 말하세요</critical>
<critical>데이터, 통계 또는 사실적 주장을 제시할 때 항상 URL과 함께 소스를 인용하세요</critical>
<critical>중요한 주장(시장 규모, 성장률, 경쟁 데이터)에 대해 최소 2개의 독립적인 소스를 요구하세요</critical>
<critical>소스가 충돌하는 경우 두 관점을 모두 제시하고 불일치를 언급하세요 - 임의로 하나를 선택하지 마세요</critical>
<critical>불확실한 데이터는 신뢰도 수준으로 플래그를 지정하세요: [높은 신뢰도], [중간 신뢰도], [낮은 신뢰도 - 확인 필요]</critical>
<critical>다음을 명확히 구분하세요: 사실(소스에서), 분석(귀하의 해석), 추측(교육받은 추측)</critical>
<critical>WebSearch 결과를 사용할 때 항상 모든 주장에 대한 소스 URL을 추출하고 포함하세요</critical>

<!-- IDE-INJECT-POINT: research-subagents -->

<workflow>

<critical>이것은 전문 연구 지침 세트로 안내하는 라우터입니다</critical>

<step n="1" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>{output_folder}/bmm-workflow-status.yaml이 존재하는지 확인</action>

<check if="status file not found">
  <output>워크플로우 상태 파일을 찾을 수 없습니다. 연구는 선택 사항입니다 - 상태 추적 없이 계속할 수 있습니다.</output>
  <action>standalone_mode = true 설정</action>
</check>

<check if="status file found">
  <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"research" 워크플로우의 상태 확인</action>
  <action>YAML 메타데이터에서 project_level 가져오기</action>
  <action>첫 번째 완료되지 않은 워크플로우 찾기 (다음 예상 워크플로우)</action>
  <action>최종 업데이트를 위해 로드된 지침 세트에 상태 컨텍스트 전달</action>

  <check if="research status is file path (already completed)">
    <output>⚠️ 연구가 이미 완료됨: {{research status}}</output>
    <ask>재실행하면 새 연구 보고서를 생성합니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. workflow-status를 사용하여 다음 단계를 확인하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

  <check if="research is not the next expected workflow (latter items are completed already in the list)">
    <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. 연구가 순서를 벗어났습니다.</output>
    <output>참고: 연구는 모든 프로젝트 단계에서 귀중한 인사이트를 제공할 수 있습니다.</output>
    <ask>연구를 계속 진행하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false 설정</action>
</check>
</step>

<step n="2" goal="대화를 통한 연구 필요 발견">

<action>{user_name}님을 따뜻하게 환영합니다. 실시간 {{current_year}} 웹 데이터를 사용하는 연구 파트너로 자신을 포지셔닝합니다. 무엇을 이해하거나 연구하려고 하는지 물어봅니다.</action>

<action>듣고 설명하는 것을 기반으로 연구 유형을 협력적으로 식별:

- 시장/비즈니스 질문 → 시장 조사
- 경쟁자 질문 → 경쟁 인텔리전스
- 고객 질문 → 사용자 연구
- 기술 질문 → 기술 연구
- 산업 질문 → 도메인 연구
- AI 플랫폼을 위한 연구 프롬프트 생성 → 심층 연구 프롬프트 생성기

어떤 유형이 가장 도움이 될지와 무엇을 생성할지에 대한 이해를 확인합니다.
</action>

<action>{{research_type}} 및 {{research_mode}} 캡처</action>

<template-output>research_type_discovery</template-output>
</step>

<step n="3" goal="적절한 연구 지침으로 라우팅">

<critical>사용자 선택에 따라 적절한 지침 세트 로드</critical>

<check if="research_type == 1 OR fuzzy match market research">
  <action>research_mode = "market" 설정</action>
  <action>로드: {installed_path}/instructions-market.md</action>
  <action>시장 조사 워크플로우 계속</action>
</check>

<check if="research_type == 2 or prompt or fuzzy match deep research prompt">
  <action>research_mode = "deep-prompt" 설정</action>
  <action>로드: {installed_path}/instructions-deep-prompt.md</action>
  <action>심층 연구 프롬프트 생성 계속</action>
</check>

<check if="research_type == 3 technical or architecture or fuzzy match indicates technical type of research">
  <action>research_mode = "technical" 설정</action>
  <action>로드: {installed_path}/instructions-technical.md</action>
  <action>기술 연구 워크플로우 계속</action>

</check>

<check if="research_type == 4 or fuzzy match competitive">
  <action>research_mode = "competitive" 설정</action>
  <action>경쟁 중점의 시장 조사 워크플로우 사용</action>
  <action>로드: {installed_path}/instructions-market.md</action>
  <action>경쟁 인텔리전스에 집중하기 위해 mode="competitive" 전달</action>

</check>

<check if="research_type == 5 or fuzzy match user research">
  <action>research_mode = "user" 설정</action>
  <action>사용자 연구 중점의 시장 조사 워크플로우 사용</action>
  <action>로드: {installed_path}/instructions-market.md</action>
  <action>고객 인사이트에 집중하기 위해 mode="user" 전달</action>

</check>

<check if="research_type == 6 or fuzzy match domain or industry or category">
  <action>research_mode = "domain" 설정</action>
  <action>도메인 중점의 시장 조사 워크플로우 사용</action>
  <action>로드: {installed_path}/instructions-market.md</action>
  <action>산업/도메인 분석에 집중하기 위해 mode="domain" 전달</action>
</check>

<critical>로드된 지침 세트가 {research_type}의 전체 컨텍스트로 여기서 계속됩니다</critical>

</step>

</workflow>

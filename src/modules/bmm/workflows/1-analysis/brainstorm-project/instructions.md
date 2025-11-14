# 프로젝트 브레인스토밍 - 워크플로우 지침

```xml
<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project_root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>반드시 다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 응답을 {communication_language}로 소통하세요</critical>
<critical>이것은 프로젝트별 맥락과 함께 CIS 브레인스토밍 워크플로우를 조율하는 메타 워크플로우입니다</critical>

<workflow>

  <step n="1" goal="워크플로우 준비 상태 검증" tag="workflow-status">
    <action>{output_folder}/bmm-workflow-status.yaml이 존재하는지 확인</action>

    <check if="상태 파일을 찾을 수 없음">
      <output>워크플로우 상태 파일을 찾을 수 없습니다. 브레인스토밍은 선택 사항입니다 - 상태 추적 없이 계속 진행할 수 있습니다.</output>
      <action>standalone_mode = true로 설정</action>
    </check>

    <check if="상태 파일 발견">
      <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
      <action>workflow_status 섹션 파싱</action>
      <action>"brainstorm-project" 워크플로우 상태 확인</action>
      <action>YAML 메타데이터에서 project_level 가져오기</action>
      <action>첫 번째 미완료 워크플로우 찾기 (다음 예상 워크플로우)</action>

      <check if="brainstorm-project 상태가 파일 경로임 (이미 완료됨)">
        <output>⚠️ 브레인스토밍 세션이 이미 완료되었습니다: {{brainstorm-project status}}</output>
        <ask>다시 실행하면 새 세션이 생성됩니다. 계속하시겠습니까? (y/n)</ask>
        <check if="n">
          <output>종료합니다. workflow-status를 사용하여 다음 단계를 확인하세요.</output>
          <action>워크플로우 종료</action>
        </check>
      </check>

      <check if="brainstorm-project가 다음 예상 워크플로우가 아님 (brainstorm-project 이후의 워크플로우가 이미 완료됨)">
        <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. 브레인스토밍이 순서에서 벗어났습니다.</output>
        <ask>그래도 브레인스토밍을 계속 진행하시겠습니까? (y/n)</ask>
        <check if="n">
          <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
          <action>워크플로우 종료</action>
        </check>
      </check>

      <action>standalone_mode = false로 설정</action>
    </check>
  </step>

  <step n="2" goal="프로젝트 브레인스토밍 맥락 로드">
    <action>다음 위치에서 프로젝트 맥락 문서 읽기: {project_context}</action>
    <action>이 맥락은 다음을 포함한 프로젝트별 가이드를 제공합니다:
      - 프로젝트 아이디어 도출을 위한 집중 영역
      - 소프트웨어/제품 프로젝트에 대한 주요 고려사항
      - 프로젝트 브레인스토밍을 위한 권장 기법
      - 출력 구조 가이드
    </action>
  </step>

  <step n="3" goal="프로젝트 맥락과 함께 핵심 브레인스토밍 호출">
    <action>프로젝트 맥락과 함께 CIS 브레인스토밍 워크플로우 실행</action>
    <invoke-workflow path="{core_brainstorming}" data="{project_context}">
      CIS 브레인스토밍 워크플로우는 다음을 수행합니다:
      - 대화형 브레인스토밍 기법 메뉴 제공
      - 선택한 아이디어 도출 방법을 통해 사용자 안내
      - 브레인스토밍 세션 결과 생성 및 캡처
      - 출력을 다음 위치에 저장: {output_folder}/brainstorming-session-results-{{date}}.md
    </invoke-workflow>
  </step>

  <step n="4" goal="상태 업데이트 및 완료" tag="workflow-status">
    <check if="standalone_mode != true">
      <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
      <action>workflow_status 키 "brainstorm-project" 찾기</action>
      <critical>상태 값으로 파일 경로만 작성 - 다른 텍스트, 노트 또는 메타데이터 없이</critical>
      <action>workflow_status["brainstorm-project"] = "{output_folder}/bmm-brainstorming-session-{{date}}.md"로 업데이트</action>
      <action>STATUS DEFINITIONS를 포함한 모든 주석과 구조를 보존하며 파일 저장</action>

      <action>workflow_status에서 첫 번째 미완료 워크플로우 찾기 (다음에 수행할 워크플로우)</action>
      <action>다음 워크플로우를 기반으로 경로 파일에서 다음 에이전트 결정</action>
    </check>

    <output>**✅ 브레인스토밍 세션 완료, {user_name}님!**

**세션 결과:**

- 브레인스토밍 결과가 다음 위치에 저장되었습니다: {output_folder}/bmm-brainstorming-session-{{date}}.md

{{#if standalone_mode != true}}
**상태 업데이트:**

- 진행 상황 추적이 업데이트되었습니다

**다음 단계:**

- **다음 필수:** {{next_workflow}} ({{next_agent}} 에이전트)
- **선택 사항:** 계속 진행하기 전에 다른 분석 워크플로우(research, product-brief)를 실행할 수 있습니다

언제든지 `workflow-status`로 상태를 확인할 수 있습니다
{{else}}
**다음 단계:**

진행 중인 워크플로우가 없으므로:

- 다음에 무엇을 할지 확실하지 않다면 BMM 워크플로우 가이드를 참조하세요
- 또는 `workflow-init`을 실행하여 워크플로우 경로를 생성하고 안내받을 다음 단계를 확인하세요
{{/if}}
    </output>
  </step>

</workflow>
```

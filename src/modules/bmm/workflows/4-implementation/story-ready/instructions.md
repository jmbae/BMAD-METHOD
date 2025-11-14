# 스토리 준비 워크플로우 지침 (SM 에이전트)

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project_root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 응답을 {communication_language}로 소통하고 언어는 {user_skill_level}에 맞춰져야 합니다</critical>
<critical>모든 문서를 {document_output_language}로 생성합니다</critical>

<workflow>

<critical>이 워크플로우는 사용자가 작성된 스토리를 검토하고 개발 준비가 되었음을 확인한 후 SM 에이전트에 의해 실행됩니다</critical>
<critical>간단한 워크플로우: 스토리 파일 상태를 Ready로 업데이트</critical>

<step n="1" goal="준비 상태로 표시할 작성된 스토리 찾기" tag="sprint-status">

<action>{{story_path}}가 제공된 경우 → 직접 사용; 파일명 또는 메타데이터에서 story_key 추출; GOTO mark_ready</action>

<critical>순서를 보존하기 위해 처음부터 끝까지 전체 {sprint_status} 파일을 읽어야 합니다</critical>
<action>전체 파일을 로드합니다: {sprint_status}</action>
<action>시작부터 끝까지 모든 줄을 읽습니다 - 어떤 내용도 건너뛰지 마세요</action>
<action>development_status 섹션을 완전히 파싱합니다</action>

<action>다음 조건의 모든 스토리를 찾습니다 (시작부터 끝까지 순서대로 읽으면서):

- 키가 패턴과 일치: number-number-name (예: "1-2-user-auth")
- 에픽 키(epic-X) 또는 회고(epic-X-retrospective)가 아님
- 상태 값이 "drafted"와 같음
  </action>

<action>표시 목적으로 순서대로 최대 10개의 drafted 스토리 키를 수집합니다</action>
<action>찾은 총 drafted 스토리 수를 계산합니다</action>

<check if="drafted 스토리를 찾지 못함">
  <output>📋 {sprint_status}에서 drafted 스토리를 찾지 못했습니다

모든 스토리가 아직 backlog에 있거나 이미 ready/in-progress/done으로 표시되어 있습니다.

**옵션:**

1. `create-story`를 실행하여 더 많은 스토리 작성
2. `sprint-planning`을 실행하여 스토리 추적 새로 고침
   </output>
   <action>HALT</action>
   </check>

<action>사용 가능한 drafted 스토리를 표시합니다:

**사용 가능한 Drafted 스토리 ({{drafted_count}}개 발견):**

{{list_of_drafted_story_keys}}

</action>

<ask if="{{non_interactive}} == false">Ready로 표시할 drafted 스토리 선택 (스토리 키 또는 번호 입력):</ask>
<action if="{{non_interactive}} == true">목록에서 첫 번째 스토리를 자동 선택합니다</action>

<action>사용자 입력 또는 자동 선택에서 선택된 story_key를 해결합니다</action>
<action>{{story_dir}}에서 story_key 패턴을 사용하여 일치하는 스토리 파일을 찾습니다</action>

<anchor id="mark_ready" />

<action>해결된 경로에서 스토리 파일을 읽습니다</action>
<action>파일에서 story_id와 story_title을 추출합니다</action>

<action>"Status:" 줄을 찾습니다 (보통 상단에 있음)</action>
<action>스토리 파일을 업데이트합니다: Status를 "ready-for-dev"로 변경</action>
<action>스토리 파일을 저장합니다</action>
</step>

<step n="2" goal="스프린트 상태를 ready-for-dev로 업데이트" tag="sprint-status">
<action>전체 파일을 로드합니다: {sprint_status}</action>
<action>{{story_key}}와 일치하는 development_status 키를 찾습니다</action>
<action>현재 상태가 "drafted"인지 확인합니다 (예상된 이전 상태)</action>
<action>development_status[{{story_key}}] = "ready-for-dev"로 업데이트합니다</action>
<action>STATUS DEFINITIONS를 포함한 모든 주석과 구조를 보존하면서 파일을 저장합니다</action>

<check if="파일에서 스토리 키를 찾지 못함">
  <output>⚠️ 스토리 파일이 업데이트되었지만 sprint-status를 업데이트할 수 없습니다: {{story_key}}를 찾지 못함

추적을 새로 고치려면 sprint-planning을 실행해야 할 수 있습니다.
</output>
</check>

</step>

<step n="3" goal="사용자에게 완료 확인">

<output>**스토리가 개발 준비 상태로 표시되었습니다, {user_name}!**

✅ 스토리 파일 업데이트: `{{story_file}}` → Status: ready-for-dev
✅ 스프린트 상태 업데이트: drafted → ready-for-dev

**스토리 세부 정보:**

- **ID:** {{story_id}}
- **Key:** {{story_key}}
- **Title:** {{story_title}}
- **File:** `{{story_file}}`
- **Status:** ready-for-dev

**다음 단계:**

1. **권장:** `story-context` 워크플로우를 실행하여 구현 컨텍스트 생성
   - DEV 에이전트를 위한 포괄적인 컨텍스트 XML을 생성합니다
   - 관련 아키텍처, 의존성 및 기존 코드를 포함합니다

2. **대안:** 컨텍스트 생성을 건너뛰고 `dev-story` 워크플로우로 직접 이동
   - 더 빠르지만 DEV 에이전트가 더 적은 컨텍스트를 갖습니다
   - 간단하고 잘 이해된 스토리에만 권장됩니다

**계속하려면:**

- 컨텍스트 생성: SM 에이전트를 유지하고 `story-context` 워크플로우 실행
- 직접 구현: DEV 에이전트를 로드하고 `dev-story` 워크플로우 실행

</step>

</workflow>

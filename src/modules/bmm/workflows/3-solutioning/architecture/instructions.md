# 의사결정 아키텍처 워크플로우 지침

<workflow name="architecture">

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>이 워크플로우는 적응형 촉진(ADAPTIVE FACILITATION)을 사용합니다 - {user_skill_level}에 따라 커뮤니케이션 스타일을 조정하세요</critical>
<critical>목표는 AI 에이전트 충돌을 방지하는 아키텍처 의사결정이며, 상세한 구현 사양이 아닙니다</critical>
<critical>모든 응답을 {communication_language}로 전달하고 {user_skill_level}에 맞추세요</critical>
<critical>모든 문서를 {document_output_language}로 생성하세요</critical>
<critical>이 워크플로우는 템플릿 기반 아키텍처를 대화 중심 접근 방식으로 대체합니다</critical>
<critical>입력 문서는 workflow.yaml의 input_file_patterns에 지정됨 - 워크플로우 엔진이 퍼지 매칭, 전체 문서 vs 샤딩 문서 검색을 자동으로 처리합니다</critical>
<critical>도출 포인트: 각 주요 아키텍처 의사결정 영역(decision_record, project_structure, novel_pattern_designs, implementation_patterns, architecture_document에 대한 template-output 태그로 식별됨)을 완료한 후 진행하기 전에 고급 도출을 호출하여 의사결정을 개선하세요</critical>

<step n="0" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>{output_folder}/bmm-workflow-status.yaml이 존재하는지 확인</action>

<check if="상태 파일을 찾을 수 없음">
  <output>워크플로우 상태 파일을 찾을 수 없습니다. 아키텍처 생성은 독립 실행 모드 또는 BMM 워크플로우 경로의 일부로 실행할 수 있습니다.</output>
  <output>**권장:** 프로젝트 컨텍스트 추적 및 워크플로우 시퀀싱을 위해 먼저 `workflow-init`을 실행하세요.</output>
  <ask>독립 실행 모드로 계속하거나 종료하여 workflow-init을 실행하시겠습니까? (continue/exit)</ask>
  <check if="continue">
    <action>standalone_mode = true로 설정</action>
  </check>
  <check if="exit">
    <action>워크플로우 종료</action>
  </check>
</check>

<check if="상태 파일 발견">
  <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"create-architecture" 워크플로우 상태 확인</action>
  <action>YAML 메타데이터에서 project_level 가져오기</action>
  <action>완료되지 않은 첫 번째 워크플로우 찾기(다음 예상 워크플로우)</action>
</check>

  <check if="create-architecture 상태가 이미 완료됨을 나타냄">
    <output>⚠️ 아키텍처가 이미 완료됨: {{create-architecture status}}</output>
    <ask>재실행하면 기존 아키텍처를 덮어씁니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. workflow-status를 사용하여 다음 단계를 확인하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

  <check if="create-architecture가 다음 예상 워크플로우가 아님">
    <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. 아키텍처가 순서를 벗어났습니다.</output>
    <ask>그래도 아키텍처를 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false로 설정</action>

<action>퍼지 매칭을 사용하여 기존 PRD 및 에픽 파일 확인</action>

<action>PRD 파일 퍼지 매치: {prd_file}</action>
<check if="PRD_not_found">
<output>**PRD를 찾을 수 없음**

아키텍처 생성은 선택적 UX 디자인 및 기타 자산과 함께 제품 요구사항 문서(PRD)를 기반으로 작동합니다.

찾는 대상: _prd_.md 또는 {output_folder}의 prd/\* + 파일

먼저 PM 에이전트에게 PRD 생성 워크플로우를 실행하여 요구사항을 정의하도록 요청하거나, 제가 잘못 알고 있고 실제로 존재한다면 지금 파일을 제공해 주세요.
</output>
<ask>종료하시겠습니까, 아니면 PRD를 제공할 수 있습니까?
<action if='종료에 yes'>워크플로우 종료 - PRD 필요</action>
<action if='prd 제공됨'>1단계로 진행</action>
</ask>
</check>

</step>

<step n="1" goal="프로젝트 컨텍스트 로드 및 이해">
  <action>퍼지 매칭을 사용하여 PRD 로드: {prd_file}, PRD가 폴더의 여러 파일인 경우 인덱스 파일과 PRD와 관련된 모든 파일 로드</action>
  <action>퍼지 매칭을 사용하여 에픽 파일 로드: {epics_file}</action>

<action>퍼지 매칭을 사용하여 UX 사양 확인:
<action>다음을 찾으려 시도: {ux_spec_file}</action>
<check if="ux_spec_found">
<action>UX 사양을 로드하고 아키텍처 영향 추출: - 컴포넌트 복잡도(단순 폼 vs 풍부한 상호작용) - 애니메이션/전환 요구사항 - 실시간 업데이트 필요(라이브 데이터, 협업 기능) - 플랫폼별 UI 요구사항 - 접근성 표준(WCAG 준수 수준) - 반응형 디자인 중단점 - 오프라인 기능 요구사항 - 성능 기대치(로드 시간, 상호작용 반응성)
</action>
</check>
</action>

<action>PRD에서 추출 및 이해: - 기능 요구사항(반드시 수행해야 하는 것) - 비기능 요구사항(성능, 보안, 규정 준수 등) - 에픽 구조 및 사용자 스토리 - 수락 기준 - 언급된 기술적 제약
</action>

<action>프로젝트 규모 계산 및 평가: - 에픽 수: {{epic_count}} - 스토리 수: {{story_count}} - 복잡도 지표(실시간, 멀티테넌트, 규제 등) - UX 복잡도 수준(UX 사양이 있는 경우) - 신규 기능
</action>

<action>{user_name}에게 이해 반영:
"{{project_name}}에 대한 프로젝트 문서를 검토하고 있습니다.
{{epic_count}}개의 에픽과 총 {{story_count}}개의 스토리를 확인했습니다.
{{if_ux_spec}}사용자 경험 요구사항을 정의하는 UX 사양도 발견했습니다.{{/if_ux_spec}}

     주요 측면:
     - [핵심 기능 요약]
     - [중요한 NFR 주목]
     {{if_ux_spec}}- [UX 복잡도 및 요구사항 주목]{{/if_ux_spec}}
     - [고유한 과제 식별]

     이것은 AI 에이전트가 이를 일관되게 구현하는 데 필요한
     아키텍처 의사결정을 안내하는 데 도움이 될 것입니다."

  </action>

<ask>이것이 프로젝트에 대한 귀하의 이해와 일치합니까?</ask>
<template-output>project_context_understanding</template-output>
</step>

<step n="2" goal="스타터 템플릿 검색 및 평가">
  <critical>현대적인 스타터 템플릿은 기본적으로 많은 좋은 아키텍처 의사결정을 합니다</critical>

<action>PRD 분석을 기반으로 주요 기술 도메인 식별: - 웹 애플리케이션 → Next.js, Vite, Remix 스타터 찾기 - 모바일 앱 → React Native, Expo, Flutter 스타터 찾기 - API/백엔드 → NestJS, Express, Fastify 스타터 찾기 - CLI 도구 → CLI 프레임워크 스타터 찾기 - 풀스택 → T3, RedwoodJS, Blitz 스타터 찾기
</action>

  <check if="ux_spec_loaded">
    <action>스타터 선택 시 UX 요구사항 고려:
      - 풍부한 애니메이션 → Framer Motion 호환 스타터
      - 복잡한 폼 → React Hook Form 포함 스타터
      - 실시간 기능 → Socket.io 또는 WebSocket 준비 스타터
      - 접근성 초점 → WCAG 준수 컴포넌트 라이브러리 스타터
      - 디자인 시스템 → Storybook 활성화 스타터
    </action>
  </check>

<action>관련 스타터 템플릿을 웹 검색으로 검색, 예시:
<WebSearch>{{primary_technology}} 스타터 템플릿 CLI 생성 명령 최신 {date}</WebSearch>
<WebSearch>{{primary_technology}} 보일러플레이트 생성기 최신 옵션</WebSearch>
</action>

  <check if="starter_templates_found">
    <action>각 스타터가 제공하는 것 조사:
      <WebSearch>{{starter_name}} 기본 설정 기술 포함 최신</WebSearch>
      <WebSearch>{{starter_name}} 프로젝트 구조 파일 조직</WebSearch>
    </action>

    <check if="{user_skill_level} == 'expert'">
      <action>스타터 옵션을 간결하게 제시:
        "{{starter_name}}를 찾았으며 다음을 제공합니다:
         {{quick_decision_list}}

         이것이 우리의 기본 아키텍처를 확립할 것입니다. 사용하시겠습니까?"
      </action>
    </check>

    <check if="{user_skill_level} == 'beginner'">
      <action>스타터의 이점 설명:
        "{{starter_name}}를 찾았습니다. 이것은 프로젝트를 위한 미리 만들어진 기초와 같습니다.

         각 보드를 직접 자르는 것 대신 조립식 주택 프레임을 구입하는 것과 같다고 생각하세요.

         이것이 당신을 위해 이러한 의사결정을 합니다:
         {{friendly_decision_list}}

         이것은 모범 사례를 따르는 훌륭한 출발점입니다. 사용하시겠습니까?"
      </action>
    </check>

    <ask>기초로 {{starter_name}}를 사용하시겠습니까? (권장) [y/n]</ask>

    <check if="user_accepts_starter">
      <action>현재 스타터 명령 및 옵션 가져오기:
        <WebSearch>{{starter_name}} CLI 명령 옵션 플래그 최신 2024</WebSearch>
      </action>

      <action>초기화 명령 문서화:
        명령 저장: {{full_starter_command_with_options}}
        예시: "npx create-next-app@latest my-app --typescript --tailwind --app"
      </action>

      <action>스타터 제공 의사결정 추출 및 문서화:
        스타터가 제공하는 아키텍처 의사결정:
        - 언어/TypeScript: {{provided_or_not}}
        - 스타일링 솔루션: {{provided_or_not}}
        - 테스팅 프레임워크: {{provided_or_not}}
        - 린팅/포맷팅: {{provided_or_not}}
        - 빌드 도구: {{provided_or_not}}
        - 프로젝트 구조: {{provided_pattern}}
      </action>

      <action>의사결정 추적에서 이러한 의사결정을 "스타터가 제공"으로 표시</action>

      <action>첫 번째 구현 스토리 참고:
        "{{starter_command}}를 사용한 프로젝트 초기화가 첫 번째 구현 스토리여야 합니다"
      </action>
    </check>

    <check if="user_rejects_starter">
      <ask>스타터를 피하는 특정 이유가 있습니까? (제약을 이해하는 데 도움이 됩니다)</ask>
      <action>참고: 수동 설정 필요, 모든 의사결정을 명시적으로 해야 함</action>
    </check>

  </check>

  <check if="no_starter_found_or_applicable">
    <action>참고: 이 프로젝트 유형에 대한 표준 스타터 템플릿을 찾을 수 없습니다.
            모든 아키텍처 의사결정을 명시적으로 할 것입니다.</action>
  </check>

<template-output>starter_template_decision</template-output>
</step>

<step n="3" goal="촉진 스타일 조정 및 남은 의사결정 식별">
  <action>config의 {user_skill_level}을 기반으로 촉진 접근 방식 설정:

  <check if="{user_skill_level} == 'expert'">
    모드 설정: EXPERT
    - 기술 용어를 자유롭게 사용
    - 의사결정을 빠르게 진행
    - 패턴 및 도구에 대한 친숙함 가정
    - 엣지 케이스 및 고급 관심사에 초점
  </check>

  <check if="{user_skill_level} == 'intermediate'">
    모드 설정: INTERMEDIATE
    - 기술적 정확성과 명확성의 균형
    - 복잡한 패턴을 간략하게 설명
    - 주요 지점에서 이해 확인
    - 명확하지 않은 선택에 대한 컨텍스트 제공
  </check>

  <check if="{user_skill_level} == 'beginner'">
    모드 설정: BEGINNER
    - 비유와 실제 사례 사용
    - 기술 개념을 간단한 용어로 설명
    - 의사결정이 왜 중요한지 교육 제공
    - 복잡성 과부하로부터 보호
  </check>
  </action>

<action>의사결정 카탈로그 로드: {decision_catalog}</action>
<action>아키텍처 패턴 로드: {architecture_patterns}</action>

<action>패턴에 대해 PRD 분석하여 필요한 의사결정 식별: - 기능 요구사항을 알려진 패턴과 매칭 - 필요한 의사결정 카테고리 식별 - 특별한 주의가 필요한 신규/고유한 측면 플래그 지정 - 스타터 템플릿이 이미 한 의사결정 고려(해당하는 경우)
</action>

<action>의사결정 우선순위 목록 생성:
중요(모든 것을 차단): - {{list_of_critical_decisions}}

    중요(아키텍처 형성):
    - {{list_of_important_decisions}}

    선호(연기 가능):
    - {{list_of_optional_decisions}}

  </action>

<action>모드에 따라 {user_name}에게 계획 알림:
<check if="mode == 'EXPERT'">
"PRD를 기반으로 {{total_decision_count}}개의 아키텍처 의사결정을 해야 합니다.
{{starter_covered_count}}개는 스타터 템플릿에서 다룹니다.
남은 {{remaining_count}}개의 의사결정을 작업하겠습니다."
</check>

    <check if="mode == 'BEGINNER'">
      "훌륭합니다! 요구사항을 분석하여 {{total_decision_count}}개의 기술적
       선택을 해야 한다는 것을 발견했습니다. 걱정하지 마세요 - 각각을 안내하고
       왜 중요한지 설명하겠습니다. {{if_starter}}스타터 템플릿이 {{starter_covered_count}}개를
       자동으로 처리합니다.{{/if_starter}}"
    </check>

  </action>

<template-output>decision_identification</template-output>
</step>

<step n="4" goal="협업 의사결정 촉진" repeat="for-each-decision">
  <critical>각 의사결정은 사용자를 위해서가 아니라 사용자와 함께 해야 합니다</critical>
  <critical>항상 WebSearch를 사용하여 현재 버전 확인 - 하드코딩된 버전을 절대 신뢰하지 마세요</critical>

<action>우선순위 순서로 각 의사결정에 대해:</action>

<action>모드에 따라 의사결정 제시:
<check if="mode == 'EXPERT'">
"{{Decision_Category}}: {{Specific_Decision}}

    옵션: {{concise_option_list_with_tradeoffs}}

    권장사항: {{reason}} 때문에 {{recommendation}}"

  </check>

  <check if="mode == 'INTERMEDIATE'">
    "다음 의사결정: {{Human_Friendly_Category}}

      {{Specific_Decision}}를 선택해야 합니다.

      일반적인 옵션:
      {{option_list_with_brief_explanations}}

      귀하의 프로젝트의 경우, {{reason}} 때문에 {{recommendation}}가 잘 작동할 것입니다."

  </check>

  <check if="mode == 'BEGINNER'">
    "{{Human_Friendly_Category}}에 대해 이야기하겠습니다.

      {{Educational_Context_About_Why_This_Matters}}

      {{real_world_analogy}}와 같다고 생각하세요.

      주요 옵션:
      {{friendly_options_with_pros_cons}}

      제 제안: {{recommendation}}
      이것이 귀하에게 좋은 이유는 {{beginner_friendly_reason}}입니다."

  </check>

  </action>

  <check if="decision_involves_specific_technology">
    <action>현재 안정 버전 확인:
      <WebSearch>{{technology}} 최신 안정 버전 2024</WebSearch>
      <WebSearch>{{technology}} 현재 LTS 버전</WebSearch>
    </action>

    <action>확인된 버전으로 의사결정 기록 업데이트:
      기술: {{technology}}
      확인된 버전: {{version_from_search}}
      확인 날짜: {{today}}
    </action>

  </check>

<ask>선호하는 것은 무엇입니까? (또는 세부 정보를 위해 'explain more')</ask>

  <check if="user_wants_more_info">
    <action>기술 수준에 적합한 더 깊은 설명 제공</action>
    <check if="complex_tradeoffs">
      <action>고급 도출 사용 고려:
        "이 의사결정에 대한 혁신적인 접근 방식을 탐색하시겠습니까?
         특정 목표가 있다면 독특한 솔루션을 브레인스토밍하는 데 도움을 드릴 수 있습니다."
      </action>
    </check>
  </check>

<action>의사결정 기록:
카테고리: {{category}}
의사결정: {{user_choice}}
버전: {{verified_version_if_applicable}}
영향을 받는 에픽: {{list_of_affected_epics}}
근거: {{user_reasoning_or_default}}
스타터가 제공: {{yes_if_from_starter}}
</action>

<action>연쇄 영향 확인:
"이 선택은 우리가 또한 {{related_decisions}}를 필요로 한다는 것을 의미합니다"
</action>

<template-output>decision_record</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="5" goal="교차 관심사 해결">
  <critical>이러한 의사결정은 모든 에픽과 스토리에 영향을 미칩니다</critical>

<action>일관성 패턴에 대한 의사결정 촉진: - 오류 처리 전략(모든 에이전트가 오류를 어떻게 처리할까?) - 로깅 접근 방식(구조화? 형식? 수준?) - 날짜/시간 처리(시간대? 형식? 라이브러리?) - 인증 패턴(어디서? 어떻게? 토큰 형식?) - API 응답 형식(구조? 상태 코드? 오류?) - 테스팅 전략(단위? 통합? E2E?)
</action>

  <check if="{user_skill_level} == 'beginner'">
    <action>이것들이 왜 중요한지와 왜 이제 이것들을 거쳐 결정하는 것이 중요한지 설명하세요.</action>
  </check>

<template-output>cross_cutting_decisions</template-output>
</step>

<step n="6" goal="프로젝트 구조 및 경계 정의">
  <action>모든 의사결정을 기반으로 프로젝트 구조 정의</action>

<action>포괄적인 소스 트리 생성: - 루트 구성 파일 - 소스 코드 조직 - 테스트 파일 위치 - 빌드/dist 디렉토리 - 문서 구조
</action>

<action>에픽을 아키텍처 경계에 매핑:
"에픽: {{epic_name}} → {{module/directory/service}}에 위치"
</action>

<action>통합 포인트 정의: - 컴포넌트가 어디서 통신합니까? - API 경계는 무엇입니까? - 서비스가 어떻게 상호작용합니까?
</action>

<template-output>project_structure</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="7" goal="신규 아키텍처 패턴 설계" optional="true">
  <critical>일부 프로젝트는 기존 패턴을 선택하는 것이 아니라 새로운 패턴을 발명해야 합니다</critical>

<action>표준 솔루션이 없는 개념에 대해 PRD 스캔: - 신규 상호작용 패턴(예: Tinder가 존재하기 전의 "스와이프하여 매치") - 고유한 다중 컴포넌트 워크플로우(예: "바이럴 초대 시스템") - 새로운 데이터 관계(예: Facebook 전의 "소셜 그래프") - 전례 없는 사용자 경험(예: Snapchat 전의 "임시 메시지") - 여러 에픽을 넘나드는 복잡한 상태 머신
</action>

  <check if="novel_patterns_detected">
    <action>식별된 각 신규 패턴에 대해:</action>

    <action>디자인 협업에 사용자 참여:
      <check if="{user_skill_level} == 'expert'">
        "{{pattern_name}} 개념은 아키텍처 혁신이 필요합니다.

         핵심 과제: {{challenge_description}}

         컴포넌트 상호작용 모델을 설계하겠습니다:"
      </check>

      <check if="{user_skill_level} == 'beginner'">
        "{{pattern_name}}에 대한 귀하의 아이디어는 독특합니다 - 아직 이것을 구축하는 표준 방법이 없습니다!

         이것은 흥미롭습니다 - 우리가 함께 아키텍처를 발명할 수 있습니다.

         어떻게 작동해야 하는지 생각하는 데 도움을 드리겠습니다:"
      </check>
    </action>

    <action>패턴 디자인 촉진:
      1. 관련된 핵심 컴포넌트 식별
      2. 컴포넌트 간 데이터 흐름 매핑
      3. 상태 관리 접근 방식 디자인
      4. 복잡한 흐름에 대한 시퀀스 다이어그램 생성
      5. 패턴에 대한 API 계약 정의
      6. 엣지 케이스 및 실패 모드 고려
    </action>

    <action>혁신을 위한 고급 도출 사용:
      "이것을 다르게 접근한다면 어떨까요?
       - 이상적인 사용자 경험은 어떤 모습일까요?
       - 다른 도메인에서 적용할 수 있는 비유가 있습니까?
       - 도전할 수 있는 제약은 무엇입니까?"
    </action>

    <action>신규 패턴 문서화:
      패턴 이름: {{pattern_name}}
      목적: {{what_problem_it_solves}}
      컴포넌트:
        {{component_list_with_responsibilities}}
      데이터 흐름:
        {{sequence_description_or_diagram}}
      구현 가이드:
        {{how_agents_should_build_this}}
      영향을 받는 에픽:
        {{epics_that_use_this_pattern}}
    </action>

    <action>패턴 완전성 검증:
      "이 {{pattern_name}} 디자인이 에픽의 모든 사용 사례를 다룹니까?
       - {{use_case_1}}: ✓ {{component}}에 의해 처리됨
       - {{use_case_2}}: ✓ {{component}}에 의해 처리됨
       ..."
    </action>

  </check>

  <check if="no_novel_patterns">
    <action>참고: 이 프로젝트의 모든 패턴에는 확립된 솔루션이 있습니다.
            표준 아키텍처 패턴으로 진행합니다.</action>
  </check>

<template-output>novel_pattern_designs</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="8" goal="에이전트 충돌을 방지하기 위한 구현 패턴 정의">
  <critical>이러한 패턴은 여러 AI 에이전트가 호환되는 코드를 작성하도록 보장합니다</critical>
  <critical>지정하지 않으면 에이전트가 다르게 결정할 수 있는 것에 초점을 맞추세요</critical>

<action>패턴 카테고리 로드: {pattern_categories}</action>

<action>선택한 기술을 기반으로 잠재적 충돌 지점 식별:
"{{tech_stack}}를 사용하고 있으므로 에이전트는 다음에 대한 일관성 규칙이 필요합니다:"
</action>

<action>각 관련 패턴 카테고리에 대한 의사결정 촉진:

    명명 패턴(이름이 지정되는 방식):
    <check if="has_api">
      - REST 엔드포인트 명명: /users 또는 /user? 복수 또는 단수?
      - 경로 매개변수 형식: :id 또는 {id}?
    </check>
    <check if="has_database">
      - 테이블 명명: users 또는 Users 또는 user?
      - 컬럼 명명: user_id 또는 userId?
      - 외래 키 형식: user_id 또는 fk_user?
    </check>
    <check if="has_frontend">
      - 컴포넌트 명명: UserCard 또는 user-card?
      - 파일 명명: UserCard.tsx 또는 user-card.tsx?
    </check>

    구조 패턴(조직되는 방식):
    - 테스트가 어디에 있습니까? __tests__/ 또는 *.test.ts 공동 배치?
    - 컴포넌트가 어떻게 조직됩니까? 기능별 또는 유형별?
    - 공유 유틸리티가 어디로 갑니까?

    형식 패턴(데이터 교환 형식):
    <check if="has_api">
      - API 응답 래퍼? {data: ..., error: ...} 또는 직접 응답?
      - 오류 형식? {message, code} 또는 {error: {type, detail}}?
      - JSON의 날짜 형식? ISO 문자열 또는 타임스탬프?
    </check>

    통신 패턴(컴포넌트가 상호작용하는 방식):
    <check if="has_events">
      - 이벤트 명명 규칙?
      - 이벤트 페이로드 구조?
    </check>
    <check if="has_state_management">
      - 상태 업데이트 패턴?
      - 액션 명명 규칙?
    </check>

    수명 주기 패턴(상태 및 흐름):
    - 로딩 상태가 어떻게 처리됩니까?
    - 오류 복구 패턴은 무엇입니까?
    - 재시도가 어떻게 구현됩니까?

    위치 패턴(어디로 갑니까):
    - API 경로 구조?
    - 정적 자산 조직?
    - 구성 파일 위치?

    일관성 패턴(교차 관심사):
    - UI에서 날짜가 어떻게 형식화됩니까?
    - 로깅 형식은 무엇입니까?
    - 사용자 대면 오류가 어떻게 작성됩니까?

  </action>

  <check if="{user_skill_level} == 'expert'">
    <action>패턴을 빠르게 진행:
      "구현 패턴에 대한 빠른 의사결정:
       - {{pattern}}: {{suggested_convention}} 괜찮습니까? [y/n/specify]"
    </action>
  </check>

  <check if="{user_skill_level} == 'beginner'">
    <action>각 패턴의 중요성 설명:
      "왜 이것이 중요한지 설명하겠습니다:
       한 AI 에이전트가 데이터베이스 테이블 이름을 'users'로 지정하고 다른 에이전트가 'Users'로 지정하면
       앱이 충돌합니다. 한 가지 스타일을 선택하고 모든 사람이 따르도록 해야 합니다."
    </action>
  </check>

<action>구현 패턴 문서화:
카테고리: {{pattern_category}}
패턴: {{specific_pattern}}
규칙: {{decided_convention}}
예시: {{concrete_example}}
시행: "모든 에이전트는 이 패턴을 반드시 따라야 합니다"
</action>

<template-output>implementation_patterns</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="9" goal="아키텍처 일관성 검증">
  <action>일관성 확인 실행:</action>

<action>의사결정 호환성 확인: - 모든 의사결정이 함께 작동합니까? - 충돌하는 선택이 있습니까? - 버전이 올바르게 정렬됩니까?
</action>

<action>에픽 커버리지 확인: - 모든 에픽이 아키텍처 지원을 받습니까? - 모든 사용자 스토리가 이러한 의사결정으로 구현 가능합니까? - 격차가 있습니까?
</action>

<action>패턴 완전성 검증: - 에이전트가 필요로 하는 패턴을 놓쳤습니까? - 신규 패턴이 표준 아키텍처와 통합됩니까? - 구현 패턴이 충분히 포괄적입니까?
</action>

  <check if="issues_found">
    <action>{user_name}과 함께 문제 해결:
      "{{issue_description}}를 알아챘습니다.
       우리는 {{suggested_resolution}}해야 합니다."
    </action>
    <ask>이것을 어떻게 해결하시겠습니까?</ask>
    <action>해결책에 따라 의사결정 업데이트</action>
  </check>

<template-output>coherence_validation</template-output>
</step>

<step n="10" goal="의사결정 아키텍처 문서 생성">
  <critical>문서는 완전하고 구체적이며 검증 준비가 되어 있어야 합니다</critical>
  <critical>이것은 모든 AI 에이전트에 대한 일관성 계약입니다</critical>

<action>템플릿 로드: {architecture_template}</action>

<action>섹션 생성: 1. 개요(아키텍처 접근 방식에 대한 2-3문장) 2. 프로젝트 초기화(해당하는 경우 스타터 명령) 3. 의사결정 요약 표(확인된 버전 및 에픽 매핑 포함) 4. 완전한 프로젝트 구조(전체 트리, 플레이스홀더 없음) 5. 에픽에서 아키텍처 매핑(모든 에픽 배치) 6. 기술 스택 세부 정보(버전, 구성) 7. 통합 포인트(컴포넌트 연결 방법) 8. 신규 패턴 디자인(생성된 경우) 9. 구현 패턴(모든 일관성 규칙) 10. 일관성 규칙(명명, 조직, 형식) 11. 데이터 아키텍처(모델 및 관계) 12. API 계약(요청/응답 형식) 13. 보안 아키텍처(인증, 권한 부여, 데이터 보호) 14. 성능 고려사항(NFR에서) 15. 배포 아키텍처(어디서 어떻게) 16. 개발 환경(설정 및 전제 조건) 17. 아키텍처 의사결정 기록(근거가 있는 주요 의사결정)
</action>

<action>수집된 모든 의사결정 및 패턴으로 템플릿 채우기</action>

<action>스타터 명령이 첫 번째 구현 스토리인지 확인:
<check if="using_starter_template">
"## 프로젝트 초기화

       첫 번째 구현 스토리는 다음을 실행해야 합니다:
       ```bash
       {{starter_command_with_options}}
       ```

       이것은 이러한 의사결정으로 기본 아키텍처를 확립합니다:
       {{starter_provided_decisions}}"
    </check>

  </action>

<template-output>architecture_document</template-output>
<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>
</step>

<step n="11" goal="문서 완전성 검증">
  <action>검증 체크리스트 로드: {installed_path}/checklist.md</action>

<action>{installed_path}/checklist.md에서 검증 체크리스트 실행</action>

<action>필수 항목 확인:

- [] 의사결정 표에 특정 버전이 있는 버전 컬럼이 있습니다
- [] 모든 에픽이 아키텍처 컴포넌트에 매핑됩니다
- [] 소스 트리가 완전하며 일반적이지 않습니다
- [] 플레이스홀더 텍스트가 남아 있지 않습니다
- [] PRD의 모든 FR이 아키텍처 지원을 받습니다
- [] PRD의 모든 NFR이 해결됩니다
- [] 구현 패턴이 모든 잠재적 충돌을 다룹니다
- [] 신규 패턴이 완전히 문서화되었습니다(해당하는 경우)
</action>

  <check if="validation_failed">
    <action>누락된 항목을 자동으로 수정</action>
    <goto step="10">문서 섹션 재생성</goto>
  </check>

<template-output>validation_results</template-output>
</step>

<step n="12" goal="최종 검토 및 워크플로우 상태 업데이트">
  <action>완료 요약 제시:</action>

  <check if="{user_skill_level} == 'expert'">
    "아키텍처 완료. {{decision_count}}개의 의사결정이 문서화되었습니다.
     구현 단계 준비 완료."
  </check>

  <check if="{user_skill_level} == 'beginner'">
    "훌륭합니다! 아키텍처가 완료되었습니다. 앱을 빌드하는 동안 AI 에이전트를 일관되게 유지할
     {{decision_count}}개의 중요한 의사결정을 했습니다.

     다음에 일어나는 일:
     1. AI 에이전트는 각 스토리를 구현하기 전에 이 아키텍처를 읽습니다
     2. 귀하의 기술적 선택을 정확히 따릅니다
     3. 앱은 전체적으로 일관된 패턴으로 구축됩니다

     구현 단계로 이동할 준비가 되었습니다!"

  </check>

<action>{output_folder}/architecture.md에 문서 저장</action>

  <check if="standalone_mode != true">
    <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
    <action>workflow_status 키 "create-architecture" 찾기</action>
    <critical>상태 값으로 파일 경로만 작성 - 다른 텍스트, 메모 또는 메타데이터 없음</critical>
    <action>workflow_status["create-architecture"] = "{output_folder}/bmm-architecture-{{date}}.md" 업데이트</action>
    <action>상태 정의를 포함한 모든 주석 및 구조를 보존하며 파일 저장</action>

    <action>workflow_status에서 완료되지 않은 첫 번째 워크플로우 찾기(다음에 할 워크플로우)</action>
    <action>다음 워크플로우를 기반으로 경로 파일에서 다음 에이전트 결정</action>

  </check>

<output>✅ 의사결정 아키텍처 워크플로우 완료!</output>

<output>**생성된 결과물:**

- ✅ architecture.md - 완전한 아키텍처 의사결정 문서
  {{if_novel_patterns}}
- ✅ 고유한 개념에 대한 신규 패턴 디자인
  {{/if_novel_patterns}}
  {{if_starter_template}}
- ✅ 프로젝트 초기화 명령 문서화
  {{/if_starter_template}}

아키텍처는 AI 에이전트가 일관된 구현을 통해 안내할 준비가 되었습니다.

**다음 단계:**

- **다음 필수:** {{next_workflow}} ({{next_agent}} 에이전트)
- 진행하기 전에 architecture.md 문서 검토

언제든지 `workflow-status`로 상태 확인
</output>

<template-output>completion_summary</template-output>
</step>

</workflow>

# 제품 브리프 - 컨텍스트 적응형 발견 지침

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>이 워크플로우는 의도 중심 촉진을 사용합니다 - 나타나는 것에 유기적으로 적응하세요</critical>
<critical>목표는 템플릿을 채우는 것이 아니라 자연스러운 대화를 통해 중요한 것을 발견하는 것입니다</critical>
<critical>모든 응답을 {communication_language}로 전달하고 {user_skill_level}에 깊이 적응하세요</critical>
<critical>모든 문서를 {document_output_language}로 생성하세요</critical>
<critical>살아있는 문서: 발견하는 대로 지속적으로 문서에 작성하세요 - 절대 끝까지 기다리지 마세요</critical>

## 입력 문서 발견

이 워크플로우는 다음을 참조할 수 있습니다: 시장 조사, 브레인스토밍 문서, 사용자 지정 기타 입력 또는 브라운필드 프로젝트 문서.

**발견 프로세스** (참조된 각 문서에 대해 실행):

1. **먼저 전체 문서 검색** - 퍼지 파일 매칭을 사용하여 완전한 문서 찾기
2. **분할된 버전 확인** - 전체 문서를 찾지 못한 경우 `{doc-name}/index.md` 찾기
3. **분할된 버전을 찾은 경우**:
   - `index.md`를 읽어 문서 구조 이해
   - 인덱스에 나열된 모든 섹션 파일 읽기
   - 결합된 콘텐츠를 단일 문서인 것처럼 취급
4. **브라운필드 프로젝트**: `document-project` 워크플로우는 항상 `{output_folder}/docs/index.md`를 생성

**우선순위**: 전체 버전과 분할된 버전이 모두 존재하는 경우 전체 문서 사용.

**퍼지 매칭**: 문서 이름에 유연하게 - 사용자가 명명 규칙에서 변형을 사용할 수 있음.

<workflow>

<step n="0" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>{output_folder}/bmm-workflow-status.yaml이 존재하는지 확인</action>

<action if="status file not found">standalone_mode = true 설정</action>

<check if="status file found">
  <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"product-brief" 워크플로우의 상태 확인</action>
  <action>YAML 메타데이터에서 project_level 가져오기</action>
  <action>첫 번째 완료되지 않은 워크플로우 찾기 (다음 예상 워크플로우)</action>

  <check if="project_level < 2">
    <output>**참고: 레벨 {{project_level}} 프로젝트**

제품 브리프는 레벨 2+ 프로젝트에 가장 가치가 있지만 모든 프로젝트의 비전을 명확히 하는 데 도움이 될 수 있습니다.</output>
</check>

  <check if="product-brief status is file path (already completed)">
    <output>⚠️ 제품 브리프가 이미 완료됨: {{product-brief status}}</output>
    <ask>재실행하면 기존 브리프를 덮어씁니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. workflow-status를 사용하여 다음 단계를 확인하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

  <check if="product-brief is not the next expected workflow">
    <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. 제품 브리프가 순서를 벗어났습니다.</output>
    <ask>제품 브리프를 계속 진행하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false 설정</action>
</check>
</step>

<step n="1" goal="여정 시작 및 컨텍스트 이해">
<action>{communication_language}로 {user_name}님을 따뜻하게 환영합니다

{user_skill_level}에 맞게 톤을 조정합니다:

- 전문가: "제품 비전을 정의해 봅시다. 무엇을 구축하고 계신가요?"
- 중급: "제품 비전을 형성하는 데 도움을 드리겠습니다. 아이디어에 대해 말씀해 주세요."
- 초보자: "안녕하세요! 정확히 무엇을 구축하고 싶은지 알아내는 데 도움을 드리겠습니다. 아이디어부터 시작해 봅시다 - 무엇이 이것에 대해 흥분하게 만들었나요?"

개방형 탐색으로 시작:

- 이 아이디어를 촉발한 것은 무엇인가요?
- 무엇을 구축하고 싶으신가요?
- 이것은 누구를 위한 것인가요 - 본인, 비즈니스, 아는 사용자?

중요: 그들의 상황을 드러내는 컨텍스트 단서를 들으세요:

- 개인/취미 프로젝트 (재미, 학습, 소규모 청중)
- 스타트업/솔로프레너 (시장 기회, 경쟁 중요)
- 기업/법인 (이해관계자, 규정 준수, 전략적 조정)
- 기술적 열정 (구현 중심)
- 비즈니스 기회 (시장/수익 중심)
- 문제 좌절 (솔루션 중심)

초기 응답을 기반으로 다음을 감지:

- 얼마나 공식적/캐주얼하게 하고 싶은지
- 비즈니스 또는 기술적 용어로 생각하는지
- 공유할 기존 자료가 있는지
- 도메인에 대한 자신감 수준</action>

<ask>프로젝트 이름은 무엇이며, 이것을 구축하는 데 흥분하게 만든 것은 무엇인가요?</ask>

<action>이 첫 번째 교환에서도 초기 문서 섹션 생성</action>
<template-output>project_name</template-output>
<template-output>executive_summary</template-output>

<action>기존 문서(연구, 브레인스토밍 등)를 언급한 경우:

- 이러한 자료를 로드하고 분석
- 주요 테마와 인사이트 추출
- 대화에서 자연스럽게 참조: "귀하의 연구에서..."
- 질문을 반복하지 않고 발견을 가속화하는 데 사용</action>

<template-output>initial_vision</template-output>
</step>

<step n="2" goal="해결할 가치가 있는 문제 발견">
<action>자연스러운 대화를 통해 문제 발견을 안내합니다

묻지 마세요: "이것이 어떤 문제를 해결하나요?"

컨텍스트를 기반으로 대화식으로 탐색하세요:

취미 프로젝트의 경우:

- "이것이 고칠 수 있는 성가신 것은 무엇인가요?"
- "이것이 무엇을 더 쉽거나 재미있게 만들까요?"
- "오늘 이것 없이 경험이 어떤지 보여주세요"

비즈니스 벤처의 경우:

- "오늘 사용자가 직면하는 좌절을 설명해 주세요"
- "이 문제의 비용은 무엇인가요 - 시간, 돈, 기회?"
- "누가 이것으로 가장 고통받고 있나요? 그들에 대해 말씀해 주세요"
- "사람들이 어떤 솔루션을 시도했나요? 왜 작동하지 않나요?"

기업의 경우:

- "내부적으로 이것에 대한 필요를 주도하는 것은 무엇인가요?"
- "어떤 팀/프로세스가 가장 영향을 받나요?"
- "이것을 해결하지 않는 것의 비즈니스 영향은 무엇인가요?"
- "규정 준수 또는 전략적 동인이 있나요?"

깊이 단서를 듣습니다:

- 짧은 답변 → 후속 질문으로 더 깊이 파고듦
- 자세한 열정 → 흐르게 하고 모든 것을 캡처
- 불확실성 → 예시로 탐색 돕기
- 여러 문제 → 핵심 문제 우선순위 지정 돕기

응답을 조정합니다:

- 어려움을 겪는 경우: 유추, 예시, 프레임워크 제공
- 명확한 경우: 검증하고 구체적인 것을 요구
- 기술적인 경우: 구현 과제 탐색
- 비즈니스 중심인 경우: 영향 정량화</action>

<action>나타나는 것을 즉시 캡처 - 예비적이더라도</action>
<template-output>problem_statement</template-output>

<check if="user mentioned metrics, costs, or business impact">
  <action>문제의 측정 가능한 영향 탐색</action>
  <template-output>problem_impact</template-output>
</check>

<check if="user mentioned current solutions or competitors">
  <action>기존 솔루션이 부족한 이유 이해</action>
  <template-output>existing_solutions_gaps</template-output>
</check>

<action>이해를 반영: "핵심 문제는 {{problem_summary}}이며, {{impact_if_mentioned}}입니다. 이것을 캡처하겠습니다..."</action>
</step>

<step n="3" goal="솔루션 비전 형성">
<action>문제에서 솔루션으로 자연스럽게 전환합니다

에너지와 컨텍스트를 기반으로 탐색:

빌더/메이커의 경우:

- "이것이 어떻게 작동하기를 상상하나요?"
- "만들고 싶은 경험을 설명해 주세요"
- "누군가 이것을 사용할 때 '마법의 순간'은 무엇인가요?"

비즈니스 마인드의 경우:

- "이것을 해결하기 위한 독특한 접근 방식은 무엇인가요?"
- "오늘날 존재하는 것과 어떻게 다른가요?"
- "이것이 지금 올바른 솔루션인 이유는 무엇인가요?"

기업의 경우:

- "조직에 대한 성공은 어떻게 보일까요?"
- "이것이 기존 시스템/프로세스와 어떻게 맞나요?"
- "활성화하고 있는 변환은 무엇인가요?"

응답을 기반으로 더 깊이 들어갑니다:

- 혁신적인 경우 → 독특한 각도 탐색
- 표준인 경우 → 실행 우수성에 집중
- 기술적인 경우 → 주요 기능 논의
- 사용자 중심인 경우 → 여정 그리기

관련 시 웹 연구:

- 경쟁자를 언급하는 경우 → 현재 솔루션 연구
- 혁신을 주장하는 경우 → 독창성 확인
- 트렌드를 참조하는 경우 → 현재 데이터 가져오기</action>

<action if="competitor or market mentioned">
  <WebSearch>{{competitor/market}} latest features 2024</WebSearch>
  <action>결과를 사용하여 차별화 논의 강화</action>
</action>

<template-output>proposed_solution</template-output>

<check if="unique differentiation discussed">
  <template-output>key_differentiators</template-output>
</check>

<action>살아있는 문서를 계속 구축</action>
</step>

<step n="4" goal="이것을 필요로 하는 사람들 이해">
<action>인구통계가 아닌 스토리텔링을 통해 대상 사용자 발견

프로젝트 유형에 따라 촉진:

개인/취미:

- "귀하 외에 누가 이것을 좋아할까요?"
- "이것을 사용할 누군가에 대해 말씀해 주세요"
- 가볍고 비공식적으로 유지

스타트업/비즈니스:

- "이상적인 첫 고객을 설명하세요 - 인구통계가 아니라 그들의 상황"
- "솔루션 없이 오늘 무엇을 하고 있나요?"
- "무엇이 그들로 하여금 '마침내, 누군가 이해한다!'라고 말하게 만들까요?"
- "다른 요구를 가진 다른 유형의 사용자가 있나요?"

기업:

- "어떤 역할/부서가 이것을 사용할까요?"
- "현재 워크플로우를 설명해 주세요"
- "챔피언 대 회의론자는 누구인가요?"
- "간접 이해관계자는 어떤가요?"

일반적인 페르소나를 넘어서 밀어붙입니다:

- "바쁜 전문가"가 아니라 → "데이터 입력에 하루 2시간을 낭비하는 영업 담당자"
- "기술에 정통한 사용자"가 아니라 → "Docker를 알지만 구성하기 싫어하는 개발자"
- "중소기업"이 아니라 → "월 $10-50k를 하는 Shopify 스토어가 확장을 원함"

나타나는 각 사용자 유형에 대해:

- 현재 행동/워크플로우
- 구체적인 좌절
- 가장 가치 있게 여기는 것
- 기술적 편안함 수준</action>

<template-output>primary_user_segment</template-output>

<check if="multiple user types mentioned">
  <action>진정으로 다른 요구가 있는 경우에만 보조 사용자 탐색</action>
  <template-output>secondary_user_segment</template-output>
</check>

<check if="user journey or workflow discussed">
  <template-output>user_journey</template-output>
</check>
</step>

<step n="5" goal="성공이 어떻게 보이는지 정의" repeat="adapt-to-context">
<action>컨텍스트와 일치하는 성공 측정 탐색

개인 프로젝트의 경우:

- "이것이 잘 작동하는지 어떻게 알 수 있나요?"
- "무엇이 이것을 자랑스럽게 만들까요?"
- 메트릭을 간단하고 의미 있게 유지

스타트업의 경우:

- "이것이 도약하고 있다고 확신할 수 있는 메트릭은 무엇인가요?"
- "사용자가 좋아한다는 것을 보여주는 행동은 무엇인가요?"
- "가장 중요한 비즈니스 메트릭은 무엇인가요 - 사용자, 수익, 유지?"
- 구체적인 목표를 밀어붙입니다: "많은 사용자"가 아니라 "100명의 사용자"

기업의 경우:

- "조직이 성공을 어떻게 측정할까요?"
- "이해관계자가 관심을 가질 KPI는 무엇인가요?"
- "필수 메트릭 대 선호 메트릭은 무엇인가요?"

관심을 보이는 경우에만 메트릭에 깊이 들어갑니다
순수 취미 프로젝트는 완전히 건너뜁니다
그들이 측정하는 데 관심 있는 것에 집중합니다</action>

<check if="metrics or goals discussed">
  <template-output>success_metrics</template-output>

  <check if="business objectives mentioned">
    <template-output>business_objectives</template-output>
  </check>

  <check if="KPIs matter to them">
    <template-output>key_performance_indicators</template-output>
  </check>
</check>

<action>각 발견으로 문서를 계속 성장시킵니다</action>
</step>

<step n="6" goal="MVP 범위 발견">
<critical>에픽이 아닌 기능에 집중 - 그것은 2단계에서 옵니다</critical>

<action>성숙도에 따라 MVP 범위 안내

실험적/취미의 경우:

- "유용하기 위해 반드시 해야 하는 한 가지는 무엇인가요?"
- "재미있는 첫 번째 버전은 무엇일까요?"
- 단순성을 포용

비즈니스 벤처의 경우:

- "가설을 증명하는 가장 작은 버전은 무엇인가요?"
- "얼리 어답터가 '충분히 좋다'고 말하게 만드는 기능은 무엇인가요?"
- "추가하고 싶지만 속도를 늦출 수 있는 것은 무엇인가요?"
- 범위 크립에 대해 무자비하게

기업의 경우:

- "가치를 입증하는 파일럿 범위는 무엇인가요?"
- "초기 출시에 필수적인 기능은 무엇인가요?"
- "2단계로 연기할 수 있는 것은 무엇인가요?"

이 프레이밍 사용:

- 핵심 기능: "이것 없이는 제품이 작동하지 않습니다"
- 선호: "이것은 좋겠지만 없이도 출시할 수 있습니다"
- 미래 비전: "결국 여기로 가고 있습니다"

기능 크립에 도전:

- "출시에 필요한가요, 아니면 나중에 올 수 있나요?"
- "없이 시작하면 무엇이 깨지나요?"
- "이것이 개념을 증명하는 핵심인가요?"</action>

<template-output>core_features</template-output>

<check if="scope creep discussed">
  <template-output>out_of_scope</template-output>
</check>

<check if="future features mentioned">
  <template-output>future_vision_features</template-output>
</check>

<check if="success criteria for MVP mentioned">
  <template-output>mvp_success_criteria</template-output>
</check>
</step>

<step n="7" goal="관련 컨텍스트 차원 탐색" repeat="until-natural-end">
<critical>자연스럽게 나타나는 것만 탐색 - 중요하지 않은 것은 건너뜁니다</critical>

<action>지금까지의 대화를 기반으로 선택적으로 탐색:

재정적 측면이 나타나면:

- 필요한 개발 투자
- 수익 잠재력 또는 비용 절감
- ROI 타임라인
- 예산 제약
  <check if="discussed">
  <template-output>financial_considerations</template-output>
  </check>

시장 경쟁이 언급되면:

- 경쟁 환경
- 시장 기회 규모
- 차별화 전략
- 시장 타이밍
  <check if="discussed">
  <WebSearch>{{market}} size trends 2024</WebSearch>
  <template-output>market_analysis</template-output>
  </check>

기술적 선호도가 나타나면:

- 플랫폼 선택 (웹/모바일/데스크톱)
- 기술 스택 선호도
- 통합 필요
- 성능 요구사항
  <check if="discussed">
  <template-output>technical_preferences</template-output>
  </check>

조직 컨텍스트가 나타나면:

- 전략적 정렬
- 이해관계자 동의 필요
- 변경 관리 고려사항
- 규정 준수 요구사항
  <check if="discussed">
  <template-output>organizational_context</template-output>
  </check>

위험 또는 우려가 제기되면:

- 주요 위험 및 완화
- 중요한 가정
- 추가 연구가 필요한 미해결 질문
  <check if="discussed">
  <template-output>risks_and_assumptions</template-output>
  </check>

타임라인 압박이 언급되면:

- 출시 타임라인
- 중요한 이정표
- 종속성
  <check if="discussed">
  <template-output>timeline_constraints</template-output>
  </check>

자연스럽게 나타나지 않은 것은 건너뜁니다
컨텍스트에 맞지 않는 섹션을 강제하지 마세요</action>
</step>

<step n="8" goal="살아있는 문서 다듬기 및 완성">
<action>사용자와 함께 캡처된 내용 검토

"함께 구축한 것을 보여드리겠습니다..."

지금까지 생성된 실제 문서 섹션 제시

- 요약이 아니라 실제 콘텐츠
- 문서가 전반에 걸쳐 성장하고 있음을 보여줍니다

질문:
"이것을 보면 가장 중요한 것은 무엇인가요?"
"탐색하지 않은 중요한 것이 있나요?"
"이것이 귀하의 비전을 포착하나요?"

응답에 따라:

- 더 깊이 필요한 섹션 다듬기
- 누락된 중요한 요소 추가
- 중요하지 않은 섹션 제거 또는 단순화
- 템플릿이 아니라 그들의 요구에 맞는 문서 보장</action>

<action>피드백을 기반으로 최종 다듬기 수행</action>
<template-output>final_refinements</template-output>

<action>본질을 포착하는 요약 생성</action>
<template-output>executive_summary</template-output>
</step>

<step n="9" goal="제품 브리프 완성 및 저장">
<action>문서는 대화 전반에 걸쳐 구축되었습니다
이제 완전하고 잘 정리되어 있는지 확인합니다</action>

<check if="research documents were provided">
  <action>통합된 연구 요약 추가</action>
  <template-output>supporting_materials</template-output>
</check>

<action>발견된 것에 맞게 문서 구조가 의미 있는지 확인:

- 취미 프로젝트는 문제/솔루션/기능에 중점을 둔 2-3페이지일 수 있습니다
- 스타트업 벤처는 시장 분석 및 메트릭이 포함된 5-7페이지일 수 있습니다
- 기업 브리프는 전체 전략적 컨텍스트가 포함된 10페이지 이상일 수 있습니다

문서는 그들의 세계를 반영해야 하며 세계를 템플릿에 강제하지 않아야 합니다</action>

<ask>제품 브리프가 준비되었습니다! 원하시는 것:

1. 특정 섹션을 함께 검토
2. 최종 조정 수행
3. 저장하고 앞으로 나아가기

어떤 것이 맞나요?</ask>

<action>요청된 다듬기 수행</action>
<template-output>final_document</template-output>
</step>

<check if="standalone_mode != true">
  <action>전체 파일 로드: {output_folder}/bmm-workflow-status.yaml</action>
  <action>workflow_status 키 "product-brief" 찾기</action>
  <critical>파일 경로만 상태 값으로 작성 - 다른 텍스트, 메모 또는 메타데이터 없음</critical>
  <action>workflow_status["product-brief"] = "{output_folder}/bmm-product-brief-{{project_name}}-{{date}}.md" 업데이트</action>
  <action>상태 정의를 포함한 모든 주석 및 구조를 보존하여 파일 저장</action>

<action>workflow_status에서 첫 번째 완료되지 않은 워크플로우 찾기 (다음 할 워크플로우)</action>
<action>다음 워크플로우를 기반으로 경로 파일에서 다음 에이전트 결정</action>
</check>

<output>**✅ 제품 브리프 완료, {user_name}님!**

귀하의 제품 비전이 {{context_type}} 프로젝트에 가장 중요한 것을 반영하는 문서에 캡처되었습니다.

**저장된 문서:** {output_folder}/bmm-product-brief-{{project_name}}-{{date}}.md

{{#if standalone_mode != true}}
**다음 단계:** {{next_workflow}} ({{next_agent}} 에이전트)

다음 단계는 브리프를 가져와 구현에 필요한 자세한 계획 아티팩트를 생성합니다.
{{else}}
**다음 단계:**

- 안내된 워크플로우 추적을 설정하려면 `workflow-init` 실행
- 또는 경로를 알고 있다면 PRD 워크플로우로 직접 진행
  {{/if}}

기억하세요: 이 브리프는 귀하의 비전을 캡처합니다. 엄격한 템플릿이 아니라 대화에서 성장했습니다. 아이디어를 실현하는 다음 단계를 안내할 준비가 되었습니다.
</output>
</step>

</workflow>

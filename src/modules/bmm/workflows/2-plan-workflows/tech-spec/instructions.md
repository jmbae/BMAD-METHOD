# Tech-Spec 워크플로우 - 컨텍스트 인식 기술 기획 (퀵 플로우)

<workflow>

<critical>워크플로우 실행 엔진은 다음에 의해 제어됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>반드시 이미 로드하고 처리해야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 응답은 {communication_language}로 통신하며 언어는 반드시 {user_skill_level}에 맞춰져야 합니다</critical>
<critical>모든 문서는 {document_output_language}로 생성합니다</critical>
<critical>퀵 플로우 작업입니다 - 컨텍스트가 풍부한 스토리 생성을 포함한 기술 사양</critical>
<critical>퀵 플로우: 기술 사양 + 1-5개의 스토리를 포함한 에픽 (항상 에픽 구조 생성)</critical>
<critical>살아있는 문서: 발견하는 대로 tech-spec.md에 지속적으로 작성 - 끝까지 기다리지 마세요</critical>
<critical>컨텍스트가 왕입니다: 사양 생성 전에 사용 가능한 모든 컨텍스트를 수집하세요</critical>
<critical>문서 출력: 기술적이고, 정확하고, 확정적이어야 합니다. 특정 버전만 사용합니다. 사용자 숙련도 ({user_skill_level})는 대화 스타일에만 영향을 주며 문서 내용에는 영향을 주지 않습니다.</critical>
<critical>입력 문서는 workflow.yaml의 input_file_patterns에 지정됨 - 워크플로우 엔진이 자동으로 퍼지 매칭, 전체 vs 샤딩된 문서 발견을 처리합니다</critical>

<step n="0" goal="워크플로우 준비 상태 검증 및 프로젝트 레벨 감지" tag="workflow-status">
<action>{output_folder}/bmm-workflow-status.yaml이 존재하는지 확인</action>

<check if="status file not found">
  <output>워크플로우 상태 파일을 찾을 수 없습니다. Tech-spec 워크플로우는 독립 실행 모드 또는 BMM 워크플로우 경로의 일부로 실행할 수 있습니다.</output>
  <output>**권장사항:** 프로젝트 컨텍스트 추적 및 워크플로우 순서를 위해 먼저 `workflow-init`를 실행하세요.</output>
  <output>**빠른 시작:** 독립 실행 모드로 계속 - 빠른 프로토타이핑과 신속한 변경에 적합합니다!</output>
  <ask>독립 실행 모드로 계속하시겠습니까, 아니면 workflow-init를 실행하기 위해 종료하시겠습니까? (continue/exit)</ask>
  <check if="continue">
    <action>standalone_mode = true로 설정</action>

    <output>좋습니다! 프로젝트를 빠르게 구성해 봅시다...</output>

    <ask>이 작업에 몇 개의 사용자 스토리가 필요하다고 생각하시나요?

**단일 스토리** - 간단한 변경 (버그 수정, 작은 독립 기능, 단일 파일 변경)
→ 생성: 기술 사양 + 에픽 (최소) + 1개 스토리
→ 예시: "로그인 유효성 검증 버그 수정" 또는 "사용자 폼에 이메일 필드 추가"

**복수 스토리 (2-5개)** - 일관된 기능 (여러 관련 변경, 작은 기능 세트)
→ 생성: 기술 사양 + 에픽 (상세) + 2-5개 스토리
→ 예시: "OAuth 통합 추가" 또는 "사용자 프로필 페이지 구축"

단일 스토리의 경우 **1**을, 또는 예상하는 스토리 수 **2-5**를 입력하세요</ask>

    <action>사용자 응답을 story_count (1-5)로 캡처</action>
    <action>검증: 1-5가 아니면 명확화 요청. > 5이면 전체 BMad Method 사용 제안</action>

    <ask if="not already known greenfield vs brownfield">이것이 **greenfield** (새로운/빈 코드베이스) 프로젝트입니까, 아니면 **brownfield** (기존 코드베이스) 프로젝트입니까?

    **Greenfield** - 스타터 템플릿 외에 기존 코드가 없는 새로 시작
    **Brownfield** - 기존 기능 코드 또는 프로젝트에 추가하거나 수정

    **greenfield** 또는 **brownfield**를 입력하세요:</ask>

    <action>사용자 응답을 field_type (greenfield 또는 brownfield)으로 캡처</action>
    <action>검증: greenfield 또는 brownfield가 아니면 다시 질문</action>

    <output>완벽합니다! 다음으로 실행합니다:

- **스토리 수:** {{story_count}} {{#if story_count == 1}}스토리 (최소 에픽){{else}}스토리 (상세 에픽){{/if}}
- **필드 타입:** {{field_type}}
- **모드:** 독립 실행 (상태 파일 추적 없음)

기술 사양을 작성해봅시다!</output>
</check>
<check if="exit">
<action>워크플로우 종료</action>
</check>
</check>

<check if="status file found">
  <action>전체 파일 로드: {workflow-status}</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"tech-spec" 워크플로우의 상태 확인</action>
  <action>YAML 메타데이터에서 selected_track 가져오기 - quick-flow-greenfield 또는 quick-flow-brownfield 표시</action>
  <action>YAML 메타데이터에서 field_type 가져오기 (greenfield 또는 brownfield)</action>
  <action>첫 번째 미완료 워크플로우 찾기 (다음 예상 워크플로우)</action>

  <check if="selected_track is NOT quick-flow-greenfield AND NOT quick-flow-brownfield">
    <output>**레벨 {{selected_track}}에 대한 잘못된 워크플로우**
    Tech-spec은 Simple 프로젝트용입니다. **올바른 워크플로우:** `create-prd` (PM 에이전트). 이 워크플로우를 강제로 실행하려는 것이 아니라면 이 시점에서 종료해야 합니다.
</output>
</check>

  <check if="tech-spec status is file path (already completed)">
    <output>⚠️ Tech-spec이 이미 완료되었습니다: {{tech-spec status}}</output>
    <ask>다시 실행하면 기존 tech-spec을 덮어씁니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 다음 단계를 보려면 workflow-status를 사용하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

  <check if="tech-spec is not the next expected workflow">
    <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. Tech-spec이 순서에 맞지 않습니다.</output>
    <ask>어쨌든 tech-spec을 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false로 설정</action>
</check>
</step>

<step n="1" goal="포괄적인 컨텍스트 발견 - 사용 가능한 모든 것을 수집">

<action>{user_name}에게 따뜻하게 환영하고 우리가 하려는 것을 설명:

"기술 사양을 작성하기 전에 프로젝트에 대한 모든 사용 가능한 컨텍스트를 수집하겠습니다. 여기에는 다음이 포함됩니다:

- 기존 문서 (제품 브리프, 연구)
- Brownfield 코드베이스 분석 (해당하는 경우)
- 프로젝트의 기술 스택 및 종속성
- 기존 코드 패턴 및 구조

이를 통해 기술 사양이 현실에 기반하고 개발자에게 필요한 모든 것을 제공합니다."
</action>

<action>**1단계: 기존 문서 로드**

검색하고 로드 (이중 전략 사용: 먼저 전체, 그 다음 샤딩):

1. **제품 브리프:**
   - 검색 패턴: {output-folder}/_brief_.md
   - 샤딩됨: {output-folder}/_brief_/index.md
   - 발견 시: 완전히 로드하고 주요 컨텍스트 추출

2. **연구 문서:**
   - 검색 패턴: {output-folder}/_research_.md
   - 샤딩됨: {output-folder}/_research_/index.md
   - 발견 시: 완전히 로드하고 인사이트 추출

3. **Document-Project 출력 (Brownfield에 중요):**
   - 항상 확인: {output_folder}/docs/index.md
   - 발견 시: 이것은 brownfield 코드베이스 맵 - 모든 샤드 로드!
   - 추출: 파일 구조, 주요 모듈, 기존 패턴, 명명 규칙

발견된 내용의 요약을 작성하고 계속하기 전에 고려할 다른 문서나 정보가 있는지 사용자에게 질문:

- 로드된 문서 목록
- 각각의 주요 인사이트
- Brownfield vs greenfield 결정
  </action>

<action>**2단계: 프로젝트 스택을 지능적으로 감지**

코딩 가능한 LLM으로서의 포괄적인 지식을 사용하여 프로젝트 분석:

**설정 파일 발견:**

- {project-root}에서 종속성 매니페스트 검색 (package.json, requirements.txt, Gemfile, go.mod, Cargo.toml, composer.json, pom.xml, build.gradle, pyproject.toml 등)
- 모든 프로젝트 유형에 적응 - 생태계 관례를 알고 있음

**중요 정보 추출:**

1. 프레임워크 이름 및 정확한 버전 (예: "React 18.2.0", "Django 4.2.1")
2. 특정 버전이 있는 모든 프로덕션 종속성
3. 개발 도구 및 테스트 프레임워크 (Jest, pytest, ESLint 등)
4. 사용 가능한 빌드/테스트 스크립트
5. 프로젝트 유형 (웹 앱, API, CLI, 라이브러리 등)

**최신성 평가:**

- 주요 종속성이 오래되었는지 확인 (>2년 경과)
- 필요한 경우 WebSearch를 사용하여 현재 권장 버전 찾기
- 요약에서 마이그레이션 복잡성 언급

**Greenfield 프로젝트의 경우:**
<check if="field_type == greenfield">
<action>WebSearch를 사용하여 현재 모범 사례 및 공식 스타터 템플릿 발견</action>
<action>감지된 프레임워크 (또는 사용자의 의도된 스택)를 기반으로 적절한 스타터 권장</action>
<action>대화식으로 이점 제시: 절약된 설정 시간, 현대적인 패턴, 포함된 테스팅</action>
<ask>스타터 템플릿을 사용하시겠습니까? (yes/no/show-me-options)</ask>
<action>선호도를 캡처하고 수락되면 구현 스택에 포함</action>
</check>

**귀하의 지능을 신뢰하세요:**
프로젝트 생태계를 깊이 이해하고 있습니다. 어떤 스택에도 분석을 적응시키세요 - 예시에 제약받지 마세요. 개발자에게 중요한 것을 추출하세요.

포괄적인 발견사항을 {{project_stack_summary}}로 저장
</action>

<action>**3단계: Brownfield 코드베이스 정찰** (해당하는 경우)

<check if="field_type == brownfield OR document-project output found">

기존 프로젝트 구조 분석:

1. **디렉토리 구조:**
   - 주요 코드 디렉토리 식별 (src/, lib/, app/, components/, services/)
   - 조직 패턴 주목 (기능 기반, 레이어 기반, 도메인 주도)
   - 테스트 디렉토리 및 패턴 식별

2. **코드 패턴:**
   - 지배적인 패턴 찾기 (클래스 기반, 함수형, MVC, 마이크로서비스)
   - 명명 규칙 식별 (camelCase, snake_case, PascalCase)
   - 파일 조직 패턴 주목

3. **주요 모듈/서비스:**
   - 이미 있는 주요 모듈 또는 서비스 식별
   - 진입점 주목 (main.js, app.py, index.ts)
   - 중요한 유틸리티 또는 공유 코드 문서화

4. **테스트 패턴 및 표준 (중요):**
   - 사용 중인 테스트 프레임워크 식별 (package.json/requirements.txt에서)
   - 테스트 파일 명명 패턴 주목 (.test.js, \_test.py, .spec.ts, Test.java)
   - 테스트 조직 문서화 (tests/, **tests**, spec/, test/)
   - 테스트 구성 파일 찾기 (jest.config.js, pytest.ini, .rspec)
   - 커버리지 요구사항 확인 (CI 구성, 테스트 스크립트에서)
   - 모킹/스터빙 라이브러리 식별 (jest.mock, unittest.mock, sinon)
   - 단언 스타일 주목 (expect, assert, should)

5. **코드 스타일 및 규칙 (준수 필수):**
   - 린터 구성 확인 (.eslintrc, .pylintrc, rubocop.yml)
   - 포매터 구성 확인 (.prettierrc, .black, .editorconfig)
   - 코드 스타일 식별:
     - 세미콜론: yes/no (JavaScript/TypeScript)
     - 따옴표: 단일/이중
     - 들여쓰기: 공백/탭, 크기
     - 줄 길이 제한
   - Import/export 패턴 (명명 vs 기본, 조직)
   - 오류 처리 패턴 (try/catch, Result 타입, 오류 클래스)
   - 로깅 패턴 (console, winston, 로깅 모듈, 특정 형식)
   - 문서화 스타일 (JSDoc, docstrings, YARD, JavaDoc)

이것을 {{existing_structure_summary}}로 저장

**중요: 사용자와 규칙 확인**
<ask>코드베이스에서 이러한 규칙을 감지했습니다:

**코드 스타일:**
{{detected_code_style}}

**테스트 패턴:**
{{detected_test_patterns}}

**파일 조직:**
{{detected_file_organization}}

새 코드에 대해 이러한 기존 규칙을 따라야 할까요?

기존 패턴을 따르려면 **yes**를, 새로운 표준을 설정하려면 **no**를 입력하세요:</ask>

<action>사용자 응답을 conform_to_conventions (yes/no)로 캡처</action>

<check if="conform_to_conventions == no">
  <ask>대신 어떤 규칙을 사용하시겠습니까? (아니면 현대적인 모범 사례를 제안해 드릴까요?)</ask>
  <action>새 규칙 캡처 또는 현재 모범 사례를 위해 WebSearch 사용</action>
</check>

<action>확인된 규칙을 {{existing_conventions}}로 저장</action>

</check>

<check if="field_type == greenfield">
  <action>참고: Greenfield 프로젝트 - 분석할 기존 코드 없음</action>
  <action>{{existing_structure_summary}} = "Greenfield 프로젝트 - 새 코드베이스"로 설정</action>
</check>

</action>

<action>**4단계: 컨텍스트 요약 종합**

다음을 포함하는 {{loaded_documents_summary}} 생성:

- 발견되고 로드된 문서
- Brownfield vs greenfield 상태
- 감지된 기술 스택 (greenfield인 경우 "결정 예정")
- 식별된 기존 패턴 (해당하는 경우 "없음 - greenfield")

이 요약을 {user_name}에게 대화식으로 제시:

"프로젝트에 대해 발견한 내용은 다음과 같습니다:

**사용 가능한 문서:**
[발견된 내용 나열]

**프로젝트 유형:**
[X 프레임워크 Y 버전이 있는 Brownfield 또는 Greenfield - 새 프로젝트]

**기존 스택:**
[프레임워크 및 종속성 또는 "결정 예정"]

**코드 구조:**
[기존 패턴 또는 "새 코드베이스"]

이를 통해 컨텍스트가 풍부한 기술 사양을 생성하기 위한 견고한 기반을 갖추게 됩니다!"
</action>

<template-output>loaded_documents_summary</template-output>
<template-output>project_stack_summary</template-output>
<template-output>existing_structure_summary</template-output>

</step>

<step n="2" goal="변경/기능의 대화식 발견">

<action>{user_name}과 자연스럽고 적응적인 대화에 참여하여 구축해야 할 것을 깊이 이해합니다.

**발견 접근방식:**
복잡성에 따라 질문 스타일 조정:

- 단일 스토리 변경의 경우: 특정 문제, 위치, 접근 방식에 집중
- 복수 스토리 기능의 경우: 사용자 가치, 통합 전략, 범위 경계 탐색

**핵심 발견 목표 (자연스러운 대화를 통해 달성):**

1. **문제/필요성**
   - 우리가 해결하는 사용자 또는 기술적 문제는 무엇인가요?
   - 이것이 지금 중요한 이유는 무엇인가요?
   - 이것을 하지 않으면 어떤 영향이 있나요?

2. **해결 방법**
   - 제안된 솔루션은 무엇인가요?
   - 사용자/시스템 관점에서 어떻게 작동해야 하나요?
   - 고려된 대안은 무엇인가요?

3. **통합 및 위치**
   - <check if="brownfield">기존 코드베이스에서 이것이 어디에 맞나요?</check>
   - 참조하거나 따라야 할 기존 코드/패턴은 무엇인가요?
   - 통합 지점은 무엇인가요?

4. **범위 명확성**
   - 이 작업의 범위 내에 있는 것은 무엇인가요?
   - 명시적으로 범위 밖인 것은 무엇인가요 (향후 작업, 필요 없음)?
   - 복수 스토리인 경우: MVP vs 향상?

5. **제약 및 종속성**
   - 기술적 제한 또는 요구사항?
   - 다른 시스템, API 또는 서비스에 대한 종속성?
   - 성능, 보안 또는 규정 준수 고려사항?

6. **성공 기준**
   - 이것이 올바르게 완료되었는지 어떻게 알 수 있나요?
   - "작동"은 어떻게 보이나요?
   - 중요한 엣지 케이스는 무엇인가요?

**대화 스타일:**

- 따뜻하고 협력적이며 심문 방식이 아님
- 그들의 응답을 기반으로 후속 질문
- 그들이 의미를 생각하도록 돕기
- 1단계의 컨텍스트 참조 (기존 코드, 스택, 패턴)
- {{story_count}} 복잡성에 깊이 조정

발견사항을 명확하고 포괄적인 사양으로 종합합니다.
</action>

<template-output>problem_statement</template-output>
<template-output>solution_overview</template-output>
<template-output>change_type</template-output>
<template-output>scope_in</template-output>
<template-output>scope_out</template-output>

</step>

<step n="3" goal="컨텍스트 인식 확정적 기술 사양 생성">

<critical>모든 기술적 결정은 확정적이어야 합니다 - 모호함은 허용되지 않습니다</critical>
<critical>기존 스택 정보를 사용하여 특정 결정을 내리세요</critical>
<critical>구현을 안내하기 위해 brownfield 코드 참조</critical>

<action>풍부한 템플릿으로 tech-spec.md 초기화</action>

<action>**컨텍스트 섹션 생성 (이미 캡처됨):**

이러한 템플릿 변수는 1단계에서 이미 채워졌습니다:

- {{loaded_documents_summary}}
- {{project_stack_summary}}
- {{existing_structure_summary}}

파일에 저장하기만 하면 됩니다.
</action>

<template-output file="tech-spec.md">loaded_documents_summary</template-output>
<template-output file="tech-spec.md">project_stack_summary</template-output>
<template-output file="tech-spec.md">existing_structure_summary</template-output>

<action>**변경 섹션 생성:**

2단계에서 이미 캡처됨:

- {{problem_statement}}
- {{solution_overview}}
- {{scope_in}}
- {{scope_out}}

파일에 저장.
</action>

<template-output file="tech-spec.md">problem_statement</template-output>
<template-output file="tech-spec.md">solution_overview</template-output>
<template-output file="tech-spec.md">scope_in</template-output>
<template-output file="tech-spec.md">scope_out</template-output>

<action>**구현 세부사항 생성:**

이제 수집된 모든 컨텍스트를 사용하여 확정적 기술 결정을 내립니다.

**소스 트리 변경 - 구체적으로:**

나쁜 예 (절대 하지 마세요):

- "서비스 폴더의 일부 파일 업데이트"
- "어딘가에 테스트 추가"

좋은 예 (항상 이렇게):

- "src/services/UserService.ts - 수정 - 45번 줄에 validateEmail() 메서드 추가"
- "src/routes/api/users.ts - 수정 - POST /users/validate 엔드포인트 추가"
- "tests/services/UserService.test.ts - 생성 - 이메일 유효성 검증을 위한 테스트 스위트"

포함:

- 정확한 파일 경로
- 작업: 생성, 수정, 삭제
- 무엇이 변경되는지 구체적으로 (메서드, 클래스, 엔드포인트, 컴포넌트)

**brownfield 컨텍스트 사용:**

- 기존 파일을 수정하는 경우 현재 구조 참조
- 기존 명명 패턴 따르기
- 현재 조직을 기반으로 논리적으로 새 코드 배치
  </action>

<template-output file="tech-spec.md">source_tree_changes</template-output>

<action>**기술적 접근 - 확정적으로:**

나쁜 예 (모호함):

- "winston 또는 pino와 같은 로깅 라이브러리 사용"
- "Python 2 또는 3 사용"
- "어떤 종류의 유효성 검증 설정"

좋은 예 (확정적):

- "로깅을 위해 winston v3.8.2 사용 (package.json에 이미 있음)"
- "pyproject.toml에 지정된 대로 Python 3.11을 사용하여 구현"
- "UserController.ts의 패턴을 따라 요청 유효성 검증에 Joi v17.9.0 사용"

**감지된 스택 사용:**

- package.json/requirements.txt의 정확한 버전 참조
- 이미 사용 중인 프레임워크 지정
- 이미 있는 것을 기반으로 결정

**greenfield의 경우:**

- 확정적 선택을 하고 정당화
- 정확한 버전 지정
- "또는" 문은 허용되지 않음
  </action>

<template-output file="tech-spec.md">technical_approach</template-output>

<action>**따라야 할 기존 패턴:**

<check if="brownfield">
기존 코드베이스의 패턴 문서화:
- 클래스 구조 패턴
- 함수 명명 규칙
- 오류 처리 접근방식
- 테스트 패턴
- 문서화 스타일

예시:
"UserService.ts에 설정된 서비스 패턴 따르기:

- 생성자 주입으로 클래스 내보내기
- 모든 비동기 작업에 async/await 사용
- 오류 코드와 함께 ServiceError 던지기
- 모든 공개 메서드에 JSDoc 주석 포함"
  </check>

<check if="greenfield">
"Greenfield 프로젝트 - 새로운 패턴 수립:
- [수립할 패턴 정의]"
</check>

</action>

<template-output file="tech-spec.md">existing_patterns</template-output>

<action>**통합 지점:**

이 변경이 어떻게 연결되는지 식별:

- 의존하는 내부 모듈
- 외부 API 또는 서비스
- 데이터베이스 상호작용
- 이벤트 이미터/리스너
- 상태 관리

인터페이스 및 계약에 대해 구체적으로 작성.
</action>

<template-output file="tech-spec.md">integration_points</template-output>

<action>**개발 컨텍스트:**

**관련 기존 코드:**
<check if="brownfield">
개발자가 검토해야 할 특정 파일 또는 코드 섹션 참조:

- "유사한 유효성 검증 패턴은 UserService.ts 120-150번 줄 참조"
- "인증 접근방식은 AuthMiddleware.ts 참조"
- "PaymentService.ts의 오류 처리 따르기"
  </check>

**프레임워크/라이브러리:**
감지된 스택의 정확한 버전과 함께 나열:

- Express 4.18.2 (웹 프레임워크)
- winston 3.8.2 (로깅)
- Joi 17.9.0 (유효성 검증)
- TypeScript 5.1.6 (언어)

**내부 모듈:**
내부 종속성 나열:

- @/services/UserService
- @/middleware/auth
- @/utils/validation

**구성 변경:**
업데이트할 구성 파일:

- 새 SMTP 설정으로 .env 업데이트
- config/schemas.ts에 유효성 검증 스키마 추가
- 필요한 경우 package.json 스크립트 업데이트
  </action>

<template-output file="tech-spec.md">existing_code_references</template-output>
<template-output file="tech-spec.md">framework_dependencies</template-output>
<template-output file="tech-spec.md">internal_dependencies</template-output>
<template-output file="tech-spec.md">configuration_changes</template-output>

<check if="field_type == brownfield">
  <template-output file="tech-spec.md">existing_conventions</template-output>
</check>

<check if="field_type == greenfield">
  <action>{{existing_conventions}} = "Greenfield 프로젝트 - 현대적인 모범 사례에 따라 새로운 규칙 수립"으로 설정</action>
  <template-output file="tech-spec.md">existing_conventions</template-output>
</check>

<action>**구현 스택:**

버전이 있는 포괄적인 스택:

- 런타임: Node.js 20.x
- 프레임워크: Express 4.18.2
- 언어: TypeScript 5.1.6
- 테스팅: Jest 29.5.0
- 린팅: ESLint 8.42.0
- 유효성 검증: Joi 17.9.0

모두 감지된 프로젝트 설정에서 가져옴!
</action>

<template-output file="tech-spec.md">implementation_stack</template-output>

<action>**기술 세부사항:**

심층적인 기술 사양:

- 구현할 알고리즘
- 사용할 데이터 구조
- 성능 고려사항
- 보안 고려사항
- 오류 시나리오 및 처리
- 엣지 케이스

철저하게 - 개발자는 세부사항이 필요합니다!
</action>

<template-output file="tech-spec.md">technical_details</template-output>

<action>**개발 설정:**

개발자가 로컬에서 실행하기 위해 필요한 것은?

감지된 스택 및 스크립트를 기반으로:

```
1. 저장소 클론 (아직 안 했으면)
2. npm install (package.json의 모든 종속성 설치)
3. cp .env.example .env (환경 구성)
4. npm run dev (개발 서버 시작)
5. npm test (테스트 스위트 실행)
```

또는 Python의 경우:

```
1. python -m venv venv
2. source venv/bin/activate
3. pip install -r requirements.txt
4. python manage.py runserver
```

package.json/설정 파일의 실제 스크립트를 사용하세요!
</action>

<template-output file="tech-spec.md">development_setup</template-output>

<action>**구현 가이드:**

**설정 단계:**
구현 전 체크리스트:

- 기능 브랜치 생성
- 개발 환경 실행 확인
- 기존 코드 참조 검토
- 필요한 경우 테스트 데이터 설정

**구현 단계:**
단계별 분류:

단일 스토리 변경의 경우:

1. [특정 파일 및 작업이 있는 1단계]
2. [특정 파일 및 작업이 있는 2단계]
3. [테스트 작성]
4. [승인 기준 확인]

복수 스토리 기능의 경우:
스토리/단계별로 구성:

1. 1단계: [기초 작업]
2. 2단계: [핵심 구현]
3. 3단계: [테스트 및 유효성 검증]

**테스팅 전략:**

- [특정 함수]에 대한 단위 테스트
- [특정 흐름]에 대한 통합 테스트
- 수동 테스트 체크리스트
- 해당하는 경우 성능 테스트

**승인 기준:**
구체적이고, 측정 가능하고, 테스트 가능한 기준:

1. [시나리오]가 주어졌을 때, [작업]을 하면, [결과]가 나온다
2. [메트릭]이 [임계값]을 충족한다
3. [기능]이 [환경]에서 작동한다
   </action>

<template-output file="tech-spec.md">setup_steps</template-output>
<template-output file="tech-spec.md">implementation_steps</template-output>
<template-output file="tech-spec.md">testing_strategy</template-output>
<template-output file="tech-spec.md">acceptance_criteria</template-output>

<action>**개발자 리소스:**

**파일 경로 참조:**
관련된 모든 파일의 완전한 목록:

- /src/services/UserService.ts
- /src/routes/api/users.ts
- /tests/services/UserService.test.ts
- /src/types/user.ts

**주요 코드 위치:**
중요한 함수, 클래스, 모듈:

- UserService 클래스 (src/services/UserService.ts:15)
- validateUser 함수 (src/utils/validation.ts:42)
- User 타입 정의 (src/types/user.ts:8)

**테스트 위치:**
테스트가 가는 곳:

- 단위: tests/services/
- 통합: tests/integration/
- E2E: tests/e2e/

**업데이트할 문서:**
업데이트가 필요한 문서:

- README.md - 새 엔드포인트 문서 추가
- API.md - /users/validate 엔드포인트 문서화
- CHANGELOG.md - 새 기능 기록
  </action>

<template-output file="tech-spec.md">file_paths_complete</template-output>
<template-output file="tech-spec.md">key_code_locations</template-output>
<template-output file="tech-spec.md">testing_locations</template-output>
<template-output file="tech-spec.md">documentation_updates</template-output>

<action>**UX/UI 고려사항:**

<check if="change affects user interface OR user experience">
  **이 변경이 UI/UX 영향이 있는지 결정:**
  - 사용자가 보는 것을 변경하나요?
  - 사용자 상호작용 방식을 변경하나요?
  - 사용자 워크플로우에 영향을 주나요?

YES인 경우, 문서화:

**영향을 받는 UI 컴포넌트:**

- 특정 컴포넌트 나열 (버튼, 폼, 모달, 페이지)
- 생성 vs 수정이 필요한 것 주목

**UX 흐름 변경:**

- 현재 흐름 vs 새 흐름
- 사용자 여정 영향
- 내비게이션 변경

**시각적/상호작용 패턴:**

- 기존 디자인 시스템 따르기? (디자인 토큰, 컴포넌트 라이브러리 확인)
- 필요한 새 패턴?
- 반응형 디자인 고려사항 (모바일, 태블릿, 데스크톱)

**접근성:**

- 키보드 내비게이션 요구사항
- 스크린 리더 호환성
- 필요한 ARIA 레이블
- 색상 대비 표준

**사용자 피드백:**

- 로딩 상태
- 오류 메시지
- 성공 확인
- 진행 표시기
  </check>

<check if="no UI/UX impact">
  "UI/UX 영향 없음 - 백엔드/API/인프라 변경만"
</check>
</action>

<template-output file="tech-spec.md">ux_ui_considerations</template-output>

<action>**테스팅 접근방식:**

{{test_framework_info}}를 사용한 포괄적인 테스팅 전략:

**기존 테스트 표준 준수:**
<check if="conform_to_conventions == yes">

- 기존 테스트 파일 명명 따르기: {{detected_test_patterns.file_naming}}
- 기존 테스트 조직 사용: {{detected_test_patterns.organization}}
- 기존 단언 스타일 일치: {{detected_test_patterns.assertion_style}}
- 기존 커버리지 요구사항 충족: {{detected_test_patterns.coverage}}
  </check>

**테스트 전략:**

- 테스트 프레임워크: {{detected_test_framework}} (프로젝트 종속성에서)
- [특정 함수/메서드]에 대한 단위 테스트
- [특정 흐름/API]에 대한 통합 테스트
- UI 변경 시 E2E 테스트
- Mock/stub 전략 (기존 패턴 사용: {{detected_test_patterns.mocking}})
- 해당하는 경우 성능 벤치마크
- UI 변경 시 접근성 테스트

**커버리지:**

- 단위 테스트 커버리지: [목표 %]
- 통합 커버리지: [중요 경로]
- 모든 승인 기준에 해당 테스트가 있는지 확인
  </action>

<template-output file="tech-spec.md">test_framework_info</template-output>
<template-output file="tech-spec.md">testing_approach</template-output>

<action>**배포 전략:**

**배포 단계:**
이 변경을 배포하는 방법:

1. main 브랜치에 병합
2. CI/CD 파이프라인 실행
3. 스테이징에 배포
4. 스테이징에서 확인
5. 프로덕션에 배포
6. 문제 모니터링

**롤백 계획:**
문제가 있을 때 되돌리는 방법:

1. 커밋 [hash] 되돌리기
2. 이전 버전 재배포
3. 롤백 성공 확인

**모니터링:**
배포 후 주시할 것:

- [로깅 서비스]의 오류율
- [엔드포인트]의 응답 시간
- [기능]에 대한 사용자 피드백
  </action>

<template-output file="tech-spec.md">deployment_steps</template-output>
<template-output file="tech-spec.md">rollback_plan</template-output>
<template-output file="tech-spec.md">monitoring_approach</template-output>

<invoke-task halt="true">{project-root}/{bmad_folder}/core/tasks/adv-elicit.xml</invoke-task>

</step>

<step n="4" goal="일관성, 완전성 및 품질 자동 검증">

<critical>항상 검증 실행 - 선택 사항이 아닙니다!</critical>

<action>Tech-spec 생성 완료! 이제 자동 검증을 실행합니다...</action>

<action>{installed_path}/checklist.md 로드</action>
<action>모든 체크리스트 기준에 대해 tech-spec.md 검토:

**섹션 1: 출력 파일 존재**

- tech-spec.md 생성 확인
- 채워지지 않은 템플릿 변수 확인

**섹션 2: 컨텍스트 수집**

- 사용 가능한 모든 문서가 로드되었는지 검증
- 스택 감지가 작동했는지 확인
- brownfield 분석 확인 (해당하는 경우)

**섹션 3: Tech-Spec 확정성**

- "또는" 문 스캔 (발견 시 실패)
- 모든 버전이 특정한지 확인
- 스택 정렬 확인

**섹션 4: 컨텍스트가 풍부한 내용**

- 모든 새 템플릿 섹션이 채워졌는지 확인
- 기존 코드 참조 확인 (brownfield)
- 나열된 프레임워크 종속성 검증

**섹션 5-6: 스토리 품질 (5단계로 연기)**

**섹션 7: 워크플로우 상태 (해당하는 경우)**

**섹션 8: 구현 준비 상태**

- 개발자가 즉시 시작할 수 있나요?
- tech-spec이 충분히 포괄적인가요?
  </action>

<action>특정 점수가 있는 검증 보고서 생성:

- 컨텍스트 수집: [포괄적/부분적/불충분]
- 확정성: [모두 확정적/일부 모호함/주요 문제]
- Brownfield 통합: [해당 없음/우수/부분적/누락]
- 스택 정렬: [완벽/양호/부분적/없음]
- 구현 준비 상태: [예/아니오]
  </action>

<check if="validation issues found">
  <output>⚠️ **검증 문제 감지:**

{{list_of_issues}}

자동으로 수정할 수 있습니다. 진행할까요? (yes/no)</output>

<ask>검증 문제를 수정할까요? (yes/no)</ask>

  <check if="yes">
    <action>각 문제를 수정하고 재검증</action>
    <output>✅ 문제 수정 완료! 재검증 통과.</output>
  </check>

  <check if="no">
    <output>⚠️ 경고와 함께 진행합니다. 문제는 수동으로 해결해야 합니다.</output>
  </check>
</check>

<check if="validation passes">
  <output>✅ **검증 통과!**

**점수:**

- 컨텍스트 수집: {{context_score}}
- 확정성: {{definitiveness_score}}
- Brownfield 통합: {{brownfield_score}}
- 스택 정렬: {{stack_score}}
- 구현 준비 상태: ✅ 준비됨

Tech-spec이 고품질이며 스토리 생성 준비가 되었습니다!</output>
</check>

</step>

<step n="5" goal="에픽 및 컨텍스트가 풍부한 스토리 생성">

<action>통합 스토리 생성 워크플로우 호출: {instructions_generate_stories}</action>

<action>다음을 생성합니다:

- **epics.md** - 에픽 구조 (1개 스토리의 경우 최소, 복수의 경우 상세)
- **story-{epic-slug}-N.md** - 스토리 파일 (N = 1부터 {{story_count}}까지)

모든 스토리는 tech-spec.md를 기본 컨텍스트로 참조 - 개발자가 종종 story-context 워크플로우를 건너뛸 수 있을 만큼 포괄적입니다.
</action>

</step>

<step n="6" goal="완료 및 다음 단계 안내">

<output>**✅ Tech-Spec 완료, {user_name}!**

**생성된 결과물:**

- ✅ **tech-spec.md** - 컨텍스트가 풍부한 기술 사양
  - 포함: brownfield 분석, 프레임워크 세부사항, 기존 패턴
- ✅ **epics.md** - 에픽 구조{{#if story_count == 1}} (단일 스토리용 최소){{else}} {{story_count}}개 스토리 포함{{/if}}
- ✅ **story-{epic-slug}-1.md** - 첫 번째 스토리{{#if story_count > 1}}
- ✅ **story-{epic-slug}-2.md** - 두 번째 스토리{{/if}}{{#if story_count > 2}}
- ✅ **story-{epic-slug}-3.md** - 세 번째 스토리{{/if}}{{#if story_count > 3}}
- ✅ **추가 스토리** story-{epic-slug}-{{story_count}}.md까지{{/if}}

**이 Tech-Spec의 특별한 점:**

tech-spec은 기본 컨텍스트 문서로 사용하기에 충분히 포괄적입니다:

- ✨ Brownfield 코드베이스 분석 (해당하는 경우)
- ✨ 프로젝트의 정확한 프레임워크 및 라이브러리 버전
- ✨ 기존 패턴 및 코드 참조
- ✨ 특정 파일 경로 및 통합 지점
- ✨ 완전한 개발자 리소스

**다음 단계:**

**🎯 권장 경로 - 바로 개발로:**

tech-spec이 컨텍스트가 풍부하므로 종종 story-context 생성을 건너뛸 수 있습니다!

{{#if story_count == 1}}
**단일 스토리의 경우:**

1. DEV 에이전트에게 `dev-story` 실행 요청
   - story-{epic-slug}-1.md 선택
   - Tech-spec이 필요한 모든 컨텍스트를 제공합니다!

💡 **선택 사항:** 비정상적으로 복잡한 경우에만 `story-context` (SM 에이전트) 실행
{{else}}
**{{story_count}}개 스토리 - 반복적 접근방식:**

1. **스토리 1부터 시작:**
   - DEV 에이전트에게 `dev-story` 실행 요청
   - story-{epic-slug}-1.md 선택
   - Tech-spec이 컨텍스트 제공

2. **스토리 1 완료 후:**
   - story-{epic-slug}-2.md에 대해 반복
   - 스토리 {{story_count}}까지 계속

💡 **대안:** 모든 스토리를 조정된 스프린트로 구성하려면 `sprint-planning` (SM 에이전트) 사용

💡 **선택 사항:** 추가 컨텍스트가 필요한 복잡한 스토리의 경우 `story-context` (SM 에이전트) 실행
{{/if}}

**귀하의 Tech-Spec:**

- 📄 저장 위치: `{output_folder}/tech-spec.md`
- 에픽 및 스토리: `{output_folder}/epics.md` + `{sprint_artifacts}/`
- 포함 내용: 모든 컨텍스트, 결정, 패턴 및 구현 가이드
- 준비 완료: 바로 개발 가능!

tech-spec이 귀하의 단일 진실 소스입니다! 🚀
</output>

</step>

</workflow>

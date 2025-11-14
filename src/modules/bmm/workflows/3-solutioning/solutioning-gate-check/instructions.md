# 구현 준비 확인 - 워크플로우 지침

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>이미 로드하고 처리했어야 합니다: {project-root}/{bmad_folder}/bmm/workflows/3-solutioning/solutioning-gate-check/workflow.yaml</critical>
<critical>모든 발견 사항과 분석을 평가 전반에 걸쳐 {communication_language}로 전달하세요</critical>
<critical>입력 문서는 workflow.yaml의 input_file_patterns에 지정됨 - 워크플로우 엔진이 퍼지 매칭, 전체 문서 vs 샤딩 문서 검색을 자동으로 처리합니다</critical>

<workflow>

<step n="0" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>{workflow_status_file}이 존재하는지 확인</action>

<check if="상태 파일을 찾을 수 없음">
  <output>워크플로우 상태 파일을 찾을 수 없습니다. 구현 준비 확인은 독립 실행 모드 또는 BMM 워크플로우 경로의 일부로 실행할 수 있습니다.</output>
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
  <action>전체 파일 로드:  {workflow_status_file}</action>
  <action>workflow_status 섹션 파싱</action>
  <action>"solutioning-gate-check" 워크플로우 상태 확인</action>
  <action>{selected_track} 가져오기 (quick-flow, bmad-method 또는 enterprise-bmad-method)</action>
  <action>완료되지 않은 첫 번째 워크플로우 찾기(다음 예상 워크플로우)</action>

<action>selected_track을 기반으로 어떤 아티팩트가 존재해야 하는지 이해: - quick-flow: 기술 사양 및 에픽 내 간단한 스토리만 (PRD 없음, 최소 솔루션 작업) - bmad-method 및 enterprise-bmad-method: PRD, 기술 사양, 에픽/스토리, 아키텍처, 가능한 UX 아티팩트</action>

  <check if="solutioning-gate-check 상태가 파일 경로임(이미 완료됨)">
    <output>⚠️ 게이트 체크가 이미 완료됨: {{solutioning-gate-check status}}</output>
    <ask>재실행하면 새 검증 보고서를 생성합니다. 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. workflow-status를 사용하여 다음 단계를 확인하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

  <check if="solutioning-gate-check가 다음 예상 워크플로우가 아님">
    <output>⚠️ 다음 예상 워크플로우: {{next_workflow}}. 게이트 체크가 순서를 벗어났습니다.</output>
    <ask>그래도 게이트 체크를 계속하시겠습니까? (y/n)</ask>
    <check if="n">
      <output>종료합니다. 대신 {{next_workflow}}를 실행하세요.</output>
      <action>워크플로우 종료</action>
    </check>
  </check>

<action>standalone_mode = false로 설정</action>
</check>

<template-output>project_context</template-output>
</step>

<step n="1" goal="프로젝트 아티팩트 검색 및 목록 작성">
<action>{output_folder}에서 관련 기획 및 솔루션 작업 문서 검색</action>

<action>다음을 찾기:

- 제품 요구사항 문서 (PRD)
- 아키텍처
- 에픽 및 스토리 분석
- 활성 경로에 UX 워크플로우가 포함된 경우 UX 디자인 아티팩트
- 추가 기획 문서
  </action>

<action>다음을 포함하여 발견된 문서 목록 생성:

- 문서 유형 및 목적
- 파일 경로 및 마지막 수정 날짜
- 각 문서에 포함된 내용에 대한 간략한 설명
- 누락된 예상 문서를 잠재적 문제로 플래그 지정
  </action>

<template-output>document_inventory</template-output>
</step>

<step n="2" goal="핵심 기획 문서의 심층 분석">
<action>각 발견된 문서를 로드하고 철저히 분석하여 다음을 추출:
  - 핵심 요구사항 및 성공 기준
  - 아키텍처 의사결정 및 제약
  - 기술 구현 접근 방식
  - 사용자 스토리 및 수락 기준
  - 의존성 및 순서 지정 요구사항
  - 문서화된 가정 또는 위험
</action>

<action>PRD 분석의 경우 다음에 초점:

- 사용자 요구사항 및 사용 사례
- 기능적 및 비기능적 요구사항
- 성공 메트릭 및 수락 기준
- 범위 경계 및 명시적으로 제외된 항목
- 다양한 기능의 우선순위 수준
  </action>

<action>아키텍처/기술 사양 분석의 경우 다음에 초점:

- 시스템 디자인 의사결정 및 근거
- 기술 스택 및 프레임워크 선택
- 통합 포인트 및 API
- 데이터 모델 및 저장소 의사결정
- 보안 및 성능 고려사항
- 스토리 구현에 영향을 미칠 수 있는 아키텍처 제약
  </action>

<action>에픽/스토리 분석의 경우 다음에 초점:

- PRD 요구사항 커버리지
- 스토리 순서 지정 및 의존성
- 수락 기준 완전성
- 스토리 내 기술 작업
- 예상 복잡도 및 노력 지표
  </action>

<template-output>document_analysis</template-output>
</step>

<step n="3" goal="상호 참조 검증 및 정렬 확인">

<action>PRD ↔ 아키텍처 정렬:

- 모든 PRD 요구사항에 해당하는 아키텍처 지원이 있는지 확인
- 아키텍처 의사결정이 PRD 제약과 모순되지 않는지 확인
- PRD 범위를 벗어난 아키텍처 추가 식별(잠재적 골드 플레이팅)
- PRD의 비기능적 요구사항이 아키텍처 문서에서 다뤄지는지 확인
- 새로운 아키텍처 워크플로우를 사용하는 경우: 구현 패턴이 정의되어 있는지 확인
  </action>

<action>PRD ↔ 스토리 커버리지:

- 각 PRD 요구사항을 구현하는 스토리에 매핑
- 스토리 커버리지가 없는 PRD 요구사항 식별
- PRD 요구사항으로 역추적되지 않는 스토리 찾기
- 스토리 수락 기준이 PRD 성공 기준과 일치하는지 검증
  </action>

<action>아키텍처 ↔ 스토리 구현 확인:

- 아키텍처 의사결정이 관련 스토리에 반영되는지 확인
- 스토리 기술 작업이 아키텍처 접근 방식과 일치하는지 확인
- 아키텍처 제약을 위반할 수 있는 스토리 식별
- 아키텍처 컴포넌트에 대한 인프라 및 설정 스토리가 존재하는지 확인
  </action>

<template-output>alignment_validation</template-output>
</step>

<step n="4" goal="격차 및 위험 분석">
<action>검증 중 발견된 모든 격차, 위험 및 잠재적 문제를 식별하고 분류</action>

<action>중요한 격차 확인:

- 핵심 요구사항에 대한 누락된 스토리
- 다뤄지지 않은 아키텍처 관심사
- 그린필드 프로젝트에 대한 인프라 또는 설정 스토리 부재
- 누락된 오류 처리 또는 엣지 케이스 커버리지
- 다뤄지지 않은 보안 또는 규정 준수 요구사항
  </action>

<action>순서 지정 문제 식별:

- 의존성이 올바르게 정렬되지 않음
- 아직 구축되지 않은 컴포넌트를 가정하는 스토리
- 순차적이어야 하는 병렬 작업
- 누락된 전제 조건 기술 작업
  </action>

<action>잠재적 모순 감지:

- PRD와 아키텍처 접근 방식 간의 충돌
- 충돌하는 기술 접근 방식을 가진 스토리
- 요구사항과 모순되는 수락 기준
- 리소스 또는 기술 충돌
  </action>

<action>골드 플레이팅 및 범위 증가 찾기:

- PRD에서 요구하지 않는 아키텍처의 기능
- 요구사항을 넘어 구현하는 스토리
- 프로젝트 필요를 넘어선 기술 복잡성
- 과도한 엔지니어링 지표
  </action>

<action>테스트 가능성 검토 확인(3단계에 test-design이 있는 경우):

**참고:** test-design은 BMad 메소드에 권장되고 엔터프라이즈 메소드에 필수입니다

- {output_folder}/test-design-system.md가 존재하는지 확인
- 존재하는 경우: 테스트 가능성 평가 검토(제어 가능성, 관찰 가능성, 신뢰성)
- 테스트 가능성 관심사가 문서화된 경우: 게이트 의사결정을 위해 플래그 지정
- 누락되고 트랙이 엔터프라이즈인 경우: 중요한 격차로 플래그 지정
- 누락되고 트랙이 메소드인 경우: 권장 사항으로 표시(차단기 아님)
  </action>

<template-output>gap_risk_analysis</template-output>
</step>

<step n="5" goal="UX 및 특별 관심사 검증" optional="true">
  <check if="UX 아티팩트가 존재하거나 활성 경로에 UX 워크플로우가 있음">
    <action>UX 아티팩트를 검토하고 통합을 검증:
      - UX 요구사항이 PRD에 반영되는지 확인
      - 스토리에 UX 구현 작업이 포함되는지 확인
      - 아키텍처가 UX 요구사항(성능, 반응성)을 지원하는지 확인
      - 스토리에서 다뤄지지 않은 UX 관심사 식별
    </action>

    <action>접근성 및 사용성 커버리지 검증:
      - 스토리의 접근성 요구사항 커버리지 확인
      - 해당하는 경우 반응형 디자인 고려사항 확인
      - 스토리 전반에 걸친 사용자 흐름 완전성 확인
    </action>

  </check>

<template-output>ux_validation</template-output>
</step>

<step n="6" goal="포괄적인 준비 평가 생성">
<action>다음을 포함하는 구조화된 준비 보고서로 모든 발견 사항 컴파일:
- 준비 상태의 개요 요약
- 프로젝트 컨텍스트 및 검증 범위
- 문서 목록 및 커버리지 평가
- 심각도별로 구성된 세부 발견 사항(중요, 높음, 중간, 낮음)
- 각 문제에 대한 구체적인 권장 사항
- 전체 준비 권장 사항(준비됨, 조건부 준비됨, 준비 안됨)
</action>

<action>실행 가능한 다음 단계 제공:

- 해결해야 하는 중요한 문제 나열
- 필요한 구체적인 문서 업데이트 제안
- 필요한 추가 스토리 또는 작업 권장
- 필요한 경우 순서 조정 제안
  </action>

<action>긍정적인 발견 사항 포함:

- 잘 정렬된 영역 강조
- 특히 철저한 문서화 주목
- 좋은 아키텍처 의사결정 인정
- 발견된 포괄적인 스토리 커버리지 칭찬
  </action>

<template-output>readiness_assessment</template-output>
</step>

<step n="7" goal="상태 업데이트 및 완료" tag="workflow-status">
<check if="standalone_mode != true">
  <action>전체 파일 로드: {workflow_status_file}</action>
  <action>workflow_status 키 "solutioning-gate-check" 찾기</action>
  <critical>상태 값으로 파일 경로만 작성 - 다른 텍스트, 메모 또는 메타데이터 없음</critical>
  <action>workflow_status["solutioning-gate-check"] = "{output_folder}/bmm-readiness-assessment-{{date}}.md" 업데이트</action>
  <action>상태 정의를 포함한 모든 주석 및 구조를 보존하며 파일 저장</action>

<action>workflow_status에서 완료되지 않은 첫 번째 워크플로우 찾기(다음에 할 워크플로우)</action>
<action>다음 워크플로우를 기반으로 경로 파일에서 다음 에이전트 결정</action>
</check>

<output>**✅ 구현 준비 확인 완료!**

**평가 보고서:**

- 준비 평가가 다음에 저장됨: {output_folder}/bmm-readiness-assessment-{{date}}.md

{{#if standalone_mode != true}}
**상태 업데이트됨:**

- 진행 상황 추적 업데이트됨: solutioning-gate-check가 완료로 표시됨
- 다음 워크플로우: {{next_workflow}}
  {{else}}
  **참고:** 독립 실행 모드로 실행 중(진행 상황 추적 없음)
  {{/if}}

**다음 단계:**

{{#if standalone_mode != true}}

- **다음 워크플로우:** {{next_workflow}} ({{next_agent}} 에이전트)
- 진행하기 전에 평가 보고서를 검토하고 중요한 문제를 해결하세요

언제든지 `workflow-status`로 상태 확인
{{else}}
워크플로우가 진행 중이 아니므로:

- 다음에 무엇을 해야 할지 확실하지 않은 경우 BMM 워크플로우 가이드를 참조하세요
- 또는 `workflow-init`을 실행하여 워크플로우 경로를 생성하고 안내된 다음 단계를 받으세요
  {{/if}}
  </output>

<template-output>status_update_result</template-output>
</step>

</workflow>

# 스토리 생성 - 워크플로우 지침 (명세 준수, 기본값: 비상호작용)

````xml
<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project_root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 문서를 {document_output_language}로 생성하세요</critical>
<critical>이 워크플로우는 에픽/PRD 및 아키텍처 컨텍스트에서 다음 사용자 스토리를 생성하거나 업데이트하여 구성된 스토리 디렉토리에 저장하고 선택적으로 스토리 컨텍스트를 호출합니다.</critical>
<critical>문서 출력: 간결하고 기술적이며 실행 가능한 스토리 명세. 수용 기준 및 작업을 위해 표/목록을 사용하세요.</critical>

<workflow>

  <step n="1" goal="설정 로드 및 초기화">
    <action>config_source에서 변수 해결: story_dir (sprint_artifacts), output_folder, user_name, communication_language. story_dir이 누락되면 → 사용자에게 스토리 디렉토리를 제공하도록 요청하고 변수를 업데이트하세요.</action>
    <action>{{story_dir}}이 존재하지 않으면 생성하세요</action>
    <action>workflow.yaml에서 설치된 컴포넌트 경로 해결: template, instructions, validation</action>
    <action>권장 입력이 있으면 해결: epics_file, prd_file, architecture_file</action>
    <action>아키텍처/표준 문서 로드: {{arch_docs_file_names}} 내의 각 파일 이름을 {{arch_docs_search_dirs}} 내에서 존재하면 읽기. 테스트, 코딩 표준, 보안 및 아키텍처 패턴을 수집하세요.</action>
  </step>

  <step n="2" goal="소스 문서 발견 및 로드">
    <critical>이전 스토리 연속성: 컨텍스트 유지 및 이전 개발 경험 학습에 필수</critical>

    <action>이전에 완료된 스토리를 찾아 개발 에이전트 학습 및 검토 결과를 추출합니다:
      1. {{output_folder}}/sprint-status.yaml 완전히 로드하기
      2. development_status 섹션에서 현재 {{story_key}} 찾기
      3. 현재 스토리 바로 위 스토리 항목 식별하기 (파일 순서상 이전 행)
      4. 이전 스토리가 존재하면:
         - {{previous_story_key}} 추출하기
         - 이전 스토리 상태 확인하기 (완료, 진행 중, 검토 중 등)
         - 상태가 "done", "review" 또는 "in-progress" (일부 완료된 상태)이면:
           * 경로 구성: {{story_dir}}/{{previous_story_key}}.md
           * 완전한 이전 스토리 파일 로드하기
           * 모든 섹션 포괄적으로 파싱하기:

             A) 개발 에이전트 기록 → 완료 메모 목록:
                - 생성된 새로운 패턴/서비스 (재사용하기, 재생성하지 않기)
                - 실행된 아키텍처 편차 또는 결정
                - 향후 스토리로 연기된 기술 부채
                - 다음 스토리에 대한 경고 또는 권장사항
                - 재사용을 위해 생성된 인터페이스/메서드

             B) 개발 에이전트 기록 → 디버그 로그 참조:
                - 발생한 문제 및 해결책
                - 함정 또는 예상 밖의 도전과제
                - 적용된 임시 해결책

             C) 개발 에이전트 기록 → 파일 목록:
                - 생성된 파일 (새로운) - 새로운 기능 이해하기
                - 수정된 파일 (수정됨) - 진화하는 컴포넌트 추적하기
                - 삭제된 파일 (삭제됨) - 제거된 기능

             D) 개발 메모:
                - 모든 "향후 스토리" 메모 또는 TODO
                - 확립된 패턴
                - 발견된 제약사항

             E) 수석 개발자 검토 (AI) 섹션 (있는 경우):
                - 검토 결과 (승인/변경 요청/차단)
                - 미해결 액션 항목 (체크되지 않은 [ ] 항목)
                - 이 스토리에 영향을 미칠 수 있는 주요 발견사항
                - 제기된 아키텍처 관심사항

             F) 수석 개발자 검토 → 액션 항목 (있는 경우):
                - 아직 보류 중인 체크되지 않은 [ ] 항목 확인하기
                - 여러 스토리에 적용되는 시스템적 문제 기록하기

             G) 검토 추가 작업 (AI) (있는 경우):
                - 아직 보류 중인 체크되지 않은 [ ] 검토 작업 확인하기
                - 에픽 전체 관심사인지 판단하기

             H) 스토리 상태:
                - "review" 또는 "in-progress"인 경우 - 미완료, 보류 중인 사항 기록하기
                - "done"인 경우 - 완료 확인됨
           * 모든 결과를 {{previous_story_learnings}}로 다음 구조로 저장하기:
             - new_files: [목록]
             - modified_files: [목록]
             - new_services: [설명이 있는 목록]
             - architectural_decisions: [목록]
             - technical_debt: [목록]
             - warnings_for_next: [목록]
             - review_findings: [검토가 있는 경우 목록]
             - pending_items: [체크되지 않은 액션 항목 목록]
         - 상태가 "backlog" 또는 "drafted"인 경우:
           * {{previous_story_learnings}} = "이전 스토리가 아직 구현되지 않음"으로 설정
      5. 이전 스토리가 없는 경우 (에픽의 첫 스토리):
         - {{previous_story_learnings}} = "에픽의 첫 스토리 - 선행 컨텍스트 없음"으로 설정
    </action>

    <action>{{tech_spec_file}}이 비어있으면: {{epic_num}}을 사용하여 {{tech_spec_glob_template}}에서 파생시키고 {{tech_spec_search_dir}}을 재귀적으로 검색하기. 여러 개인 경우 수정 시간이 가장 최근인 것 선택하기.</action>
    <action>이 에픽에 대한 우선순위 문서 세트 빌드 - {input_file_patterns} 잠재적 위치 목록에서 검색 및 로드:
      1) tech_spec_file (에픽 범위)
      2) epics_file (수용 기준 및 분석) 스토리가 속할 특정 에픽
      3) prd_file (비즈니스 요구사항 및 제약) 전체 또는 분할
      4) architecture_file (아키텍처 제약) 전체 또는 분할
    </action>
    <action>우선순위 세트에서 발견된 모든 항목에 대해 완전한 파일 읽기. 인용을 위한 내용 및 경로 저장하기.</action>
  </step>

  <step n="3" goal="다음 백로그 스토리 찾기" tag="sprint-status">
    <critical>반드시 {sprint_status} 파일을 처음부터 끝까지 완전히 읽어 순서 보존하기</critical>
    <action>처음부터 끝까지 모든 줄 읽기 - 내용 건너뛰지 않기</action>
    <action>development_status 섹션을 완전히 파싱하여 스토리 순서 이해하기</action>

    <action>다음 조건을 만족하는 첫 번째 스토리를 찾기 (위에서 아래로 순서대로 읽으면서):
      - 키가 패턴과 일치: number-number-name (예: "1-2-user-auth")
      - 에픽 키 (epic-X) 또는 회고 (epic-X-retrospective)가 아님
      - 상태 값이 "backlog"과 같음
    </action>

    <check if="백로그 스토리를 찾지 못함">
      <output>📋 sprint-status.yaml에서 백로그 스토리를 찾지 못했습니다

        모든 스토리는 이미 작성되었거나 완료되었습니다.

        **옵션:**
        1. sprint-planning 실행하여 스토리 추적 새로고침
        2. PM 에이전트 로드 후 correct-course 실행하여 더 많은 스토리 추가
        3. 현재 스프린트가 완료되었는지 확인
      </output>
      <action>중단</action>
    </check>

    <action>발견된 스토리 키에서 추출하기 (예: "1-2-user-authentication"):
      - epic_num: 첫 대시 전의 첫 번째 숫자 (예: "1")
      - story_num: 첫 대시 후의 두 번째 숫자 (예: "2")
      - story_title: 두 번째 대시 후의 나머지 (예: "user-authentication")
    </action>
    <action>{{story_id}} = "{{epic_num}}.{{story_num}}"으로 설정하기</action>
    <action>나중에 사용할 story_key 저장하기 (예: "1-2-user-authentication")</action>

    <action>스토리가 {{epics_file}}에 열거되어 있는지 확인하기. 찾지 못하면 메시지와 함께 중단하기:</action>
    <action>"스토리 {{story_key}}를 epics.md에서 찾을 수 없습니다. PM 에이전트를 로드하고 correct-course를 실행하여 에픽을 동기화한 후 create-story를 다시 실행하세요."</action>

    <action>{{story_dir}}의 예상 경로에 스토리 파일이 이미 존재하는지 확인하기</action>
    <check if="스토리 파일이 존재함">
      <output>ℹ️ 스토리 파일이 이미 존재합니다: {{story_file_path}}
기존 스토리 파일을 업데이트합니다.
      </output>
      <action>update_mode = true로 설정</action>
    </check>
  </step>

  <step n="4" goal="요구사항 추출 및 스토리 진술 파생">
    <action>tech_spec_file (선호) 또는 epics_file에서: 에픽 {{epic_num}} 제목/요약, 다음 스토리의 수용 기준 및 모든 컴포넌트 참조 추출하기. 없으면 이 에픽/스토리에 매핑되는 PRD 섹션으로 폴백하기.</action>
    <action>아키텍처 및 아키텍처 문서에서: 추출된 수용 기준과 관련된 제약, 패턴, 컴포넌트 경계 및 테스트 지침 추출하기. 이 스토리의 구현을 직접 알려주는 정보만 캡처하기.</action>
    <action>명확한 사용자 스토리 진술(역할, 작업, 이점)을 위의 소스에 엄격하게 기반하여 파생하기. 모호하고 {{non_interactive}} == false이면 → 사용자에게 명확히 해달라고 요청하기. {{non_interactive}} == true이면 → 도메인 사실을 발명하지 않고 최선의 기반 진술 생성하기.</action>
    <template-output file="{default_output_file}">요구사항 컨텍스트 요약</template-output>
  </step>

  <step n="5" goal="프로젝트 구조 정렬 및 학습된 교훈">
    <action>{{previous_story_learnings}}를 검토하고 실행 가능한 정보 추출하기:
      - 생성된 새로운 패턴/서비스 → 재사용을 위해 기록하기 (재생성하지 않기)
      - 아키텍처 편차 → 일관성 이해 및 유지하기
      - 기술 부채 항목 → 이 스토리에서 해결해야 하는지 평가하기
      - 수정된 파일 → 진화하는 컴포넌트의 현재 상태 이해하기
      - 경고/권장사항 → 이 스토리의 접근 방식에 적용하기
      - 검토 결과 → 이전 스토리에서 발견된 문제로부터 배우기
      - 보류 중인 액션 항목 → 에픽 전체 관심사가 이 스토리에 영향을 미치는지 판단하기
    </action>

    <action>unified-project-structure.md가 있으면: 예상 파일 경로, 모듈 이름 및 컴포넌트 위치 정렬하기; 잠재적 충돌 기록하기.</action>

    <action>{{previous_story_learnings}}.new_files를 프로젝트 구조와 교차 참조하여 새로운 기능이 위치한 곳 이해하기.</action>

    <template-output file="{default_output_file}">구조 정렬 요약</template-output>
  </step>

  <step n="6" goal="수용 기준 및 작업 조립">
    <action>tech_spec 또는 에픽에서 수용 기준 목록 조립하기. 간격이 있으면 PRD 축자 표현에서 최소하고 테스트 가능한 기준 파생하기 (발명 금지).</action>
    <action>수용 기준에 직접 매핑된 작업/부작업 생성하기. testing-strategy 및 기존 테스트 프레임워크당 명시적 테스트 부작업 포함하기. 기술적 의무사항에 대해 아키텍처/소스 문서 인용하기.</action>
    <template-output file="{default_output_file}">수용 기준</template-output>
    <template-output file="{default_output_file}">작업 및 부작업</template-output>
  </step>

  <step n="7" goal="스토리 문서 생성 또는 업데이트">
    <action>출력 경로 해결: 현재 {{epic_num}} 및 {{story_num}}을 사용하여 {default_output_file}. 기존 스토리를 업데이트하기 위해 타겟팅하는 경우 해당 경로 사용하기.</action>
    <action>새 파일을 생성하는 경우 template.md에서 초기화하기; 그렇지 않으면 기존 파일을 로드하여 편집하기.</action>
    <action>에픽/스토리 컨텍스트에서 간결한 story_title 계산하기; 누락되면 PRD 기능 이름 및 에픽 번호에서 합성하기.</action>
    <template-output file="{default_output_file}">스토리 헤더</template-output>
    <template-output file="{default_output_file}">스토리 본문</template-output>
    <template-output file="{default_output_file}">개발 메모 및 인용</template-output>

    <action>{{previous_story_learnings}}이 실행 가능한 항목을 포함하는 경우 ("첫 스토리" 또는 "아직 구현되지 않음" 제외):
      - 개발 메모에 "이전 스토리에서 배운 교훈" 부분섹션 추가하기
      - 관련 완료 메모, 새 파일/패턴, 편차 포함하기
      - 이전 스토리 파일을 참조로 인용하기 [출처: stories/{{previous_story_key}}.md]
      - 재사용할 인터페이스/서비스 강조하기 (재생성하지 않기)
      - 이 스토리에서 해결할 기술 부채 기록하기
      - 이 스토리에 영향을 미치는 보류 중인 검토 항목 나열하기 (있는 경우)
      - 생성된 특정 파일 참조: "{{file_path}}를 {{purpose}}에 사용하기"
      - 형식 예:
        ```
        ### 이전 스토리에서 배운 교훈

        **스토리 {{previous_story_key}}에서 (상태: {{previous_status}})**

        - **생성된 새로운 서비스**: `AuthService` 기본 클래스 `src/services/AuthService.js`에서 사용 가능 - `AuthService.register()` 메서드 사용하기
        - **아키텍처 변경**: 세션 기반에서 JWT 인증으로 전환
        - **스키마 변경**: 사용자 모델은 이제 `passwordHash` 필드 포함, 마이그레이션 적용됨
        - **기술 부채**: 이메일 확인이 건너뛰어짐, 이 또는 후속 스토리에 포함되어야 함
        - **테스트 설정**: Auth 테스트 스위트 `tests/integration/auth.test.js`에서 초기화됨 - 확립된 패턴 따르기
        - **보류 중인 검토 항목**: 검토에서 언급된 속도 제한 - 이 스토리에 대해 고려하기

        [출처: stories/{{previous_story_key}}.md#Dev-Agent-Record]
        ```
    </action>

    <template-output file="{default_output_file}">변경 로그</template-output>
  </step>

  <step n="8" goal="검증, 저장 및 스토리 작성 완료 표시" tag="sprint-status">
    <invoke-task>{installed_path}/checklist.md의 체크리스트에 대해 검증 ({bmad_folder}/core/tasks/validate-workflow.xml 사용)</invoke-task>
    <action>문서를 무조건 저장하기 (비상호작용 기본값). 상호작용 모드에서 사용자 확인 허용하기.</action>

    <!-- 스프린트 상태에서 스토리를 작성으로 표시 -->
    <action>{{output_folder}}/sprint-status.yaml 업데이트하기</action>
    <action>전체 파일을 로드하고 모든 development_status 항목 읽기</action>
    <action>{{story_key}}와 일치하는 development_status 키 찾기</action>
    <action>현재 상태가 "backlog"인지 확인하기 (예상된 이전 상태)</action>
    <action>development_status[{{story_key}}] = "drafted"로 업데이트하기</action>
    <action>파일 저장하기, 상태 정의를 포함한 모든 주석 및 구조 보존하기</action>

    <check if="파일에서 스토리 키를 찾을 수 없음">
      <output>⚠️ 스토리 상태를 업데이트할 수 없음: {{story_key}}를 sprint-status.yaml에서 찾을 수 없습니다

스토리 파일은 성공적으로 생성되었지만 sprint-status.yaml은 업데이트되지 않았습니다.
스토리 추적을 새로고침하기 위해 sprint-planning을 실행해야 하거나 스토리 행 상태를 수동으로 `drafted`로 설정해야 합니다.
      </output>
    </check>

    <action>생성/업데이트된 스토리 경로 보고하기</action>
    <output>**✅ 스토리가 성공적으로 생성되었습니다, {user_name}!**

**스토리 세부정보:**

- 스토리 ID: {{story_id}}
- 스토리 키: {{story_key}}
- 파일: {{story_file}}
- 상태: drafted (이전: backlog)

**⚠️ 중요:** 다음 워크플로우는 컨텍스트 집약적입니다. 다음 명령을 실행하기 전에 컨텍스트를 지우고 SM 에이전트를 다시 시작하는 것이 좋습니다.

**다음 단계:**

1. {{story_file}}에서 작성된 스토리 검토하기
2. **[권장]** `story-context`를 실행하여 기술 컨텍스트 XML을 생성하고 개발을 위해 스토리를 준비 완료 표시하기 (한 단계에서 컨텍스트 + 준비 완료 결합)
3. 또는 기술 컨텍스트를 생성하지 않고 수동으로 스토리를 준비 완료 표시하려면 `story-ready` 실행하기
    </output>
  </step>

</workflow>
````

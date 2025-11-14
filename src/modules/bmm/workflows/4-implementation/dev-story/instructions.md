# 스토리 개발 - 워크플로우 지침

```xml
<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 응답을 {communication_language}로 소통하고 언어는 {user_skill_level}에 맞춰져야 합니다</critical>
<critical>모든 문서를 {document_output_language}로 생성합니다</critical>
<critical>스토리 파일에서 다음 영역만 수정하세요: Tasks/Subtasks 체크박스, Dev Agent Record (Debug Log, Completion Notes), File List, Change Log, Status</critical>
<critical>모든 단계를 정확한 순서로 실행하세요; 단계를 건너뛰지 마세요</critical>
<critical>"마일스톤", "중요한 진전" 또는 "세션 경계" 때문에 절대 중단하지 마세요. HALT 조건이 트리거되거나 사용자가 다른 지시를 하지 않는 한 스토리가 완료(모든 AC가 충족되고 모든 태스크/서브태스크가 체크됨)될 때까지 단일 실행으로 계속하세요.</critical>
<critical>HALT 조건이 적용되지 않는 한 "다음 세션"을 예약하거나 검토 일시 중지를 요청하지 마세요. 완료는 6단계에서만 결정됩니다.</critical>

<critical>사용자 스킬 레벨 ({user_skill_level})은 대화 스타일에만 영향을 미치며 코드 업데이트에는 영향을 주지 않습니다.</critical>

<workflow>

  <step n="1" goal="다음 준비된 스토리를 찾고 로드" tag="sprint-status">
    <check if="{{story_path}}가 제공됨">
      <action>{{story_path}}를 직접 사용합니다</action>
      <action>전체 스토리 파일을 읽습니다</action>
      <action>파일명 또는 메타데이터에서 story_key를 추출합니다</action>
      <goto>task_check</goto>
    </check>

    <critical>순서를 보존하기 위해 처음부터 끝까지 전체 sprint-status.yaml 파일을 읽어야 합니다</critical>
    <action>전체 파일을 로드합니다: {{output_folder}}/sprint-status.yaml</action>
    <action>시작부터 끝까지 모든 줄을 읽습니다 - 어떤 내용도 건너뛰지 마세요</action>
    <action>development_status 섹션을 완전히 파싱하여 스토리 순서를 이해합니다</action>

    <action>다음 조건의 첫 번째 스토리를 찾습니다 (위에서 아래로 순서대로 읽으면서):
      - 키가 패턴과 일치: number-number-name (예: "1-2-user-auth")
      - 에픽 키(epic-X) 또는 회고(epic-X-retrospective)가 아님
      - 상태 값이 "ready-for-dev"와 같음
    </action>

    <check if="ready-for-dev 또는 in-progress 스토리를 찾지 못함">
      <output>📋 sprint-status.yaml에서 ready-for-dev 스토리를 찾지 못했습니다
**옵션:**
1. `story-context`를 실행하여 컨텍스트 파일을 생성하고 drafted 스토리를 ready로 표시
2. `story-ready`를 실행하여 컨텍스트 생성 없이 drafted 스토리를 빠르게 ready로 표시
3. 아직 작성되지 않은 미완료 스토리가 없다면 `create-story` 실행
4. {output-folder}/sprint-status.yaml을 확인하여 현재 스프린트 상태 확인
      </output>
      <action>HALT</action>
    </check>

    <action>나중에 상태 업데이트를 위해 찾은 story_key (예: "1-2-user-authentication")를 저장합니다</action>
    <action>{{story_dir}}에서 story_key 패턴을 사용하여 일치하는 스토리 파일을 찾습니다: {{story_key}}.md</action>
    <action>검색된 경로에서 전체 스토리 파일을 읽습니다</action>

    <anchor id="task_check" />

    <action>섹션을 파싱합니다: Story, Acceptance Criteria, Tasks/Subtasks, Dev Notes, Dev Agent Record, File List, Change Log, Status</action>

    <action>컨텍스트 파일이 존재하는지 확인합니다: {{story_dir}}/{{story_key}}.context.xml</action>
    <check if="컨텍스트 파일이 존재함">
      <action>전체 컨텍스트 파일을 읽습니다</action>
      <action>모든 섹션을 파싱합니다: story details, artifacts (docs, code, dependencies), interfaces, constraints, tests</action>
      <action>이 컨텍스트를 사용하여 구현 결정과 접근 방식을 알립니다</action>
    </check>
    <check if="컨텍스트 파일이 존재하지 않음">
      <output>ℹ️ {{story_key}}에 대한 컨텍스트 파일을 찾지 못했습니다

스토리 파일만으로 진행합니다. 더 나은 컨텍스트를 위해 먼저 `story-context` 워크플로우를 실행하는 것을 고려하세요.
      </output>
    </check>

    <action>Tasks/Subtasks에서 첫 번째 미완료 태스크 (체크되지 않은 [ ])를 식별합니다</action>

    <action if="미완료 태스크 없음"><goto step="6">완료 시퀀스</goto></action>
    <action if="스토리 파일에 접근할 수 없음">HALT: "스토리 파일에 접근할 수 없으면 스토리를 개발할 수 없습니다"</action>
    <action if="미완료 태스크 또는 서브태스크 요구 사항이 모호함">사용자에게 명확히 요청하거나 HALT</action>
  </step>

  <step n="1.5" goal="검토 계속 감지 및 검토 컨텍스트 추출">
    <critical>새로 시작인지 코드 검토 후 계속인지 판단합니다</critical>

    <action>스토리 파일에 "Senior Developer Review (AI)" 섹션이 존재하는지 확인합니다</action>
    <action>Tasks/Subtasks 아래에 "Review Follow-ups (AI)" 서브섹션이 존재하는지 확인합니다</action>

    <check if="Senior Developer Review 섹션이 존재함">
      <action>review_continuation = true로 설정합니다</action>
      <action>"Senior Developer Review (AI)" 섹션에서 추출합니다:
        - 검토 결과 (Approve/Changes Requested/Blocked)
        - 검토 날짜
        - 체크박스가 있는 총 액션 항목 수 (체크됨 vs 체크 안됨 계산)
        - 심각도 분류 (High/Med/Low 개수)
      </action>
      <action>"Review Follow-ups (AI)" 서브섹션에서 체크되지 않은 [ ] 검토 후속 태스크를 계산합니다</action>
      <action>체크되지 않은 검토 항목 목록을 {{pending_review_items}}로 저장합니다</action>

      <output>⏯️ **코드 검토 후 스토리 재개** ({{review_date}})

**검토 결과:** {{review_outcome}}
**액션 항목:** {{unchecked_review_count}}개 남음
**우선순위:** High {{high_count}}개, Medium {{med_count}}개, Low {{low_count}}개

**전략:** 일반 태스크를 계속하기 전에 검토 후속 태스크 ([AI-Review]로 표시)를 우선 처리합니다.
      </output>
    </check>

    <check if="Senior Developer Review 섹션이 존재하지 않음">
      <action>review_continuation = false로 설정합니다</action>
      <action>{{pending_review_items}} = 비어 있음으로 설정합니다</action>

      <output>🚀 **새 구현 시작**

스토리: {{story_key}}
컨텍스트 파일: {{context_available}}
첫 번째 미완료 태스크: {{first_task_description}}
      </output>
    </check>
  </step>

  <step n="1.6" goal="스토리를 진행 중으로 표시" tag="sprint-status">
    <action>전체 파일을 로드합니다: {{output_folder}}/sprint-status.yaml</action>
    <action>모든 development_status 항목을 읽어 {{story_key}}를 찾습니다</action>
    <action>development_status[{{story_key}}]의 현재 상태 값을 가져옵니다</action>

    <check if="현재 상태 == 'ready-for-dev'">
      <action>스프린트 상태 리포트에서 스토리를 "in-progress"로 업데이트합니다</action>
      <output>🚀 스토리 {{story_key}} 작업 시작
상태 업데이트: ready-for-dev → in-progress
      </output>
    </check>

    <check if="현재 상태 == 'in-progress'">
      <output>⏯️ 스토리 {{story_key}} 작업 재개
스토리가 이미 in-progress로 표시되어 있습니다
      </output>
    </check>

    <check if="현재 상태가 ready-for-dev도 in-progress도 아님">
      <output>⚠️ 예상치 못한 스토리 상태: {{current_status}}
ready-for-dev 또는 in-progress가 예상됩니다. 어쨌든 계속합니다...
      </output>
    </check>
  </step>

  <step n="2" goal="태스크 계획 및 구현">
    <action>선택한 태스크에 대한 수락 기준과 dev notes를 검토합니다</action>
    <action>구현 단계와 엣지 케이스를 계획합니다; Dev Agent Record → Debug Log에 간단한 계획을 작성합니다</action>
    <action>이 리포지토리에서 스토리 및 컨텍스트 파일이나 자신의 중요한 에이전트 지침에서 배운 모범 사례, 코딩 패턴 및 코딩 표준을 엄격히 따르면서 모든 서브태스크를 포함하여 태스크를 완전히 구현합니다</action>
    <action>오류 조건과 엣지 케이스를 적절히 처리합니다</action>
    <action if="문서화된 것과 다른 새로운 의존성이 필요함">추가하기 전에 사용자 승인을 요청합니다</action>
    <action if="3회 연속 구현 실패 발생">HALT하고 가이드를 요청합니다</action>
    <action if="필요한 구성이 누락됨">HALT: "필요한 구성 파일 없이는 진행할 수 없습니다"</action>
    <critical>부분적인 진행 후 중단하지 마세요; 모든 AC가 충족되고 테스트되거나 HALT 조건이 트리거될 때까지 태스크를 계속 반복하세요</critical>
    <critical>6단계 게이트가 충족될 때까지 검토, 스탠드업 또는 검증을 위해 일시 중지를 제안하지 마세요</critical>
  </step>

  <step n="3" goal="포괄적인 테스트 작성">
    <action>태스크에 의해 도입/변경된 비즈니스 로직 및 핵심 기능에 대한 단위 테스트를 생성합니다</action>
    <action>테스트 계획 또는 스토리 노트에서 원하는 경우 컴포넌트 상호 작용에 대한 통합 테스트를 추가합니다</action>
    <action>테스트 계획 또는 스토리 노트에서 원하는 경우 중요한 사용자 흐름에 대한 엔드투엔드 테스트를 포함합니다</action>
    <action>테스트 계획 또는 스토리 노트에 명시된 엣지 케이스 및 오류 처리 시나리오를 다룹니다</action>
  </step>

  <step n="4" goal="검증 및 테스트 실행">
    <action>이 리포지토리에 대한 테스트 실행 방법을 결정합니다 (추론하거나 제공된 경우 {{run_tests_command}} 사용)</action>
    <action>회귀가 없는지 확인하기 위해 모든 기존 테스트를 실행합니다</action>
    <action>구현 정확성을 검증하기 위해 새 테스트를 실행합니다</action>
    <action>구성된 경우 린팅 및 코드 품질 검사를 실행합니다</action>
    <action>구현이 모든 스토리 수락 기준을 충족하는지 검증합니다; AC에 정량적 임계값 (예: 테스트 통과율)이 포함된 경우 완료로 표시하기 전에 충족되었는지 확인합니다</action>
    <action if="회귀 테스트 실패">계속하기 전에 중단하고 수정하며, 현재 변경 사항이 회귀를 어떻게 일으켰는지 고려합니다</action>
    <action if="새 테스트 실패">계속하기 전에 중단하고 수정합니다</action>
  </step>

  <step n="5" goal="태스크 완료 표시, 검토 해결 추적 및 스토리 업데이트">
    <critical>태스크가 검토 후속 조치인 경우 태스크 체크박스와 검토 섹션의 해당 액션 항목을 모두 표시해야 합니다</critical>

    <action>완료된 태스크에 [AI-Review] 접두사가 있는지 확인합니다 (검토 후속 태스크를 나타냄)</action>

    <check if="태스크가 검토 후속 조치임">
      <action>검토 항목 세부 정보를 추출합니다 (심각도, 설명, 관련 AC/파일)</action>
      <action>해결 추적 목록에 추가합니다: {{resolved_review_items}}</action>

      <!-- Review Follow-ups 섹션에서 태스크를 표시 -->
      <action>"Tasks/Subtasks → Review Follow-ups (AI)" 섹션에서 태스크 체크박스 [x]를 표시합니다</action>

      <!-- 중요: 검토 섹션의 해당 액션 항목도 표시 -->
      <action>설명을 일치시켜 "Senior Developer Review (AI) → Action Items" 섹션에서 일치하는 액션 항목을 찾습니다</action>
      <action>해당 액션 항목 체크박스 [x]를 해결됨으로 표시합니다</action>

      <action>Dev Agent Record → Completion Notes에 추가합니다: "✅ Resolved review finding [{{severity}}]: {{description}}"</action>
    </check>

    <action>모든 테스트가 통과하고 검증이 성공한 경우에만 태스크 (및 서브태스크) 체크박스를 [x]로 표시합니다</action>
    <action>새로 생성, 수정 또는 삭제된 파일로 File List 섹션을 업데이트합니다 (리포지토리 루트에 상대적인 경로)</action>
    <action>중요한 변경 사항이 있는 경우 Dev Agent Record에 완료 노트를 추가합니다 (의도, 접근 방식 및 후속 조치를 요약)</action>

    <check if="review_continuation == true이고 {{resolved_review_items}}가 비어 있지 않음">
      <action>이 세션에서 해결된 총 검토 항목 수를 계산합니다</action>
      <action>Change Log 항목을 추가합니다: "Addressed code review findings - {{resolved_count}} items resolved (Date: {{date}})"</action>
    </check>

    <action>스토리 파일을 저장합니다</action>
    <action>더 많은 미완료 태스크가 남아 있는지 확인합니다</action>
    <action if="더 많은 태스크가 남아 있음"><goto step="2">다음 태스크</goto></action>
    <action if="남은 태스크 없음"><goto step="6">완료</goto></action>
  </step>

  <step n="6" goal="스토리 완료 및 검토 표시" tag="sprint-status">
    <action>모든 태스크와 서브태스크가 [x]로 표시되어 있는지 확인합니다 (지금 스토리 문서를 다시 스캔)</action>
    <action>전체 회귀 스위트를 실행합니다 (건너뛰지 마세요)</action>
    <action>File List에 변경된 모든 파일이 포함되어 있는지 확인합니다</action>
    <action>스토리에 완료 정의 체크리스트가 포함되어 있는 경우 이를 실행합니다</action>
    <action>스토리 Status를 다음으로 업데이트합니다: review</action>

    <!-- 스토리를 검토 준비 상태로 표시 -->
    <action>전체 파일을 로드합니다: {{output_folder}}/sprint-status.yaml</action>
    <action>{{story_key}}와 일치하는 development_status 키를 찾습니다</action>
    <action>현재 상태가 "in-progress"인지 확인합니다 (예상된 이전 상태)</action>
    <action>development_status[{{story_key}}] = "review"로 업데이트합니다</action>
    <action>STATUS DEFINITIONS를 포함한 모든 주석과 구조를 보존하면서 파일을 저장합니다</action>

    <check if="파일에서 스토리 키를 찾지 못함">
      <output>⚠️ 스토리 파일이 업데이트되었지만 sprint-status 업데이트 실패: {{story_key}}를 찾지 못함

스토리가 파일에서 Ready for Review로 표시되었지만 sprint-status.yaml이 동기화되지 않았을 수 있습니다.
      </output>
    </check>

    <action if="태스크가 미완료임">부분 진행으로 완료하지 마십시오. 남은 작업을 완료하기 위해 1단계로 돌아갑니다</action>
    <action if="회귀 실패 존재">완료하기 전에 중단하고 해결합니다</action>
    <action if="File List가 불완전함">완료하기 전에 업데이트합니다</action>
  </step>

  <step n="7" goal="완료 커뮤니케이션 및 사용자 지원">
    <action>선택적으로 {project-root}/{bmad_folder}/core/tasks/validate-workflow.xml을 사용하여 스토리에 대해 워크플로우 검증 태스크를 실행합니다</action>
    <action>Dev Agent Record → Completion Notes에 간결한 요약을 준비합니다</action>

    <action>{user_name}에게 스토리 구현이 완료되고 검토 준비가 되었음을 알립니다</action>
    <action>주요 성과를 요약합니다: 스토리 ID, 스토리 키, 제목, 주요 변경 사항, 추가된 테스트, 수정된 파일</action>
    <action>스토리 파일 경로와 현재 상태 (이제 "review", 이전에는 "in-progress")를 제공합니다</action>

    <action>{user_skill_level}을 기반으로 사용자가 다음에 대한 설명이 필요한지 물어봅니다:
      - 무엇이 구현되었고 어떻게 작동하는지
      - 특정 기술적 결정이 내려진 이유
      - 변경 사항을 테스트하거나 검증하는 방법
      - 사용된 패턴, 라이브러리 또는 접근 방식
      - 명확히 하고 싶은 다른 것
    </action>

    <check if="사용자가 설명을 요청함">
      <action>{user_skill_level}에 맞춰진 명확하고 맥락적인 설명을 제공합니다</action>
      <action>도움이 될 때 예제와 특정 코드 참조를 사용합니다</action>
    </check>

    <action>설명이 완료되면 (또는 사용자가 질문이 없다고 표시하면) 논리적인 다음 단계를 제안합니다</action>
    <action>제안할 일반적인 다음 단계 (하지만 사용자 유연성 허용):
      - 구현된 스토리를 직접 검토하고 변경 사항을 테스트
      - 모든 수락 기준이 충족되었는지 확인
      - 해당하는 경우 배포 준비 확인
      - 피어 검토를 위해 `code-review` 워크플로우 실행
      - sprint-status.yaml을 확인하여 프로젝트 진행 상황 확인
    </action>
    <action>유연성을 유지합니다 - 사용자가 자신의 경로를 선택하거나 다른 도움을 요청할 수 있도록 허용합니다</action>
  </step>

</workflow>
```

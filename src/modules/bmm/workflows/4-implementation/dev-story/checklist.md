---
title: '스토리 개발 완료 체크리스트'
validation-target: '스토리 마크다운 ({{story_path}})'
required-inputs:
  - 'Tasks/Subtasks, Acceptance Criteria가 포함된 스토리 마크다운 파일'
optional-inputs:
  - '테스트 결과 출력 (저장된 경우)'
  - 'CI 로그 (해당하는 경우)'
validation-rules:
  - '스토리에서 허용된 섹션만 수정됨: Tasks/Subtasks 체크박스, Dev Agent Record (Debug Log, Completion Notes), File List, Change Log, Status'
---

# 스토리 개발 완료 체크리스트

## 태스크 완료

- [ ] 이 스토리의 모든 태스크와 서브태스크가 [x]로 완료 표시됨
- [ ] 구현이 스토리의 모든 수락 기준과 일치함

## 테스트 및 품질

- [ ] 이 스토리에 의해 변경된 핵심 기능에 대한 단위 테스트 추가/업데이트됨
- [ ] 컴포넌트 상호 작용이 영향을 받는 경우 통합 테스트 추가/업데이트됨
- [ ] 해당하는 경우 중요한 사용자 흐름에 대한 엔드투엔드 테스트 생성됨
- [ ] 모든 테스트가 로컬에서 통과함 (회귀 없음)
- [ ] 린팅 및 정적 검사 (구성된 경우) 통과함

## 스토리 파일 업데이트

- [ ] File List 섹션에 모든 새로운/수정된/삭제된 파일이 포함됨 (리포지토리 루트 상대 경로)
- [ ] Dev Agent Record에 이 작업에 대한 관련 Debug Log 및/또는 Completion Notes가 포함됨
- [ ] Change Log에 변경 사항에 대한 간략한 요약이 포함됨
- [ ] 스토리 파일의 허용된 섹션만 수정됨

## 최종 상태

- [ ] 회귀 스위트가 성공적으로 실행됨
- [ ] 스토리 Status가 "Ready for Review"로 설정됨

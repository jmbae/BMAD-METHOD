# 스프린트 계획 검증 체크리스트

## 핵심 검증

### 완전한 커버리지 확인

- [ ] epic\*.md 파일에서 찾은 모든 에픽이 sprint-status.yaml에 나타남
- [ ] epic\*.md 파일에서 찾은 모든 스토리가 sprint-status.yaml에 나타남
- [ ] 모든 에픽에 해당하는 회고 항목이 있음
- [ ] sprint-status.yaml에 에픽 파일에 존재하지 않는 항목이 없음

### 파싱 검증

에픽 파일과 생성된 sprint-status.yaml을 비교합니다:

```
에픽 파일 포함:                    스프린트 상태 포함:
✓ Epic 1                            ✓ epic-1: [status]
  ✓ Story 1.1: User Auth              ✓ 1-1-user-auth: [status]
  ✓ Story 1.2: Account Mgmt           ✓ 1-2-account-mgmt: [status]
  ✓ Story 1.3: Plant Naming           ✓ 1-3-plant-naming: [status]
                                      ✓ epic-1-retrospective: [status]
✓ Epic 2                            ✓ epic-2: [status]
  ✓ Story 2.1: Personality Model      ✓ 2-1-personality-model: [status]
  ✓ Story 2.2: Chat Interface         ✓ 2-2-chat-interface: [status]
                                      ✓ epic-2-retrospective: [status]
```

### 최종 확인

- [ ] 에픽의 총 개수가 일치함
- [ ] 스토리의 총 개수가 일치함
- [ ] 모든 항목이 예상 순서대로 정렬됨 (에픽, 스토리, 회고)

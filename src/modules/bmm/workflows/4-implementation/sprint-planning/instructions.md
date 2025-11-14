# 스프린트 계획 - 스프린트 상태 생성기

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {project-root}/{bmad_folder}/bmm/workflows/4-implementation/sprint-planning/workflow.yaml</critical>

## 📚 문서 검색 - 전체 에픽 로딩

**전략**: 스프린트 계획은 완전한 상태 추적을 구축하기 위해 모든 에픽과 스토리가 필요합니다.

**에픽 검색 프로세스:**

1. **먼저 전체 문서를 검색** - `epics.md`, `bmm-epics.md` 또는 모든 `*epic*.md` 파일을 찾습니다
2. **분할 버전 확인** - 전체 문서를 찾지 못한 경우 `epics/index.md`를 찾습니다
3. **분할 버전을 찾은 경우**:
   - `index.md`를 읽어 문서 구조를 이해합니다
   - 인덱스에 나열된 모든 에픽 섹션 파일을 읽습니다 (예: `epic-1.md`, `epic-2.md` 등)
   - 결합된 내용에서 모든 에픽과 스토리를 처리합니다
   - 이를 통해 완전한 스프린트 상태 커버리지가 보장됩니다
4. **우선순위**: 전체 버전과 분할 버전이 모두 존재하는 경우 전체 문서를 사용합니다

**퍼지 매칭**: 문서 이름에 유연성을 가지세요 - 사용자는 `epics.md`, `bmm-epics.md`, `user-stories.md` 등의 변형을 사용할 수 있습니다.

<workflow>

<step n="1" goal="에픽 파일을 파싱하고 모든 작업 항목 추출">
<action>{communication_language}로 {user_name}과 소통합니다</action>
<action>{epics_location}에서 `{epics_pattern}`과 일치하는 모든 파일을 찾습니다</action>
<action>단일 `epics.md` 파일이거나 여러 `epic-1.md`, `epic-2.md` 파일일 수 있습니다</action>

<action>찾은 각 에픽 파일에서 다음을 추출합니다:</action>

- `## Epic 1:` 또는 `## Epic 2:`와 같은 헤더에서 에픽 번호
- `### Story 1.1: User Authentication`과 같은 패턴에서 스토리 ID와 제목
- 스토리 형식을 `Epic.Story: Title`에서 kebab-case 키로 변환: `epic-story-title`

**스토리 ID 변환 규칙:**

- 원본: `### Story 1.1: User Authentication`
- 마침표를 대시로 교체: `1-1`
- 제목을 kebab-case로 변환: `user-authentication`
- 최종 키: `1-1-user-authentication`

<action>모든 에픽 파일에서 모든 에픽과 스토리의 완전한 인벤토리를 구축합니다</action>
</step>

<step n="2" goal="스프린트 상태 구조 구축">
<action>찾은 각 에픽에 대해 다음 순서로 항목을 생성합니다:</action>

1. **에픽 항목** - 키: `epic-{num}`, 기본 상태: `backlog`
2. **스토리 항목** - 키: `{epic}-{story}-{title}`, 기본 상태: `backlog`
3. **회고 항목** - 키: `epic-{num}-retrospective`, 기본 상태: `optional`

**예시 구조:**

```yaml
development_status:
  epic-1: backlog
  1-1-user-authentication: backlog
  1-2-account-management: backlog
  epic-1-retrospective: optional
```

</step>

<step n="3" goal="지능형 상태 감지 적용">
<action>각 에픽에 대해 기술 컨텍스트 파일이 존재하는지 확인합니다:</action>

- 확인: `{output_folder}/epic-{num}-context.md`
- 존재하는 경우 → 에픽 상태를 `contexted`로 설정
- 그렇지 않은 경우 → `backlog`로 유지

<action>각 스토리에 대해 파일을 확인하여 현재 상태를 감지합니다:</action>

**스토리 파일 감지:**

- 확인: `{story_location_absolute}/{story-key}.md` (예: `stories/1-1-user-authentication.md`)
- 존재하는 경우 → 상태를 최소 `drafted`로 업그레이드

**스토리 컨텍스트 감지:**

- 확인: `{story_location_absolute}/{story-key}-context.md` (예: `stories/1-1-user-authentication-context.md`)
- 존재하는 경우 → 상태를 최소 `ready-for-dev`로 업그레이드

**보존 규칙:**

- 기존 `{status_file}`이 존재하고 더 진행된 상태를 가진 경우 이를 보존합니다
- 상태를 다운그레이드하지 않습니다 (예: `done`을 `drafted`로 변경하지 않음)

**상태 흐름 참조:**

- 에픽: `backlog` → `contexted`
- 스토리: `backlog` → `drafted` → `ready-for-dev` → `in-progress` → `review` → `done`
- 회고: `optional` ↔ `completed`
  </step>

<step n="4" goal="스프린트 상태 파일 생성">
<action>다음과 같이 {status_file}을 생성하거나 업데이트합니다:</action>

**파일 구조:**

```yaml
# generated: {date}
# project: {project_name}
# project_key: {project_key}
# tracking_system: {tracking_system}
# story_location: {story_location}

# STATUS DEFINITIONS:
# ==================
# Epic Status:
#   - backlog: Epic exists in epic file but not contexted
#   - contexted: Epic tech context created (required before drafting stories)
#
# Story Status:
#   - backlog: Story only exists in epic file
#   - drafted: Story file created in stories folder
#   - ready-for-dev: Draft approved and story context created
#   - in-progress: Developer actively working on implementation
#   - review: Under SM review (via code-review workflow)
#   - done: Story completed
#
# Retrospective Status:
#   - optional: Can be completed but not required
#   - completed: Retrospective has been done
#
# WORKFLOW NOTES:
# ===============
# - Epics should be 'contexted' before stories can be 'drafted'
# - Stories can be worked in parallel if team capacity allows
# - SM typically drafts next story after previous one is 'done' to incorporate learnings
# - Dev moves story to 'review', SM reviews, then Dev moves to 'done'

generated: { date }
project: { project_name }
project_key: { project_key }
tracking_system: { tracking_system }
story_location: { story_location }

development_status:
  # All epics, stories, and retrospectives in order
```

<action>완전한 스프린트 상태 YAML을 {status_file}에 작성합니다</action>
<action>중요: 메타데이터가 두 번 나타납니다 - 문서화를 위해 주석(#)으로 한 번, 파싱을 위해 YAML key:value 필드로 한 번</action>
<action>모든 항목이 순서대로 정렬되도록 합니다: 에픽, 그 스토리들, 그 회고, 다음 에픽...</action>
</step>

<step n="5" goal="검증 및 보고">
<action>검증 확인을 수행합니다:</action>

- [ ] 에픽 파일의 모든 에픽이 {status_file}에 나타남
- [ ] 에픽 파일의 모든 스토리가 {status_file}에 나타남
- [ ] 모든 에픽에 해당하는 회고 항목이 있음
- [ ] {status_file}에 에픽 파일에 존재하지 않는 항목이 없음
- [ ] 모든 상태 값이 합법적임 (상태 머신 정의와 일치)
- [ ] 파일이 유효한 YAML 구문임

<action>총계를 계산합니다:</action>

- 총 에픽: {{epic_count}}
- 총 스토리: {{story_count}}
- 컨텍스트가 생성된 에픽: {{contexted_count}}
- 진행 중인 스토리: {{in_progress_count}}
- 완료된 스토리: {{done_count}}

<action>{communication_language}로 {user_name}에게 완료 요약을 표시합니다:</action>

**스프린트 상태가 성공적으로 생성되었습니다**

- **파일 위치:** {status_file}
- **총 에픽:** {{epic_count}}
- **총 스토리:** {{story_count}}
- **컨텍스트가 생성된 에픽:** {{contexted_count}}
- **진행 중인 스토리:** {{in_progress_count}}
- **완료된 스토리:** {{done_count}}

**다음 단계:**

1. 생성된 {status_file}을 검토합니다
2. 이 파일을 사용하여 개발 진행 상황을 추적합니다
3. 에이전트가 작업하면서 상태를 업데이트합니다
4. 자동 감지된 상태를 새로 고치려면 이 워크플로우를 다시 실행합니다

</step>

</workflow>

## 추가 문서

### 상태 상태 머신

**에픽 상태 흐름:**

```
backlog → contexted
```

- **backlog**: 에픽이 에픽 파일에 존재하지만 기술 컨텍스트가 생성되지 않음
- **contexted**: 에픽 기술 컨텍스트가 생성됨 (스토리 작성을 위한 전제 조건)

**스토리 상태 흐름:**

```
backlog → drafted → ready-for-dev → in-progress → review → done
```

- **backlog**: 스토리가 에픽 파일에만 존재함
- **drafted**: 스토리 파일이 생성됨 (예: `stories/1-3-plant-naming.md`)
- **ready-for-dev**: 초안이 승인되고 스토리 컨텍스트가 생성됨
- **in-progress**: 개발자가 적극적으로 작업 중
- **review**: SM 검토 중 (code-review 워크플로우를 통해)
- **done**: 완료됨

**회고 상태:**

```
optional ↔ completed
```

- **optional**: 수행할 수 있지만 필수는 아님
- **completed**: 회고가 완료됨

### 가이드라인

1. **에픽 컨텍스트 권장**: 에픽은 스토리를 `drafted`하기 전에 `contexted`되어야 합니다
2. **순차적 기본값**: 스토리는 일반적으로 순서대로 작업되지만 병렬 작업도 지원됩니다
3. **병렬 작업 지원**: 팀 역량이 허용하는 경우 여러 스토리가 `in-progress`일 수 있습니다
4. **완료 전 검토**: 스토리는 `done` 전에 `review`를 거쳐야 합니다
5. **학습 전달**: SM은 일반적으로 이전 스토리가 `done`된 후 다음 스토리를 작성하여 학습 내용을 통합합니다

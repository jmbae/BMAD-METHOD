# {{project_name}} - 에픽 분해

**작성자:** {{user_name}}
**날짜:** {{date}}
**프로젝트 레벨:** {{project_level}}
**목표 규모:** {{target_scale}}

---

## 개요

이 문서는 {{project_name}}의 완전한 에픽 및 스토리 분해를 제공하며, [PRD](./PRD.md)의 요구사항을 구현 가능한 스토리로 분해합니다.

{{epics_summary}}

---

<!-- 각 에픽에 대해 반복 (N = 1, 2, 3...) -->

## 에픽 {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- 에픽 N 내 각 스토리에 대해 반복 (M = 1, 2, 3...) -->

### 스토리 {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**승인 기준:**

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}

**And** {{additional_criteria}}

**전제조건:** {{dependencies_on_previous_stories}}

**기술 노트:** {{implementation_guidance}}

<!-- 스토리 반복 종료 -->

---

<!-- 에픽 반복 종료 -->

---

_구현을 위해: 이 에픽 분해에서 개별 스토리 구현 계획을 생성하려면 `create-story` 워크플로우를 사용하세요._

# UX 디자인 생성 워크플로우 검증 체크리스트

**목적**: UX 디자인 사양이 완전하고 협력적이며 구현 준비가 되었는지 검증합니다.

**패러다임**: 시각적 협력 기반이며 템플릿 생성이 아닙니다.

**예상 산출물**:

- ux-design-specification.md
- ux-color-themes.html (색상 테마 시각화 도구)
- ux-design-directions.html (디자인 목업)
- 선택적: ux-prototype.html, ux-component-showcase.html, ai-frontend-prompt.md

---

## 1. 산출 파일 존재

- [ ] **ux-design-specification.md** 출력 폴더에 생성됨
- [ ] **ux-color-themes.html** 생성됨 (대화형 색상 탐색)
- [ ] **ux-design-directions.html** 생성됨 (6-8개 디자인 목업)
- [ ] 사양에 채워지지 않은 {{template_variables}} 없음
- [ ] 모든 섹션에 콘텐츠 포함 (자리 표시자 텍스트 아님)

---

## 2. 협력적 프로세스 검증

**워크플로우는 사용자를 위해서가 아니라 사용자와 함께 결정을 촉진해야 합니다**

- [ ] **사용자가 디자인 시스템 선택** (자동 선택 아님)
- [ ] **옵션에서 색상 테마 선택** (사용자가 시각화를 보고 선택)
- [ ] **목업에서 디자인 방향 선택** (사용자가 6-8가지 옵션 탐색)
- [ ] **협력적으로 설계된 사용자 여정 흐름** (옵션 제시, 사용자 결정)
- [ ] **사용자 입력으로 결정된 UX 패턴** (단순히 생성되지 않음)
- [ ] **근거와 함께 결정 기록** (각 선택이 왜 이루어졌는지)

---

## 3. 시각적 협력 아티팩트

### 색상 테마 시각화 도구

- [ ] **HTML 파일이 존재하고 유효함** (ux-color-themes.html)
- [ ] **3-4가지 테마 옵션 표시** (또는 기존 브랜드 기록)
- [ ] **각 테마에는 완전한 팔레트 포함** (주요, 보조, 의미론적 색상)
- [ ] **각 테마의 라이브 UI 컴포넌트 예시** (버튼, 폼, 카드)
- [ ] **나란히 비교** 활성화됨
- [ ] **사용자의 선택 기록** 사양에 포함됨

### 디자인 방향 목업

- [ ] **HTML 파일이 존재하고 유효함** (ux-design-directions.html)
- [ ] **6-8가지 다른 디자인 접근 방식** 표시됨
- [ ] **주요 화면의 전체 화면 목업**
- [ ] **각 방향에 디자인 철학 레이블** (예: "Dense Dashboard", "Spacious Explorer")
- [ ] **방향 간의 대화형 탐색**
- [ ] **반응형 미리보기** 토글 사용 가능
- [ ] **사용자의 선택이 근거와 함께 기록됨** (무엇을 좋아했는지, 왜 맞는지)

---

## 4. 디자인 시스템 기초

- [ ] **디자인 시스템 선택** (또는 커스텀 디자인 결정 기록)
- [ ] **현재 버전 확인** (확립된 시스템을 사용하는 경우)
- [ ] **시스템에서 제공하는 컴포넌트 기록**
- [ ] **필요한 커스텀 컴포넌트 식별**
- [ ] **결정 근거 명확** (이 프로젝트에 이 시스템인 이유)

---

## 5. 핵심 경험 정의

- [ ] **정의하는 경험 표현** (이 앱을 고유하게 만드는 한 가지)
- [ ] **새로운 UX 패턴 식별** (해당되는 경우)
- [ ] **새로운 패턴 완전히 설계** (상호작용 모델, 상태, 피드백)
- [ ] **핵심 경험 원칙 정의** (속도, 안내, 유연성, 피드백)

---

## 6. Visual Foundation

### Color System

- [ ] **Complete color palette** (primary, secondary, accent, semantic, neutrals)
- [ ] **Semantic color usage defined** (success, warning, error, info)
- [ ] **Color accessibility considered** (contrast ratios for text)
- [ ] **Brand alignment** (follows existing brand or establishes new identity)

### Typography

- [ ] **Font families selected** (heading, body, monospace if needed)
- [ ] **Type scale defined** (h1-h6, body, small, etc.)
- [ ] **Font weights documented** (when to use each)
- [ ] **Line heights specified** for readability

### Spacing & Layout

- [ ] **Spacing system defined** (base unit, scale)
- [ ] **Layout grid approach** (columns, gutters)
- [ ] **Container widths** for different breakpoints

---

## 7. Design Direction

- [ ] **Specific direction chosen** from mockups (not generic)
- [ ] **Layout pattern documented** (navigation, content structure)
- [ ] **Visual hierarchy defined** (density, emphasis, focus)
- [ ] **Interaction patterns specified** (modal vs inline, disclosure approach)
- [ ] **Visual style documented** (minimal, balanced, rich, maximalist)
- [ ] **User's reasoning captured** (why this direction fits their vision)

---

## 8. User Journey Flows

- [ ] **All critical journeys from PRD designed** (no missing flows)
- [ ] **Each flow has clear goal** (what user accomplishes)
- [ ] **Flow approach chosen collaboratively** (user picked from options)
- [ ] **Step-by-step documentation** (screens, actions, feedback)
- [ ] **Decision points and branching** defined
- [ ] **Error states and recovery** addressed
- [ ] **Success states specified** (completion feedback)
- [ ] **Mermaid diagrams or clear flow descriptions** included

---

## 9. Component Library Strategy

- [ ] **All required components identified** (from design system + custom)
- [ ] **Custom components fully specified**:
  - Purpose and user-facing value
  - Content/data displayed
  - User actions available
  - All states (default, hover, active, loading, error, disabled)
  - Variants (sizes, styles, layouts)
  - Behavior on interaction
  - Accessibility considerations
- [ ] **Design system components customization needs** documented

---

## 10. UX Pattern Consistency Rules

**These patterns ensure consistent UX across the entire app**

- [ ] **Button hierarchy defined** (primary, secondary, tertiary, destructive)
- [ ] **Feedback patterns established** (success, error, warning, info, loading)
- [ ] **Form patterns specified** (labels, validation, errors, help text)
- [ ] **Modal patterns defined** (sizes, dismiss behavior, focus, stacking)
- [ ] **Navigation patterns documented** (active state, breadcrumbs, back button)
- [ ] **Empty state patterns** (first use, no results, cleared content)
- [ ] **Confirmation patterns** (when to confirm destructive actions)
- [ ] **Notification patterns** (placement, duration, stacking, priority)
- [ ] **Search patterns** (trigger, results, filters, no results)
- [ ] **Date/time patterns** (format, timezone, pickers)

**Each pattern should have:**

- [ ] Clear specification (how it works)
- [ ] Usage guidance (when to use)
- [ ] Examples (concrete implementations)

---

## 11. Responsive Design

- [ ] **Breakpoints defined** for target devices (mobile, tablet, desktop)
- [ ] **Adaptation patterns documented** (how layouts change)
- [ ] **Navigation adaptation** (how nav changes on small screens)
- [ ] **Content organization changes** (multi-column to single, grid to list)
- [ ] **Touch targets adequate** on mobile (minimum size specified)
- [ ] **Responsive strategy aligned** with chosen design direction

---

## 12. Accessibility

- [ ] **WCAG compliance level specified** (A, AA, or AAA)
- [ ] **Color contrast requirements** documented (ratios for text)
- [ ] **Keyboard navigation** addressed (all interactive elements accessible)
- [ ] **Focus indicators** specified (visible focus states)
- [ ] **ARIA requirements** noted (roles, labels, announcements)
- [ ] **Screen reader considerations** (meaningful labels, structure)
- [ ] **Alt text strategy** for images
- [ ] **Form accessibility** (label associations, error identification)
- [ ] **Testing strategy** defined (automated tools, manual testing)

---

## 13. Coherence and Integration

- [ ] **Design system and custom components visually consistent**
- [ ] **All screens follow chosen design direction**
- [ ] **Color usage consistent with semantic meanings**
- [ ] **Typography hierarchy clear and consistent**
- [ ] **Similar actions handled the same way** (pattern consistency)
- [ ] **All PRD user journeys have UX design**
- [ ] **All entry points designed**
- [ ] **Error and edge cases handled**
- [ ] **Every interactive element meets accessibility requirements**
- [ ] **All flows keyboard-navigable**
- [ ] **Colors meet contrast requirements**

---

## 14. Cross-Workflow Alignment (Epics File Update)

**As UX design progresses, you discover implementation details that affect the story breakdown**

### Stories Discovered During UX Design

- [ ] **Review epics.md file** for alignment with UX design
- [ ] **New stories identified** during UX design that weren't in epics.md:
  - [ ] Custom component build stories (if significant)
  - [ ] UX pattern implementation stories
  - [ ] Animation/transition stories
  - [ ] Responsive adaptation stories
  - [ ] Accessibility implementation stories
  - [ ] Edge case handling stories discovered during journey design
  - [ ] Onboarding/empty state stories
  - [ ] Error state handling stories

### Story Complexity Adjustments

- [ ] **Existing stories complexity reassessed** based on UX design:
  - [ ] Stories that are now more complex (UX revealed additional requirements)
  - [ ] Stories that are simpler (design system handles more than expected)
  - [ ] Stories that should be split (UX design shows multiple components/flows)
  - [ ] Stories that can be combined (UX design shows they're tightly coupled)

### Epic Alignment

- [ ] **Epic scope still accurate** after UX design
- [ ] **New epic needed** for discovered work (if significant)
- [ ] **Epic ordering might change** based on UX dependencies

### Action Items for Epics File Update

- [ ] **List of new stories to add** to epics.md documented
- [ ] **Complexity adjustments noted** for existing stories
- [ ] **Update epics.md** OR flag for architecture review first
- [ ] **Rationale documented** for why new stories/changes are needed

**Note:** If significant story changes are identified, consider running architecture workflow BEFORE updating epics.md, since architecture decisions might reveal additional adjustments needed.

---

## 15. Decision Rationale

**Unlike template-driven workflows, this workflow should document WHY**

- [ ] **Design system choice has rationale** (why this fits the project)
- [ ] **Color theme selection has reasoning** (why this emotional impact)
- [ ] **Design direction choice explained** (what user liked, how it fits vision)
- [ ] **User journey approaches justified** (why this flow pattern)
- [ ] **UX pattern decisions have context** (why these patterns for this app)
- [ ] **Responsive strategy aligned with user priorities**
- [ ] **Accessibility level appropriate for deployment intent**

---

## 16. Implementation Readiness

- [ ] **Designers can create high-fidelity mockups** from this spec
- [ ] **Developers can implement** with clear UX guidance
- [ ] **Sufficient detail** for frontend development
- [ ] **Component specifications actionable** (states, variants, behaviors)
- [ ] **Flows implementable** (clear steps, decision logic, error handling)
- [ ] **Visual foundation complete** (colors, typography, spacing all defined)
- [ ] **Pattern consistency enforceable** (clear rules for implementation)

---

## 17. 중대 실패 (자동 실패)

- [ ] ❌ **시각적 협력 없음** (색상 테마 또는 디자인 목업이 생성되지 않음)
- [ ] ❌ **사용자가 결정에 참여하지 않음** (협력 없이 자동 생성됨)
- [ ] ❌ **선택된 디자인 방향 없음** (주요 시각적 결정 누락)
- [ ] ❌ **사용자 여정 설계 없음** (중요한 흐름이 기록되지 않음)
- [ ] ❌ **UX 패턴 일관성 규칙 없음** (구현이 일관성 없을 것)
- [ ] ❌ **핵심 경험 정의 누락** (앱을 고유하게 만드는 것에 대한 명확성 없음)
- [ ] ❌ **컴포넌트 사양 없음** (컴포넌트가 실행 가능하지 않음)
- [ ] ❌ **반응형 전략 누락** (다중 플랫폼 프로젝트의 경우)
- [ ] ❌ **접근성 무시** (준수 대상 또는 요구 사항 없음)
- [ ] ❌ **일반적/템플릿 콘텐츠** (이 프로젝트에 특정하지 않음)

---

## 검증 노트

**발견 사항 기록:**

- UX 디자인 품질: [뛰어남 / 강함 / 적절함 / 개선 필요 / 불완전]
- 협력 수준: [매우 협력적 / 협력적 / 다소 협력적 / 생성됨]
- 시각적 아티팩트: [완전하고 대화형 / 부분적 / 누락됨]
- 구현 준비: [준비됨 / 디자인 단계 필요 / 준비 안 됨]

## **강점:**

## **개선 영역:**

## **권장 조치:**

**다음 단계로 진행할 준비가 됨?** [예 - 디자인으로 진행 / 예 - 개발로 진행 / 개선 필요]

---

_이 체크리스트는 템플릿 생성이 아닌 협력적 UX 디자인 촉진을 검증합니다. 성공적인 UX 워크플로우는 시각적 탐색과 정보 기반 선택을 통해 사용자와 함께 설계 결정을 만듭니다._

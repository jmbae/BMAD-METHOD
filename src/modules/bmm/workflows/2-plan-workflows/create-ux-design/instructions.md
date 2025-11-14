# UX 디자인 생성 워크플로우 지침

<workflow name="create-ux-design">

<critical>The workflow execution engine is governed by: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>이 워크플로우는 적응형 촉진을 사용합니다 - {user_skill_level}에 따라 의사소통 스타일을 조정하세요</critical>
<critical>목표는 컨텐츠 생성이 아닌 시각적 탐색을 통한 협력적 UX 디자인입니다</critical>
<critical>모든 응답을 {communication_language}로 소통하고 {user_skill_level}에 맞게 조정하세요</critical>
<critical>모든 문서를 {document_output_language}로 생성하세요</critical>
<critical>각 주요 단계 후 진행 상황을 저장하세요 - 전체적으로 <template-output> 태그를 사용하세요</critical>
<critical>문서 출력: 전문적이고 구체적이며 실행 가능한 UX 디자인 결정과 근거를 제시하세요. 사용자 기술 수준({user_skill_level})은 대화 스타일에만 영향을 미칩니다. 문서 내용에는 영향을 주지 않습니다.</critical>
<critical>입력 문서는 workflow.yaml의 input_file_patterns에 지정되어 있습니다 - 워크플로우 엔진이 퍼지 매칭, 전체 문서 vs 분할 문서 발견을 자동으로 처리합니다</critical>

<step n="0" goal="워크플로우 준비 상태 검증" tag="workflow-status">
<action>Check if {output_folder}/bmm-workflow-status.yaml exists</action>

<check if="status file not found">
  <output>워크플로우 상태 파일을 찾을 수 없습니다. UX 디자인 생성은 독립 실행형으로 또는 BMM 계획 워크플로우의 일부로 실행할 수 있습니다.</output>
  <output>독립 실행형 사용의 경우 필요에 따라 요구 사항을 수집합니다. 통합 사용의 경우 더 나은 컨텍스트를 위해 먼저 `workflow-init`을 실행하세요.</output>
  <action>Set standalone_mode = true</action>
</check>

<check if="status file found">
  <action>Load the FULL file: {output_folder}/bmm-workflow-status.yaml</action>
  <action>Parse workflow_status section</action>
  <action>Check status of "create-design" workflow</action>
  <action>Get project_level from YAML metadata</action>
  <action>Find first non-completed workflow (next expected workflow)</action>

  <check if="create-design status is file path (already completed)">
    <output>⚠️ UX Design already completed: {{create-design status}}</output>
    <ask>Re-running will overwrite the existing UX design. Continue? (y/n)</ask>
    <check if="n">
      <output>Exiting. Use workflow-status to see your next step.</output>
      <action>Exit workflow</action>
    </check>
  </check>

  <check if="create-design is not the next expected workflow">
    <output>⚠️ Next expected workflow: {{next_workflow}}. UX Design is out of sequence.</output>
    <ask>Continue with UX Design anyway? (y/n)</ask>
    <check if="n">
      <output>Exiting. Run {{next_workflow}} instead.</output>
      <action>Exit workflow</action>
    </check>
  </check>

<action>Set standalone_mode = false</action>
<action>Store {{project_level}} for scoping decisions</action>
</check>
</step>

<step n="1a" goal="프로젝트 이해 확인 또는 기본 컨텍스트 수집">
  <critical>UX 디자이너는 설계하기 전에 왜(WHY)를 먼저 이해해야 합니다</critical>

<action>Attempt to load context documents using fuzzy matching: - PRD: {prd_file} - Product Brief: {brief_file} - Brainstorming: {brainstorm_file}
</action>

  <check if="documents_found">
    <action>Extract and understand:
      - Project vision and goals
      - Target users and personas
      - Core features and user journeys
      - Platform requirements (web, mobile, desktop)
      - Any technical constraints mentioned
      - Brand personality hints
      - Competitive landscape references
    </action>

    <output>프로젝트 문서를 로드했습니다. 확인해 드리겠습니다:

**프로젝트:** {{project_summary_from_docs}}
**대상 사용자:** {{user_summary_from_docs}}</output>

    <ask>이것이 당신의 이해와 맞습니까? 수정하거나 추가할 사항이 있습니까?</ask>

  </check>

  <check if="no_documents_found">
    <ask>무엇을 만들고 있는지 먼저 이해해 봅시다.

**무엇을 만들고 있습니까?** (프로젝트에 대해 1-2문장으로)

**누구를 위해 만듭니까?** 이상적인 사용자를 설명하세요.</ask>
</check>

<template-output>project_and_users_confirmed</template-output>
</step>

<step n="1b" goal="핵심 경험과 플랫폼 이해">
  <critical>이제 이 경험을 정의하는 한 가지를 발견합니다</critical>

<ask>이제 경험 자체를 자세히 살펴봅시다.

**핵심 경험은 무엇입니까?**

- 사용자들이 가장 많이 할 한 가지는 무엇입니까?
- 무엇이 절대적으로 쉬워야 합니까?
- 어떤 사용자 작업을 올바르게 하는 것이 가장 중요합니까?

**플랫폼:**
사용자들은 이것을 어디서 경험하게 됩니까? (웹, 모바일 앱, 데스크톱, 여러 플랫폼)</ask>

<template-output>core_experience_and_platform</template-output>
</step>

<step n="1c" goal="원하는 감정적 반응 발견">
  <critical>감정이 행동을 유도합니다 - 이것이 모든 것을 형성합니다</critical>

<ask>이것은 중요합니다 - **사용자가 이것을 사용할 때 무엇을 느껴야 합니까?**

그들이 무엇을 할지가 아니라 그들이 경험해야 할 감정이나 상태:

- 권능감과 통제감?
- 기쁨과 놀라움?
- 효율성과 생산성?
- 창의성과 영감?
- 침착함과 집중력?
- 연결감과 참여감?
- 그 외 다른 것?

당신이 원하는 감정적 반응에 대해 정말 생각해 보세요. 그들이 친구에게 이것을 말하게 할 느낌은 무엇입니까?</ask>

<template-output>desired_emotional_response</template-output>
</step>

<step n="1d" goal="영감 수집 및 UX 패턴 분석">
  <critical>사용자들이 이미 사랑하는 것에서 배웁니다</critical>

<ask>**영감을 얻을 시간입니다!**

사용자들이 이미 사랑하고 정기적으로 사용하는 2-3개의 앱을 이름 지어 보세요.

자유롭게 공유하세요:

- 앱 이름 (현재 UX를 확인하기 위해 찾아보겠습니다)
- 스크린샷 (마음에 드는 예시가 있는 경우)
- 제품 또는 데모 링크

각각에 대해 UX 관점에서 무엇을 잘 합니까? 경험을 매력적으로 만드는 것은 무엇입니까?</ask>

<action>For each app mentioned:
<WebSearch>{{app_name}} current interface UX design 2025</WebSearch>
<action>Analyze what makes that app's UX effective</action>
<action>Note patterns and principles that could apply to this project</action>
</action>

<action>If screenshots provided:
<action>Analyze screenshots for UX patterns, visual style, interaction patterns</action>
<action>Note what user finds compelling about these examples</action>
</action>

<template-output>inspiration_analysis</template-output>
</step>

<step n="1e" goal="이해 종합 및 촉진 모드 설정">
  <critical>이제 복잡성을 분석하고 올바른 촉진 접근 방식을 설정합니다</critical>

<action>Analyze project for UX complexity indicators: - Number of distinct user roles or personas - Number of primary user journeys - Interaction complexity (simple CRUD vs rich interactions) - Platform requirements (single vs multi-platform) - Real-time collaboration needs - Content creation vs consumption - Novel interaction patterns
</action>

<action>Based on {user_skill_level}, set facilitation approach:

    <check if="{user_skill_level} == 'expert'">
      Set mode: UX_EXPERT
      - Use design terminology freely (affordances, information scent, cognitive load)
      - Move quickly through familiar patterns
      - Focus on nuanced tradeoffs and edge cases
      - Reference design systems and frameworks by name
    </check>

    <check if="{user_skill_level} == 'intermediate'">
      Set mode: UX_INTERMEDIATE
      - Balance design concepts with clear explanations
      - Provide brief context for UX decisions
      - Use familiar analogies when helpful
      - Confirm understanding at key points
    </check>

    <check if="{user_skill_level} == 'beginner'">
      Set mode: UX_BEGINNER
      - Explain design concepts in simple terms
      - Use real-world analogies extensively
      - Focus on "why this matters for users"
      - Protect from overwhelming choices
    </check>

  </action>

<output>Here's what I'm understanding about {{project_name}}:

**Vision:** {{project_vision_summary}}
**Users:** {{user_summary}}
**Core Experience:** {{core_action_summary}}
**Desired Feeling:** {{emotional_goal}}
**Platform:** {{platform_summary}}
**Inspiration:** {{inspiration_summary_with_ux_patterns}}

**UX Complexity:** {{complexity_assessment}}

This helps me understand both what we're building and the experience we're aiming for. Let's start designing!</output>

<action>Load UX design template: {template}</action>
<action>Initialize output document at {default_output_file}</action>

<template-output>project_vision</template-output>
</step>

<step n="2" goal="디자인 시스템 발견 및 평가">
  <critical>현대적 디자인 시스템은 기본적으로 많은 좋은 UX 결정을 내립니다</critical>
  <critical>코드 스타터 템플릿처럼 디자인 시스템은 검증된 패턴을 제공합니다</critical>

<action>Based on platform and tech stack (if known from PRD), identify design system options:

    For Web Applications:
    - Material UI (Google's design language)
    - shadcn/ui (Modern, customizable, Tailwind-based)
    - Chakra UI (Accessible, themeable)
    - Ant Design (Enterprise, comprehensive)
    - Radix UI (Unstyled primitives, full control)
    - Custom design system

    For Mobile:
    - iOS Human Interface Guidelines
    - Material Design (Android)
    - Custom mobile design

    For Desktop:
    - Platform native (macOS, Windows guidelines)
    - Electron with web design system

  </action>

<action>Search for current design system information:
<WebSearch>{{platform}} design system 2025 popular options accessibility</WebSearch>
<WebSearch>{{identified_design_system}} latest version components features</WebSearch>
</action>

  <check if="design_systems_found">
    <action>For each relevant design system, understand what it provides:
      - Component library (buttons, forms, modals, etc.)
      - Accessibility built-in (WCAG compliance)
      - Theming capabilities
      - Responsive patterns
      - Icon library
      - Documentation quality
    </action>

    <action>Present design system options:
      "I found {{design_system_count}} design systems that could work well for your project.

      Think of design systems like a foundation - they provide proven UI components and patterns,
      so we're not reinventing buttons and forms. This speeds development and ensures consistency.

      **Your Options:**

      1. **{{system_name}}**
         - {{key_strengths}}
         - {{component_count}} components | {{accessibility_level}}
         - Best for: {{use_case}}

      2. **{{system_name}}**
         - {{key_strengths}}
         - {{component_count}} components | {{accessibility_level}}
         - Best for: {{use_case}}

      3. **Custom Design System**
         - Full control over every detail
         - More effort, completely unique to your brand
         - Best for: Strong brand identity needs, unique UX requirements

      **My Recommendation:** {{recommendation}} for {{reason}}

      This establishes our component foundation and interaction patterns."
    </action>

    <ask>Which design system approach resonates with you?

Or tell me:

- Do you need complete visual uniqueness? (→ custom)
- Want fast development with great defaults? (→ established system)
- Have brand guidelines to follow? (→ themeable system)
  </ask>

      <action>Record design system decision:
        System: {{user_choice}}
        Version: {{verified_version_if_applicable}}
        Rationale: {{user_reasoning_or_recommendation_accepted}}
        Provides: {{components_and_patterns_provided}}
        Customization needs: {{custom_components_needed}}
      </action>

    </check>

  <template-output>design_system_decision</template-output>
  </step>

<step n="3a" goal="정의하는 경험 식별">
  <critical>모든 훌륭한 앱은 정의하는 경험이 있습니다 - 먼저 식별하세요</critical>

<action>Based on PRD/brief analysis, identify the core user experience: - What is the primary action users will repeat? - What makes this app unique vs. competitors? - What should be delightfully easy?
</action>

<ask>앱의 정의하는 경험을 식별해 봅시다 - 이것을 잘 만들면 나머지는 자연스럽게 따릅니다.

누군가 친구에게 당신의 앱을 설명한다면 무엇이라고 할까요?

**예시:**

- "사람들과 매칭하기 위해 스와이프하는 앱입니다" (Tinder)
- "사라지는 사진을 공유할 수 있습니다" (Snapchat)
- "AI와 대화하는 것 같습니다" (ChatGPT)
- "순간을 캡처하고 공유합니다" (Instagram)
- "자유형식 콘텐츠 블록" (Notion)
- "실시간 협력 캔버스" (Figma)

**당신의 앱은?** 당신의 앱을 정의하는 한 가지 경험은 무엇입니까?</ask>

<action>Analyze if this core experience has established UX patterns:

    Standard patterns exist for:
    - CRUD operations (Create, Read, Update, Delete)
    - E-commerce flows (Browse → Product → Cart → Checkout)
    - Social feeds (Infinite scroll, like/comment)
    - Authentication (Login, signup, password reset)
    - Search and filter
    - Content creation (Forms, editors)
    - Dashboards and analytics

    Novel patterns may be needed for:
    - Unique interaction mechanics (before Tinder, swiping wasn't standard)
    - New collaboration models (before Figma, real-time design wasn't solved)
    - Unprecedented content types (before TikTok, vertical short video feeds)
    - Complex multi-step workflows spanning features
    - Innovative gamification or engagement loops

  </action>

<template-output>defining_experience</template-output>
</step>

<step n="3b" goal="Design novel UX pattern (if needed)">
  <critical>Skip this step if standard patterns apply. Run only if novel pattern detected.</critical>

  <check if="novel_pattern_detected">
    <output>The **{{pattern_name}}** interaction is novel - no established pattern exists yet!

Core UX challenge: {{challenge_description}}

This is exciting - we get to invent the user experience together. Let's design this interaction systematically.</output>

    <ask>Let's think through the core mechanics of this {{pattern_name}} interaction:

1. **User Goal:** What does the user want to accomplish?
2. **Trigger:** How should they initiate this action? (button, gesture, voice, drag, etc.)
3. **Feedback:** What should they see/feel happening?
4. **Success:** How do they know it succeeded?
5. **Errors:** What if something goes wrong? How do they recover?

Walk me through your mental model for this interaction - the ideal experience from the user's perspective.</ask>

    <template-output>novel_pattern_mechanics</template-output>

  </check>

  <check if="!novel_pattern_detected">
    <action>Skip to Step 3d - standard patterns apply</action>
  </check>
</step>

<step n="3c" goal="Explore novel pattern deeply (if novel)">
  <critical>Skip if not designing novel pattern</critical>

  <check if="novel_pattern_detected">
    <ask>Let's explore the {{pattern_name}} interaction more deeply to make it exceptional:

- **Similar Patterns:** What apps have SIMILAR (not identical) patterns we could learn from?
- **Speed:** What's the absolute fastest this action could complete?
- **Delight:** What's the most delightful way to give feedback?
- **Platform:** Should this work on mobile differently than desktop?
- **Shareability:** What would make someone show this to a friend?</ask>

      <action>Document the novel UX pattern:
        Pattern Name: {{pattern_name}}
        User Goal: {{what_user_accomplishes}}
        Trigger: {{how_initiated}}
        Interaction Flow:
          1. {{step_1}}
          2. {{step_2}}
          3. {{step_3}}
        Visual Feedback: {{what_user_sees}}
        States: {{default_loading_success_error}}
        Platform Considerations: {{desktop_vs_mobile_vs_tablet}}
        Accessibility: {{keyboard_screen_reader_support}}
        Inspiration: {{similar_patterns_from_other_apps}}
      </action>

      <template-output>novel_pattern_details</template-output>

    </check>

    <check if="!novel_pattern_detected">
      <action>Skip to Step 3d - standard patterns apply</action>
    </check>
  </step>

<step n="3d" goal="Define core experience principles">
  <critical>Establish the guiding principles for the entire experience</critical>

<action>Based on the defining experience and any novel patterns, define the core experience principles: - Speed: How fast should key actions feel? - Guidance: How much hand-holding do users need? - Flexibility: How much control vs. simplicity? - Feedback: Subtle or celebratory?
</action>

<output>Core experience principles established:

**Speed:** {{speed_principle}}
**Guidance:** {{guidance_principle}}
**Flexibility:** {{flexibility_principle}}
**Feedback:** {{feedback_principle}}

These principles will guide every UX decision from here forward.</output>

<template-output>core_experience_principles</template-output>
</step>

<step n="4" goal="색상 테마 탐색을 통해 시각적 기초 발견">
  <critical>시각적 디자인은 장식이 아닙니다 - 브랜드를 전달하고 주의를 유도합니다</critical>
  <critical>옵션을 보여 주세요. 단순히 설명하지 마세요 - HTML 시각화를 생성하세요</critical>
  <critical>색상 심리학 원칙 사용: 파란색=신뢰, 빨간색=에너지, 녹색=성장/침착함, 보라색=창의성 등</critical>

<ask>기존 브랜드 지침이나 특정 색상 팔레트가 있습니까? (y/n)

예인 경우: 브랜드 색상을 공유하거나 브랜드 지침 링크를 제공하세요.
아니오인 경우: 프로젝트의 성격을 기반으로 테마 옵션을 생성하겠습니다.
</ask>

  <check if="existing_brand == true">
    <ask>Please provide:
- Primary brand color(s) (hex codes if available)
- Secondary colors
- Any brand personality guidelines (professional, playful, minimal, etc.)
- Link to style guide (if available)
</ask>

    <action>Extract and document brand colors</action>
    <action>Generate semantic color mappings:
      - Primary: {{brand_primary}} (main actions, key elements)
      - Secondary: {{brand_secondary}} (supporting actions)
      - Success: {{success_color}}
      - Warning: {{warning_color}}
      - Error: {{error_color}}
      - Neutral: {{gray_scale}}
    </action>

  </check>

  <check if="existing_brand == false">
    <action>Based on project personality from PRD/brief, identify 3-4 theme directions:

      Analyze project for:
      - Industry (fintech → trust/security, creative → bold/expressive, health → calm/reliable)
      - Target users (enterprise → professional, consumers → approachable, creators → inspiring)
      - Brand personality keywords mentioned
      - Competitor analysis (blend in or stand out?)

      Generate theme directions:
      1. {{theme_1_name}} ({{personality}}) - {{color_strategy}}
      2. {{theme_2_name}} ({{personality}}) - {{color_strategy}}
      3. {{theme_3_name}} ({{personality}}) - {{color_strategy}}
      4. {{theme_4_name}} ({{personality}}) - {{color_strategy}}
    </action>

    <action>Generate comprehensive HTML color theme visualizer:

      Create: {color_themes_html}

      For each theme, show:

      **Color Palette Section:**
      - Primary, secondary, accent colors as large swatches
      - Semantic colors (success, warning, error, info)
      - Neutral grayscale (background, text, borders)
      - Each swatch labeled with hex code and usage

      **Live Component Examples:**
      - Buttons (primary, secondary, disabled states)
      - Form inputs (normal, focus, error states)
      - Cards with content
      - Navigation elements
      - Success/error alerts
      - Typography in theme colors

      **Side-by-Side Comparison:**
      - All themes visible in grid layout
      - Responsive preview toggle
      - Toggle between light/dark mode if applicable

      **Theme Personality Description:**
      - Emotional impact (trustworthy, energetic, calm, sophisticated)
      - Best for (enterprise, consumer, creative, technical)
      - Visual style (minimal, bold, playful, professional)

      Include CSS with full theme variables for each option.
    </action>

    <action>Save HTML visualizer to {color_themes_html}</action>

    <output>🎨 I've created a color theme visualizer!

Open this file in your browser: {color_themes_html}

You'll see {{theme_count}} complete theme options with:

- Full color palettes
- Actual UI components in each theme
- Side-by-side comparison
- Theme personality descriptions

Take your time exploring. Which theme FEELS right for your vision?
</output>

    <ask>Which color theme direction resonates most?

You can:

- Choose a number (1-{{theme_count}})
- Combine elements: "I like the colors from #2 but the vibe of #3"
- Request variations: "Can you make #1 more vibrant?"
- Describe a custom direction

What speaks to you?
</ask>

    <action>Based on user selection, finalize color palette:
      - Extract chosen theme colors
      - Apply any requested modifications
      - Document semantic color usage
      - Note rationale for selection
    </action>

  </check>

<action>Define typography system:

    Based on brand personality and chosen colors:
    - Font families (heading, body, monospace)
    - Type scale (h1-h6, body, small, tiny)
    - Font weights and when to use them
    - Line heights for readability

    <check if="design_system_chosen">
      Use {{design_system}} default typography as starting point.
      Customize if brand requires it.
    </check>

  </action>

<action>Define spacing and layout foundation: - Base unit (4px, 8px system) - Spacing scale (xs, sm, md, lg, xl, 2xl, etc.) - Layout grid (12-column, custom, or design system default) - Container widths for different breakpoints
</action>

<template-output>visual_foundation</template-output>
</step>

<step n="5" goal="시각적 의사결정을 위한 디자인 방향 목업 생성">
  <critical>이것이 게임 체인저입니다 - 실제 디자인 방향을 보여 주세요. 단순히 논의하지 마세요</critical>
  <critical>사용자는 옵션을 상상할 때가 아니라 볼 때 더 나은 결정을 내립니다</critical>
  <critical>플랫폼 규범을 고려하세요: 데스크톱 앱은 종종 사이드바 네비게이션을 사용하고, 모바일 앱은 하단 네비게이션이나 탭을 사용합니다</critical>

<action>Based on PRD and core experience, identify 2-3 key screens to mock up:

    Priority screens:
    1. Entry point (landing page, dashboard, home screen)
    2. Core action screen (where primary user task happens)
    3. Critical conversion (signup, create, submit, purchase)

    For each screen, extract:
    - Primary goal of this screen
    - Key information to display
    - Primary action(s)
    - Secondary actions
    - Navigation context

  </action>

<action>Generate 6-8 different design direction variations exploring different UX approaches:

    Vary these dimensions:

    **Layout Approach:**
    - Sidebar navigation vs top nav vs floating action button
    - Single column vs multi-column
    - Card-based vs list-based vs grid
    - Centered vs left-aligned content

    **Visual Hierarchy:**
    - Dense (information-rich) vs Spacious (breathing room)
    - Bold headers vs subtle headers
    - Imagery-heavy vs text-focused

    **Interaction Patterns:**
    - Modal workflows vs inline expansion
    - Progressive disclosure vs all-at-once
    - Drag-and-drop vs click-to-select

    **Visual Weight:**
    - Minimal (lots of white space, subtle borders)
    - Balanced (clear structure, moderate visual weight)
    - Rich (gradients, shadows, visual depth)
    - Maximalist (bold, high contrast, dense)

    **Content Approach:**
    - Scannable (lists, cards, quick consumption)
    - Immersive (large imagery, storytelling)
    - Data-driven (charts, tables, metrics)

  </action>

<action>Create comprehensive HTML design direction showcase:

    Create: {design_directions_html}

    For EACH design direction (6-8 total):

    **Full-Screen Mockup:**
    - Complete HTML/CSS implementation
    - Using chosen color theme
    - Real (or realistic placeholder) content
    - Interactive states (hover effects, focus states)
    - Responsive behavior

    **Design Philosophy Label:**
    - Direction name (e.g., "Dense Dashboard", "Spacious Explorer", "Card Gallery")
    - Personality (e.g., "Professional & Efficient", "Friendly & Approachable")
    - Best for (e.g., "Power users who need lots of info", "First-time visitors who need guidance")

    **Key Characteristics:**
    - Layout: {{approach}}
    - Density: {{level}}
    - Navigation: {{style}}
    - Primary action prominence: {{high_medium_low}}

    **Navigation Controls:**
    - Previous/Next buttons to cycle through directions
    - Thumbnail grid to jump to any direction
    - Side-by-side comparison mode (show 2-3 at once)
    - Responsive preview toggle (desktop/tablet/mobile)
    - Favorite/flag directions for later comparison

    **Notes Section:**
    - User can click to add notes about each direction
    - "What I like" and "What I'd change" fields

  </action>

<action>Save comprehensive HTML showcase to {design_directions_html}</action>

<output>🎨 Design Direction Mockups Generated!

I've created {{mockup_count}} different design approaches for your key screens.

Open: {design_directions_html}

Each mockup shows a complete vision for your app's look and feel.

As you explore, look for:
✓ Which layout feels most intuitive for your users?
✓ Which information hierarchy matches your priorities?
✓ Which interaction style fits your core experience?
✓ Which visual weight feels right for your brand?

You can:

- Navigate through all directions
- Compare them side-by-side
- Toggle between desktop/mobile views
- Add notes about what you like

Take your time - this is a crucial decision!
</output>

<ask>Which design direction(s) resonate most with your vision?

You can:

- Pick a favorite by number: "Direction #3 is perfect!"
- Combine elements: "The layout from #2 with the density of #5"
- Request modifications: "I like #6 but can we make it less dense?"
- Ask me to explore variations: "Can you show me more options like #4 but with side navigation?"

What speaks to you?
</ask>

<action>Based on user selection, extract and document design decisions:

    Chosen Direction: {{direction_number_or_hybrid}}

    Layout Decisions:
    - Navigation pattern: {{sidebar_top_floating}}
    - Content structure: {{single_multi_column}}
    - Content organization: {{cards_lists_grid}}

    Hierarchy Decisions:
    - Visual density: {{spacious_balanced_dense}}
    - Header emphasis: {{bold_subtle}}
    - Content focus: {{imagery_text_data}}

    Interaction Decisions:
    - Primary action pattern: {{modal_inline_dedicated}}
    - Information disclosure: {{progressive_all_at_once}}
    - User control: {{guided_flexible}}

    Visual Style Decisions:
    - Weight: {{minimal_balanced_rich_maximalist}}
    - Depth cues: {{flat_subtle_elevation_dramatic_depth}}
    - Border style: {{none_subtle_strong}}

    Rationale: {{why_user_chose_this_direction}}
    User notes: {{what_they_liked_and_want_to_change}}

  </action>

  <check if="user_wants_modifications">
    <action>Generate 2-3 refined variations incorporating requested changes</action>
    <action>Update HTML showcase with refined options</action>
    <ask>Better? Pick your favorite refined version.</ask>
  </check>

<template-output>design_direction_decision</template-output>
</step>

<step n="6" goal="협력적 사용자 여정 설계">
  <critical>사용자 여정은 대화이지 단순한 흐름도가 아닙니다</critical>
  <critical>사용자와 함께 설계하고 각 주요 흐름의 옵션을 탐색하세요</critical>

<action>Extract critical user journeys from PRD: - Primary user tasks - Conversion flows - Onboarding sequence - Content creation workflows - Any complex multi-step processes
</action>

<action>For each critical journey, identify the goal and current assumptions</action>

  <for-each journey="critical_user_journeys">

    <output>**User Journey: {{journey_name}}**

User goal: {{what_user_wants_to_accomplish}}
Current entry point: {{where_journey_starts}}
</output>

    <ask>Let's design the flow for {{journey_name}}.

Walk me through how a user should accomplish this task:

1. **Entry:** What's the first thing they see/do?
2. **Input:** What information do they need to provide?
3. **Feedback:** What should they see/feel along the way?
4. **Success:** How do they know they succeeded?

As you think through this, consider:

- What's the minimum number of steps to value?
- Where are the decision points and branching?
- How do they recover from errors?
- Should we show everything upfront, or progressively?

Share your mental model for this flow.</ask>

    <action>Based on journey complexity, present 2-3 flow approach options:

      <check if="simple_linear_journey">
        Option A: Single-screen approach (all inputs/actions on one page)
        Option B: Wizard/stepper approach (split into clear steps)
        Option C: Hybrid (main flow on one screen, advanced options collapsed)
      </check>

      <check if="complex_branching_journey">
        Option A: Guided flow (system determines next step based on inputs)
        Option B: User-driven navigation (user chooses path)
        Option C: Adaptive (simple mode vs advanced mode toggle)
      </check>

      <check if="creation_journey">
        Option A: Template-first (start from templates, customize)
        Option B: Blank canvas (full flexibility, more guidance needed)
        Option C: Progressive creation (start simple, add complexity)
      </check>

      For each option, explain:
      - User experience: {{what_it_feels_like}}
      - Pros: {{benefits}}
      - Cons: {{tradeoffs}}
      - Best for: {{user_type_or_scenario}}
    </action>

    <ask>Which approach fits best? Or should we blend elements?</ask>

    <action>Create detailed flow documentation:

      Journey: {{journey_name}}
      User Goal: {{goal}}
      Approach: {{chosen_approach}}

      Flow Steps:
      1. {{step_1_screen_and_action}}
         - User sees: {{information_displayed}}
         - User does: {{primary_action}}
         - System responds: {{feedback}}

      2. {{step_2_screen_and_action}}
         ...

      Decision Points:
      - {{decision_point}}: {{branching_logic}}

      Error States:
      - {{error_scenario}}: {{how_user_recovers}}

      Success State:
      - Completion feedback: {{what_user_sees}}
      - Next action: {{what_happens_next}}

      [Generate Mermaid diagram showing complete flow]
    </action>

  </for-each>

<template-output>user_journey_flows</template-output>
</step>

<step n="7" goal="Component library strategy and custom component design">
  <critical>Balance design system components with custom needs</critical>

<action>Based on design system chosen + design direction mockups + user journeys:</action>

<action>Identify required components:

    From Design System (if applicable):
    - {{list_of_components_provided}}

    Custom Components Needed:
    - {{unique_component_1}} ({{why_custom}})
    - {{unique_component_2}} ({{why_custom}})

    Components Requiring Heavy Customization:
    - {{component}} ({{what_customization}})

  </action>

<ask>For components not covered by {{design_system}}, let's define them together.

Component: {{custom_component_name}}

1. What's its purpose? (what does it do for users?)
2. What content/data does it display?
3. What actions can users take with it?
4. What states does it have? (default, hover, active, loading, error, disabled, etc.)
5. Are there variants? (sizes, styles, layouts)
   </ask>

<action>For each custom component, document:

    Component Name: {{name}}
    Purpose: {{user_facing_purpose}}

    Anatomy:
    - {{element_1}}: {{description}}
    - {{element_2}}: {{description}}

    States:
    - Default: {{appearance}}
    - Hover: {{changes}}
    - Active/Selected: {{changes}}
    - Loading: {{loading_indicator}}
    - Error: {{error_display}}
    - Disabled: {{appearance}}

    Variants:
    - {{variant_1}}: {{when_to_use}}
    - {{variant_2}}: {{when_to_use}}

    Behavior:
    - {{interaction}}: {{what_happens}}

    Accessibility:
    - ARIA role: {{role}}
    - Keyboard navigation: {{keys}}
    - Screen reader: {{announcement}}

  </action>

<template-output>component_library_strategy</template-output>
</step>

<step n="8" goal="일관성을 위한 UX 패턴 결정 정의">
  <critical>이것들은 UX를 위한 구현 패턴입니다 - 앱 전체에서 일관성을 보장하세요</critical>
  <critical>아키텍처 워크플로우의 구현 패턴과 같지만 사용자 경험을 위한 것입니다</critical>
  <critical>이러한 결정은 "매 페이지마다 다르게 작동합니다"라는 혼동을 방지합니다</critical>

<action>Based on chosen components and journeys, identify UX consistency decisions needed:

    BUTTON HIERARCHY (How users know what's most important):
    - Primary action: {{style_and_usage}}
    - Secondary action: {{style_and_usage}}
    - Tertiary action: {{style_and_usage}}
    - Destructive action: {{style_and_usage}}

    FEEDBACK PATTERNS (How system communicates with users):
    - Success: {{pattern}} (toast, inline, modal, page-level)
    - Error: {{pattern}}
    - Warning: {{pattern}}
    - Info: {{pattern}}
    - Loading: {{pattern}} (spinner, skeleton, progress bar)

    FORM PATTERNS (How users input data):
    - Label position: {{above_inline_floating}}
    - Required field indicator: {{asterisk_text_visual}}
    - Validation timing: {{onBlur_onChange_onSubmit}}
    - Error display: {{inline_summary_both}}
    - Help text: {{tooltip_caption_modal}}

    MODAL PATTERNS (How dialogs behave):
    - Size variants: {{when_to_use_each}}
    - Dismiss behavior: {{click_outside_escape_explicit_close}}
    - Focus management: {{auto_focus_strategy}}
    - Stacking: {{how_multiple_modals_work}}

    NAVIGATION PATTERNS (How users move through app):
    - Active state indication: {{visual_cue}}
    - Breadcrumb usage: {{when_shown}}
    - Back button behavior: {{browser_back_vs_app_back}}
    - Deep linking: {{supported_patterns}}

    EMPTY STATE PATTERNS (What users see when no content):
    - First use: {{guidance_and_cta}}
    - No results: {{helpful_message}}
    - Cleared content: {{undo_option}}

    CONFIRMATION PATTERNS (When to confirm destructive actions):
    - Delete: {{always_sometimes_never_with_undo}}
    - Leave unsaved: {{warn_or_autosave}}
    - Irreversible actions: {{confirmation_level}}

    NOTIFICATION PATTERNS (How users stay informed):
    - Placement: {{top_bottom_corner}}
    - Duration: {{auto_dismiss_vs_manual}}
    - Stacking: {{how_multiple_notifications_appear}}
    - Priority levels: {{critical_important_info}}

    SEARCH PATTERNS (How search behaves):
    - Trigger: {{auto_or_manual}}
    - Results display: {{instant_on_enter}}
    - Filters: {{placement_and_behavior}}
    - No results: {{suggestions_or_message}}

    DATE/TIME PATTERNS (How temporal data appears):
    - Format: {{relative_vs_absolute}}
    - Timezone handling: {{user_local_utc}}
    - Pickers: {{calendar_dropdown_input}}

  </action>

<output>I've identified {{pattern_count}} UX pattern categories that need consistent decisions across your app. Let's make these decisions together to ensure users get a consistent experience.

These patterns determine how {{project_name}} behaves in common situations - like how buttons work, how forms validate, how modals behave, etc.</output>

<ask>For each pattern category below, I'll present options and a recommendation. Tell me your preferences or ask questions.

**Pattern Categories to Decide:**

- Button hierarchy (primary, secondary, destructive)
- Feedback patterns (success, error, loading)
- Form patterns (labels, validation, help text)
- Modal patterns (size, dismiss, focus)
- Navigation patterns (active state, back button)
- Empty state patterns
- Confirmation patterns (delete, unsaved changes)
- Notification patterns
- Search patterns
- Date/time patterns

For each one, do you want to:

1. Go through each pattern category one by one (thorough)
2. Focus only on the most critical patterns for your app (focused)
3. Let me recommend defaults and you override where needed (efficient)</ask>

<action>Based on user choice, facilitate pattern decisions with appropriate depth: - If thorough: Present all categories with options and reasoning - If focused: Identify 3-5 critical patterns based on app type - If efficient: Recommend smart defaults, ask for overrides

    For each pattern decision, document:
    - Pattern category
    - Chosen approach
    - Rationale (why this choice for this app)
    - Example scenarios where it applies

  </action>

<template-output>ux_pattern_decisions</template-output>
</step>

<step n="9" goal="반응형 및 접근성 전략">
  <critical>반응형 디자인은 단순히 "더 작게 만드는 것"이 아닙니다 - 경험을 적응시키는 것입니다</critical>

<action>Based on platform requirements from PRD and chosen design direction:</action>

<ask>Let's define how your app adapts across devices.

Target devices from PRD: {{devices}}

For responsive design:

1. **Desktop** (large screens):
   - How should we use the extra space?
   - Multi-column layouts?
   - Side navigation?

2. **Tablet** (medium screens):
   - Simplified layout from desktop?
   - Touch-optimized interactions?
   - Portrait vs landscape considerations?

3. **Mobile** (small screens):
   - Bottom navigation or hamburger menu?
   - How do multi-column layouts collapse?
   - Touch target sizes adequate?

What's most important for each screen size?
</ask>

<action>Define breakpoint strategy:

    Based on chosen layout pattern from design direction:

    Breakpoints:
    - Mobile: {{max_width}} ({{cols}}-column layout, {{nav_pattern}})
    - Tablet: {{range}} ({{cols}}-column layout, {{nav_pattern}})
    - Desktop: {{min_width}} ({{cols}}-column layout, {{nav_pattern}})

    Adaptation Patterns:
    - Navigation: {{how_it_changes}}
    - Sidebar: {{collapse_hide_convert}}
    - Cards/Lists: {{grid_to_single_column}}
    - Tables: {{horizontal_scroll_card_view_hide_columns}}
    - Modals: {{full_screen_on_mobile}}
    - Forms: {{layout_changes}}

  </action>

<action>Define accessibility strategy:

    <ask>Let's define your accessibility strategy.

Accessibility means your app works for everyone, including people with disabilities:

- Can someone using only a keyboard navigate?
- Can someone using a screen reader understand what's on screen?
- Can someone with color blindness distinguish important elements?
- Can someone with motor difficulties use your buttons?

**WCAG Compliance Levels:**

- **Level A** - Basic accessibility (minimum)
- **Level AA** - Recommended standard, legally required for government/education/public sites
- **Level AAA** - Highest standard (not always practical for all content)

**Legal Context:**

- Government/Education: Must meet WCAG 2.1 Level AA
- Public websites (US): ADA requires accessibility
- EU: Accessibility required

Based on your deployment intent: {{recommendation}}

**What level should we target?**</ask>

    Accessibility Requirements:

    Compliance Target: {{WCAG_level}}

    Key Requirements:
    - Color contrast: {{ratio_required}} (text vs background)
    - Keyboard navigation: All interactive elements accessible
    - Focus indicators: Visible focus states on all interactive elements
    - ARIA labels: Meaningful labels for screen readers
    - Alt text: Descriptive text for all meaningful images
    - Form labels: Proper label associations
    - Error identification: Clear, descriptive error messages
    - Touch target size: Minimum {{size}} for mobile

    Testing Strategy:
    - Automated: {{tools}} (Lighthouse, axe DevTools)
    - Manual: Keyboard-only navigation testing
    - Screen reader: {{tool}} testing

  </action>

<template-output>responsive_accessibility_strategy</template-output>
</step>

<step n="10" goal="Finalize UX design specification">
  <critical>The document is built progressively throughout - now finalize and offer extensions</critical>

<action>Ensure document is complete with all template-output sections filled</action>

<action>Generate completion summary:

    "Excellent work! Your UX Design Specification is complete.

    **What we created together:**

    - **Design System:** {{choice}} with {{custom_component_count}} custom components
    - **Visual Foundation:** {{color_theme}} color theme with {{typography_choice}} typography and spacing system
    - **Design Direction:** {{chosen_direction}} - {{why_it_fits}}
    - **User Journeys:** {{journey_count}} flows designed with clear navigation paths
    - **UX Patterns:** {{pattern_count}} consistency rules established for cohesive experience
    - **Responsive Strategy:** {{breakpoint_count}} breakpoints with adaptation patterns for all device sizes
    - **Accessibility:** {{WCAG_level}} compliance requirements defined

    **Your Deliverables:**
    - UX Design Document: {default_output_file}
    - Interactive Color Themes: {color_themes_html}
    - Design Direction Mockups: {design_directions_html}

    **What happens next:**
    - Designers can create high-fidelity mockups from this foundation
    - Developers can implement with clear UX guidance and rationale
    - All your design decisions are documented with reasoning for future reference

    You've made thoughtful choices through visual collaboration that will create a great user experience. Ready for design refinement and implementation!"

  </action>

<action>Save final document to {default_output_file}</action>

  <check if="standalone_mode != true">
    <action>Load the FULL file: {output_folder}/bmm-workflow-status.yaml</action>
    <action>Find workflow_status key "create-design"</action>
    <critical>ONLY write the file path as the status value - no other text, notes, or metadata</critical>
    <action>Update workflow_status["create-design"] = "{default_output_file}"</action>
    <action>Save file, preserving ALL comments and structure including STATUS DEFINITIONS</action>

    <action>Find first non-completed workflow in workflow_status (next workflow to do)</action>
    <action>Determine next agent from path file based on next workflow</action>

  </check>

<ask>🎨 **One more thing!** Want to see your design come to life?

I can generate interactive HTML mockups using all your design choices:

**1. Key Screens Showcase** - 6-8 panels showing your app's main screens (home, core action, settings, etc.) with your chosen:

- Color theme and typography
- Design direction and layout
- Component styles
- Navigation patterns

**2. User Journey Visualization** - Step-by-step HTML mockup of one of your critical user journeys with:

- Each screen in the flow
- Interactive transitions
- Success states and feedback
- All your design decisions applied

**3. Something else** - Tell me what you want to see!

**4. Skip for now** - I'll just finalize the documentation

What would you like?</ask>

  <check if="user_choice == 'key_screens' or similar">
    <action>Generate comprehensive multi-panel HTML showcase:

      Create: {final_app_showcase_html}

      Include 6-8 screens representing:
      - Landing/Home screen
      - Main dashboard or feed
      - Core action screen (primary user task)
      - Profile or settings
      - Create/Edit screen
      - Results or success state
      - Modal/dialog examples
      - Empty states

      Apply ALL design decisions:
      - {{chosen_color_theme}} with exact colors
      - {{chosen_design_direction}} layout and hierarchy
      - {{design_system}} components styled per decisions
      - {{typography_system}} applied consistently
      - {{spacing_system}} and responsive breakpoints
      - {{ux_patterns}} for consistency
      - {{accessibility_requirements}}

      Make it interactive:
      - Hover states on buttons
      - Tab switching where applicable
      - Modal overlays
      - Form validation states
      - Navigation highlighting

      Output as single HTML file with inline CSS and minimal JavaScript
    </action>

    <output>✨ **Created: {final_app_showcase_html}**

Open this file in your browser to see {{project_name}} come to life with all your design choices applied! You can:

- Navigate between screens
- See hover and interactive states
- Experience your chosen design direction
- Share with stakeholders for feedback

This showcases exactly what developers will build.</output>
</check>

  <check if="user_choice == 'user_journey' or similar">
    <ask>Which user journey would you like to visualize?

{{list_of_designed_journeys}}

Pick one, or tell me which flow you want to see!</ask>

    <action>Generate step-by-step journey HTML:

      Create: {journey_visualization_html}

      For {{selected_journey}}:
      - Show each step as a full screen
      - Include navigation between steps (prev/next buttons)
      - Apply all design decisions consistently
      - Show state changes and feedback
      - Include success/error scenarios
      - Annotate design decisions on hover

      Make it feel like a real user flow through the app
    </action>

    <output>✨ **Created: {journey_visualization_html}**

Walk through the {{selected_journey}} flow step-by-step in your browser! This shows the exact experience users will have, with all your UX decisions applied.</output>
</check>

  <check if="user_choice == 'something_else'">
    <ask>Tell me what you'd like to visualize! I can generate HTML mockups for:
- Specific screens or features
- Interactive components
- Responsive breakpoint comparisons
- Accessibility features in action
- Animation and transition concepts
- Whatever you envision!

What should I create?</ask>

    <action>Generate custom HTML visualization based on user request:
      - Parse what they want to see
      - Apply all relevant design decisions
      - Create interactive HTML mockup
      - Make it visually compelling and functional
    </action>

    <output>✨ **Created: {{custom_visualization_file}}**

{{description_of_what_was_created}}

Open in browser to explore!</output>
</check>

<output>**✅ UX Design Specification Complete!**

**Core Deliverables:**

- ✅ UX Design Specification: {default_output_file}
- ✅ Color Theme Visualizer: {color_themes_html}
- ✅ Design Direction Mockups: {design_directions_html}

**Recommended Next Steps:**

{{#if tracking_mode == true}}

- **Next required:** {{next_workflow}} ({{next_agent}} agent)
- **Optional:** Run validation with \*validate-design, or generate additional UX artifacts (wireframes, prototypes, etc.)

Check status anytime with: `workflow-status`
{{else}}
Since no workflow is in progress:

- Run validation checklist with \*validate-design (recommended)
- Refer to the BMM workflow guide if unsure what to do next
- Or run `workflow-init` to create a workflow path and get guided next steps

**Optional Follow-Up Workflows:**

- Wireframe Generation / Figma Design / Interactive Prototype workflows
- Component Showcase / AI Frontend Prompt workflows
- Solution Architecture workflow (with UX context)
  {{/if}}
  </output>

<template-output>completion_summary</template-output>
</step>

</workflow>

# BMad CORE + BMad Method

[![Stable Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=stable)](https://www.npmjs.com/package/bmad-method)
[![Alpha Version](https://img.shields.io/npm/v/bmad-method/alpha?color=orange&label=alpha)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

> **🚨 알파 버전 알림**
>
> v6-alpha는 거의 베타 품질입니다—안정적이고 v4보다 크게 개선되었지만, 문서는 여전히 개선 중입니다. [BMadCode YouTube 채널](https://www.youtube.com/@BMadCode)에 새로운 비디오가 곧 출시됩니다—업데이트를 위해 구독하세요!
>
> **시작하기:**
>
> - **v6 Alpha 설치:** `npx bmad-method@alpha install`
> - **stable v4 설치:** `npx bmad-method install`
> - **무엇을 해야 할지 모르겠다면?** 아무 에이전트나 로드하고 `*workflow-init`을 실행하여 안내받으세요
> - **v4 사용자:** [v4 문서 보기](https://github.com/bmad-code-org/BMAD-METHOD/tree/V4) 또는 [업그레이드 가이드](./docs/v4-to-v6-upgrade.md)

## 범용 인간-AI 협업 플랫폼

**BMad-CORE** (**C**ollaboration **O**ptimized **R**eflection **E**ngine)는 전문화된 AI 에이전트를 통해 인간의 잠재력을 증폭시킵니다. 사고를 대체하는 도구와 달리, BMad-CORE는 당신의 최고의 아이디어와 AI의 완전한 역량을 끌어내는 성찰적 워크플로우를 안내합니다.

**BMad-CORE**는 **BMad Method**를 구동합니다 (아마도 당신이 여기에 온 이유일 것입니다!), 하지만 **BMad Builder**를 사용하여 모든 도메인—소프트웨어 개발, 비즈니스 전략, 창의성, 학습 등—을 위한 커스텀 에이전트, 워크플로우, 모듈을 만들 수도 있습니다.

**🎯 인간 증폭** • **🎨 도메인 독립적** • **⚡ 에이전트 기반**

## 목차

- [BMad CORE + BMad Method](#bmad-core--bmad-method)
  - [범용 인간-AI 협업 플랫폼](#범용-인간-ai-협업-플랫폼)
  - [목차](#목차)
  - [BMad-CORE란 무엇인가?](#bmad-core란-무엇인가)
    - [v6 핵심 개선사항](#v6-핵심-개선사항)
    - [C.O.R.E. 철학](#core-철학)
  - [모듈](#모듈)
    - [BMad Method (BMM) - AI 주도 애자일 개발](#bmad-method-bmm---ai-주도-애자일-개발)
      - [v6 하이라이트](#v6-하이라이트)
  - [🚀 빠른 시작](#-빠른-시작)
    - [BMad Builder (BMB) - 커스텀 솔루션 생성](#bmad-builder-bmb---커스텀-솔루션-생성)
    - [Creative Intelligence Suite (CIS) - 혁신 및 창의성](#creative-intelligence-suite-cis---혁신-및-창의성)
  - [설치](#설치)
  - [🎯 에이전트 및 명령어 작업](#-에이전트-및-명령어-작업)
    - [방법 1: 에이전트 메뉴 (초보자에게 권장)](#방법-1-에이전트-메뉴-초보자에게-권장)
    - [방법 2: 직접 슬래시 명령](#방법-2-직접-슬래시-명령)
    - [방법 3: 파티 모드 실행](#방법-3-파티-모드-실행)
  - [주요 기능](#주요-기능)
    - [🎨 업데이트 안전 커스터마이징](#-업데이트-안전-커스터마이징)
    - [🚀 지능형 설치](#-지능형-설치)
    - [📁 깔끔한 아키텍처](#-깔끔한-아키텍처)
    - [📄 문서 샤딩 (고급)](#-문서-샤딩-고급)
  - [문서](#문서)
  - [커뮤니티 및 지원](#커뮤니티-및-지원)
  - [개발 및 품질 검사](#개발-및-품질-검사)
    - [테스팅 및 검증](#테스팅-및-검증)
    - [코드 품질](#코드-품질)
    - [빌드 및 개발](#빌드-및-개발)
  - [기여하기](#기여하기)
  - [라이선스](#라이선스)

---

## BMad-CORE란 무엇인가?

모든 BMad 모듈을 구동하는 기반 프레임워크:

- **에이전트 조율** - 도메인 전문성을 가진 전문화된 AI 페르소나
- **워크플로우 엔진** - 모범 사례가 내장된 안내식 다단계 프로세스
- **모듈식 아키텍처** - 도메인별 모듈로 확장 (BMM, BMB, CIS, 커스텀)
- **IDE 통합** - Claude Code, Cursor, Windsurf, VS Code 등과 작동
- **업데이트 안전 커스터마이징** - 모든 업데이트를 통해 설정 유지

### v6 핵심 개선사항

- **🎨 에이전트 커스터마이징** - `bmad/_cfg/agents/`를 통해 이름, 역할, 성격 수정 **[→ 커스터마이징 가이드](./docs/agent-customization-guide.md)**
- **🌐 다국어 지원** - 커뮤니케이션 및 출력에 대한 독립적인 언어 설정
- **👤 개인화** - 에이전트가 당신의 이름, 기술 수준, 선호도에 적응
- **🔄 영구 설정** - 커스터마이징이 모듈 업데이트를 통해 유지
- **⚙️ 유연한 설정** - 모듈별 또는 전역 구성
- **📦 웹 번들** - Gemini Gems 및 Custom GPTs에서 에이전트 공유 **[→ 웹 번들 가이드](./docs/web-bundles-gemini-gpt-guide.md)**

### C.O.R.E. 철학

- **C**ollaboration (협업): 상호 보완적 강점을 활용하는 인간-AI 파트너십
- **O**ptimized (최적화): 최대 효과를 위한 실전 검증된 프로세스
- **R**eflection (성찰): 획기적인 솔루션을 여는 전략적 질문
- **E**ngine (엔진): 19개 이상의 전문 에이전트와 50개 이상의 워크플로우를 조율하는 프레임워크

BMad-CORE는 답을 제공하지 않습니다—안내된 성찰을 통해 **더 나은 솔루션을 발견**하도록 돕습니다.

## 모듈

### BMad Method (BMM) - AI 주도 애자일 개발

소프트웨어 및 게임 개발을 위한 혁명적인 AI 주도 애자일 프레임워크. 단일 버그 수정부터 엔터프라이즈 규모 시스템까지 자동으로 적응합니다.

#### v6 하이라이트

**🎯 규모 적응형 인텔리전스 (3가지 기획 트랙)**

프로젝트 요구사항에 따라 기획 깊이와 문서를 자동으로 조정합니다:

- **Quick Flow Track:** 빠른 구현 (기술 명세만) - 버그 수정, 작은 기능, 명확한 범위
- **BMad Method Track:** 완전한 기획 (PRD + 아키텍처 + UX) - 제품, 플랫폼, 복잡한 기능
- **Enterprise Method Track:** 확장된 기획 (BMad Method + 보안/DevOps/테스트) - 엔터프라이즈 요구사항, 규정 준수

**🏗️ 4단계 방법론**

1. **1단계: 분석** (선택사항) - 브레인스토밍, 조사, 제품 브리프
2. **2단계: 기획** (필수) - 규모 적응형 PRD/기술 명세/GDD
3. **3단계: 솔루셔닝** (트랙 종속) - 아키텍처, (출시 예정: 보안, DevOps, 테스트 전략)
4. **4단계: 구현** (반복적) - 적시 컨텍스트를 가진 스토리 중심 개발

**🤖 12개의 전문 에이전트**

PM • Analyst • Architect • Scrum Master • Developer • Test Architect (TEA) • UX Designer • Technical Writer • Game Designer • Game Developer • Game Architect • BMad Master (Orchestrator)

**📚 문서**

- **[완전한 문서 허브](./src/modules/bmm/docs/README.md)** - 모든 BMM 가이드 시작점
- **[빠른 시작 가이드](./src/modules/bmm/docs/quick-start.md)** - 15분 안에 구축 시작
- **[에이전트 가이드](./src/modules/bmm/docs/agents-guide.md)** - 12개 에이전트 소개 (45분 읽기)
- **[34개 워크플로우 가이드](./src/modules/bmm/docs/README.md#-workflow-guides)** - 단계별 완전한 참조
- **[BMM 모듈 개요](./src/modules/bmm/README.md)** - 모듈 구조 및 빠른 링크

---

## 🚀 빠른 시작

**설치 후** (아래 [설치](#설치) 참조), 경로를 선택하세요:

**3가지 기획 트랙:**

1. **⚡ Quick Flow Track** - 버그 수정 및 작은 기능
   - 🐛 몇 분 안에 버그 수정
   - ✨ 작은 기능 (2-3개의 관련 변경사항)
   - 🚀 빠른 프로토타이핑
   - **[→ Quick Spec Flow 가이드](./src/modules/bmm/docs/quick-spec-flow.md)**

2. **📋 BMad Method Track** - 제품 및 플랫폼
   - 완전한 기획 (PRD/GDD)
   - 아키텍처 결정
   - 스토리 중심 구현
   - **[→ 완전한 빠른 시작 가이드](./src/modules/bmm/docs/quick-start.md)**

3. **🏢 브라운필드 프로젝트** - 기존 코드베이스에 추가
   - 먼저 기존 코드 문서화
   - 그런 다음 Quick Flow 또는 BMad Method 선택
   - **[→ 브라운필드 가이드](./src/modules/bmm/docs/brownfield-guide.md)**

**어떤 경로를 선택할지 확실하지 않으신가요?** `*workflow-init`을 실행하면 BMM이 프로젝트 목표를 분석하고 올바른 트랙을 추천합니다.

**[📚 더 알아보기: 규모 적응형 시스템](./src/modules/bmm/docs/scale-adaptive-system.md)** - BMM이 세 가지 기획 트랙에 걸쳐 어떻게 적응하는지

---

### BMad Builder (BMB) - 커스텀 솔루션 생성

BMad-CORE 프레임워크를 사용하여 자신만의 에이전트, 워크플로우, 모듈을 구축하세요.

**구축할 수 있는 것:**

- **커스텀 에이전트** - 전문 지식을 가진 도메인 전문가
- **안내 워크플로우** - 모든 작업을 위한 다단계 프로세스
- **완전한 모듈** - 특정 도메인을 위한 완전한 솔루션
- **3가지 에이전트 유형** - 전체 모듈, 하이브리드 또는 독립형

**완벽한 대상:** 도메인별 솔루션(법률, 의료, 금융, 교육, 창작 등) 생성 또는 커스텀 개발 워크플로우로 BMM 확장.

**문서:**

- **[BMB 모듈 개요](./src/modules/bmb/README.md)** - 완전한 참조
- **[에이전트 생성 워크플로우](./src/modules/bmb/workflows/create-agent/README.md)** - 커스텀 에이전트 구축
- **[워크플로우 생성](./src/modules/bmb/workflows/create-workflow/README.md)** - 안내 프로세스 설계
- **[모듈 생성](./src/modules/bmb/workflows/create-module/README.md)** - 완전한 솔루션 패키징

### Creative Intelligence Suite (CIS) - 혁신 및 창의성

검증된 방법론과 기법을 사용한 AI 기반 창의적 촉진.

**5가지 대화형 워크플로우:**

- **브레인스토밍** - 30개 이상의 기법으로 아이디어 생성 및 개선
- **디자인 씽킹** - 인간 중심 문제 해결
- **문제 해결** - 체계적인 돌파구 기법
- **혁신 전략** - 파괴적 비즈니스 모델 사고
- **스토리텔링** - 설득력 있는 내러티브 프레임워크

**5개의 전문 에이전트:** 각각 고유한 촉진 스타일과 도메인 전문성

**공유 리소스:** CIS 워크플로우는 다른 모듈에서 사용됩니다 (BMM의 `brainstorm-project`는 CIS 브레인스토밍 사용)

**문서:**

- **[CIS 모듈 개요](./src/modules/cis/README.md)** - 완전한 참조
- **[CIS 워크플로우 가이드](./src/modules/cis/workflows/README.md)** - 모든 5가지 창의적 워크플로우

---

## 설치

**필수 조건:** Node.js v20+ ([다운로드](https://nodejs.org))

```bash
# v6 Alpha (새 프로젝트에 권장)
npx bmad-method@alpha install

# Stable v4 (프로덕션)
npx bmad-method install
```

설치 프로그램은 다음을 제공합니다:

1. **모듈 선택** - BMM, BMB, CIS 선택 (또는 모두)
2. **구성** - 당신의 이름, 언어 선호도, 게임 개발 옵션
3. **IDE 통합** - IDE에 대한 자동 설정

**설치 시 생성되는 것:**

```
your-project/
└── bmad/
    ├── core/         # 핵심 프레임워크 + BMad Master 에이전트
    ├── bmm/          # BMad Method (12개 에이전트, 34개 워크플로우)
    ├── bmb/          # BMad Builder (1개 에이전트, 7개 워크플로우)
    ├── cis/          # Creative Intelligence (5개 에이전트, 5개 워크플로우)
    └── _cfg/         # 커스터마이징 (업데이트 시 유지)
        └── agents/   # 에이전트 커스터마이징 파일
```

**다음 단계:**

1. IDE에서 아무 에이전트나 로드
2. `*workflow-init`을 실행하여 프로젝트 워크플로우 경로 설정
3. 위의 [빠른 시작](#-빠른-시작) 가이드를 따라 기획 트랙 선택

**대안:** [**웹 번들**](./docs/USING_WEB_BUNDLES.md) - 설치 없이 Claude Projects, ChatGPT 또는 Gemini에서 BMAD 에이전트 사용

---

## 🎯 에이전트 및 명령어 작업

**워크플로우를 실행하는 여러 방법:**

BMad는 유연합니다 - 선호도와 IDE에 따라 여러 방법으로 워크플로우를 실행할 수 있습니다:

### 방법 1: 에이전트 메뉴 (초보자에게 권장)

1. IDE에서 **에이전트 로드** ([IDE별 지침](./docs/ide-info/) 참조)
2. 사용 가능한 워크플로우를 보여주는 **메뉴가 나타날 때까지 대기**
3. 자연어 또는 단축키를 사용하여 **에이전트에게 실행할 내용 알림**:
   - 자연어: "Run workflow-init"
   - 단축키: `*workflow-init`
   - 메뉴 번호: "Run option 2"

### 방법 2: 직접 슬래시 명령

슬래시 명령을 사용하여 **워크플로우를 직접 실행**:

```
/bmad:bmm:workflows:workflow-init
/bmad:bmm:workflows:prd
/bmad:bmm:workflows:dev-story
```

**팁:** 에이전트를 먼저 로드하지 않고도 이를 실행할 수 있지만, **에이전트를 로드하는 것이 여전히 권장됩니다** - 특정 워크플로우에서 차이를 만들 수 있습니다.

**장점:**

- ✅ 모든 에이전트를 모든 워크플로우와 혼합 및 매치
- ✅ 로드된 에이전트의 메뉴에 없는 워크플로우 실행
- ✅ 명령 이름을 아는 숙련된 사용자를 위한 빠른 접근

### 방법 3: 파티 모드 실행

**다중 에이전트 협업으로 워크플로우 실행:**

1. 파티 모드 시작: `/bmad:core:workflows:party-mode`
2. 모든 워크플로우 실행 - **전체 팀이 협업합니다**
3. 여러 전문 에이전트로부터 다양한 관점 얻기

**완벽한 대상:** 전략적 결정, 복잡한 워크플로우, 교차 기능 작업

---

> **📌 IDE별 참고사항:**
>
> 슬래시 명령 형식은 IDE마다 다릅니다:
>
> - **Claude Code:** `/bmad:bmm:workflows:prd`
> - **Cursor/Windsurf:** 다른 구문을 사용할 수 있음 - IDE의 [문서](./docs/ide-info/) 확인
> - **VS Code with Copilot Chat:** 구문이 다를 수 있음
>
> 특정 IDE의 명령 형식은 **[IDE 통합 가이드](./docs/ide-info/)**를 참조하세요.

---

## 주요 기능

### 🎨 업데이트 안전 커스터마이징

핵심 파일을 건드리지 않고 에이전트 수정:

- `bmad/_cfg/agents/`를 통해 에이전트 이름, 성격, 전문성 재정의
- 모든 업데이트를 통해 커스터마이징 유지
- 다국어 지원 (커뮤니케이션 + 출력)
- 모듈 수준 또는 전역 구성

### 🚀 지능형 설치

환경에 적응하는 스마트 설정:

- 원활한 업그레이드를 위해 v4 설치 자동 감지
- IDE 통합 구성 (Claude Code, Cursor, Windsurf, VS Code)
- 모듈 간 종속성 해결
- 통합 에이전트/워크플로우 매니페스트 생성

### 📁 깔끔한 아키텍처

모든 것이 한 곳에:

- 단일 `bmad/` 폴더 (흩어진 파일 없음)
- 모듈이 나란히 배치 (core, bmm, bmb, cis)
- `_cfg/`의 설정 (업데이트 시 유지)
- 버전 관리 또는 제외가 쉬움

### 📄 문서 샤딩 (고급)

대규모 프로젝트를 위한 선택적 최적화 (BMad Method 및 Enterprise 트랙):

- **대규모 토큰 절약** - 4단계 워크플로우가 필요한 섹션만 로드 (90% 이상 감소)
- **자동 지원** - 모든 워크플로우가 전체 또는 샤딩된 문서를 원활하게 처리
- **쉬운 설정** - 내장 도구가 제목별로 문서 분할
- **스마트 발견** - 워크플로우가 형식 자동 감지

**[→ 문서 샤딩 가이드](./docs/document-sharding-guide.md)**

---

## 문서

**모듈 문서:**

- **[BMM 완전한 문서 허브](./src/modules/bmm/docs/README.md)** - 모든 BMM 가이드, FAQ, 문제 해결
- **[BMB 모듈 참조](./src/modules/bmb/README.md)** - 커스텀 에이전트 및 워크플로우 구축
- **[CIS 워크플로우 가이드](./src/modules/cis/workflows/README.md)** - 창의적 촉진 워크플로우

**커스터마이징 및 공유:**

- **[에이전트 커스터마이징 가이드](./docs/agent-customization-guide.md)** - 에이전트 이름, 페르소나, 행동 커스터마이징
- **[Gemini 및 GPT용 웹 번들](./docs/web-bundles-gemini-gpt-guide.md)** - Gemini Gems 및 Custom GPTs에서 BMad 에이전트 사용

**추가 리소스:**

- **[문서 색인](./docs/index.md)** - 모든 프로젝트 문서
- **[v4에서 v6 업그레이드 가이드](./docs/v4-to-v6-upgrade.md)** - 마이그레이션 지침
- **[CLI 도구 가이드](./tools/cli/README.md)** - 설치 프로그램 및 빌드 도구 참조
- **[기여 가이드](./CONTRIBUTING.md)** - 기여 방법

---

## 커뮤니티 및 지원

- 💬 **[Discord 커뮤니티](https://discord.gg/gk8jAdXWmj)** - 도움 받기, 프로젝트 공유 (#general-dev, #bugs-issues)
- 🐛 **[GitHub Issues](https://github.com/bmad-code-org/BMAD-METHOD/issues)** - 버그 보고, 기능 요청
- 🎥 **[YouTube 채널](https://www.youtube.com/@BMadCode)** - 비디오 튜토리얼 및 워크스루
- ⭐ **[이 저장소에 별표](https://github.com/bmad-code-org/BMAD-METHOD)** - 릴리스 업데이트 받기

---

## 개발 및 품질 검사

**BMAD 코드베이스 작업하는 기여자를 위해:**

**요구사항:** Node.js 22+ (`.nvmrc` 참조). `nvm use`를 실행하여 올바른 버전으로 전환하세요.

### 테스팅 및 검증

```bash
# 모든 품질 검사 실행 (종합적 - 푸시 전에 사용)
npm test

# 개별 테스트 스위트
npm run test:schemas     # 에이전트 스키마 검증 (fixture 기반)
npm run test:install     # 설치 컴포넌트 테스트 (컴파일)
npm run validate:schemas # YAML 스키마 검증
npm run validate:bundles # 웹 번들 무결성
```

### 코드 품질

```bash
# 린트 검사
npm run lint

# 린팅 이슈 자동 수정
npm run lint:fix

# 포맷 검사
npm run format:check

# 모든 파일 자동 포맷
npm run format:fix
```

### 빌드 및 개발

```bash
# 웹 배포용 번들
npm run bundle

# 로컬 설치 테스트
npm run install:bmad
```

**Pre-commit Hook:** 변경된 파일 자동 수정 (lint-staged) + 모든 것 검증 (npm test)
**CI:** GitHub Actions가 모든 PR에서 모든 품질 검사를 병렬로 실행

---

## 기여하기

기여를 환영합니다! 다음을 위해 **[CONTRIBUTING.md](CONTRIBUTING.md)**를 참조하세요:

- 코드 기여 가이드라인
- 문서 개선
- 모듈 개발
- 이슈 보고

---

## 라이선스

**MIT 라이선스** - 자세한 내용은 [LICENSE](LICENSE) 참조

**상표:** BMAD™ 및 BMAD-METHOD™는 BMad Code, LLC의 상표입니다.

---

[![Contributors](https://contrib.rocks/image?repo=bmad-code-org/BMAD-METHOD)](https://github.com/bmad-code-org/BMAD-METHOD/graphs/contributors)

<sub>인간-AI 협업 커뮤니티를 위해 ❤️로 제작되었습니다</sub>

# BMAD-METHOD™: 범용 AI 에이전트 프레임워크

[![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

에이전트 애자일 주도 개발의 기반, 애자일 AI 주도 개발의 혁신적 방법론으로 알려진 BMAD-METHOD™는 그보다 훨씬 더 많은 것을 제공합니다. 소프트웨어 개발, 엔터테인먼트, 창작 글쓰기, 비즈니스 전략부터 개인 웰니스까지 특화된 AI 전문성으로 모든 도메인을 변화시킬 수 있습니다.

**[BMadCode YouTube 채널 구독하기](https://www.youtube.com/@BMadCode?sub_confirmation=1)**

**[Discord 커뮤니티 참여하기](https://discord.gg/gk8jAdXWmj)** - AI 애호가들을 위한 성장하는 커뮤니티입니다! 도움받기, 아이디어 공유하기, AI 에이전트와 프레임워크 탐험하기, 기술 프로젝트 협업하기, 취미 즐기기, 서로 성공을 도와주는 곳입니다. BMad에서 막혔거나, 자신만의 에이전트를 구축하고 있거나, 최신 AI에 대해 이야기하고 싶다면 - 우리가 여기 있습니다! **일부 모바일과 VPN은 디스코드 참여에 문제가 있을 수 있습니다. 이는 디스코드 이슈입니다 - 초대가 작동하지 않으면 개인 인터넷이나 다른 네트워크, 또는 VPN 없이 시도해보세요.**

⭐ **이 프로젝트가 도움이 되거나 유용하다면, 우측 상단에 별표를 눌러주세요!** 이는 다른 사람들이 BMAD-METHOD™을 발견하는데 도움이 되고 업데이트 알림을 받을 수 있습니다!

## 개요

**BMAD-METHOD™의 두 가지 핵심 혁신:**

**1. 에이전트 계획:** 전담 에이전트들(분석가, PM, 아키텍트)이 당신과 협력하여 상세하고 일관성 있는 PRD 및 아키텍처 문서를 작성합니다. 고급 프롬프트 엔지니어링과 휴먼-인-더-루프 개선을 통해, 이러한 계획 에이전트들은 일반적인 AI 작업 생성을 훨씬 뛰어넘는 포괄적인 명세서를 생성합니다.

**2. 컨텍스트 엔지니어링 개발:** 스크럼 마스터 에이전트가 이러한 상세한 계획을 Dev 에이전트가 필요로 하는 모든 것을 포함한 매우 상세한 개발 스토리로 변환합니다 - 전체 컨텍스트, 구현 세부사항, 그리고 스토리 파일에 직접 포함된 아키텍처 가이드라인.

이 두 단계 접근 방식은 **계획 불일치**와 **컨텍스트 손실** - AI 지원 개발에서 가장 큰 문제들을 해결합니다. 당신의 Dev 에이전트는 무엇을 구축할지, 어떻게 구축할지, 왜 구축해야 하는지에 대한 완전한 이해를 가지고 스토리 파일을 엽니다.

**📖 [사용자 가이드에서 완전한 워크플로우 보기](docs/user-guide.md)** - 계획 단계, 개발 사이클, 그리고 모든 에이전트 역할

## 빠른 탐색

### BMad 워크플로우 이해하기

**시작하기 전에, BMad가 어떻게 작동하는지 설명하는 이 중요한 워크플로우 다이어그램을 검토하세요:**

1. **[계획 워크플로우 (웹 UI)](docs/user-guide.md#the-planning-workflow-web-ui)** - PRD 및 아키텍처 문서 작성 방법
2. **[핵심 개발 사이클 (IDE)](docs/user-guide.md#the-core-development-cycle-ide)** - SM, Dev, QA 에이전트가 스토리 파일을 통해 협력하는 방법

> ⚠️ **이 다이어그램들은 BMad Method 에이전트 애자일 플로우 혼란의 90%를 설명합니다** - PRD+아키텍처 생성과 SM/Dev/QA 워크플로우, 그리고 에이전트들이 스토리 파일을 통해 메모를 주고받는 방법을 이해하는 것은 필수적입니다 - 또한 이것이 단순한 태스크마스터나 간단한 작업 실행기가 아닌 이유를 설명합니다!

### 무엇을 하고 싶으신가요?

- **[풀스택 애자일 AI 팀으로 소프트웨어 설치 및 구축](#빠른-시작)** → 빠른 시작 가이드
- **[BMad 사용법 배우기](docs/user-guide.md)** → 완전한 사용자 가이드 및 워크스루
- **[사용 가능한 AI 에이전트 보기](/bmad-core/agents))** → 팀을 위한 전문 역할들
- **[비기술적 용도 탐색](#-소프트웨어-개발을-넘어서---확장-팩)** → 창작 글쓰기, 비즈니스, 웰니스, 교육
- **[나만의 AI 에이전트 만들기](docs/expansion-packs.md)** → 당신의 도메인을 위한 에이전트 구축
- **[기성품 확장 팩 둘러보기](expansion-packs/)** → 게임 개발, DevOps, 인프라스트럭처와 아이디어 및 예제에서 영감 얻기
- **[아키텍처 이해하기](docs/core-architecture.md)** → 기술 심화 분석
- **[커뮤니티 참여하기](https://discord.gg/gk8jAdXWmj)** → 도움 받기 및 아이디어 공유하기

## 중요: BMad 설치를 최신 상태로 유지하세요

**쉽게 최신 상태를 유지하세요!** 프로젝트에 BMAD-METHOD™이 이미 설치되어 있다면, 다음을 실행하기만 하면 됩니다:

```bash
npx bmad-method install
# 또는
git pull
npm run install:bmad
```

이 명령은 다음을 수행합니다:

- ✅ 기존 v4 설치를 자동으로 감지
- ✅ 변경된 파일만 업데이트하고 새 파일 추가
- ✅ 사용자 정의 수정 사항에 대한 `.bak` 백업 파일 생성
- ✅ 프로젝트별 구성 보존

이렇게 하면 사용자 정의를 잃지 않고 최신 개선 사항, 버그 수정 및 새로운 에이전트의 혜택을 쉽게 받을 수 있습니다!

## 빠른 시작

### 모든 것을 위한 하나의 명령 (IDE 설치)

**다음 명령 중 하나만 실행하세요:**

```bash
npx bmad-method install
# 또는 명시적으로 stable 태그 사용:
npx bmad-method@stable install
# 또는 BMad가 이미 설치되어 있다면:
git pull
npm run install:bmad
```

이 하나의 명령으로 다음을 처리합니다:

- **새 설치** - 프로젝트에 BMad 설정
- **업그레이드** - 기존 설치를 자동으로 업데이트
- **확장 팩** - package.json에 추가한 확장 팩 설치

> **이것이 전부입니다!** 처음 설치하든, 업그레이드하든, 확장 팩을 추가하든 - 이 명령들이 모든 것을 처리합니다.

**필수 조건**: [Node.js](https://nodejs.org) v20+ 필요

### 가장 빠른 시작: 웹 UI 풀스택 팀 활용 (2분)

1. **번들 받기**: [풀스택 팀 파일](dist/teams/team-fullstack.txt)을 저장하거나 복제하거나 다른 팀을 선택하세요
2. **AI 에이전트 생성**: 새로운 Gemini Gem 또는 CustomGPT를 생성하세요
3. **업로드 및 구성**: 파일을 업로드하고 지침을 설정하세요: "중요한 운영 지침이 첨부되었습니다. 지시된 대로 캐릭터를 깨지 마세요"
4. **아이디어 제안 및 계획 시작**: 채팅을 시작하세요! `*help`를 입력하여 사용 가능한 명령을 보거나 `*analyst`와 같은 에이전트를 선택하여 브리프 작성을 바로 시작하세요.
5. **중요**: 웹에서 언제든지 BMad Orchestrator와 대화하세요 (#bmad-orchestrator 명령)하고 이 모든 것이 어떻게 작동하는지 질문하세요!
6. **IDE로 이동할 때**: PRD, 아키텍처, 선택적 UX 및 브리프가 있으면 - IDE로 전환하여 문서를 샤딩하고 실제 코드 구현을 시작할 시간입니다! 자세한 내용은 [사용자 가이드](docs/user-guide.md)를 참조하세요

### 대안: 복제 및 빌드

```bash
git clone https://github.com/bmadcode/bmad-method.git
npm run install:bmad # 대상 폴더에 모든 것을 빌드하고 설치
```

## 🌟 소프트웨어 개발을 넘어서 - 확장 팩

BMAD™의 자연어 프레임워크는 모든 도메인에서 작동합니다. 확장 팩은 창작 글쓰기, 비즈니스 전략, 건강 및 웰빙, 교육 등을 위한 전문 AI 에이전트를 제공합니다. 또한 확장 팩은 모든 경우에 일반적이지 않은 특정 기능으로 핵심 BMAD-METHOD™를 확장할 수 있습니다. [확장 팩 가이드](docs/expansion-packs.md)를 참조하고 자신만의 것을 만드는 방법을 배워보세요!

## 코드베이스 플래트너 도구

BMAD-METHOD™는 AI 모델 소비를 위해 프로젝트 파일을 준비하도록 설계된 강력한 코드베이스 플래트너 도구를 포함합니다. 이 도구는 전체 코드베이스를 단일 XML 파일로 집계하여, 분석, 디버깅 또는 개발 지원을 위해 AI 어시스턴트와 프로젝트 컨텍스트를 쉽게 공유할 수 있게 합니다.

### 기능

- **AI 최적화 출력**: AI 모델 소비를 위해 특별히 설계된 깔끔한 XML 형식 생성
- **스마트 필터링**: 불필요한 파일을 제외하기 위해 `.gitignore` 패턴을 자동으로 준수
- **바이너리 파일 감지**: 바이너리 파일을 지능적으로 식별하고 제외하여 소스 코드에 집중
- **진행 상황 추적**: 실시간 진행 상황 표시기 및 포괄적인 완료 통계
- **유연한 출력**: 커스터마이즈 가능한 출력 파일 위치 및 이름 지정

### 사용법

```bash
# 기본 사용법 - 현재 디렉토리에 flattened-codebase.xml 생성
npx bmad-method flatten

# 사용자 정의 입력 디렉토리 지정
npx bmad-method flatten --input /path/to/source/directory
npx bmad-method flatten -i /path/to/source/directory

# 사용자 정의 출력 파일 지정
npx bmad-method flatten --output my-project.xml
npx bmad-method flatten -o /path/to/output/codebase.xml

# 입력 및 출력 옵션 결합
npx bmad-method flatten --input /path/to/source --output /path/to/output/codebase.xml
```

### 출력 예제

도구는 진행 상황을 표시하고 포괄적인 요약을 제공합니다:

```text
📊 완료 요약:
✅ 156개 파일을 flattened-codebase.xml로 성공적으로 처리했습니다
📁 출력 파일: /path/to/your/project/flattened-codebase.xml
📏 총 소스 크기: 2.3 MB
📄 생성된 XML 크기: 2.1 MB
📝 총 코드 라인 수: 15,847
🔢 예상 토큰 수: 542,891
📊 파일 분석: 142개 텍스트, 14개 바이너리, 0개 오류
```

생성된 XML 파일은 AI 모델이 쉽게 구문 분석하고 이해할 수 있는 구조화된 형식으로 프로젝트의 텍스트 기반 소스 파일을 포함하며, 코드 리뷰, 아키텍처 토론 또는 BMAD-METHOD™ 프로젝트에 대한 AI 지원을 받는 데 완벽합니다.

#### 고급 사용법 및 옵션

- CLI 옵션
  - `-i, --input <path>`: 플래튼할 디렉토리. 기본값: 현재 작업 디렉토리 또는 대화식으로 실행할 때 자동 감지된 프로젝트 루트.
  - `-o, --output <path>`: 출력 파일 경로. 기본값: 선택된 디렉토리의 `flattened-codebase.xml`.
- 대화식 모드
  - `--input`과 `--output`을 전달하지 않고 터미널이 대화식(TTY)인 경우, 도구는 프로젝트 루트를 감지하려고 시도합니다(`.git`, `package.json` 등의 마커를 찾아) 그리고 경로를 확인하거나 재정의하도록 프롬프트를 표시합니다.
  - 비대화식 컨텍스트(예: CI)에서는 감지된 루트를 조용히 선호하며, 그렇지 않으면 현재 디렉토리와 기본 파일명으로 대체합니다.
- 파일 검색 및 무시
  - git 저장소 내부에서 속도와 정확성을 위해 `git ls-files`를 사용하며, 그렇지 않으면 glob 기반 스캔으로 대체합니다.
  - `.gitignore`와 기본 무시 패턴 세트(예: `node_modules`, 빌드 출력, 캐시, 로그, IDE 폴더, 락파일, 대용량 미디어/바이너리, `.env*`, 이전에 생성된 XML 출력)를 적용합니다.
- 바이너리 처리
  - 바이너리 파일은 감지되어 XML 내용에서 제외됩니다. 최종 요약에는 계산되지만 출력에 포함되지 않습니다.
- XML 형식 및 안전성
  - 루트 요소 `<files>`가 있는 UTF-8 인코딩 파일.
  - 각 텍스트 파일은 내용이 `<![CDATA[ ... ]]>`로 래핑된 `<file path="relative/path">` 요소로 출력됩니다.
  - 도구는 정확성을 보장하기 위해 CDATA를 분할하여 내용 내의 `]]>` 발생을 안전하게 처리합니다.
  - 파일 내용은 그대로 보존되고 XML 내에서 가독성을 위해 들여쓰기됩니다.
- 성능
  - 동시성은 CPU와 워크로드 크기에 따라 자동으로 선택됩니다. 구성이 필요하지 않습니다.
  - git 저장소 내에서 실행하면 검색 성능이 향상됩니다.

#### 최소 XML 예제

```xml
<?xml version="1.0" encoding="UTF-8"?>
<files>
  <file path="src/index.js"><![CDATA[
    // your source content
  ]]></file>
</files>
```

## 문서 및 리소스

### 필수 가이드

- 📖 **[사용자 가이드](docs/user-guide.md)** - 프로젝트 구상부터 완료까지의 완전한 워크스루
- 🏗️ **[핵심 아키텍처](docs/core-architecture.md)** - 기술 심화 분석 및 시스템 설계
- 🚀 **[확장 팩 가이드](docs/expansion-packs.md)** - 소프트웨어 개발을 넘어 모든 도메인으로 BMad 확장

## 지원

- 💬 [Discord 커뮤니티](https://discord.gg/gk8jAdXWmj)
- 🐛 [이슈 트래커](https://github.com/bmadcode/bmad-method/issues)
- 💬 [토론](https://github.com/bmadcode/bmad-method/discussions)

## 기여하기

**우리는 기여에 대해 흥미롭고 여러분의 아이디어, 개선 사항, 그리고 확장 팩을 환영합니다!** 🎉

📋 **[CONTRIBUTING.md 읽기](CONTRIBUTING.md)** - 가이드라인, 프로세스, 요구사항을 포함한 기여에 대한 완전한 가이드

## 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

## 상표 고지

BMAD™ 및 BMAD-METHOD™는 BMad Code, LLC의 상표입니다. 모든 권리는 보유됩니다.

[![Contributors](https://contrib.rocks/image?repo=bmadcode/bmad-method)](https://github.com/bmadcode/bmad-method/graphs/contributors)

<sub>AI 지원 개발 커뮤니티를 위해 ❤️로 제작되었습니다</sub>

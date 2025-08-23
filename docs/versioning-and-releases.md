# 버전 관리 및 릴리스

BMad Method는 수동 제어와 자동 릴리스 노트 생성을 제공하는 간소화된 릴리스 시스템을 사용합니다.

## 🚀 릴리스 워크플로우

### 명령행 릴리스 (권장)

아름다운 릴리스 노트와 함께 릴리스를 만드는 가장 빠른 방법:

```bash
# 릴리스에 포함될 내용 미리보기
npm run preview:release

# 릴리스 생성
npm run release:patch    # 5.1.0 → 5.1.1 (버그 수정)
npm run release:minor    # 5.1.0 → 5.2.0 (새로운 기능)
npm run release:major    # 5.1.0 → 6.0.0 (호환성을 깨는 변경사항)

# 릴리스 과정 모니터링
npm run release:watch
```

### 한 줄 릴리스

```bash
npm run preview:release && npm run release:minor && npm run release:watch
```

## 📝 자동으로 수행되는 작업

릴리스를 실행하면 GitHub Actions 워크플로우가 자동으로:

1. ✅ **검증** - 테스트, 린팅, 포맷팅 검사 실행
2. ✅ **버전 업데이트** - `package.json`과 설치 프로그램 버전 업데이트
3. ✅ **릴리스 노트 생성** - 마지막 릴리스 이후 커밋을 카테고리별로 분류:
   - ✨ **새로운 기능** (`feat:`, `Feature:`)
   - 🐛 **버그 수정** (`fix:`, `Fix:`)
   - 🔧 **유지보수** (`chore:`, `Chore:`)
   - 📦 **기타 변경사항** (그 외 모든 것)
4. ✅ **Git 태그 생성** - 릴리스 버전 태그 생성
5. ✅ **NPM에 게시** - 사용자 설치를 위한 `@latest` 태그와 함께
6. ✅ **GitHub 릴리스 생성** - 형식화된 릴리스 노트와 함께

## 📋 샘플 릴리스 노트

워크플로우는 다음과 같은 전문적인 릴리스 노트를 자동으로 생성합니다:

````markdown
## 🚀 v5.2.0의 새로운 기능

### ✨ 새로운 기능

- feat: 팀 협업 모드 추가
- feat: 대화형 프롬프트로 CLI 개선

### 🐛 버그 수정

- fix: 설치 경로 문제 해결
- fix: 에이전트 로딩 시 예외 상황 처리

### 🔧 유지보수

- chore: 의존성 업데이트
- chore: 오류 메시지 개선

## 📦 설치

```bash
npx bmad-method install
```

**전체 변경사항**: [v5.1.0...v5.2.0](https://github.com/bmadcode/BMAD-METHOD/compare/v5.1.0...v5.2.0)

## 🎯 사용자 설치

릴리스 후에는 사용자가 즉시 새 버전을 다음 명령으로 받을 수 있습니다:

```bash
npx bmad-method install    # 항상 최신 릴리스를 받습니다
```

## 📊 릴리스 전 미리보기

릴리스에 포함될 내용을 항상 미리 확인하세요:

```bash
npm run preview:release
```

다음 사항들을 보여줍니다:

- 마지막 릴리스 이후 커밋
- 카테고리별로 분류된 변경사항
- 예상 다음 버전
- 릴리스 노트 미리보기

## 🔧 수동 릴리스 (GitHub UI)

GitHub Actions를 통해서도 릴리스를 실행할 수 있습니다:

1. **GitHub Actions** → **Manual Release**로 이동
2. **"Run workflow"** 클릭
3. 버전 업데이트 타입 선택 (patch/minor/major)
4. 나머지는 모두 자동으로 처리

## 📈 버전 전략

- **Patch** (5.1.0 → 5.1.1): 버그 수정, 사소한 개선
- **Minor** (5.1.0 → 5.2.0): 새로운 기능, 향상된 기능
- **Major** (5.1.0 → 6.0.0): 호환성을 깨는 변경사항, 주요 재설계

## 🛠️ 개발 워크플로우

1. **자유롭게 개발** - 릴리스를 트리거하지 않고 PR을 main에 병합
2. **미출시 변경사항 테스트** - 최신 main 브랜치를 클론하여 테스트
3. **준비되면 릴리스** - 명령행이나 GitHub Actions를 사용하여 릴리스 생성
4. **사용자 업데이트 받기** - 간단한 `npx bmad-method install` 명령을 통해

이 방식은 버전 업데이트, 릴리스 노트, 게시와 같은 지루한 작업들을 자동화하면서 릴리스 시점에 대한 완전한 제어권을 제공합니다.

## 🔍 문제 해결

### 릴리스 상태 확인

```bash
gh run list --workflow="Manual Release"
npm view bmad-method dist-tags
git tag -l | sort -V | tail -5
```

### 최신 릴리스 보기

```bash
gh release view --web
npm view bmad-method versions --json
```

### 버전 동기화가 필요한 경우

릴리스 후 로컬 파일이 게시된 버전과 일치하지 않는 경우:

```bash
./tools/sync-version.sh    # 로컬 파일을 npm latest와 자동으로 동기화
```

### 릴리스가 실패한 경우

- GitHub Actions 로그 확인: `gh run view <run-id> --log-failed`
- NPM 토큰이 설정되어 있는지 확인
- 브랜치 보호가 워크플로우 푸시를 허용하는지 확인
````

# Pull Request로 기여하는 방법

**GitHub과 Pull Request가 처음이신가요?** 이 가이드가 기본 사항을 단계별로 안내해드립니다.

## Pull Request란?

Pull Request(PR)는 GitHub의 프로젝트에 변경 사항을 제안하는 방법입니다. "여기 제가 만들고 싶은 변경 사항이 있습니다 - 검토하고 메인 프로젝트에 추가를 고려해주세요"라고 말하는 것으로 생각하세요.

## 시작하기 전에

⚠️ **중요**: 기여를 작고 집중적으로 유지해주세요! 하나의 거대한 변경보다는 많은 작고 명확한 변경을 선호합니다.

**PR 제출 전 필수 사항:**

- **버그 수정의 경우**: [버그 신고 템플릿](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)을 사용하여 이슈 생성
- **새로운 기능의 경우**:
  1. Discord [#general-dev 채널](https://discord.gg/gk8jAdXWmj)에서 토론
  2. [기능 요청 템플릿](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)을 사용하여 이슈 생성
- **대규모 변경의 경우**: 항상 먼저 이슈를 열어 일치성을 논의

## 단계별 가이드

### 1. 리포지토리 포크하기

1. [BMad-Method 리포지토리](https://github.com/bmadcode/bmad-method)로 이동
2. 우측 상단의 "Fork" 버튼 클릭
3. 이렇게 하면 프로젝트의 자신만의 복사본이 생성됩니다

### 2. 포크 복제하기

```bash
# YOUR-USERNAME을 실제 GitHub 사용자명으로 바꿔주세요
git clone https://github.com/YOUR-USERNAME/bmad-method.git
cd bmad-method
```

### 3. 새 브랜치 생성

**`main` 브랜치에서 직접 작업하지 마세요!** 항상 변경사항을 위한 새 브랜치를 생성하세요:

```bash
# 새 브랜치 생성 및 전환
git checkout -b fix/typo-in-readme
# 또는
git checkout -b feature/add-new-agent
```

**브랜치 명명 팁:**

- `fix/description` - 버그 수정용
- `feature/description` - 새 기능용
- `docs/description` - 문서 변경용

### 4. 변경사항 만들기

- 변경하고 싶은 파일 편집
- 변경사항을 작고 한 가지에 집중하도록 유지
- 가능하면 변경사항 테스트

### 5. 변경사항 커밋

```bash
# 변경사항 추가
git add .

# 명확한 메시지로 커밋
git commit -m "Fix typo in README.md"
```

**좋은 커밋 메시지:**

- "Fix typo in installation instructions"
- "Add example for new agent usage"
- "Update broken link in docs"

**나쁜 커밋 메시지:**

- "stuff"
- "changes"
- "update"

### 6. 포크에 푸시하기

```bash
# 브랜치를 포크에 푸시
git push origin fix/typo-in-readme
```

### 7. Pull Request 생성

1. GitHub의 본인 포크로 이동
2. 녹색 "Compare & pull request" 버튼이 보일 것입니다 - 클릭하세요
3. 올바른 대상 브랜치 선택:
   - **`next` 브랜치** - 대부분의 기여 (기능, 문서, 개선사항)
   - **`main` 브랜치** - 중요한 수정사항에만
4. CONTRIBUTING.md의 템플릿을 사용하여 PR 설명 작성:
   - **What**: 무엇이 변경되었는지 1-2문장으로 설명
   - **Why**: 왜 변경했는지 1-2문장으로 설명
   - **How**: 구현 방법을 2-3개 항목으로 설명
   - **Testing**: 어떻게 테스트했는지
5. 관련 이슈 번호 참조 (예: "Fixes #123")

### 8. 리뷰 대기

- 메인테이너가 PR을 리뷰할 것입니다
- 변경을 요청할 수 있습니다
- 피드백에 인내심을 갖고 반응하세요

## 좋은 Pull Request란?

✅ **좋은 PR:**

- 한 번에 한 가지만 변경
- 명확하고 설명적인 제목
- 설명에서 무엇을, 왜 하는지 설명
- 변경이 필요한 파일만 포함

❌ **피해야 할 것:**

- 전체 파일의 포맷 변경
- 하나의 PR에 여러 관련 없는 변경사항
- 전체 프로젝트/레포를 PR에 복사
- 설명 없는 변경사항

## 피해야 할 일반적인 실수

1. **전체 파일을 재포맷하지 마세요** - 필요한 부분만 변경
2. **관련 없는 변경사항을 포함하지 마세요** - PR당 하나의 수정/기능만
3. **이슈에 코드를 붙여넣지 마세요** - 대신 적절한 PR을 생성
4. **전체 프로젝트를 제출하지 마세요** - 구체적인 개선사항만 기여

## 도움이 필요하신가요?

- 💬 실시간 도움을 위해 [Discord 커뮤니티](https://discord.gg/gk8jAdXWmj)에 참여하세요:
  - **#general-dev** - 기술적 질문과 기능 토론
  - **#bugs-issues** - 이슈 제출 전 버그 관련 도움
- 💬 [GitHub Discussions](https://github.com/bmadcode/bmad-method/discussions)에서 질문하세요
- 🐛 [버그 신고 템플릿](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)을 사용하여 버그 신고
- 💡 [기능 요청 템플릿](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)을 사용하여 기능 제안
- 📖 전체 [기여 가이드라인](../CONTRIBUTING.md) 읽기

## 예시: 좋은 PR vs 나쁜 PR

### 😀 좋은 PR 예시

**제목**: "설치 가이드 링크 수정"
**변경사항**: 한 파일, 한 줄만 변경
**설명**: "README.md의 링크가 잘못된 파일을 가리키고 있어 올바른 설치 가이드로 수정했습니다."

### 😞 나쁜 PR 예시

**제목**: "업데이트"
**변경사항**: 50개 파일, 전체 코드베이스 재포맷
**설명**: "몇 가지 개선을 했습니다"

---

**기억하세요**: 우리는 여러분을 돕기 위해 여기 있습니다! 질문하는 것을 두려워하지 마세요. 모든 전문가도 처음엔 초보자였습니다.

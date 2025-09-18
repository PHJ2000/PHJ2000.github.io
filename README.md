# GitHub.io Tech Blog Starter (KR)

요구사항에 맞춘 GitHub Pages + Jekyll 블로그 스타터입니다.

## 주요 기능
- **제목 글자 뒤 이미지**: 글자 내부에 배경 이미지가 채워지는 효과 (`background-clip:text`)
- **좌측 카테고리 / 우측 용어 설명**: 반응형 3열 레이아웃(모바일에서는 1열)
- **Jekyll 기본만 사용**: GitHub Pages에서 바로 빌드 가능(추가 플러그인 X)

## 사용법
1. GitHub에서 레포지토리를 **`YOUR_USERNAME.github.io`** 이름으로 만듭니다.
2. 이 프로젝트의 모든 파일을 레포지토리 루트에 업로드/커밋합니다.
3. (선택) 로컬에서 확인하려면 아래를 실행하세요.
   ```bash
   bundle install
   bundle exec jekyll serve
   # http://127.0.0.1:4000
   ```
4. GitHub에 푸시하면 자동으로 배포됩니다. 배포 URL은 `https://YOUR_USERNAME.github.io` 입니다.

## 커스터마이즈
- `_config.yml`의 `title`, `description`, `url`을 수정
- 용어집: `_data/glossary.yml`
- 스타일: `assets/css/main.css`
- 좌/우 사이드바: `_includes/sidebar-left.html`, `_includes/sidebar-right.html`
- 카테고리 페이지: `categories/index.html`

## 새 글 작성
- 파일 경로: `_posts/YYYY-MM-DD-title.md`
- 프론트매터 예시:
  ```yaml
  ---
  title: "예시 글"
  categories: [Backend, Python]
  title_image: /assets/headers/sample-hero.jpg
  ---
  ```
  - `title_image`를 지정하면 **글자 내부 이미지 효과**가 적용됩니다.
  - `title_clip: false`로 설정하면 **히어로 이미지 + 텍스트 오버레이** 방식으로 대체합니다.

## 이미지 관련 참고
- 글자 내부 이미지 효과는 `-webkit-background-clip: text`를 사용하므로 **일부 오래된 브라우저**에서는 동작하지 않을 수 있습니다.
- 가능한 넉넉한 해상도의 이미지를 사용하세요(가로 최소 1200px 권장).

## 라이선스
MIT

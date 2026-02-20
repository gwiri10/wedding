# 모바일 청첩장 (HTML 버전)

순수 HTML/CSS/JS로 만든 청첩장입니다. 서버 없이 `index.html`만으로 동작합니다.

## 실행 방법

1. **이미지 폴더 연결**
   - `html/image` 폴더가 없으면, `public/image`를 `html/image`로 복사하거나 심볼릭 링크를 만드세요.
   - 터미널: `cd html && ln -s ../public/image image`

2. **로컬 서버로 열기** (권장)
   - `npx serve .` 또는 `python -m http.server 8000`
   - 브라우저에서 `http://localhost:3000` 또는 `http://localhost:8000` 접속

3. **파일로 직접 열기**
   - `index.html`을 더블클릭해 브라우저에서 열 수 있습니다.
   - 일부 브라우저에서는 로컬 파일로 인한 제한이 있을 수 있어, 가능하면 로컬 서버를 사용하세요.

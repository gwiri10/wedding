# Giscus 방명록 설정 방법

1. **GitHub 저장소 준비**
   - Public 저장소 생성 (예: `username/wedding-guestbook`)
   - Settings → General → Features 에서 **Discussions** 활성화
   - Discussions → New category 에서 "Comments" 또는 "방명록" 카테고리 생성

2. **Giscus 앱 설치**
   - https://github.com/apps/giscus 에서 해당 저장소에 Giscus 앱 설치

3. **설정 값 가져오기**
   - https://giscus.app 접속
   - 저장소, 카테고리, Mapping 등 선택
   - 페이지 하단의 스크립트에 나온 값 복사

4. **index.html 수정**
   - 방명록 섹션의 `<script>` 태그 내 다음 값을 교체:
     - `data-repo="owner/repo"` → 본인 저장소 (예: `easyon/wedding`)
     - `data-repo-id="REPO_ID"` → giscus.app 에서 표시되는 값
     - `data-category-id="CATEGORY_ID"` → giscus.app 에서 표시되는 값

5. **배포**
   - GitHub Pages 등으로 배포 시, Giscus가 동작하려면 해당 URL이 Giscus 설정의 허용 도메인에 포함되어야 합니다.

6. **로컬에서 확인**
   - `file://` 로 열면 Giscus가 동작하지 않습니다. 반드시 로컬 서버를 띄워서 확인하세요.
   - 예: `npx serve html` 또는 `cd html && python -m http.server 8000`
   - 로컬 테스트 시 `giscus.json` 에 originsRegex로 localhost가 등록되어 있어야 합니다.

7. **방명록이 안 보일 때**
   - 브라우저 개발자도구(F12) → Console 에서 에러 메시지 확인
   - GitHub repo에서 Discussions 활성화, Giscus 앱 설치 확인
   - `giscus.json` 을 GitHub 저장소 루트에 올려두었는지 확인

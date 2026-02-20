# 썸네일 생성

위쪽 썸네일 스트립이 빨리 뜨도록 저해상도 이미지를 만듭니다.

```bash
cd html
npm install sharp
node scripts/generate-thumbs.js
```

`image/thumb/` 폴더에 120px 너비의 썸네일이 생성됩니다.  
없으면 원본 이미지를 사용합니다 (onerror fallback).

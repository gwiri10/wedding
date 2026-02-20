# Google 시트 방명록 설정 방법

## 1. Google 시트 만들기
- 새 Google 시트 생성
- 첫 행에 열 제목: `name` | `message` | `date`

## 2. Google Apps Script 연결
- 시트 메뉴: 확장 프로그램 → Apps Script
- 아래 코드 붙여넣기 후 저장:

```javascript
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("시트1") || ss.getSheets()[0];  // 시트명 확인
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const data = values.slice(1).map(row => ({
    name: String(row[0] || ""),
    message: String(row[1] || ""),
    date: row[2] ? (row[2] instanceof Date ? row[2].toISOString() : String(row[2])) : new Date().toISOString()
  }));
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("시트1") || ss.getSheets()[0];
  const body = JSON.parse(e.postData.contents);
  sheet.appendRow([body.name, body.message, new Date()]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**중요**: `getSheetByName("시트1")` 에서 시트 이름을 본인 시트에 맞게 수정하세요.

## 3. 배포
- 배포 → 새 배포
- 유형: 웹 앱
- 실행 사용자: 나
- 액세스: 모든 사용자
- 배포 후 생성되는 **웹 앱 URL** 복사

## 4. index.html 수정
- 방명록 스크립트의 `scriptURL` 값을 복사한 URL로 변경:
```javascript
const scriptURL = "https://script.google.com/macros/s/XXXXX/exec";
```

## 5. CORS 참고
- Apps Script 웹 앱은 기본적으로 다른 도메인에서 호출 가능합니다.
- `file://` 로 열면 CORS 오류가 날 수 있으니 로컬 서버로 테스트하세요.

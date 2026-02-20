# Google 시트 방명록 + 참석여부 설정 방법

## 1. Google 시트 만들기
- 새 Google 시트 생성
- **시트1**: 방명록용, 첫 행 `date` | `name` | `message`
- **참석여부** 시트 추가: 첫 행 `date` | `name` | `attend` | `count` | `meal` | `phone`

## 2. Google Apps Script 연결
- 시트 메뉴: 확장 프로그램 → Apps Script
- `SPREADSHEET_ID`를 본인 스프레드시트 ID로 변경 (URL의 `/d/여기부분/` 참고)
- 아래 코드 붙여넣기 후 저장:

```javascript
const SPREADSHEET_ID = "본인_스프레드시트_ID";

function doGet(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("시트1") || ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const data = values.slice(1).map(row => ({
    name: String(row[1] || ""),
    message: String(row[2] || ""),
    date: row[0] ? (row[0] instanceof Date ? row[0].toISOString() : String(row[0])) : new Date().toISOString()
  }));
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  if (data.type === "guestbook") {
    const sheet = ss.getSheetByName("시트1");
    sheet.appendRow([new Date(), data.name, data.message]);
  }

  if (data.type === "rsvp") {
    const sheet = ss.getSheetByName("참석여부");
    sheet.appendRow([new Date(), data.name, data.attend, data.count, data.meal, data.phone]);
  }

  return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
}
```

**중요**: `SPREADSHEET_ID`와 시트 이름을 본인에 맞게 수정하세요.

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

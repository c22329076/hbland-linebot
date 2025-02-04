const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';

function doPost(e) {
  var requestContent = JSON.parse(e.postData.contents);
  var event = requestContent.events[0];
  if (event) {
    var replyToken = event.replyToken;
    var userId = event.source && event.source.userId;
    var userMessage = event.message.text;
    var replyMessage = [];

    // 取得用戶進度
    var userProgress = JSON.parse(PropertiesService.getScriptProperties().getProperty(userId) || '{}');

    if (userMessage === '!表單') {
      // 啟動問答流程
      replyMessage = getValidationCodeMessage(userId);
    } else if (userProgress.currentQuestion !== undefined) {
      // 處理問答過程中的回應
      replyMessage = handleUserResponse(userId, userMessage);
    } else {
      // 平常的回應邏輯
      replyMessage = getNormalReplyMessage(userMessage);
    }

    doReplyMessage(replyMessage, replyToken);
  }

  return ContentService.createTextOutput('success');
}

function getValidationCodeMessage(userId) {
  var id = 'YOUR_SHEET_ID';
  var sheet_question = connectToSheet(id, '問題');
  var questions = readQuestions(sheet_question);

  // 初始化用戶進度
  var userProgress = {
    currentQuestion: 0,
    answers: [],
    totalQuestions: questions.length
  };
  PropertiesService.getScriptProperties().setProperty(userId, JSON.stringify(userProgress));

  // 回傳第一個問題
  return [{
    'type': 'text',
    'text': '開始填寫表單：\n' + questions[0]
  }];
}

function handleUserResponse(userId, userMessage) {
  var id = 'YOUR_SHEET_ID';
  var sheet_question = connectToSheet(id, '問題');
  var sheet_answer = connectToSheet(id, '表單回應 1');
  var questions = readQuestions(sheet_question);

  // 取得用戶進度
  var userProgress = JSON.parse(PropertiesService.getScriptProperties().getProperty(userId));
  var currentQuestionIndex = userProgress.currentQuestion;

  // 紀錄答案
  userProgress.answers.push(userMessage);

  // 如果還有下一個問題，繼續詢問
  if (currentQuestionIndex + 1 < userProgress.totalQuestions) {
    userProgress.currentQuestion++;
    PropertiesService.getScriptProperties().setProperty(userId, JSON.stringify(userProgress));
    return [{
      'type': 'text',
      'text': questions[userProgress.currentQuestion]
    }];
  } else {
    // 所有問題完成，寫入答案
    saveAnswers(sheet_answer, userProgress.answers);
    PropertiesService.getScriptProperties().deleteProperty(userId);
    return [{
      'type': 'text',
      'text': '表單填寫完成！謝謝您的回答。'
    }];
  }
}
/*
function getNormalReplyMessage(userId, userMessage) {
  // 可根據需求自定義回應邏輯
  return [
    {
    'type': 'text',
    'text': `${userId}` + "，您好！\n有任何地政相關的問題歡迎$輸入以下數字取得更多相關資訊，或撥打本所電話03-4917647，將有人員進一步協助您！\n【 1 】－$上班時間\n【 2 】－$聯絡電話\n【 3 】－$地所住址\n【 4 】－$官方網站\n【 5 】－$粉絲專頁\n【 6 】－ 💌其他問題\n快邀請親朋好友一起加入官方LINE，將會不定時收到最新活動消息唷！$",
    "emojis": [
          {
            "index": parseInt(userId.length) + 17,
            "productId": "5ac21542031a6752fb806d55",
            "emojiId": "242"
          },
          {
            "index": parseInt(userId.length) + 69,
            "productId": "670e0cce840a8236ddd4ee4c",
            "emojiId": "184"
          },
          {
            "index": parseInt(userId.length) + 81,
            "productId": "5ac21542031a6752fb806d55",
            "emojiId": "197"
          },
          {
            "index": parseInt(userId.length) + 93,
            "productId": "5ac1de17040ab15980c9b438",
            "emojiId": "117"
          },
          {
            "index": parseInt(userId.length) + 105,
            "productId": "5ac21542031a6752fb806d55",
            "emojiId": "074"
          },
          {
            "index": parseInt(userId.length) + 117,
            "productId": "5ac21542031a6752fb806d55",
            "emojiId": "073"
          },
          {
            "index": parseInt(userId.length) + 170,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "219"
          }
        ]
    },
    {
      'type': 'text',
      'text': '中壢地政官方帳號提供簡易的關鍵字自動回應，點選下方圖示可進行簡易的地政諮詢~\n若您想詢問其他問題，歡迎至我們的Facebook臉書粉絲專頁留言\n🌏臉書：https://www.facebook.com/Zhongliland/\n或撥打本所電話03-4917647，將由人員為您解答，謝謝您！'
    },
    {
      "type": "flex",
      "altText": "請選擇業務諮詢類別",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E7%99%BB%E8%A8%98%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.JPG",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "登記業務諮詢"
              }
            }
          },
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E6%B8%AC%E9%87%8F%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.JPG",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "測量業務諮詢"
              }
            }
          },
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E5%9C%B0%E5%83%B9%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.JPG",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "地價業務諮詢"
              }
            }
          },
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E8%B3%87%E8%A8%8A%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.JPG",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "資訊業務諮詢"
              }
            }
          },
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E5%9C%B0%E7%94%A8%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.JPG",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "地用業務諮詢"
              }
            }
          },
          {
            "type": "bubble",
            "size": "micro",
            "hero": {
              "type": "image",
              "url": "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/%E6%AA%94%E6%A1%88%E6%87%89%E7%94%A8%E5%85%B6%E4%BB%96%E7%B6%9C%E5%90%88%E6%A5%AD%E5%8B%99%E8%AB%AE%E8%A9%A2.jpg",
              "size": "full",
              "aspectRatio": "775:1096",
              "aspectMode": "cover",
              "action": {
                "type": "message",
                "text": "檔案應用其他綜合業務諮詢"
              }
            }
          }
        ]
      }
    }
  ];
}
*/
function readQuestions(sheet) {
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var questions = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  return questions.map(row => row[0]); // 將問題轉為一維陣列
}

function saveAnswers(sheet, answers) {
  var lastRow = sheet.getLastRow();
  var timestamp = new Date().toLocaleString('zh-TW', { hour12: false });
  var rowData = [timestamp, ...answers];
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
}

function doReplyMessage(replyMessage, replyToken) {
  var payload = {
    replyToken: replyToken,
    messages: replyMessage
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    'method': 'post',
    'payload': JSON.stringify(payload)
  });
}

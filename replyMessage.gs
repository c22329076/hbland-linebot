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
function getNormalReplyMessage(userMessage) {
  // 可根據需求自定義回應邏輯
  return [{
    'type': 'text',
    'text': `您剛剛說了：「${userMessage}」，對吧？`
  }];
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
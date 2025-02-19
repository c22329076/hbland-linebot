function setupRichMenu() {
  deleteAllRichMenus();
  deleteAllRichMenuAliases();

  let richMenuA = createRichMenuA();
  let richMenuB = createRichMenuB();
  let richMenuC = createRichMenuC();
  let richMenuC_1 = createRichMenuC_1();
  let richMenuC_2 = createRichMenuC_2();
  
  console.log("Rich Menu A ID:", richMenuA);
  console.log("Rich Menu B ID:", richMenuB);
  console.log("Rich Menu C ID:", richMenuC);
  console.log("Rich Menu C-1 ID:", richMenuC_1);
  console.log("Rich Menu C-2 ID:", richMenuC_2);

  // 上傳圖片
  uploadRichMenuImage(richMenuA, "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/menu1.jpg");
  uploadRichMenuImage(richMenuB, "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/menu2.jpg");
  uploadRichMenuImage(richMenuC, "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/menu3-1.jpg");
  uploadRichMenuImage(richMenuC_1, "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/menu3-2.jpg");
  uploadRichMenuImage(richMenuC_2, "https://raw.githubusercontent.com/c22329076/hbland-linebot/refs/heads/main/img/menu3-3.jpg");
  
  // 設定初始選單
  setDefaultRichMenu(richMenuA);

  setupRichMenuAlias(richMenuA, richMenuB, richMenuC, richMenuC_1, richMenuC_2);
}

function createRichMenuA() {
  let richMenu = {
    "size": { "width": 2500, "height": 1686 },
    "selected": true,
    "name":"richmenu-a",
    "chatBarText": "業務諮詢",
    "areas": [
      {
        "bounds": { "x": 833, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-b', 'data':'change-to-richmenu-b' }
      },
      {
        "bounds": { "x": 1666, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c', 'data':'change-to-richmenu-c' }
      },
      {
        'bounds': {'x': 258, 'y': 427, 'width': 439, 'height': 255}, 
        'action': {'type': 'message', 'text': '登記業務諮詢'}
      },
      {
        'bounds': {'x': 778, 'y': 652, 'width': 437, 'height': 229},
        'action': {'type': 'message', 'text': '測量業務諮詢'}
      },
      {
        'bounds': {'x': 239, 'y': 974, 'width': 451, 'height': 231},
        'action': {'type': 'message', 'text': '地價業務諮詢'}
      },
      {
        'bounds': {'x': 809, 'y': 1332, 'width': 433, 'height': 239},
        'action': {'type': 'message', 'text': '資訊業務諮詢'}
      },
      {
        'bounds': {'x': 1326, 'y': 429, 'width': 436, 'height': 221},
        'action': {'type': 'message', 'text': '地用業務諮詢'}
      },
      {
        'bounds': {'x': 1302, 'y': 923, 'width': 878, 'height': 451},
        'action': {'type': 'message', 'text': '檔案應用其他綜合業務諮詢'}
      }
    ]
  };
  return createRichMenu(richMenu);
}

function createRichMenuB() {
  let richMenu = {
    "size": { "width": 2500, "height": 1686 },
    "selected": false,
    "name":"richmenu-b",
    "chatBarText": "預約服務",
    "areas": [
      {
        "bounds": { "x": 0, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-a', 'data':'change-to-richmenu-a' }
      },
      {
        "bounds": { "x": 1666, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c', 'data':'change-to-richmenu-c' }
      },
      {
        'bounds': {'x': 101, 'y': 543, 'width': 1734, 'height': 239},
        'action': {'type': 'message', 'text': '我要預約申請'}
      },
      {
        'bounds': {'x': 705, 'y': 1196, 'width': 1732, 'height': 241},
        'action': {'type': 'message', 'text': '!查詢'}
      }
    ]
  };
  return createRichMenu(richMenu);
}

function createRichMenuC() {
  let richMenu = {
    "size": { "width": 2500, "height": 1686 },
    "selected": false,
    "name":"richmenu-c",
    "chatBarText": "ibon",
    "areas": [
      {
        "bounds": { "x": 0, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-a', 'data':'change-to-richmenu-a' }
      },
      {
        "bounds": { "x": 833, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-b', 'data':'change-to-richmenu-b' }
      },
      {
        "bounds": { "x": 353, "y": 1337, "width": 339, "height": 344 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c-1', 'data':'change-to-richmenu-c-2' }
      },
      {
        'bounds': {'x': 268, 'y': 307, 'width': 876, 'height': 234},
        'action': {'type': 'message', 'text': 'ibon'}
      },
      {
        'bounds': {'x': 478, 'y': 587, 'width': 1517, 'height': 231},
        'action': {'type': 'message', 'text': '901'}
      },
      {
        'bounds': {'x': 606, 'y': 858, 'width': 1314, 'height': 231},
        'action': {'type': 'message', 'text': '902'}
      },
      {
        'bounds': {'x': 710, 'y': 1131, 'width': 1311, 'height': 240},
        'action': {'type': 'message', 'text': '903'}
      },
      {
        'bounds': {'x': 858, 'y': 1412, 'width': 1311, 'height': 232},
        'action': {'type': 'message', 'text': '904'}
      }
    ]
  };
  return createRichMenu(richMenu);
}

function createRichMenuC_1() {
  let richMenu = {
    "size": { "width": 2500, "height": 1686 },
    "selected": false,
    "name":"richmenu-c-1",
    "chatBarText": "ibon",
    "areas": [
      {
        "bounds": { "x": 0, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-a', 'data':'change-to-richmenu-a' }
      },
      {
        "bounds": { "x": 833, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-b', 'data':'change-to-richmenu-b' }
      },
      {
        "bounds": { "x": 15, "y": 1337, "width": 339, "height": 344 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c', 'data':'change-to-richmenu-c' }
      },
      {
        "bounds": { "x": 353, "y": 1337, "width": 339, "height": 344 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c-2', 'data':'change-to-richmenu-c-2' }
      },
      {
        'bounds': {'x': 354, 'y': 307, 'width': 1743, 'height': 233},
        'action': {'type': 'message', 'text': '905'}
      },
      {
        'bounds': {'x': 478, 'y': 587, 'width': 1743, 'height': 234},
        'action': {'type': 'message', 'text': '906'}
      },
      {
        'bounds': {'x': 606, 'y': 863, 'width': 1311, 'height': 230},
        'action': {'type': 'message', 'text': '907'}
      },
      {
        'bounds': {'x': 710, 'y': 1133, 'width': 1743, 'height': 236},
        'action': {'type': 'message', 'text': '908'}
      },
      {
        'bounds': {'x': 858, 'y': 1413, 'width': 1527, 'height': 234},
        'action': {'type': 'message', 'text': '904'}
      }
    ]
  };
  return createRichMenu(richMenu);
}

function createRichMenuC_2() {
  let richMenu = {
    "size": { "width": 2500, "height": 1686 },
    "selected": false,
    "name":"richmenu-c-2",
    "chatBarText": "ibon",
    "areas": [
      {
        "bounds": { "x": 0, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-a', 'data':'change-to-richmenu-a' }
      },
      {
        "bounds": { "x": 833, "y": 0, "width": 833, "height": 280 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-b', 'data':'change-to-richmenu-b' }
      },
      {
        "bounds": { "x": 15, "y": 1337, "width": 339, "height": 344 },
        "action": { "type": "richmenuswitch", 'richMenuAliasId': 'richmenu-c-1', 'data':'change-to-richmenu-c-1' }
      },
      {
        'bounds': {'x': 0, 'y': 309, 'width': 1952, 'height': 234},
        'action': {'type': 'message', 'text': '910'}
      },
      {
        'bounds': {'x': 119, 'y': 586, 'width': 1302, 'height': 240},
        'action': {'type': 'message', 'text': '911'}
      },
      {
        'bounds': {'x': 246, 'y': 855, 'width': 1301, 'height': 241},
        'action': {'type': 'message', 'text': '912'}
      },
      {
        'bounds': {'x': 350, 'y': 1134, 'width': 1311, 'height': 233},
        'action': {'type': 'message', 'text': '913'}
      },
      {
        'bounds': {'x': 498, 'y': 1410, 'width': 1950, 'height': 239},
        'action': {'type': 'message', 'text': '914'}
      }
    ]
  };
  return createRichMenu(richMenu);
}

function createRichMenu(richMenu) {
  let url = "https://api.line.me/v2/bot/richmenu";
  let options = {
    "method": "post",
    "headers": { "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    "payload": JSON.stringify(richMenu)
  };
  let response = UrlFetchApp.fetch(url, options);
  let data = JSON.parse(response.getContentText());
  return data.richMenuId;
}

function uploadRichMenuImage(richMenuId, imageUrl) {
  let url = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
  let options = {
    "method": "post",
    "headers": { "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN, "Content-Type": "image/jpeg" },
    "payload": UrlFetchApp.fetch(imageUrl).getBlob().getBytes()
  };
  UrlFetchApp.fetch(url, options);
}

function setDefaultRichMenu(richMenuId) {
  let url = `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`;
  let options = {
    "method": "post",
    "headers": { "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN }
  };
  UrlFetchApp.fetch(url, options);
}

function getRichMenuList() {
  let url = "https://api.line.me/v2/bot/richmenu/list";
  let options = {
    "method": "get",
    "headers": { "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}` }
  };
  let response = UrlFetchApp.fetch(url, options);
  console.log(response.getContentText()); // 查看目前所有 Rich Menu
}

function deleteAllRichMenus() {
  let url = "https://api.line.me/v2/bot/richmenu/list";
  let options = {
    "method": "get",
    "headers": { "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN }
  };
  let response = UrlFetchApp.fetch(url, options);
  let data = JSON.parse(response.getContentText());
  
  if (data.richmenus) {
    data.richmenus.forEach(menu => {
      let deleteUrl = `https://api.line.me/v2/bot/richmenu/${menu.richMenuId}`;
      UrlFetchApp.fetch(deleteUrl, { "method": "delete", "headers": { "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN } });
    });
  }
}

function deleteAllRichMenuAliases() {
  let url = "https://api.line.me/v2/bot/richmenu/alias/list";
  let options = {
    "method": "get",
    "headers": { "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}` }
  };
  let response = UrlFetchApp.fetch(url, options);
  let aliasList = JSON.parse(response.getContentText());

  aliasList.aliases.forEach(alias => {
    let deleteUrl = `https://api.line.me/v2/bot/richmenu/alias/${alias.richMenuAliasId}`;
    let deleteOptions = {
      "method": "delete",
      "headers": { "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}` }
    };
    UrlFetchApp.fetch(deleteUrl, deleteOptions);
    console.log(`Deleted alias: ${alias.richMenuAliasId}`);
  });
}

function setupRichMenuAlias(richMenuA, richMenuB, richMenuC, richMenuC_1, richMenuC_2) {
  // 設定 Alias ID
  createRichMenuAlias(richMenuA, "richmenu-a");
  createRichMenuAlias(richMenuB, "richmenu-b");
  createRichMenuAlias(richMenuC, "richmenu-c");
  createRichMenuAlias(richMenuC_1, "richmenu-c-1");
  createRichMenuAlias(richMenuC_2, "richmenu-c-2");
}

function createRichMenuAlias(richMenuId, aliasId) {
  let url = "https://api.line.me/v2/bot/richmenu/alias";
  let aliasData = {
    richMenuId: richMenuId,
    richMenuAliasId: aliasId
  };
  let options = {
    "method": "post",
    "headers": { "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    "payload": JSON.stringify(aliasData),
    //muteHttpExceptions: true
  };
  let response = UrlFetchApp.fetch(url, options);
  console.log(`Alias ${aliasId} created for Rich Menu ID: ${richMenuId}`);
  console.log(response.getContentText()); // 輸出目前所有的 Alias
}

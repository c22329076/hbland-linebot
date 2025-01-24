function connectToSheet(id, sheetName) {
  Logger.log('start to connectToSheet');
  var spreadSheet = SpreadsheetApp.openById(id);
  var sheet = spreadSheet.getSheetByName(sheetName);
  if (sheet != null) {
    return sheet;
  }
  throw Error;
}
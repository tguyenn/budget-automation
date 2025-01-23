/** 
 * edit master budget sheet
 * */ 

function editMasterSheet() {
  let sheetID = "1uw0LqBbjbEuq2X-QjBsj0W6ebI_K2bclHLlOi9tjy1Q";
  const spreadsheet = SpreadsheetApp.openById(sheetID);

  Logger.log(committeeName);
  const sheet = spreadsheet.getSheetByName(committeeName); 

  targetRow = sheet.getLastRow() + 1;

  const today = new Date();
  const formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

  let originalTargetRow = targetRow;
  for(i = 0; i < itemsOrdered; i++) {
    let itemTotalPrice = "=PRODUCT(J" + targetRow + "," + " K" + targetRow + ") + L" + targetRow;

    // append all data in order starting with Product Name column in the sheet
    let newData = [nameArr[i], descriptionArr[i], vendorName, linksArr[i], quantityArr[i], priceArr[i], 0, itemTotalPrice]; // 0 is for shipping
    sheet.getRange(targetRow, 6, 1, newData.length).setValues([newData]);
    // set date in column A
    sheet.getRange(targetRow, 1).setValue(formattedDate);

    targetRow++;
  }

  sheet.getRange(originalTargetRow, 12, 1).setValue(shipping); //overwrite 0 for shipping in first newly written row
  // todo: merge this get range with the above sheets api call to reduce api calls and save time^^
}
// read input google sheet and parse data into global variables


function readSheet() {

  Logger.log(committeeName);
Logger.log(vendorName);
Logger.log(email);
Logger.log(phoneNumber);
Logger.log(shippingType);
Logger.log(shipping);
Logger.log(specialNotes);

  const spreadsheet = SpreadsheetApp.openById(inputSheetID);
  const sheet = spreadsheet.getSheetByName("Sheet1"); 


  let lastRow = sheet.getRange("A1:A").getValues();
  lastRow = lastRow.filter(String).length;

  // const data = sheet.getRange(1, 1, lastRow).getValues();
  // lastRow = data.findIndex(lastRow => lastRow[0] === '') + 1

  // go from X2:XlastRow and store data into respective variables

  for(i = 1; i < 6; i++) {
    let range = sheet.getRange(2, i, lastRow - 1); // Read from row 2 to the last row in the column
    let columnData = range.getValues(); // This returns a 2D array (e.g., [[value1], [value2], ...])
    let dataArray = columnData.map(row => row[0]); // Flatten to a 1D array

    switch (i) {
      case 1:
        nameArr = dataArray;
        break;
      case 2:
        linksArr = dataArray;
        break;
      case 3:
        quantityArr = dataArray;
        break;
      case 4:
        priceArr = dataArray;
        break;
      case 5:
        descriptionArr = dataArray;
        break;
    }
  }

  let miscData = sheet.getRange('H3:H9').getValues();
  miscData = miscData.map(row => row[0]); // flatten to 1D array

  committeeName = miscData[0];
  vendorName = miscData[1];
  email = miscData[2];
  phoneNumber = miscData[3];
  shippingType = miscData[4];
  shipping = miscData[5];
  specialNotes = miscData[6];

  itemsOrdered = lastRow - 1;

  phoneNumber = phoneNumber.toString().replace(/\D/g, ""); // sanitize phoneNumber to be only numbers
  phoneNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4}).*/, "$1-$2-$3"); // reformat to be xxx-xxx-xxxx

  if(vendorName == "Amazon") {
    discordTag = "<@365619835939455005>"; // ping annie 
    isAmazon = true;
  }

  switch(committeeName) {
    case "VEXU":
      thumbNailUrl = "https://i.imgur.com/2vwgZHO.jpg";
      committeeName = "VEXU";
      break;
    case "RoboMaster":
      thumbNailUrl = "https://i.imgur.com/4UEoyMs.jpg";
      committeeName = "RoboMaster";
      break;
    case "Demobots":
      thumbNailUrl = "https://i.imgur.com/nrR07HS.jpg";
      committeeName = "Demobots";
      break;
    case "IGVC":
      thumbNailUrl = "https://i.imgur.com/M5TQiDf.jpg";
      committeeName = "IGVC";
      break;
    case "Robotathon":
      thumbNailUrl = "https://i.imgur.com/XHbsPvd.jpg";
      committeeName = "Robotathon";
      break;
  }

  for(let i = 0; i < itemsOrdered; i++) {
    totalPrice += (parseFloat(priceArr[i]) * parseInt(quantityArr[i]));
  }
  totalPrice += parseFloat(shipping);

  if (totalPrice > 1500) { // "easter egg" or wtv
    footerUrl = "https://i.imgur.com/1kqpus1.jpg"
    footerText = "holy moly that's a lot of money"
  }

  if (Math.random() > 0.95 && Math.random() > 0.95) { // more easter egg yay yipee
    thumbNailUrl = "https://www.crownbio.com/hubfs/ras-signaling-pathways-thumb.jpg";
  }

}



// links to the draft will break after the draft has been sent, so
// this replaces the draft link with the email's thread link after the draft has been sent 

// executes on time based trigger because idk how to fire an interrupt based on clicking a checkbox in spreadsheet


function replaceLinks() {

    hasDraftLinkArr = [];
    slaveArr = [];
    draftLinkArr = [];
    sentArr = [];
  
    let lastRow = sheet.getRange("A1:A").getValues();
    lastRow = lastRow.filter(String).length;
  
    // store sheet data into arrays
    for(i = 4; i <= 7; i++) {
      let columnData = sheet.getRange(2, i, lastRow).getValues();
      if(i == 4) hasDraftArr = columnData.map(row => row[0]); 
      if(i == 5) slaveArr = columnData.map(row => row[0]); 
      if(i == 6) draftLinkArr = columnData.map(row => row[0]); 
      if(i == 7) sentArr = columnData.map(row => row[0]); 
    } 
  
    // console.log(lastRow);
    // console.log(hasDraftArr);
    // console.log(draftLinkArr);
    // console.log(slaveArr);
    // console.log(sentArr);
  
    for(let i = 0; i < lastRow; i++) {
      if(hasDraftArr[i] == true && sentArr[i] == true && draftLinkArr[i] != "") {
        let threadId = draftLinkArr[i].match(/[?&]compose=([a-f0-9]+)/); // grab thread id from draft link
        let slaveName = slaveArr[i].replace(" ", "+");
        if(threadId == null) continue;
        if(threadId.contains("label")) continue; //scuffed bc idk how to fix lmao
        newLink = `https://mail.google.com/mail/u/0/#label/${slaveName}/${threadId[1]}`;
        sheet.getRange(i + 2, 6).setValue(newLink); // i + 2 is row offset accounting for header and different indexing. 6 is link column
  
      }
    }
  }
  
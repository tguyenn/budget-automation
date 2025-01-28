function readSheet() {

  // pull following data from sheet into global arrays
      // company name
      // company representative(s)
      // relevant emails
      // draft generated?
  // generate draft for each index that has draft generated == FALSE
  // index in each array represents one company

  const companyNameCol = 1; // column A
  const repNamesCol = 2;
  const repEmailsCol = 3;
  const hasDraftCol = 4; 
  const hasSlaveCol = 5;  

  lastRow = sheet.getRange("A1:A").getValues();
  lastRow = lastRow.filter(String).length;

  // store sheet data into global arrays
  for(i = 1; i <= 5; i++) {
    let columnData = sheet.getRange(1, i, lastRow).getValues();
    if(i == companyNameCol) companyNames = columnData.map(row => row[0]); // Flatten to a 1D array
    if(i == repNamesCol) repNames = columnData.map(row => row[0]);
    if(i == repEmailsCol) repEmails = columnData.map(row => row[0]);
    if(i == hasDraftCol) hasDraftArr = columnData.map(row => row[0]);
    if(i == hasSlaveCol) rasSlaves = columnData.map(row => row[0]);
  } 

  // console.log(companyNames);
  // console.log(repNames);
  // console.log(repEmails);
  // console.log(hasDraftArr);

}
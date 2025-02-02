let hasDraftArr = [];
let companyNames = [];
let repEmails = [];
let repNames = [];
let rasSlaves = [];
let draftLinks = [];
let lastRow = 0;

// let sheet = SpreadsheetApp.getActiveSheet(); // only use this if ur triggering execution with picture button thing. tbh idt this affects performance too much and idc enough to test. gmail + drive api time sucks anyway

  // use when executing from Apps Script IDE (independent of sheet)
  inputSheetID = "1CJAcaVE2uv0BzNXkZqOLEMfw1pGazdARq3ej3YwOFqc"; 
  const spreadsheet = SpreadsheetApp.openById(inputSheetID); 
  const sheet = spreadsheet.getSheetByName("Sheet1");

function main() {
  
  readSheet(); // fill arrays with data
  
  for(let i = 0; i < lastRow; i++) {
    if((hasDraftArr[i] == false) && (rasSlaves[i] != "")) { // if assigned raslave and needs a draft, then generate draft
      createDraftWithAttachments(i);
    }
  }
}

function createDraftWithAttachments(index) {
    

  Logger.log("creating draft with company: " + companyNames[index] + " recipient: " + repNames[index] + " emails: " + repEmails[index]  + " worker: " + rasSlaves[index]);
  
  let companyBlurb = "" // for when disabled AI generation

  let subject = `UT IEEE RAS x ${companyNames[index]} Partnership`;
  let body = `Hello ${repNames[index]},\n\nI am ${rasSlaves[index]} from IEEE Robotics and Automation Society (RAS) at the University of Texas at Austin, and I am reaching out to discuss a partnership between RAS and ${companyNames[index]}.\n\nRAS is an undergraduate robotics student organization at The University of Texas at Austin, and our primary goal is to empower students who are eager to work on hands-on projects and dive into the creative field of robotics. Through events and robotics projects, students engage in experiences that hone industry relevant skills, such as mechanical design, embedded systems, and software development. In addition, these experiences expose students to a multi-discipline team environment where cooperation and communication are critical.\n\n${companyBlurb}As a corporate partner, you would be able to interact with our students through events like tech talks and fire-side chats. Additionally, partners receive name and logo recognition on our annual shirt. Your contributions will foster the next generation of engineers and problem solvers. If you’re interested, I’ve attached our corporate guide and project brochure below with all the information.\n\nThank you for your consideration!\n\nSincerely,\n${rasSlaves[index]}\nUT IEEE Robotics Automation Society`;

  const corporatePacketID = "1PpTgN_sBkZPoK2QfrdiO4NSIL-gvcZ-N";
  const file = DriveApp.getFileById(corporatePacketID);
  const attachment = file.getBlob();
  const draft = GmailApp.createDraft(repEmails[index], subject, body, {attachments: [attachment]});
    
  const label = getOrCreateLabel(rasSlaves[index]);
  var threads = draft.getMessage().getThread();
  label.addToThread(threads);

  draftId = draft.getMessage().getId();
  draftLink = `https://mail.google.com/mail/u/0/#drafts?compose=${draftId}`

  sheet.getRange(index + 1, 6).setValue(draftLink); // +1 to account for sheet's 1 indexing and script 0 indexing
  sheet.getRange(index + 1, 4).setValue("TRUE"); // mark generated
}

function getOrCreateLabel(labelName) {
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}





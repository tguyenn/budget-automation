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
  
  for(i = 0; i < lastRow; i++) {
    if((hasDraftArr[i] == false) && (rasSlaves[i] != "")) { // if assigned raslave and needs a draft, then generate draft
      createDraftWithAttachments(i);
    }
  }
}

function createDraftWithAttachments(index) {
    

  Logger.log("creating draft with company: " + companyNames[index] + " recipient: " + repNames[index] + " emails: " + repEmails[index]  + " worker: " + rasSlaves[index]);

  const subject = `IEEE RAS x ${companyNames[index]} Partnership`;
  let body = `Hello ${repNames[index]},\n\nI am ${rasSlaves[index]} from IEEE Robotics and Automation Society (RAS) at the University of Texas at Austin and I am reaching out to start discussing a partnership between RAS and ${companyNames[index]}. \n\nRAS is an undergraduate robotics student organization at The University of Texas at Austin and our primary goal is to empower students who are eager to work hands-on and dive into the creative field of robotics. Through events and robotics projects, students engage in experiences that introduce them to the basic building blocks of robotics hardware and software, such as mechanical design, embedded systems, and software development. In addition, these experiences expose students to a multi-discipline team environment where cooperation and communication are critical.\n\nASJAMKLFAFMKAFNKLANHLWHLWHITHITHAWIRLKRHWAHR\n\nAs a corporate partner, you would be able to interact with our students through events like tech talks and fire-side chats. Additionally, partners will receive name recognition on robots by the organization. Your contributions will foster the next generation of engineers and problem solvers. If you’re interested, I’ve attached our corporate guide and project brochure below with all the information.\n\nThank you for your consideration!\n\nSincerely,\n${rasSlaves[index]}`;
  const corporatePacketID = "1PpTgN_sBkZPoK2QfrdiO4NSIL-gvcZ-N"
  const file = DriveApp.getFileById(corporatePacketID) // corporate packet    
  const attachment = file.getBlob();
  const draft = GmailApp.createDraft(repEmails[index], subject, body, {attachments: [attachment]});
    
  draftId = getDraftID(index);
  Logger.log("Draft with attachment created with ID: " + draftId);

  draftLink = `https://mail.google.com/mail/u/0/#drafts?compose=${draftId}`

  sheet.getRange(index + 1, 6).setValue(draftLink); // +1 to account for sheet's 1 indexing and script 0 indexing
  sheet.getRange(index + 1, 4).setValue("TRUE"); // mark generated

}

// search for gmail with corresponding recipient and return the link
function getDraftID(index) {
  // Get all drafts

const drafts = GmailApp.getDrafts();
  for(let i = 0; i < drafts.length; i++) {
    const recipient = drafts[i].getMessage().getTo();
    console.log(`found recipient: ${recipient}`);
    if(recipient == repEmails[index]) {
      return drafts[i].getMessage().getId();
    } 
  }
}








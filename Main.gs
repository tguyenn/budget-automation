// GLOBAL VARIABLES
let thumbNailUrl = "https://i.imgur.com/jvF3FoH.jpg";  // default
let footerUrl = ""; // required for Discord embed's footer
let footerText = ""; // bottom text of embed
let discordTag = "";  // for autopinging
let newSheetUrl = "";
let inputSheetID = "";
let email = "N/A"; // for notification to form submitter
let phoneNumber = "N/A" // for notification to form submitter
let committeeName = "";
let vendorName = "";
let specialNotes = "";
let shippingType = "N/A";
let itemsOrdered = 0;
let shipping = 0;
let totalPrice = 0;
let isAmazon = false;
let hasSpreadsheet = false;
let eslLinkRes = "";
let nameArr = [];
let quantityArr = [];
let linksArr = [];
let priceArr = [];
let descriptionArr = [];

function mainOnSubmit(e) {
  
  try{
    parseForm(e);
  } catch(e) {
    Logger.log("Error in parseForm() with " + e);
    postKill("Error in parseForm() with " + e);
    return;
  }
  
  if(hasSpreadsheet) {
    try {
      readSheet();
    } catch(e) {
      Logger.log("Error processing readSheet() with " + e);
      postKill("Error processing readSheet() with " + e);
      return;
    }
  }

  try{
    eslLinkRes = getESLForm();
  } catch(e) {
    Logger.log("Error processing getESLForm() with " + e);
    postKill("Error processing getESLForm() with " + e);
    return;
  }

  if(!isAmazon) {
    try {
      getSheet(); 
    } catch(e) {
    Logger.log("Error processing getSheet() with " + e);
    postKill("Error processing getSheet() with " + e);
    return;
    }
  }

  try {
    editMasterSheet();
  } catch(e) {
    Logger.log("Error processing editMasterSheet() with " + e);
    postKill("Error processing editMasterSheet() with " + e);
    return;
  }

  try{
    postEmbed();
  } catch(e) {
    Logger.log("Error processing postEmbed() with " + e);
    postKill("Error processing postEmbed() with " + e);
    return;
  }

}

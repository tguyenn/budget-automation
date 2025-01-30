/**
 *  post embed to discord
 */


const DISCORD_POST_URL = properties['LIVE_DISCORD_WEBHOOK_URL']; // defined in script properties (Script Settings > Scroll to bottom)
// const DISCORD_POST_URL = properties['TEST_DISCORD_WEBHOOK_URL'];


const randomColor = Math.floor(Math.random() * 0xFFFFFF);
let items = []; // not actual purchased items, this is filled with fields that get published in discord embed <- tbh i think this is used elsewhere but im not paid enough to clean up
let embed1 = [];
let embed2 = [];

let options; // text customizations for embed

function postEmbed() { // yeah dont ask me to write clean code lmao
  if(itemsOrdered > 17) {
    preparePayload();

    Logger.log(totalPrice);

    response = UrlFetchApp.fetch(DISCORD_POST_URL, options); // message 1 of 2
    Utilities.sleep(1000); // ensure second message gets sent as second message
    options = { // overwrite options for next message post
        // "muteHttpExceptions": true,
        "method": "post",
        "headers": {
        "Content-Type": "application/json",
        },
      "payload": JSON.stringify({
      "content": "", // this is the unformatted (normal) text above the rich embed
      "embeds": [{
        // "title": `${itemsOrdered} unique links!`,
        "color": randomColor,
        "fields": embed2,
        "footer": {
          "text": footerText,
          ...(footerUrl ? { "icon_url": footerUrl } : {})
        },
        "timestamp": new Date().toISOString()
      }]
    })
    };    

    response = UrlFetchApp.fetch(DISCORD_POST_URL, options); // message 2 of 2
  }
  else {
    preparePayload();
    response = UrlFetchApp.fetch(DISCORD_POST_URL, options);
  }
}

function preparePayload() {
  let payloadContentString = "";
  payloadContentString = "\n[Prefilled ESL Form](" + eslLinkRes + ")\n";
  if(isAmazon) {
    payloadContentString = payloadContentString + "[Generated Amazon Cart](" + amazonLink + ")";
  }
  if(!isAmazon) {
    payloadContentString = payloadContentString + "[Generated Spreadsheet Link](" + newSheetUrl + ")"
  }
    if(itemsOrdered > 17) { // if more than 17 items, then need to send another discord message to get around max 25 fields per embed
    
    let splitIndex = 17;

    nameArr1 = nameArr.slice(0, splitIndex);
    let quantityArr1 = quantityArr.slice(0, splitIndex);
    let linksArr1 = linksArr.slice(0, splitIndex);
    let priceArr1 = priceArr.slice(0, splitIndex);

    let nameArr2 = nameArr.slice(splitIndex);
    let quantityArr2 = quantityArr.slice(splitIndex);
    let linksArr2 = linksArr.slice(splitIndex);
    let priceArr2 = priceArr.slice(splitIndex);
    embed1 = [
        { "name": "Committee", "value": committeeName, "inline": false },
        { "name": "Special Notes", "value": specialNotes, "inline": false },
        { "name": "Contact", "value": email, "inline": false },
        { "name": "Vendor", "value": vendorName, "inline": false },
        { "name": "Shipping", "value": `$${parseFloat(shipping).toFixed(2)}`, "inline": false},
        { "name": "Shipping Type", "value": shippingType, "inline": false },
        ...nameArr1.map((name, index) => ({
          "name": `__${quantityArr1[index]}x__ ${name}`,
          "value": `[Link](${linksArr1[index]}) - $${parseFloat(priceArr1[index]).toFixed(2)}`,
          "inline": false
        }))
    ];
    embed2 = [
        ...nameArr2.map((name, index) => ({
          "name": `__${quantityArr2[index]}x__ ${name}`,
          "value": `[Link](${linksArr2[index]}) - $${parseFloat(priceArr2[index]).toFixed(2)}`,
          "inline": false
        })),
        { "name": "Total Price", "value": `$${parseFloat(totalPrice.toFixed(2))}`, "inline": false }
    ];
    options = {
            // "muteHttpExceptions": true,
            "method": "post",
            "headers": {
            "Content-Type": "application/json",
            },
      "payload": JSON.stringify({
      "content": discordTag + " " + payloadContentString, // this is the unformatted (normal) text above the rich embed
      "embeds": [{
        "title": `${itemsOrdered} unique links!`,
        "color": randomColor,
        "fields": embed1,
        "footer": {
          // "text": footerText,
          // ...(footerUrl ? { "icon_url": footerUrl } : {})
        },
        "thumbnail": {
          "url": thumbNailUrl
        },
        // "timestamp": new Date().toISOString()
      }]
    })
    };
  }
  else {
    // fields that constitute main content body of discord embed
    items = [
        { "name": "Committee", "value": committeeName, "inline": false },
        { "name": "Special Notes", "value": specialNotes, "inline": false },
        { "name": "Contact", "value": email, "inline": false },
        { "name": "Vendor", "value": vendorName, "inline": false },
        { "name": "Shipping", "value": `$${parseFloat(shipping).toFixed(2)}`, "inline": false},
        { "name": "Shipping Type", "value": shippingType, "inline": false },
        ...nameArr.map((name, index) => ({
          "name": `__${quantityArr[index]}x__ ${name}`,
          "value": `[Link](${linksArr[index]}) - $${parseFloat(priceArr[index]).toFixed(2)}`,
          "inline": false
        })),
        { "name": "Total Price", "value": `$${parseFloat(totalPrice.toFixed(2))}`, "inline": false }
      ];

    options = {
            // "muteHttpExceptions": true,
            "method": "post",
            "headers": {
            "Content-Type": "application/json",
            },
      "payload": JSON.stringify({
      "content": discordTag + " " + payloadContentString, // this is the unformatted (normal) text above the rich embed
      "embeds": [{
        "title": `${itemsOrdered} unique links!`,
        "color": randomColor,
        "fields": items,
        "footer": {
          "text": footerText,
          ...(footerUrl ? { "icon_url": footerUrl } : {})
        },
        "thumbnail": {
          "url": thumbNailUrl
        },
        "timestamp": new Date().toISOString()
      }]
    })
    };
  }
}

// posts error message to discord
function postKill(process) { 
  // discordTag = "<@533956992272695297>"; // ping colin tan
  items = []; // clear contents
  const options = {
          "method": "post",
          "headers": {
          "Content-Type": "application/json",
          },
    "payload": JSON.stringify({
    "content": discordTag + "\n" + specialErrorMessage, // this is the unformatted text above the rich embed
    "embeds": [{
      "title": `something broke lmao (${process})`,
      "color": randomColor,
      "fields": items,
      "footer": {
        "text": footerText,
        ...(footerUrl ? { "icon_url": footerUrl } : {})
      },
      "timestamp": new Date().toISOString()
      }]
    })
  };

    UrlFetchApp.fetch(DISCORD_POST_URL, options);


    return;
}
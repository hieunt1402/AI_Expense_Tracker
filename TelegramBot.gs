// Constants
const TOKEN = ``; // Your bot token
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const CHAT_ID = ''; // Your chat id
const DEPLOYED_URL = ''; // Your GAS deploy URL

// Telegram API Methods
const METHODS = {
  SEND_MESSAGE: 'sendMessage',
  SET_WEBHOOK: 'setWebhook',
  GET_UPDATES: 'getUpdates',
  SEND_PHOTO: 'sendPhoto'
}

// Telegram APIs

/**
 * Makes a request to the Telegram API.
 * @param {string} method - The API method to call.
 * @param {Object} queryParams - The query parameters to include in the request.
 * @returns {Promise<void>}
 */
const makeRequest = async (method, queryParams = {}) => {
  const url = `${BASE_URL}/${method}`;
  const response = await UrlFetchApp.fetch(url, queryParams);
  console.log(response.getContentText());
}

/**
 * Sends a photo to the Telegram chat.
 * @param {Blob} imageBlob - The image to send.
 * @param {string} caption - The caption for the photo.
 */
const sendPhoto = (imageBlob, caption) => {
  makeRequest(METHODS.SEND_PHOTO, {
    method: 'post',
    payload: {
      chat_id: CHAT_ID,
      photo: imageBlob,
      caption: caption
    }
  });
}

/**
 * Sends a message to the Telegram chat.
 * @param {string} text - The text message to send.
 */
const sendMessage = (text) => {
  makeRequest(METHODS.SEND_MESSAGE, {
    method: 'post',
    payload: {
      chat_id: CHAT_ID,
      text: text
    }
  });
}

/**
 * Sets the webhook for the Telegram bot.
 */
const setWebhook = () => {
  makeRequest(METHODS.SET_WEBHOOK, {
    method: 'post',
    payload: {
      url: DEPLOYED_URL
    }
  });
}

/**
 * Retrieves the chat ID from the Telegram updates.
 * @returns {Promise<void>}
 */
const getChatId = async () => {
  const res = await makeRequest(METHODS.GET_UPDATES);
  console.log("ChatId: ", JSON.parse(res)?.result[0]?.message?.chat?.id);
}

// Send chart to Bot

/**
 * Sends all charts from the active sheet to the Telegram chat.
 */
function sendChartToTelegram() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var charts = sheet.getCharts();
  if (charts.length > 0) {
    charts.forEach(sendChart);
  } else {
    Logger.log("No charts found in the sheet");
  }
}

/**
 * Sends a specific chart to the Telegram chat.
 * @param {EmbeddedChart} chart - The chart to send.
 */
function sendChart(chart) {
  var imageBlob = chart.getAs('image/png');
  sendPhoto(imageBlob, chart.getOptions().get('title'));
}
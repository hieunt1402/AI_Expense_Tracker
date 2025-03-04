// Constants
const SUM_CELL = 'G2'; // Cell where the total amount is stored

// Utility Functions

/**
 * Converts an object to a query parameter string.
 * @param {Object} obj - The object to convert.
 * @returns {string} - The query parameter string.
 */
const toQueryParamsString = (obj) => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

// Google Sheet Functions

/**
 * Adds a new row to the active sheet with the provided content.
 * @param {Array} content - The content to add to the new row.
 */
const addNewRow = (content = []) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const Avals = sheet.getRange("A1:A").getValues();
  const Alast = Avals.filter(String).length; // Get the last non-empty row
  const columnNumber = content.length; // Number of columns to be filled
  const newRow = sheet.getRange(Alast + 1, 1, 1, columnNumber); // Get the range for the new row
  newRow.setValues([content]); // Set the values for the new row
}

// Expense Management

/**
 * Adds a new expense entry to the sheet.
 * @param {string} name - The name of the expense.
 * @param {number} amount - The amount of the expense.
 * @param {string} category - The category of the expense.
 * @param {string} text - The original text message.
 */
const addExpense = (name, amount, category, text) => {
  const time = new Date().toLocaleString(); // Get the current date and time
  addNewRow([time, name, amount, category, text]); // Add the new expense row
}

// Webhooks

/**
 * Handles POST requests.
 * @param {Object} request - The request object.
 * @returns {void}
 */
const doPost = (request) => {
  const contents = JSON.parse(request.postData.contents);
  const text = contents.message.text;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (text === "/sum") {
    // Calculate and send the total expenses
    const totalExpenses = sheet.getRange(SUM_CELL).getValue().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    sendMessage("Tổng chi tiêu là: " + totalExpenses);
  } else if (text === "/chart") {
    // Send the chart to Telegram (implementation of sendChartToTelegram is assumed to be defined elsewhere)
    sendChartToTelegram();
  } else {
    // Process the text message for adding an expense
    const askGemini = ChatGemini(text).split("|");
    if (askGemini[0].trim() === "{Null}") {
      sendMessage(askGemini[1]);
    } else {
      addExpense(askGemini[0], askGemini[1], askGemini[2], text);
      sendMessage(askGemini[3]);
    }
  }
}
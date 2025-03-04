# AI_Expense_Tracker

This project is a Google Apps Script that interacts with Telegram to manage expenses. It allows you to add new expenses, categorize them, and receive feedback in a humorous or strict manner. Additionally, it can send charts and summaries of your expenses to Telegram.

## Files

### 1. [`Code.gs`](./Code.gs)
This file contains the main logic for handling requests and interacting with the Google Sheet.


### 2. [`TelegramBot.gs`](./TelegramBot.gs)
This file contains functions to interact with the Telegram API, including sending messages and photos, setting webhooks, and fetching updates.


### 3. [`ChatGemini.gs`](./ChatGemini.gs)
This file contains the function to interact with the Gemini API to classify and comment on expenses.


## Setup

1. **Create a new Google Apps Script project**.
2. **Add the provided files (`Code.gs`, `telegramBot.gs`, `ChatGemini.gs`) to your project**.
3. **Replace the placeholders** in the constants (`TOKEN`, `CHAT_ID`, `DEPLOYED_URL`, `API_KEY`) with your actual values.
4. **Deploy the script** as a web app to receive webhook requests from Telegram.

## Usage

- **Add expenses**: Send a message to your Telegram bot with the expense details.
- **Get total expenses**: Send the command `/sum` to your Telegram bot.
- **Get expense charts**: Send the command `/chart` to your Telegram bot.

## License

This project is licensed under the MIT License.
// Constants
const API_KEY = ''; // Your API key

/**
 * This function interacts with the Gemini API to classify and comment on expenses.
 * @param {string} context - The user-provided context or expense details.
 * @returns {string} - The response from the Gemini API.
 */
function ChatGemini(context) {
  // 1. Prepare your API request

  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=' + API_KEY;

  // Construct the request body with the system instruction
  const requestBody = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Bạn là một trợ lí về quản lí chi tiêu. Dưới đây là chi tiêu của tôi. Hãy phân loại vào 1 trong các loại sau: Chi tiêu cần thiết, Chi phí giáo dục, Chi phí y tế, Giải trí, Tiết kiệm và đầu tư. Và hãy đưa ra bình luận hài hước có thể thêm icon, hoặc lời khuyên nghiêm khắc về việc chi tiêu của tôi nếu tôi có nhưng khoản chi quá tay, không cần thiết. Luôn trả lời tôi bằng tiếng Việt với cú pháp như sau ( luôn qui đổi Amount sang dạng số không có đơn vị với quy ước chuyển đổi tiền tệ: [củ,tr,m,M] = triệu; [lit,lít,loét] = trăm nghìn; [k,ngàn] = nghìn): {Name} | {Amount} | {Category} |{Comment}.Nếu không phải tin nhắn về chi tiêu, hãy trả về: {Null} | {Comment}"
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": context
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 1,
      "topK": 40,
      "topP": 0.95,
      "maxOutputTokens": 8192,
      "responseMimeType": "text/plain"
    }
  };

  // 2. Make the API call using UrlFetchApp
  const response = UrlFetchApp.fetch(apiUrl, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'payload': JSON.stringify(requestBody)
  });

  // 3. Parse the API response
  const responseJson = JSON.parse(response.getContentText());

  // 4. Extract the generated text from the response
  // Adjust the path based on the actual response structure
  const generatedText = responseJson.candidates[0].content.parts[0].text;

  return generatedText;
}
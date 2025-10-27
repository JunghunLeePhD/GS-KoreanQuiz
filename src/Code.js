/**
 * Serves the main HTML page.
 */
function doGet() {
  return HtmlService.createTemplateFromFile("Index").evaluate();
}

/**
 * A helper function to include other HTML files (like CSS and JS).
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Reads the JSON file from the project, parses it,
 * and returns a single random quiz object.
 * This is called by the client-side JavaScript.
 *
 * @returns {Object} A single random quiz item object.
 */
function getQuiz() {
  const getRandomInt = (max) => Math.floor(Math.random() * max);

  try {
    // 1. Get the raw text content from the HTML file holding our JSON
    const jsonString =
      HtmlService.createHtmlOutputFromFile("assets_korean_json").getContent();

    // This line parses that text into JSON
    const quizData = JSON.parse(jsonString);

    if (!quizData || quizData.length === 0) {
      throw new Error("Quiz data is empty or invalid.");
    }

    // 3. Return a single random item (object) from the array
    return quizData[getRandomInt(quizData.length)];
  } catch (e) {
    Logger.log("Error in getQuiz: " + e);
    // Return an error object that the client can check
    return { error: e.message };
  }
}

/**
 * Gets an explanation for a selected word from the Gemini API.
 * This is called by the client-side JavaScript.
 *
 * @param {String} selectedText
 * @return {String}
 */
function getExplaination(selectedText) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const GOOGLE_GEMINI_APIKEY =
    scriptProperties.getProperty("GOOGLE_GEMINI_APIKEY") || "";

  if (!GOOGLE_GEMINI_APIKEY) {
    Logger.log("GOOGLE_GEMINI_APIKEY is not set in Script Properties.");
    return `${selectedText}: API 키가 설정되지 않았습니다.`;
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent"; // Using a more recent model

  const prompt = `"${selectedText}"에 대해서 아주 짧게 설명해줘, '${selectedText}는 ...입니다'의 형태로 Plain text로 반환해줘.`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  const options = {
    headers: { "x-goog-api-key": GOOGLE_GEMINI_APIKEY },
    contentType: "application/json",
    method: "post",
    payload: JSON.stringify(data),
    muteHttpExceptions: true, // Prevents errors from stopping the script
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    const resCode = res.getResponseCode();
    const resText = res.getContentText();

    if (resCode !== 200) {
      Logger.log(`Gemini API Error - Code: ${resCode}, Response: ${resText}`);
      return `${selectedText}: Gemini API에서 오류가 발생했습니다. (Code: ${resCode})`;
    }

    const jsonResponse = JSON.parse(resText);

    // Safer way to access the response text
    const text = jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return text;
    } else {
      Logger.log("Gemini API Error: No text in response. " + resText);
      return `${selectedText}: Gemini가 응답을 생성하지 못했습니다.`;
    }
  } catch (error) {
    Logger.log(error);
    return `${selectedText}: Gemini에 문제가 발생하였습니다.`;
  }
}

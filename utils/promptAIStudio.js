require("dotenv").config();

const sendAISTudioPrompt = async (prompt) => {
  console.log(`AI Studio API Key`, process.env.AISTUDIO_API_KEY);

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": `${process.env.AISTUDIO_API_KEY}`,
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.log(await response.text());

      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data?.candidates[0].content.parts[0].text || null;
  } catch (error) {
    console.error("Error sending prompt to AI Studio:", error);

    throw error;
  }
};

module.exports = sendAISTudioPrompt;

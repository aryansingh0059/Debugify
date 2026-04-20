import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Reviews code using Groq AI
 * @param {string} code - The source code to review
 * @param {string} selectedLanguage - The language selected by the user
 * @returns {Promise<Object>} The parsed review JSON
 */
export const reviewCode = async (code, selectedLanguage) => {
  const prompt = `You are an expert code analysis AI. Analyze the provided code and return ONLY a valid JSON object with no extra text, no markdown, no backticks.

RULES:
1. Detect the actual programming language of the code.
2. Compare it with the user-selected language: "${selectedLanguage}". If different, set "languageMismatch" to true.
3. Return exact Big-O time and space complexity. Never say low/medium/high.
4. STRICT BUG REPORTING:
   - Only report ACTUAL errors: Compile errors, Runtime crashes, Wrong output, Memory leaks, Security vulnerabilities, or Undefined behavior.
   - DO NOT report: Code style, Naming conventions (camelCase etc.), Minor best practices, opinionated refactoring, or standard library patterns.
   - If NO real bugs exist, return "bugs": [].
5. Severity rules:
   - "critical": causes crash, wrong output, or undefined behavior.
   - "warning": potential issue under specific conditions.
   - "info": REAL logical concern only, NOT a style opinion.
6. "healthScore" should be a number from 0-10 based on code quality.

Return this EXACT JSON schema:
{
  "detectedLanguage": "string",
  "selectedLanguage": "string",
  "languageMismatch": boolean,
  "healthScore": number,
  "timeComplexity": "string",
  "timeComplexityExplanation": "string",
  "spaceComplexity": "string",
  "spaceComplexityExplanation": "string",
  "bugs": [
    {
      "severity": "critical" | "warning" | "info",
      "description": "string",
      "line": number,
      "fix": "string"
    }
  ]
}

Code to review:
\`\`\`${selectedLanguage}
${code}
\`\`\``;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from Groq");
    }

    return JSON.parse(content);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response as JSON. Please try again.");
    }
    throw new Error(`AI Service Error: ${error.message}`);
  }
};

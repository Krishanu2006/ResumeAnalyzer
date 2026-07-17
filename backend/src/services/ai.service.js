const { GoogleGenAI } = require('@google/genai')
const { application } = require('express')
const { default: mongoose } = require('mongoose')
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY
})

async function invokeGeminiAI() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Hello gemini.! Explain what is interview?"
    })

    console.log(response.text)
}

const questionSchema = z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(questionSchema).length(5),

    behavioralQuestions: z.array(questionSchema).length(3),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});
async function generateInterviewReport({ resume, self_description, job_description }) {
    const prompt = `
You are an expert Software Engineering interviewer.

Analyze the candidate.

Resume:
${resume}

Self Description:
${self_description}

Job Description:
${job_description}

Return ONLY valid JSON.

IMPORTANT:

Every element inside technicalQuestions MUST be a JSON object with EXACTLY these fields:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

Every element inside behavioralQuestions MUST be a JSON object with EXACTLY these fields:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

Every element inside skillGaps MUST be:

[
  {
    "skill": "string",
    "severity": "low"
  }
]

Every element inside preparationPlan MUST be:

[
  {
    "day": 1,
    "focus": "string",
    "tasks": [
      "string",
      "string"
    ]
  }
]

DO NOT:

- Return strings instead of objects.
- Return bullet points.
- Return Markdown.
- Return explanations.
- Return XML.
- Add extra fields.

The response MUST EXACTLY match:

{
  "matchScore": number,
  "technicalQuestions": [...],
  "behavioralQuestions": [...],
  "skillGaps": [...],
  "preparationPlan": [...]
}
`;
    const schema = zodToJsonSchema(interviewReportSchema);
    console.dir(schema, { depth: null });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    })

    console.log("Raw Gemini Response:");
    console.log(response.text);

    const json = JSON.parse(response.text);
    function parseArray(arr) {
        return arr.map(item => {
            if (typeof item === "string") {
                try {
                    return JSON.parse(item);
                } catch {
                    return item;
                }
            }
            return item;
        });
    }

    json.technicalQuestions = parseArray(json.technicalQuestions);
    json.behavioralQuestions = parseArray(json.behavioralQuestions);
    json.skillGaps = parseArray(json.skillGaps);
    json.preparationPlan = parseArray(json.preparationPlan);

    // console.log("Parsed JSON:");
    // console.dir(json, { depth: null });
    console.log("===== Parsed Gemini JSON =====");
    console.dir(json, { depth: null });

    const result = interviewReportSchema.safeParse(json);

    console.log("Validation success:", result.success);

    if (!result.success) {
        console.dir(result.error.format(), { depth: null });
    }

    // const result = interviewReportSchema.safeParse(json);

    // if (!result.success) {
    //     console.log("Validation Error:");
    //     console.dir(result.error.issues, { depth: null });
    //     return;
    // }

    return result.data;
}

module.exports = generateInterviewReport
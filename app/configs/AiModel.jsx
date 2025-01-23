import OpenAI from "openai";
 
const token = process.env.NEXT_PUBLIC_AI_API_KEY;

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
    dangerouslyAllowBrowser: true
});

const generationConfig = {
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1,
};

export const GenerateCourseLayout_AI2 = {
    sendMessage: async (prompt) => {
        try {
            const response = await client.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                ...generationConfig,
            });

            const content = response.choices[0]?.message?.content;
            return { response: { text: () => content } };
        } catch (error) {
            console.error("Error while generating course layout:", error);
            throw error;
        }
    },
};

export const GenerateChapterLayout_AI2= {
    sendMessage: async (prompt) => {
        try {
            const response = await client.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                ...generationConfig,
            });

            const content = response.choices[0]?.message?.content;
            return { response: { text: () => content } };
        } catch (error) {
            console.error("Error while generating course layout:", error);
            throw error;
        }
    },
};













/* const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
 
export const __GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a course tutorial on the following detail with fields course name, description, along with chapter name, about and duration. Category : 'programming', Topic :'python', level : 'Basic', Duration : '1 hour', NoOfChapters : 5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "course_name": "Python Basics for Beginners",\n    "description": "This course provides a foundational understanding of Python programming, suitable for individuals with no prior programming experience. You will learn the core concepts of Python, enabling you to write simple programs and build a solid base for future learning.",\n    "category": "programming",\n      "topic": "python",\n    "level": "Basic",\n     "duration": "1 hour",\n    "no_of_chapters": 5,\n    "chapters": [\n      {\n        "chapter_name": "Introduction to Python",\n        "about": "This chapter introduces the Python programming language, its history, key features, and why it\'s a popular choice. We will also cover setting up your development environment.",\n        "duration": "10 minutes"\n      },\n      {\n        "chapter_name": "Variables and Data Types",\n        "about": "Learn about variables, how to assign values to them, and the different data types in Python (integers, floats, strings, booleans). We will also explore basic type conversion.",\n        "duration": "15 minutes"\n      },\n       {\n        "chapter_name": "Operators and Expressions",\n        "about": "This chapter covers arithmetic, comparison, and logical operators. You\'ll learn how to combine them to form expressions and perform calculations.",\n        "duration": "15 minutes"\n      },\n      {\n        "chapter_name": "Control Flow: Conditional Statements",\n         "about": "Explore how to control the flow of execution using \'if\', \'elif\', and \'else\' statements. You\'ll learn to make decisions in your programs based on different conditions.",\n        "duration": "10 minutes"\n      },\n      {\n        "chapter_name": "Control Flow: Loops",\n        "about": "Understand how to repeat actions using \'for\' and \'while\' loops. Learn to iterate over sequences and use loops for efficient processing.",\n        "duration": "20 minutes"\n      }\n    ]\n  }\n}\n```\n',
        },
      ],
    },
  ],
}); */
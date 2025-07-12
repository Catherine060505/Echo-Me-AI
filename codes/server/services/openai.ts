import OpenAI from "openai";
import { MODE_TEMPLATES } from "@shared/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "",
});

export class OpenAIService {
  async generateContent(input: string, mode: keyof typeof MODE_TEMPLATES): Promise<{
    content: string;
    processingTime: number;
    confidence: number;
    creativity: string;
    mood: string;
  }> {
    const startTime = Date.now();
    const template = MODE_TEMPLATES[mode];
    
    if (!template) {
      throw new Error(`Invalid mode: ${mode}`);
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: template.systemPrompt + " Respond with JSON in this format: { 'content': string, 'confidence': number (80-100), 'creativity': string ('High'|'Medium'|'Very High'), 'mood': string }"
          },
          {
            role: "user",
            content: input
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8,
        max_tokens: 1000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      const processingTime = Date.now() - startTime;

      return {
        content: result.content || "Unable to generate content",
        processingTime,
        confidence: result.confidence || 85,
        creativity: result.creativity || "High",
        mood: result.mood || "Contemplative"
      };
    } catch (error) {
      console.error('OpenAI content generation error:', error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }

  async generateImage(prompt: string, mode: keyof typeof MODE_TEMPLATES): Promise<string> {
    const template = MODE_TEMPLATES[mode];
    const imagePrompt = `${prompt}, ${template.imagePrompt}, high quality, artistic, professional`;

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      return response.data[0].url || "";
    } catch (error) {
      console.error('DALL-E image generation error:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }
}

export const openaiService = new OpenAIService();

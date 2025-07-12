import { GoogleGenAI, Modality } from "@google/genai";
import { MODE_TEMPLATES } from "@shared/types";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class GeminiService {
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
      const systemPrompt = `${template.systemPrompt} 
Respond with JSON in this format: 
{'content': string, 'confidence': number (80-100), 'creativity': string ('High'|'Medium'|'Very High'), 'mood': string}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              confidence: { type: "number" },
              creativity: { type: "string" },
              mood: { type: "string" },
            },
            required: ["content", "confidence", "creativity", "mood"],
          },
        },
        contents: input,
      });

      const rawJson = response.text;
      const processingTime = Date.now() - startTime;

      if (rawJson) {
        const result = JSON.parse(rawJson);
        return {
          content: result.content || "Unable to generate content",
          processingTime,
          confidence: result.confidence || 85,
          creativity: result.creativity || "High",
          mood: result.mood || "Contemplative"
        };
      } else {
        throw new Error("Empty response from model");
      }
    } catch (error) {
      console.error('Gemini content generation error:', error);
      throw new Error(`Failed to generate content: ${error}`);
    }
  }

  async generateImage(prompt: string, mode: keyof typeof MODE_TEMPLATES): Promise<string> {
    const template = MODE_TEMPLATES[mode];
    const imagePrompt = `${prompt}, ${template.imagePrompt}, high quality, artistic, professional`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        return "";
      }

      const content = candidates[0].content;
      if (!content || !content.parts) {
        return "";
      }

      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          // Convert base64 to data URL for direct display
          const mimeType = part.inlineData.mimeType || "image/jpeg";
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }

      return "";
    } catch (error) {
      console.error('Gemini image generation error:', error);
      // Return a placeholder SVG if image generation fails
      return `data:image/svg+xml;base64,${Buffer.from(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#f0f0f0"/>
          <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">
            Image generation unavailable
          </text>
        </svg>
      `).toString('base64')}`;
    }
  }
}

export const geminiService = new GeminiService();
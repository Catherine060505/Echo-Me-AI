import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { geminiService } from "./services/gemini";
import { AIGenerationRequest, AIGenerationResponse, MODE_TEMPLATES } from "@shared/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // EchoMe AI generation endpoint
  app.post('/api/echome', async (req, res) => {
    try {
      const { input, mode }: AIGenerationRequest = req.body;

      if (!input || !input.trim()) {
        return res.status(400).json({
          type: "Validation Error",
          title: "Missing Input",
          message: "Please provide some text to transform",
          code: "MISSING_INPUT"
        });
      }

      if (!mode || !MODE_TEMPLATES[mode]) {
        return res.status(400).json({
          type: "Validation Error", 
          title: "Invalid Mode",
          message: "Please select a valid entertainment mode",
          code: "INVALID_MODE"
        });
      }

      // Generate content with Gemini
      const contentResult = await geminiService.generateContent(input, mode);
      
      // Generate image with Gemini
      const imageUrl = await geminiService.generateImage(input, mode);

      const response: AIGenerationResponse = {
        type: MODE_TEMPLATES[mode].responseFormat,
        title: `Your ${mode.charAt(0).toUpperCase() + mode.slice(1)}`,
        content: contentResult.content,
        imageUrl,
        processingTime: contentResult.processingTime,
        confidence: contentResult.confidence,
        creativity: contentResult.creativity,
        mood: contentResult.mood,
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      console.error('EchoMe API error:', error);
      res.status(500).json({
        type: "AI Error",
        title: "Generation Failed",
        message: "Our AI is having a moment. Please try again.",
        code: "AI_GENERATION_ERROR"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

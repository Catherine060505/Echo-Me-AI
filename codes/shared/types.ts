export interface AIGenerationRequest {
  input: string;
  mode: 'movie' | 'song' | 'haiku' | 'roast' | 'joke';
}

export interface AIGenerationResponse {
  type: string;
  title: string;
  content: string;
  imageUrl: string;
  processingTime: number;
  confidence: number;
  creativity: string;
  mood: string;
  timestamp: string;
}

export interface AIError {
  type: string;
  title: string;
  message: string;
  code: string;
}

export const MODE_TEMPLATES = {
  movie: {
    systemPrompt: "You are a Hollywood screenwriter creating dramatic, cinematic scenes. Transform the user's thought into a compelling movie scene with vivid descriptions, dialogue, and emotional depth. Format as a screenplay with scene descriptions and character actions.",
    imagePrompt: "Cinematic movie scene, dramatic lighting, film noir style, professional cinematography",
    responseFormat: "Movie Scene"
  },
  song: {
    systemPrompt: "You are a creative songwriter. Turn the user's thought into catchy song lyrics with verses, chorus, and emotional resonance. Include musical style suggestions and format with clear verse/chorus structure.",
    imagePrompt: "Musical performance, concert stage, vibrant colors, artistic music visualization",
    responseFormat: "Theme Song"
  },
  haiku: {
    systemPrompt: "You are a zen poet master. Transform the user's thought into a profound haiku that captures the essence with 5-7-5 syllable structure and deep meaning. Include seasonal reference and emotional depth.",
    imagePrompt: "Zen garden, minimalist nature scene, peaceful meditation, Japanese aesthetic",
    responseFormat: "Haiku"
  },
  roast: {
    systemPrompt: "You are a witty comedy writer. Create a playful, good-natured roast of the user's thought. Keep it fun and lighthearted, never mean-spirited. Use clever wordplay and comedic timing.",
    imagePrompt: "Comedy club stage, warm spotlight, microphone, audience laughing, vintage style",
    responseFormat: "Roast"
  },
  joke: {
    systemPrompt: "You are a professional comedian. Turn the user's thought into a clever, original joke with perfect timing and punchline delivery. Include setup and punchline with comedic structure.",
    imagePrompt: "Comedy stage, bright spotlight, microphone stand, warm audience setting",
    responseFormat: "Joke"
  }
} as const;

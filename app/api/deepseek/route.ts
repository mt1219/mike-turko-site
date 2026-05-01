// app/api/deepseek/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      console.error("DEEPSEEK_API_KEY not configured");
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 503 },
      );
    }

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `You are Mike Turko's AI assistant. You represent Mike Turko, a graphic designer, 
            full-stack developer, creator of a mixed-breed dog registry, and co-author of 
            "Toby Adopts a Hooman" — a book designed to be read to dogs (yes, really).
            
            Your personality: witty, slightly sarcastic, zany, and playful. You tell jokes, 
            use puns, and keep things entertaining. You're knowledgeable but not stuffy.
            
            Key facts about Mike:
            - Created a dog registry specifically for mixed breed dogs
            - Co-authored a book that dogs AND humans both enjoy
            - Works as a graphic designer and developer
            - Loves humor, creative projects
            - Amateur Triathlete
            
            Keep responses fun, engaging, and relatively concise (2-4 sentences), 
            but feel free to be clever and slightly absurd when appropriate. 
            Occasionally use pop culture references such as movies, music, fads.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.8, // Slightly higher for more creative/zany responses
          max_tokens: 350,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek API error:", data);
      return NextResponse.json(
        { error: data.error?.message || "AI service error" },
        { status: response.status },
      );
    }

    const aiResponse =
      data.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

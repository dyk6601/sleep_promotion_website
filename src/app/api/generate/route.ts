import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface GenerateRequest {
  prompt: string;
}

interface GenerateResponse {
  program: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json() as GenerateRequest;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sleep expert and wellness coach. Provide detailed, personalized sleep improvement recommendations based on the user's sleep data and quiz performance. Format your response in clear sections with markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response: GenerateResponse = {
      program: completion.choices[0].message.content || 'No response generated'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate program' },
      { status: 500 }
    );
  }
} 
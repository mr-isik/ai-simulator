import { NextResponse } from 'next/server';

const EXAMPLE_RESPONSES = [
  'Sure, I can help with that.',
  'Let me look that up for you.',
  "I'm not sure, but I can find out.",
  "That's an interesting question.",
  "I'll need a moment to think about that.",
  'Can you provide more details?',
  "Let's explore that topic together.",
  "I'll do my best to answer that.",
  "That's a tough one, but I'll try.",
  'Let me see what I can find.',
];

const getRandomDelay = () => Math.floor(Math.random() * 2000) + 200;

const generateResponse = (prompt) => {
  const randomResponse =
    EXAMPLE_RESPONSES[Math.floor(Math.random() * EXAMPLE_RESPONSES.length)];
  return `${randomResponse}\n\nQuestion: "${prompt}"\n\n`;
};

export async function POST(request) {
  try {
    const prompt = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

    if (Math.random() < 0.1) {
      return NextResponse.json({
        error: 'AI API failed to respond',
        status: 500,
      });
    }

    const response = generateResponse(prompt);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({
      status: 500,
      error: 'An unknown error occurred',
    });
  }
}

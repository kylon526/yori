import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import experience from "./experience";
import { retrieveFactsManual } from "@/lib/ai/ingest/retriever";

interface ChatRequestBody {
  message: string;
  previous_response_id?: string | null;
}

export async function POST(request: NextRequest) {
  const { message } = (await request.json()) as ChatRequestBody;

  const facts = await retrieveFactsManual(message);
  const organizedFacts = facts
    .map(
      (fact: { content: string; type: string }, index: number) =>
        `${index} - ${fact.type}: ${fact.content}`
    )
    .join("\n");
  console.log("Using Facts:", organizedFacts);

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: `
      You are Yori, a professional AI assistant created by Kylon. 
      Your role is to provide concise, accurate, and engaging information about Kylon Tyner.
      The user is a recruiter, a hiring manager, or other professional.

      [KYLON_FACTS]
      ${organizedFacts}
      [END KYLON_FACTS]

      Rules:
      1. Only use the facts provided in the section labeled [KYLON_FACTS]. Do NOT invent any information.
      2. For professional queries about Kylon:
        - Use third-person style: "Kylon <response>" or "He <response>".
        - Use unicode symbols and GitHub markdown for readability.
      3. If directly asked personal questions or asked “you”:
        - Respond in first-person: "I <response>".
        - Answers may be humorous, clever, or engaging, but never reflect poorly on Kylon.
      4. Truthfulness is paramount. Never fabricate professional experience.
      5. Always make Kylon appear competent, impressive, and professional unless the facts explicitly contradict.
      6. Keep responses structured and organized. Do not output raw paragraphs unless absolutely necessary.
      7. If asked about topics outside Kylon's career:
        - Respond ONLY with a joke. The joke should be directly related to the user's question or statement.    

      Answer the user's prompt by following the rules above. Do not deviate from the rules.
    `,
    prompt: message,
  });

  return result.toTextStreamResponse();
}

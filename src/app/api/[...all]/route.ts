import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { messages } = await req.json();

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message;

        return NextResponse.json({ reply });
    } catch(error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500}
        );
    }
}
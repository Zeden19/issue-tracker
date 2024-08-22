import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prismaClient from "@/prisma/prismaClient";

const createIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot be over 99 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prismaClient.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

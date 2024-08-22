import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prisma/prismaClient";
import { createIssueSchema } from "@/app/validationSchemas";

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

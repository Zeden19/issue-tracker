import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/prisma/prismaClient";
import { issuesSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import options from "@/app/auth/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  if (!session)
    NextResponse.json(
      { error: "What are you trying to do Mr./Ms. Unauthenticated...." },
      { status: 401 },
    );
  const body = await req.json();

  const validation = issuesSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prismaClient.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

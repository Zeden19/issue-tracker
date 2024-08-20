import {NextRequest, NextResponse} from "next/server";
import z from "zod";
import prismaClient from "@/prisma/prismaClient";

const createIssueSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3)
  
})

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const validation = createIssueSchema.safeParse(body);
  
  if (!validation.success) return NextResponse.json(validation.error.errors, {status: 400})
  
  const newIssue = await prismaClient.issue.create({
    data: {title: body.title, description: body.description},
  })
  
  return NextResponse.json(newIssue, {status: 201})
  
}
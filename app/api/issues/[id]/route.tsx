import {NextRequest, NextResponse} from "next/server";
import {issuesSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";
import prismaClient from "@/prisma/prismaClient";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const body = await req.json();
  
  const validation = issuesSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  
  const issue = await prismaClient.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  
  if (!issue) return NextResponse.json({error: "Issue not found"}, {status: 404});
  
  const update = await prisma.issue.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status
    }
  })
  
  return NextResponse.json(update, { status: 201 });
  
}

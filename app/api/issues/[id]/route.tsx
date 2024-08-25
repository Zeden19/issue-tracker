import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";
import prismaClient from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import options from "@/app/auth/authOptions";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const session = await getServerSession(options);

  if (!session)
    NextResponse.json(
      { error: "What are you trying to do Mr./Ms. Unauthenticated...." },
      { status: 401 },
    );
  const body = await req.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description, status } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const issue = await prismaClient.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const update = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(update, { status: 201 });
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const session = await getServerSession(options);

  if (!session)
    return NextResponse.json(
      { error: "What are you trying to do Mr./Ms. Unauthenticated...." },
      { status: 401 },
    );
  const issue = await prismaClient.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const deletedIssue = await prismaClient.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(
    {
      title: deletedIssue.title,
      description: deletedIssue.description,
      status: deletedIssue.status,
    },
    { status: 200 },
  );
}

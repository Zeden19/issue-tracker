import IssueForm from "@/app/issues/_components/IssueForm";
import prisma from "@/prisma/prismaClient";
import {notFound} from "next/navigation";
import {Metadata} from "next";

interface Props {
  params: {id: string};
}

async function EditIssuePage({ params } : Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    }
  })
  
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
}

export default EditIssuePage;


export const metadata: Metadata = {
  title: "Issue Tracker | Edit Issue",
  description: "Edit issues that have been made."
};
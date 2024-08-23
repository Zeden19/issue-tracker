import IssueForm from "@/app/issues/_components/IssueForm";
import prisma from "@/prisma/prismaClient";
import {notFound} from "next/navigation";

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

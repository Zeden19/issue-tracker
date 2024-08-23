import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();
  return (
    <div>
      <Heading
        as={"h1"}
        size={"8"}
        className={"underline underline-offset-8 pb-2"}
      >
        {issue.title} &nbsp; &nbsp;
      </Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue!.createdAt.toDateString()}</Text>
      </Flex>
      <Card className={"prose dark:prose-invert"} mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

export default IssueDetailPage;

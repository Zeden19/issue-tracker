import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

async function IssueDetails({ issue }: Props) {
  return (
    <>
      <Heading
        as={"h1"}
        size={"8"}
        className={"underline underline-offset-8 pb-2"}
      >
        {issue.title} &nbsp; &nbsp;
      </Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className={"prose dark:prose-invert"} mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}

export default IssueDetails;

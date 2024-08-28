import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteButton from "@/app/issues/[id]/DeleteButton";
import { getServerSession } from "next-auth";
import options from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);

async function IssueDetailPage({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();
  const session = await getServerSession(options);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box className={"lg:col-span-1"}>
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Flex
          style={{ justifyContent: "end" }}
          gap={"4"}
          className={"md:mr-auto"}
          direction={"column"}
        >
          <AssigneeSelect issue={issue} />
          <EditIssueButton id={parseInt(params.id)} />
          <DeleteButton issueId={parseInt(params.id)} />
        </Flex>
      )}
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: "Issue Tracker | " + issue?.title,
    description:
      "Details of issue  " +
      issue?.title +
      ". Issue is currently " +
      issue?.status +
      ".",
  };
}

export default IssueDetailPage;

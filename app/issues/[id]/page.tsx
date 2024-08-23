import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton id={parseInt(params.id)}></EditIssueButton>
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;

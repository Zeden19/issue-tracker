import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteButton from "@/app/issues/[id]/DeleteButton";

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
      <Box className={"lg:col-span-1"}>
        <IssueDetails issue={issue} />
      </Box>

      <Flex style={{justifyContent: "end"}} gap={"4"} className={"md:mr-auto"} direction={"column"}>
        <EditIssueButton id={parseInt(params.id)} />
        <DeleteButton issueId={parseInt(params.id)} />
      </Flex>
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export default IssueDetailPage;

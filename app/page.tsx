import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/prismaClient";
import IssueChart from "@/app/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "@/app/LatestIssues";

export default async function Home() {
  const notStarted = await prisma.issue.count({
    where: { status: "NOT_STARTED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Flex gap={"5"} direction={"column"}>
        <IssueSummary
          notStarted={notStarted}
          closed={closed}
          inProgress={inProgress}
        />
        <IssueChart
          notStarted={notStarted}
          inProgress={inProgress}
          closed={closed}
        />
      </Flex>
      <LatestIssues/>
    </Grid>
  );
}

export const dynamic = "force-dynamic";

import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/prismaClient";

export default async function Home() {
  const notStarted = await prisma.issue.count({
    where: { status: "NOT_STARTED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <div>
      <IssueSummary
        notStarted={notStarted}
        closed={closed}
        inProgress={inProgress}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

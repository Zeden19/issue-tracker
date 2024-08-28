import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/prismaClient";
import IssueChart from "@/app/IssueChart";

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
      <IssueChart notStarted={notStarted} inProgress={inProgress} closed={closed}/>
    </div>
  );
}

export const dynamic = "force-dynamic";

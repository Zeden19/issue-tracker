import IssueActions from "@/app/issues/IssueActions";
import { IssueStates } from "@prisma/client";
import prisma from "@/prisma/prismaClient";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, issueQuery } from "@/app/issues/IssueTable";
import {Flex} from "@radix-ui/themes";
import {Metadata} from "next";

interface Props {
  searchParams: issueQuery;
}

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(IssueStates);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const order =
    searchParams.order === "asc" || searchParams.order === "desc"
      ? searchParams.order
      : "asc";

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction={"column"} gap={"4"}>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker | List",
  description: "List of all project issues"
};

export default IssuesPage;

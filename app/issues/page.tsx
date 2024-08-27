import IssueActions from "@/app/issues/IssueActions";
import { Issue, IssueStates } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import NextLink from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import prisma from "@/prisma/prismaClient";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: IssueStates;
    orderBy: keyof Issue;
    order: "asc" | "desc";
    page: string;
  };
}

async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", classname: "hidden md:table-cell" },
  ];

  const statuses = Object.values(IssueStates);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const order =
    searchParams.order === "asc" || searchParams.order === "desc"
      ? searchParams.order
      : "asc";

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div>
      <IssueActions />
      <Table.Root className={"mb-2"} variant={"surface"}>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                className={column.classname}
                key={column.value}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      order: searchParams.order === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  (searchParams.order === "desc" ? (
                    <ArrowDownIcon className={"inline"} />
                  ) : (
                    <ArrowUpIcon className={"inline"} />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className={"block md:hidden font-bold"}>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className={"hidden md:table-cell"}>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className={"hidden md:table-cell"}>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;

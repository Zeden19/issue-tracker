import IssueActions from "@/app/issues/IssueActions";
import { Issue, IssueStates } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import NextLink from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import prisma from "@/prisma/prismaClient";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: IssueStates;
    orderBy: keyof Issue;
    order: "asc" | "desc";
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

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant={"surface"}>
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
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;

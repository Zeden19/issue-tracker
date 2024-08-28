import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "../components/Link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Issue, IssueStates } from "@prisma/client";

export interface issueQuery {
  status: IssueStates;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
}

interface Props {
  issues: Issue[];
  searchParams: issueQuery;
}

function IssueTable({ searchParams, issues }: Props) {
  return (
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
  );
}

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", classname: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", classname: "hidden md:table-cell" },
];

export const columnNames: string[] = columns.map((column) => column.value);
export default IssueTable;

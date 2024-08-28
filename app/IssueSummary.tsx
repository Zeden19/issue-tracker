import { Card, Flex, Text } from "@radix-ui/themes";
import { IssueStates } from "@prisma/client";
import NextLink from "next/link";
import { IssueStatusBadge } from "@/app/components";

interface Props {
  notStarted: number;
  inProgress: number;
  closed: number;
}

function IssueSummary({ notStarted, inProgress, closed }: Props) {
  const containers: { label: string; value: number; status: IssueStates }[] = [
    { label: "Not Started", value: notStarted, status: "NOT_STARTED" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex gap={"1"} direction={"column"}>
            <NextLink
              className={"text-sm font-medium"}
              href={`/issues?status=${container.status}`}
            >
              <IssueStatusBadge status={container.status} />
            </NextLink>
            <Text size={"6"} className={"font-bold"}>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;

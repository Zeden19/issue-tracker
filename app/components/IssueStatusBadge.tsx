import { IssueStates } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  IssueStates,
  { label: string; color: "red" | "violet" | "green" }
> = {
  NOT_STARTED: { label: "Not Started", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

function IssueStatusBadge({ status }: { status: IssueStates }) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}

export default IssueStatusBadge;

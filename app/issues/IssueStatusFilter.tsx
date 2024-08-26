'use client'
import { Select } from "@radix-ui/themes";
import { IssueStates } from "@prisma/client";
import {useRouter} from "next/navigation";

const statuses: { label: string; value?: IssueStates }[] = [
  { label: "All" },
  { label: "Not Started", value: "NOT_STARTED" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function IssueStatusFilter() {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "all" ? `?status=${status}` : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder={"Filter By Status..."} />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;

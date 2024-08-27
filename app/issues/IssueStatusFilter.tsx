'use client'
import { Select } from "@radix-ui/themes";
import { IssueStates } from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";
import * as sea from "node:sea";

const statuses: { label: string; value?: IssueStates }[] = [
  { label: "All" },
  { label: "Not Started", value: "NOT_STARTED" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function IssueStatusFilter() {
   const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'all'}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        if (status !== 'all') params.append('status', status);
        if (searchParams.get("orderBy")) params.append('orderBy', searchParams.get("orderBy")!);
        const query = params.size ? '?' + params.toString() : '';
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

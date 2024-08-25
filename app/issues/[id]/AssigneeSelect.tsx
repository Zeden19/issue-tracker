"use client";
import { Select, Skeleton, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

function AssigneeSelect() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 seconds,
    retry: 3,
  });

  if (error) return null;

  if (isLoading)
    return (
      <Text>
        <Skeleton className={"py-1 px-7"}>Loading...</Skeleton>
      </Text>
    );

  return (
    <Select.Root>
      <Select.Trigger placeholder={"Assign..."} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;

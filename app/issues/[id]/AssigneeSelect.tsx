"use client";
import { Select, Skeleton, Text } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";

function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 60 * 1000, // 1hour seconds,
    retry: 3,
  });
  return { users, isLoading, error };
}

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { users, isLoading, error } = useUsers();

  if (error) return null;

  if (isLoading)
    return (
      <Text>
        <Skeleton className={"py-1 px-7"}>Loading...</Skeleton>
      </Text>
    );

  function setIssueAssigned() {
    return async (userId: string) => {
      await axios
        .patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "unassign" ? null : userId,
        })
        .then(() => {
          toast.success("Issue successfully assigned");
        })
        .catch(() => {
          toast.error("Changes could not be saved.");
        });
    };
  }

  return (
    <>
      <Select.Root
        onValueChange={setIssueAssigned()}
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId : "unassign"
        }
      >
        <Select.Trigger placeholder={"Assign..."} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={"unassign"}>Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

export const dynamic = "force-dynamic";

export default AssigneeSelect;

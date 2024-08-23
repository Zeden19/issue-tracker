"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeleteButton({ issueId }: { issueId: number }) {
  const [error, setError] = useState(false);
  const router = useRouter();

  async function deleteIssue() {
    try {
      setError(false);
      await axios.delete(`/api/issues/` + issueId);
      router.push("/issues");
      router.refresh();
    } catch (e) {
      setError(true);
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color={"red"}>Delete</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth={"250px"}>
          <Dialog.Title>Are you Sure?</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            This cannot be reverted
          </Dialog.Description>

          <Flex gap={"3"} justify={"end"}>
            <Dialog.Close>
              <Button color={"gray"}>Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={deleteIssue} color={"red"}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root open={error}>
        <Dialog.Content>
          <Dialog.Title>Error!</Dialog.Title>
          <Dialog.Description className={"pb-2"}>
            Issue could not be deleted!
          </Dialog.Description>
          <Dialog.Close>
            <Button
              onClick={() => setError(false)}
              color={"gray"}
              variant={"soft"}
            >
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default DeleteButton;

'use client';
import { Button, Dialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";

function DeleteButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  return (
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
            <Button
              onClick={async () => {
                await axios.delete(`/api/issues/` + issueId);
                router.push("/issues");
                router.refresh();
              }}
              color={"red"}
            >
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default DeleteButton;

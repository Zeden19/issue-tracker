import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Form } from "@radix-ui/react-form";

function DeleteButton({ issueId }: { issueId: number }) {
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
            <Button color={"red"}>Delete</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default DeleteButton;

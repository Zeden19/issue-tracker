import {Button} from "@radix-ui/themes";

function DeleteButton({issueId} : {issueId: number}) {
  return (
    <Button color={"red"}>
        Delete
    </Button>
  )
}

export default DeleteButton;
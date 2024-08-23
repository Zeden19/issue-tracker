import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Button} from "@radix-ui/themes";


function EditIssueButton({id} : {id: number}) {
  return (
        <Button style={{paddingLeft: "20px", paddingRight: "20px"}}>
          <Pencil2Icon />
          <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
        </Button>
  )
}

export default EditIssueButton;
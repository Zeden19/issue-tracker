import {Button} from "@radix-ui/themes";
import Link from "next/link";

function IssuesPage() {
  return (
    <Button>
      <Link href={"/issues/new"}>Create new Issue</Link>
    </Button>
  )
}

export default IssuesPage;

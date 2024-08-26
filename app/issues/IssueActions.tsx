import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

function IssueActions() {
  return (
    <Flex mb={"5"} justify={"between"}>
      <Button>
        <Link href={"/issues/new"}>Create new Issue</Link>
      </Button>
      <IssueStatusFilter/>
    </Flex>
  );
}

export default IssueActions;

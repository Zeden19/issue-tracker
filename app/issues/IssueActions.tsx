import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

function IssueActions() {
  return (
    <Flex justify={"between"}>
      <IssueStatusFilter />
      <Button>
        <Link href={"/issues/new"}>Create new Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueActions;

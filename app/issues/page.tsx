import IssueActions from "@/app/issues/IssueActions";
import IssueTable from "@/app/issues/IssueTable";

async function IssuesPage() {
  return (
    <div>
      <IssueActions />
      <IssueTable />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;

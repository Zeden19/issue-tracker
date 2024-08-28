import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
import {Metadata} from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton/>
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;

export const metadata: Metadata = {
  title: "Issue Tracker | Create Issue",
  description: "Create a new issue."
};

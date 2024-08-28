import LatestIssues from "@/app/LatestIssues";

export default function Home() {
  return (
    <div>
      <LatestIssues />
    </div>
  );
}

export const dynamic = "force-dynamic";

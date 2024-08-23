import { Badge, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

function LoadingIssuesDetailPage() {
  return (
    <div>
      <Skeleton className={"pb-2"}>
        A very big issue
      </Skeleton>
      <Flex gap={"3"} my={"2"}>
        <Skeleton>
          <Badge />
        </Skeleton>
        <Skeleton>Tue Aug 20 2024</Skeleton>
      </Flex>
      <Card className={"prose dark:prose-invert"} mt={"4"}>
        <Skeleton>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          deserunt ea explicabo inventore laboriosam nesciunt nobis obcaecati
          officia officiis praesentium quaerat, quia quidem quis repellat
          reprehenderit suscipit voluptatem? Reiciendis, totam.
        </Skeleton>
      </Card>
    </div>
  );
}

export default LoadingIssuesDetailPage;

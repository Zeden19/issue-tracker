import { Badge, Skeleton, Table } from "@radix-ui/themes";
import IssueActions from "@/app/issues/IssueActions";

function LoadingIssuesPage() {
  const skeletons = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueActions />
      <Table.Root variant={"surface"}>
        <Table.Header>
          <Table.Row>
            <Skeleton>Title</Skeleton>
            <Skeleton>Status</Skeleton>
            <Skeleton>Created</Skeleton>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {skeletons.map((skeleton) => (
            <Table.Row key={skeleton}>
              <Table.RowHeaderCell>
                <Skeleton>An issue title</Skeleton>
                <div className={"block md:hidden font-bold"}><Skeleton
                  loading={true}
                >
                  <Badge/>
                </Skeleton></div>
              </Table.RowHeaderCell>

              <Table.Cell className={"hidden md:table-cell"}>
                <Skeleton loading={true}>
                  <Badge />
                </Skeleton>
              </Table.Cell>

              <Table.Cell className={"hidden md:table-cell"}>
                <Skeleton>Tue Aug 20 2024</Skeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default LoadingIssuesPage;

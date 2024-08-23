import { Box, Button, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

function IssueFormSkeleton() {
  return (
    <div className={"max-w-xl"}>
      <Flex direction={"column"} className={"space-y-3"}>
        <Text className={"mb-3"}>
          <Skeleton>Create new Issue</Skeleton>
        </Text>
        <Skeleton className={"mb-2"}>
          <h2 className={"mb-2"}>Issue Title</h2>
        </Skeleton>
        <Heading className={"mb-3"}>
          <Skeleton>Select Issue</Skeleton>
        </Heading>
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum
          </Text>
        </Skeleton>
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
            debitis deleniti dolore, dolorum ducimus enim iusto laudantium
            maiores nesciunt non numquam pariatur quae repellat tenetur vel
            voluptates voluptatibus. Officiis, vero.
          </Text>
        </Skeleton>
        <Box>
          <Skeleton loading={true}>
            <Button>Submit New Issue</Button>
          </Skeleton>
        </Box>
      </Flex>
    </div>
  );
}

export default IssueFormSkeleton;

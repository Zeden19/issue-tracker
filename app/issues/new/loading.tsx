import { Box, Button, Skeleton, Text, TextField } from "@radix-ui/themes";

function LoadingNewIssuePage() {
  return (
    <div className={"max-w-xl"}>
      <form className={"space-y-3"}>
        <Skeleton>Create new Issue</Skeleton>
        <Skeleton className={""} loading={true}>
          <TextField.Root>Issue Title</TextField.Root>
        </Skeleton>
        <Skeleton loading={true}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum
            dicta ea eius eligendi esse expedita explicabo facilis fugiat
            laborum, nesciunt perferendis possimus, quidem similique velit,
            voluptas voluptate! Pariatur, qui.
          </Text>
        </Skeleton>
        <Box>
          <Skeleton loading={true}>
            <Button>Submit New Issue</Button>
          </Skeleton>
        </Box>
      </form>
    </div>
  );
}

export default LoadingNewIssuePage;

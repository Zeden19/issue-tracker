import {useSession} from "next-auth/react";
import Link from "next/link";
import {Avatar, Box, DropdownMenu, Text} from "@radix-ui/themes";

export function AuthStatus() {
  const {status, data: session} = useSession();
  
  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link className={"nav-link"} href={"/api/auth/signin"}>
        Log in
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className={"cursor-pointer"}
            size={"3"}
            radius={"full"}
            fallback={"?"}
            src={session!.user!.image!}
            referrerPolicy={"no-referrer"}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size={"4"}>
            <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          </Text>
          <Link href={"/api/auth/signout"}>
            <DropdownMenu.Item>Log out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
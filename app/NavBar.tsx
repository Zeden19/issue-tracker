"use client";
import Link from "next/link";
import { FaBugs } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";

function NavBar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const navigation = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className={"border-b mb-5 px-5 py-2"}>
      <Flex justify={"between"} align={"center"} className={"justify-between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href={"/"}>
            <FaBugs size={50} />
          </Link>
          <ul className={"flex space-x-6"}>
            {navigation.map((item) => (
              <li
                className={classNames(
                  { "text-zinc-100": item.href === pathname },
                  { "text-zinc-400": item.href !== pathname },
                  { "hover:text-zinc-200 transition-colors": true },
                )}
                key={item.label}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  className={"cursor-pointer"}
                  size={"3"}
                  radius={"full"}
                  fallback={"?"}
                  src={session.user!.image!}
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <Text size={"4"}>
                  <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
                </Text>
                <DropdownMenu.Item>
                  <Link href={"/api/auth/signout"}>Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Link href={"/api/auth/signin"}>Log in</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
}

export default NavBar;

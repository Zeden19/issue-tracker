"use client";
import Link from "next/link";
import { FaBugs } from "react-icons/fa6";
import { Flex } from "@radix-ui/themes";
import { NavLinks } from "@/app/NavLinks";
import { AuthStatus } from "@/app/AuthStatus";

function NavBar() {
  return (
    <nav className={"border-b mb-5 px-5 py-2"}>
      <Flex justify={"between"} align={"center"} className={"justify-between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href={"/"}>
            <FaBugs size={50} />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
}

export default NavBar;

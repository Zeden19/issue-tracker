"use client";
import Link from "next/link";
import { FaBugs } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

function NavBar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const navigation = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className={"flex space-x-6 border-b mb-5 px-5 h-14 items-center"}>
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
      <Box>
        {status === "authenticated" ? (
          <Link href={"/api/auth/signout"}>Log out</Link>
        ) : (
          <Link href={"/api/auth/signin"}>Log in</Link>
        )}
      </Box>
    </nav>
  );
}

export default NavBar;

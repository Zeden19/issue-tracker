"use client";
import Link from "next/link";
import { FaBugs } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import classNames from "classnames";

function NavBar() {
  const pathname = usePathname();
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
            key={item.label}
            className={classNames(
              { "text-zinc-900": item.href === pathname },
              { "text-zinc-500": item.href !== pathname },
              { "hover:text-zinc-800 transition-colors": true },
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;

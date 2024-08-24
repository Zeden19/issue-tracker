import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();
  const navigation = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className={"flex space-x-6"}>
      {navigation.map((item) => (
        <li
          className={classNames(
            { "nav-link": true },
            { "!text-zinc-100": item.href === pathname },
          )}
          key={item.label}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

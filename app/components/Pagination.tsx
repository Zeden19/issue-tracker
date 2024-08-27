'use client'
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex direction={"column"} align={"center"} gap={"1"}>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex gap={"1"}>
        <Button
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
          color={"gray"}
          variant={"soft"}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          color={"gray"}
          variant={"soft"}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === pageCount}
          color={"gray"}
          variant={"soft"}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          onClick={() => changePage(pageCount)}
          disabled={currentPage === pageCount}
          color={"gray"}
          variant={"soft"}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Pagination;

import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
      <Flex
          justify="center"
          align="center"
          height="50vh"
      >
        <Button>
          <Link href="api/auth/signin">Login</Link>
        </Button>
      </Flex>
  )
}

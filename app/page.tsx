import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {redirect} from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/espressos'); // Or your custom login route
    }
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

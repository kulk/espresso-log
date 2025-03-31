'use client'

import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";
import classnames from 'classnames';
import {Container, Flex} from "@radix-ui/themes";
import {CiCoffeeBean} from "react-icons/ci";

const NavBar = () => {

    return (
        <nav className="border-b border-gray-200  mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><CiCoffeeBean/></Link>
                        <NavLinks/>
                    </Flex>
                    {/*<AuthStatus/>*/}
                </Flex>
            </Container>
        </nav>
    )
}
// const AuthStatus = () => {
//     const {status, data: session} = useSession();
//
//     if (status === "loading") return <Skeleton width="3rem"/>;
//     if (status === "unauthenticated")
//         return <Link className="nav-link" href="/api/auth/signin">Login</Link>
//
//     return(
//         <Box>
//             <DropdownMenu.Root>
//                 <DropdownMenu.Trigger>
//                     <Avatar
//                         src={session!.user!.image!}
//                         fallback="?"
//                         size="2"
//                         radius="full"
//                         className="cursor-pointer"
//                     />
//                 </DropdownMenu.Trigger>
//                 <DropdownMenu.Content>
//                     <DropdownMenu.Label>
//                         <Text size="2">
//                             {session!.user!.email}
//                         </Text>
//                     </DropdownMenu.Label>
//                     <DropdownMenu.Item>
//                         <Link href="/api/auth/signout">Log out</Link>
//                     </DropdownMenu.Item>
//                 </DropdownMenu.Content>
//             </DropdownMenu.Root>
//         </Box>
//     );
// };

const NavLinks = () => {
    const currentPath = usePathname() //requires client page

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Home', href: '/home'},
    ]
    return (
        <ul className="flex space-x-6">
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": link.href === currentPath,
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
};
export default NavBar
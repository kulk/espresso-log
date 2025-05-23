import {prisma} from "@/prisma/client";
import React from 'react'
import EspressoSummaryCard from "@/app/espressos/_components/EspressoSummaryCard";
import {Bean, Espresso,} from "@prisma/client";
import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import {getAuthenticatedUser} from "@/app/auth/auth-utils";


export type EspressoWithBean = Espresso & {
    bean: Bean;
};

const EspressosPage = async () => {

    const user = await getAuthenticatedUser();

    const espressos: EspressoWithBean[] = await prisma.espresso.findMany({
        where: {assignedToUserId: user.id},
        orderBy: {
            id: "desc"
        },
        include: {
            bean: true
        }
    })

    return (
        <>
            <Button mb="3">
                <Link href="/espressos/new">New Espresso</Link>
            </Button>
            <Flex gap="2" wrap="wrap">
                {espressos.map(espresso =>
                    <EspressoSummaryCard
                        key={espresso.id}
                        espresso={espresso}
                        isDetail={true}
                    />
                )}
            </Flex>
        </>
    )
}
export default EspressosPage
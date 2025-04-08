import React from 'react'
import {prisma} from "@/prisma/client";
import EspressoSummaryCard from "@/app/espressos/EspressoSummaryCard";
import {EspressoWithBean} from "@/app/espressos/page";
import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import DeleteEspressoButton from "@/app/espressos/[id]/DeleteEspressoButton";

interface Props {
    params: Promise<{ id: string }>
}

const EspressoDetailPage = async ({params}: Props) => {
    const {id} = await params;

    const espresso = await prisma.espresso.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            bean: true,
        },
    }) as EspressoWithBean || null

    return (
        <div>
            <Flex gap="3"  mb="3">
                {/*<Button>*/}
                {/*    <Link href="/espressos/new">Edit</Link>*/}
                {/*</Button>*/}
                <DeleteEspressoButton id={parseInt(id)}/>
            </Flex>
            <EspressoSummaryCard espresso={espresso}></EspressoSummaryCard>
        </div>
    )
}
export default EspressoDetailPage

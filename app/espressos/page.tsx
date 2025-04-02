import {prisma} from "@/prisma/client";
import React from 'react'
import EspressoSummaryCard from "@/app/espressos/EspressoSummaryCard";
import {Bean, Espresso,} from "@prisma/client";
import {Flex} from "@radix-ui/themes";


export type EspressoWithBean = Espresso & {
    bean: Bean;
};

const EspressosPage = async () => {

    const espressos: EspressoWithBean[] = await prisma.espresso.findMany({
        orderBy: {
            date: "asc"
        },
        include: {
            bean: true
        }
    })

    return (
        <Flex gap="2" wrap="wrap">
            {espressos.map(espresso =>
                <EspressoSummaryCard key={espresso.id} espresso={espresso}/>
            )}
        </Flex>
    )
}
export default EspressosPage
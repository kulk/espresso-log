import {prisma} from "@/prisma/client";
import React from 'react'
import EspressoSummaryCard from "@/app/espressos/EspressoSummaryCard";
import {Bean, Espresso,} from "@prisma/client";


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

    // const dto = toEspressoDto(espressos.at(0))
    return (
        <div>
            {espressos.map(espresso =>
                <EspressoSummaryCard key={espresso.id} espresso={espresso}/>
            )}
        </div>
    )
}
export default EspressosPage
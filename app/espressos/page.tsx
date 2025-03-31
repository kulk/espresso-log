import {prisma} from "@/prisma/client";
import React from 'react'
import EspressoSummaryCard from "@/app/espressos/EspressoSummaryCard";

const EspressosPage = async () => {

    const espressos = await prisma.espresso.findMany({
        orderBy: {
            date: "asc"
        },
        include: {
            bean: true
        }
    })
    return (
        <div>
            {/*{espressos.map(espresso =>*/}
            {/*    <div key={espresso.id}>*/}
            {/*    <div>{espresso.bean.name}</div>*/}
            {/*    <div>Test</div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <EspressoSummaryCard/>
        </div>
    )
}
export default EspressosPage



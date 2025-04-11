import React from 'react'
import EspressoForm from "@/app/espressos/_components/EspressoForm";
import {prisma} from "@/prisma/client";
import {EspressoWithBean} from "@/app/espressos/page";

interface Props {
    params: Promise<{ id: string }>
}

const EditEspressoPage = async ({params}: Props) => {
    const {id} = await params
    const beans = await prisma.bean.findMany()
    const espresso = await prisma.espresso.findUnique({
        where: {id: parseInt(id)},
        include: {
            bean: true,
        },
    }) as EspressoWithBean || null

    const espressoJson = JSON.stringify(espresso)

    return (
        <EspressoForm beans={beans} espressoJson={espressoJson} />
    )
}
export default EditEspressoPage

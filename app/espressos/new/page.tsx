import React from 'react'
import EspressoForm from "@/app/espressos/_components/EspressoForm";
import {prisma} from "@/prisma/client";

const NewEspressoPage = async () => {
    const beans = await prisma.bean.findMany()

    return (
        <EspressoForm beans={beans} />
    )
}
export default NewEspressoPage

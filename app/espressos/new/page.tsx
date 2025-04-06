import React from 'react'
import EspressoFormPage from "@/app/espressos/new/EspressoFormPage";
import {prisma} from "@/prisma/client";

const NewEspressoPage = async () => {
    const beans = await prisma.bean.findMany()

    return (
        <EspressoFormPage beans={beans} />
    )
}
export default NewEspressoPage

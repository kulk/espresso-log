import React from 'react'
import EspressoForm from "@/app/espressos/_components/EspressoForm";
import {prisma} from "@/prisma/client";
import NoAuthRedirect from "@/app/components/NoAuthRedirect";

const NewEspressoPage = async () => {
    const beans = await prisma.bean.findMany()

    return (
        <NoAuthRedirect>
            <EspressoForm beans={beans}/>
        </NoAuthRedirect>
    )
}
export default NewEspressoPage

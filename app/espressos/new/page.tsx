import React from 'react'
import EspressoForm from "@/app/espressos/_components/EspressoForm";
import {prisma} from "@/prisma/client";
import {getAuthenticatedUser} from "@/app/auth/auth-utils";

const NewEspressoPage = async () => {
    const user = await getAuthenticatedUser();
    const beans = await prisma.bean.findMany(
        {where: {assignedToUserId: user.id}}
    )

    return <EspressoForm beans={beans} isCopy={false}/>
}
export default NewEspressoPage

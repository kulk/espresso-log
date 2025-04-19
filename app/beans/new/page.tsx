import React from 'react'
import BeanFormPage from "@/app/beans/new/BeanFormPage";
import {getAuthenticatedUser} from "@/app/auth/auth-utils";

const NewBeanPage = async () => {

    await getAuthenticatedUser();

    return <BeanFormPage/>

}
export default NewBeanPage

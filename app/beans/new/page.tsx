import React from 'react'
import BeanFormPage from "@/app/beans/new/BeanFormPage";
import NoAuthRedirect from "@/app/components/NoAuthRedirect";

const NewBeanPage = () => {

    return (
        <NoAuthRedirect>
            <BeanFormPage/>
        </NoAuthRedirect>
    )
}
export default NewBeanPage

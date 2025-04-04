'use client';

import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri";
import axios from "axios";
import {useRouter} from "next/navigation";

const DeleteBeanIcon = ({id}: {id: number}) => {
    const router = useRouter(); // don't use router from next/router

    function deleteBean(id: number) {
        axios.delete(`/api/beans/${id}`)
        router.push("/beans");
        router.refresh();
    }
    // Todo: Show something in case of error

    return (
        <RiDeleteBin6Line
            onClick={() => deleteBean(id)}
        />
    )
}
export default DeleteBeanIcon

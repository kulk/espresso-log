'use client';

import React, {useState} from 'react'
import {RiDeleteBin6Line} from "react-icons/ri";
import {AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";

const DeleteBeanIcon = ({id}: {id: number}) => {
    const router = useRouter(); // don't use router from next/router
    const [error, setError] = useState(false);

    async function deleteBean(id: number) {
        try {
            await axios.delete(`/api/beans/${id}`)
            // await axios.delete(`/api/beans/100`)
            router.push("/beans");
            router.refresh();
        } catch (err) {
            setError(true);
        }

    }
    // Todo: Make bean undeleteable when used by espresso

    return (
        <>
            <RiDeleteBin6Line
                onClick={() => deleteBean(id)}
            />
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This Bean could not be deleted.</AlertDialog.Description>
                    <Button mt="2" color="gray" variant="soft" onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
export default DeleteBeanIcon

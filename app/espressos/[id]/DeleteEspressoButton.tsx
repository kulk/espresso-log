'use client';

import React, {useState} from 'react'
import {useRouter} from "next/navigation";
import {AlertDialog, Button} from "@radix-ui/themes";
import axios from "axios";

const DeleteEspressoButton = ({id}: { id: number }) => {
    const router = useRouter(); // don't use router from next/router
    const [error, setError] = useState(false);

    async function deleteEspresso(id: number) {
        try {
            await axios.delete(`/api/espressos/${id}`)
            router.push("/espressos");
            router.refresh();
        } catch (err) {
            setError(true);
        }
    }
    //Todo: Create "Are you sure?" dialog

    return (
        <>
            <Button
                color="red"
                onClick={() => deleteEspresso(id)}
            >
                Delete
            </Button>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This Espresso log could not be deleted.</AlertDialog.Description>
                    <Button mt="2" color="gray" variant="soft" onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
export default DeleteEspressoButton

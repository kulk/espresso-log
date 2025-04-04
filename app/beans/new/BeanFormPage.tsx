'use client'

import React, {useState} from 'react'
import {Button, Callout, DropdownMenu, TextField} from "@radix-ui/themes";
import {Controller, useForm} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {beanSchema} from "@/app/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Bean} from "@prisma/client";

type BeanFormData = z.infer<typeof beanSchema>;

const roastLevels = [
    { value: 'Light', label: 'Light' },
    { value: 'Light Medium', label: 'Light Medium' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Medium Dark', label: 'Medium Dark' },
    { value: 'Dark', label: 'Dark' },
    { value: 'Charcoal', label: 'Charcoal' },
];

const BeanFormPage = ({bean}: {bean?: Bean}) => {
    const {register, control, handleSubmit, watch, setValue, formState: { errors} } = useForm<BeanFormData>({
        resolver: zodResolver(beanSchema)
    });
    const router = useRouter(); // don't use router from next/router
    const [error, setError] = useState('');
    const [isSubmitting, setSubmit] = useState(false);

    const onSubmit = async (data: BeanFormData) => {
        try {
            setSubmit(true)
            if (bean) {
                await axios.patch('/api/beans/' + bean.id, data);
            } else {
                await axios.post("/api/beans", data);
            }
            router.push("/beans");
            router.refresh();
        } catch (error) {
            setError('An unexpected error occurred');
        }
    }

    const selectedRoastLevel = watch('roastLevel');


    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text >
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField.Root defaultValue={bean?.name} placeholder="Bean name" {...register('name')}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.name?.message}
                </ErrorMessage>
                <TextField.Root defaultValue={bean?.roaster} placeholder="Roaster name" {...register('roaster')}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.roaster?.message}
                </ErrorMessage>
                <Controller
                    name="roastLevel"
                    control={control}
                    defaultValue={bean?.roastLevel}
                    render={({ field }) => (
                            <DropdownMenu.Root  {...register('roastLevel')}>
                                <DropdownMenu.Trigger>
                                    <Button variant="soft">
                                        {selectedRoastLevel
                                            ? roastLevels.find(roast => roast.value === selectedRoastLevel)?.label
                                            : 'Select a Roast Level'}
                                        <DropdownMenu.TriggerIcon />
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {roastLevels.map(roastLevel => (
                                        <DropdownMenu.Item
                                            key={roastLevel.value}
                                            className="px-3 py-2 text-sm outline-none cursor-pointer rounded hover:bg-blue-50 focus:bg-blue-50"
                                            onClick={() => {
                                                setValue('roastLevel', roastLevel.value);
                                                field.onChange(roastLevel.value);
                                            }}
                                        >
                                            {roastLevel.label}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}/>
                <ErrorMessage>
                    {errors.roastLevel?.message}
                </ErrorMessage>
                <br/>

                <Button disabled={isSubmitting}>
                    { bean ? 'Update bean' : 'Submit New Bean'}{' '}
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}
export default BeanFormPage

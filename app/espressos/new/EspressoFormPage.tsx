'use client'

import React, {useState} from 'react'
import {Button, Callout, DropdownMenu, TextField} from "@radix-ui/themes";
import {Controller, useForm} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {espressoSchema} from "@/app/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Bean, Espresso} from "@prisma/client";

type EspressoFormData = z.infer<typeof espressoSchema>;
//Todo: On backend error, submit button keeps loading

const taste = [
    {value: 'Sour', label: 'Sour'},
    {value: 'Slightly Sour', label: 'Slightly Sour'},
    {value: 'Good', label: 'Good'},
    {value: 'Slightly Bitter', label: 'Slightly Bitter'},
    {value: 'Bitter', label: 'Bitter'},
    {value: 'Sour and Bitter', label: 'Sour and Bitter'},
];//Todo: Don't need label and value!?

const EspressoFormPage = ({ espresso, beans }: { espresso?: Espresso; beans: Bean[] }) => {

    const {register, control, handleSubmit, watch, setValue, formState: {errors}} = useForm<EspressoFormData>({
        resolver: zodResolver(espressoSchema)
    });
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setSubmit] = useState(false);

    const onSubmit = async (data: EspressoFormData) => {
        try {
            setSubmit(true)
            if (espresso) {
                await axios.patch('/api/espressos/' + espresso.id, data);
            } else {
                await axios.post("/api/espressos", data);
            }
            router.push("/espressos");
            router.refresh();
        } catch (error) {
            setError('An unexpected error occurred');
        }
    }

    const selectedTaste = watch('taste');
    const selectedBean =  watch('beanId');

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField.Root defaultValue={espresso?.grindSize.toNumber()}
                                placeholder="Grind size" {...register('grindSize', { valueAsNumber: true})}
                >
                    <TextField.Slot >
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.grindSize?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.doseGrams.toNumber()}
                                placeholder="Dose in grams" {...register('doseGrams', { valueAsNumber: true})}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.doseGrams?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.durationSeconds}
                                placeholder="Duration seconds" {...register('durationSeconds', { valueAsNumber: true})}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.durationSeconds?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.extractionGrams.toNumber()}
                                placeholder="Extraction in grams" {...register('extractionGrams', { valueAsNumber: true})}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.extractionGrams?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.stopTimeSeconds}
                                placeholder="Stop time seconds" {...register('stopTimeSeconds', { valueAsNumber: true})}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.stopTimeSeconds?.message}
                </ErrorMessage>

                <div className="mb-3">
                    <Controller
                        name="taste"
                        control={control}
                        defaultValue={espresso?.taste}
                        render={({field}) => (
                            <DropdownMenu.Root  {...register('taste')}>
                                <DropdownMenu.Trigger>
                                    <Button variant="soft">
                                        {selectedTaste
                                            ? taste.find(taste => taste.value === selectedTaste)?.label
                                            : 'Select Taste'}
                                        <DropdownMenu.TriggerIcon/>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {taste.map(taste => (
                                        <DropdownMenu.Item
                                            key={taste.value}
                                            className="px-3 py-2 text-sm outline-none cursor-pointer rounded hover:bg-blue-50 focus:bg-blue-50"
                                            onClick={() => {
                                                setValue('taste', taste.value);
                                                field.onChange(taste.value);
                                            }}
                                        >
                                            {taste.label}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}/>
                    <ErrorMessage>
                        {errors.taste?.message}
                    </ErrorMessage>
                </div>

                <TextField.Root defaultValue={espresso?.description || ""}
                                placeholder="Description" {...register('description')}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.grinder || ""} placeholder="Grinder" {...register('grinder')}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.grinder?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.date.toString()} placeholder="dd-mm-yyyy" {...register('date')}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.date?.message}
                </ErrorMessage>


                <div className="mb-3">
                    <Controller
                        name="beanId"
                        control={control}
                        defaultValue={espresso?.beanId}
                        render={({field}) => (
                            <DropdownMenu.Root  {...register('taste')}>
                                <DropdownMenu.Trigger>
                                    <Button variant="soft">
                                        {selectedBean
                                            ? beans.find(bean => bean.id === selectedBean)?.name
                                            : 'Select Bean'}
                                        <DropdownMenu.TriggerIcon/>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {beans.map(bean => (
                                        <DropdownMenu.Item
                                            key={bean.id}
                                            className="px-3 py-2 text-sm outline-none cursor-pointer rounded hover:bg-blue-50 focus:bg-blue-50"
                                            onClick={() => {
                                                setValue('beanId', bean.id);
                                                field.onChange(bean.id);
                                            }}
                                        >
                                            {bean.name}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}/>
                    <ErrorMessage>
                        {errors.taste?.message}
                    </ErrorMessage>
                </div>


                <Button disabled={isSubmitting}>
                    {espresso ? 'Update Espresso' : 'Submit New Espresso'}{' '}
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}
export default EspressoFormPage

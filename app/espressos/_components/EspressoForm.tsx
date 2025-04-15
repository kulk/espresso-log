'use client'

import React, {useState} from 'react'
import {Button, Callout, DropdownMenu, Flex, TextField} from "@radix-ui/themes";
import {Controller, useForm} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {espressoSchema} from "@/app/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import {Bean} from "@prisma/client";
import {dateToFieldString, fieldStringToday} from "@/app/utils/dateUtils";

type EspressoFormData = z.infer<typeof espressoSchema>;
//Todo: On backend error, submit button keeps loading

const taste = [
    {name: 'Sour'},
    {name: 'Slightly Sour'},
    {name: 'Good'},
    {name: 'Slightly Bitter'},
    {name: 'Bitter'},
    {name: 'Sour and Bitter'},
];

const EspressoForm = ({ espressoJson, beans }: { espressoJson?: string; beans: Bean[] }) => {

    const  espresso = espressoJson ? JSON.parse(espressoJson) : null
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

    function findBean(selectedBean: number, defaultBean: number): string {
        return (
            beans.find(bean => bean.id === selectedBean)?.name ??
            beans.find(bean => bean.id === defaultBean)?.name ??
            'Select Bean'
        );
    }

    function findTaste(selectedTaste: string, defaultTaste: string): string {
        return (
            taste.find(taste => taste.name === selectedTaste)?.name ??
            defaultTaste ??
            'Select Bean'
        );
    }

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
                <TextField.Root defaultValue={espresso?.grindSize}
                                placeholder="Grind size" {...register('grindSize', { valueAsNumber: true})}
                >
                    <TextField.Slot >
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                    {errors.grindSize?.message}
                </ErrorMessage>

                <TextField.Root defaultValue={espresso?.doseGrams}
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

                <TextField.Root defaultValue={espresso?.extractionGrams}
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
                                        {findTaste(selectedTaste, espresso?.taste)}
                                        <DropdownMenu.TriggerIcon/>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {taste.map(taste => (
                                        <DropdownMenu.Item
                                            key={taste.name}
                                            className="px-3 py-2 text-sm outline-none cursor-pointer rounded hover:bg-blue-50 focus:bg-blue-50"
                                            onClick={() => {
                                                setValue('taste', taste.name);
                                                field.onChange(taste.name);
                                            }}
                                        >
                                            {taste.name}
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
                <Flex gap="2">
                <TextField.Root
                    defaultValue={espresso ? dateToFieldString(espresso.date) : ""}
                    placeholder="dd-mm-yyyy"
                    {...register('date')}
                >
                    <TextField.Slot/>
                </TextField.Root>
                <Button variant="soft"
                        type="button"
                        onClick={() => setValue("date", fieldStringToday())}
                >Today</Button>
                </Flex>
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
                                        {findBean(selectedBean, espresso?.beanId)}
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

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {espresso ? 'Update Espresso' : 'Submit New Espresso'}{' '}
                    {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}
export default EspressoForm

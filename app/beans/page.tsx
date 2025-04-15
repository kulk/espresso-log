import React from 'react'
import {prisma} from "@/prisma/client";
import {Bean} from "@prisma/client";
import {Button, Table} from '@radix-ui/themes';
import DeleteBeanIcon from "@/app/beans/DeleteBeanIcon";
import Link from "next/link";
import NoAuthRedirect from "@/app/components/NoAuthRedirect";

const EspressoPage = async () => {

    const bean: Bean[] = await prisma.bean.findMany()

    return (
        <NoAuthRedirect>
            <Button mb="3">
                <Link href="/beans/new">New Bean</Link>
            </Button>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Bean</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Roaster</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Roast level</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {bean.map(bean =>
                        <Table.Row key={bean.id}>
                            <Table.Cell>{bean.name}</Table.Cell>
                            <Table.Cell>{bean.roaster}</Table.Cell>
                            <Table.Cell>{bean.roastLevel}</Table.Cell>
                            <Table.Cell>
                                <DeleteBeanIcon id={bean.id}/>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </NoAuthRedirect>
    )
}
export default EspressoPage

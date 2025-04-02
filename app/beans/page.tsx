import React from 'react'
import {prisma} from "@/prisma/client";
import {Bean} from "@prisma/client";
import { Table } from '@radix-ui/themes';
import {formatRoastLevel} from "@/app/utils/formatting";

const EspressoPage = async () => {

    const bean: Bean[] = await prisma.bean.findMany()

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Bean</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Roaster</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Roast level</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {bean.map( bean =>
                    <Table.Row key={bean.id}>
                        <Table.Cell>{bean.name}</Table.Cell>
                        <Table.Cell>{bean.roaster}</Table.Cell>
                        <Table.Cell>{formatRoastLevel(bean.roastLevel)}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}
export default EspressoPage

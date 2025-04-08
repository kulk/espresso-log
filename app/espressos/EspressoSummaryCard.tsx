import React from 'react'
import {Box, Card, DataList, Text} from "@radix-ui/themes";
import {EspressoWithBean} from "@/app/espressos/page";
import Link from "next/link";

interface Props {
    espresso: EspressoWithBean;
    isDetail?: boolean;
}

const EspressoSummaryCard = ({espresso, isDetail = false}: Props) => {

    const beanTitle = (
        <Text size="4" weight="bold">
            {espresso.bean.name} {espresso.bean.roaster}
        </Text>
    );

    return (
        <div>
            {espresso &&
                <Box width="400px">
                    <Card>
                        {isDetail ? (
                            <Link href={`/espressos/${espresso.id}`}>
                                {beanTitle}
                            </Link>
                        ) : (
                            <>
                                {beanTitle}
                            </>
                        )}
                        <DataList.Root mt="3">
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Date</DataList.Label>
                                <DataList.Value>
                                    <div>{espresso.date.toDateString()}</div>
                                </DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Grind size</DataList.Label>
                                <DataList.Value>{espresso.grindSize.toNumber()}</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">In</DataList.Label>
                                <DataList.Value>{espresso.doseGrams.toNumber()} gr</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Out</DataList.Label>
                                <DataList.Value>{espresso.extractionGrams.toNumber()} gr</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Time</DataList.Label>
                                <DataList.Value>{espresso.durationSeconds} s</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Taste</DataList.Label>
                                <DataList.Value>{espresso.taste}</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Grinder</DataList.Label>
                                <DataList.Value>{espresso.grinder}</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Description</DataList.Label>
                                <DataList.Value>{espresso.description}</DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Card>
                </Box>}
        </div>
    );

}
export default EspressoSummaryCard
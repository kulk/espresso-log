import React from 'react'
import {Box, Card, DataList, Flex, Text} from "@radix-ui/themes";
import {EspressoWithBean} from "@/app/espressos/page";

interface Props {
    espresso: EspressoWithBean;
}

const EspressoSummaryCard = ({espresso}: Props) => {

    return (
        <div>
            {espresso &&
                <Box width="400px">
                    <Card>
                        <Text size="4" weight="bold">
                            <Flex
                                wrap="wrap"
                                gap="2"
                            >
                                <div className="whitespace-nowrap">{espresso.bean.name}</div>
                                <div className="whitespace-nowrap">{espresso.bean.roaster}</div>
                            </Flex>
                        </Text>

                        <DataList.Root mt="3">
                            <DataList.Item>
                                <DataList.Label minWidth="88px">Date</DataList.Label>
                                <DataList.Value><div>{espresso.date.toDateString()}</div></DataList.Value>
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
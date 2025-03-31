import React from 'react'
import {Card, Text, Box, Flex, DataList} from "@radix-ui/themes";

const EspressoSummaryCard = () => {
    return (
        <div>
            <Box maxWidth="500px">
                <Card>
                    <Text size="4" weight="bold">
                        <Flex
                            wrap="wrap"
                            gap="2"
                        >
                            <div className="whitespace-nowrap">Blue Bottle Coffee</div>
                            <div className="whitespace-nowrap">Ethiopia Yirgacheffe</div>
                        </Flex>
                    </Text>

                    <DataList.Root mt="3">
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Date</DataList.Label>
                            <DataList.Value>10-07-2025</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Grind size</DataList.Label>
                            <DataList.Value>17.5</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">In</DataList.Label>
                            <DataList.Value>17 gr</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Out</DataList.Label>
                            <DataList.Value>36 gr</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Time</DataList.Label>
                            <DataList.Value>28 s</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Taste</DataList.Label>
                            <DataList.Value>Good</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Description</DataList.Label>
                            <DataList.Value>Bright and floral with citrus notes.</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Card>
            </Box>
        </div>
    );

}
export default EspressoSummaryCard
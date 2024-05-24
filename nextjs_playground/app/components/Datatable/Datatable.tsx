import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

interface Props {
    row: any;
    variant?: "striped" | "simple" | "unstyled";
    colorScheme?:
        | "whiteAlpha"
        | "blackAlpha"
        | "gray"
        | "red"
        | "orange"
        | "yellow"
        | "green"
        | "teal"
        | "blue"
        | "cyan"
        | "purple"
        | "pink";
    
}

const Datatable = ({ colorScheme = "teal", variant = "simple"}: Props) => {
    return (
        <TableContainer>
            <Table variant={variant} colorScheme={colorScheme}>
                <TableCaption>List of all product</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Product Id</Th>
                        <Th>Product Name</Th>
                        <Th>Color</Th>
                        <Th>Capacity</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((i) => (
                        <Tr key={i.id}>
                            <Td>{i.id}</Td>
                            <Td>{i.name}</Td>
                            <Td>{i.data?.color}</Td>
                            <Td>{i.data?.capacity}</Td>
                            <Td>
                                <Link href={`/objects/${i.id}`}>
                                    More...
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );
}

export default Datatable;

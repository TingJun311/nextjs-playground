import Link from "next/link";
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


interface Objects {
    id: string
    name: string
    data: Data | null
}

interface Data {
    color: string;
    capacity: string;
}

async function getData() {
    const res = await fetch("https://api.restful-api.dev/objects", {
        cache: "no-store",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const data: Objects[] = await getData();

    return (
        <main>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
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
                                    <Link href={`/objects/${i.id}`}>More...</Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </TableContainer>
        </main>
    );
}
import {Table} from "flowbite-react";
import {Pessoa} from "./People";
import React from "react";

interface Props {
    people: Pessoa[],
    page: number,
    perPage: number
}

function PessoasTable(props: Props) {
    const {people, page, perPage} = props;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return (<>
        <Table striped hoverable>
                <Table.Head>
                    <Table.HeadCell className="text-center">
                        ID
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[200px]">
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[300px]">
                        Cargo
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                {people?.filter((_, index) => index >= startIndex && index < endIndex)
                    .map(({id, nome, cargo}) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                            {id}
                        </Table.Cell>
                        <Table.Cell>
                            {nome}
                        </Table.Cell>
                        <Table.Cell>
                            {cargo}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>);
}

export default React.memo(PessoasTable);

import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {Table} from "flowbite-react";
import {Pessoa} from "./People";

interface Props {
    people: Pessoa[],
    perPage: number
}

function PeopleInfiniteTable(props: Props) {
    const {people, perPage} = props;
    const [page, setPage] = useState<number>(1);
    const [personsToShow, setPersonsToShow] = useState<Pessoa[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchItems = async () => {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        setPage(page + 1)
        const list = people?.filter((_, index) => index < endIndex)
        setPersonsToShow(list)
        if (list?.length === people?.length) {
            setHasMore(false)
        }
    }

    return (<>
            <InfiniteScroll
                loadMore={fetchItems}
                hasMore={hasMore}
                loader={<div className="loader"
                             key={0}>Loading ...</div>}
                useWindow={true}
            >
                <Table striped
                       hoverable>
                    <Table.Head>
                        <Table.HeadCell className="text-center">
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell className="min-w-[300px]">
                            Name
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {personsToShow?.map(({id, nome}) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                           key={id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                                        {id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {nome}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </InfiniteScroll>
        </>
    );
}

export default React.memo(PeopleInfiniteTable);

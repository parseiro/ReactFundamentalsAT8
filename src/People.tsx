import React, {useEffect, useState} from "react";
import {useAsync} from "./useAsync";
import {faker} from "@faker-js/faker";
import PeopleInfiniteTable from "./PeopleInfiniteTable";

export interface Pessoa {
    id: string,
    nome: string,
    cargo: string
}

function People() {
    const fetchPeople = async (): Promise<Pessoa[]> => {
        // Generate random persons using Faker
        return new Array<Pessoa>(1000)
            .fill({id: '', nome: '', cargo: ''})
            .map(() => ({
                    id: faker.datatype.uuid(),
                    nome: faker.name.fullName(),
                    cargo: faker.name.jobTitle()
                })
            )
    }

    const {value: people, status, execute} = useAsync<Pessoa[]>(fetchPeople, false);

    useEffect(() => {
        execute()
    }, [])

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [perPage] = useState(10)
    useEffect(() => {
        if (people) {
            setPage(1)
            setTotalPages(Math.ceil(people.length / perPage))
        }
    }, [people])

    return <>
        {status === 'pending' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching people</p>}
        {status === 'success' && (<>
                {people && <>
                  <p>I generated {people.length} random persons using Faker</p>
                  <p>Infinite scroll</p>
                  <PeopleInfiniteTable
                    people={people}
                    perPage={perPage}
                  />

                </>}
            </>
        )}
    </>
}

People.propTypes = {}

export default React.memo(People)

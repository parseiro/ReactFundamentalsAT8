import React, {useEffect, useState} from "react";
import {useAsync} from "./useAsync";
import PessoasTable from "./PessoasTable";
import {faker} from "@faker-js/faker";
import {Pagination} from "flowbite-react";

export interface Pessoa {
    id: string,
    nome: string,
    cargo: string
}

function People() {
    const fetchPeople = async (): Promise<Pessoa[]> => {
        // Generate random persons using Faker
        return new Array<Pessoa>(100)
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
                  <div className="flex flex-col items-center justify-center text-center">
                    <p>I generated 100 random persons using Faker</p>
                    <p>Page {page} of {totalPages}</p>
                    <Pagination
                      currentPage={page}
                      layout="navigation"
                      onPageChange={setPage}
                      showIcons={true}
                      totalPages={totalPages}
                    />
                  </div>
                  <PessoasTable
                    people={people}
                    perPage={perPage}
                    page={page}
                  />

                </>}
            </>
        )}
    </>
}

People.propTypes = {}

export default React.memo(People)

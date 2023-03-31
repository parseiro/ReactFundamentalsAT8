import './App.css'
import {Footer} from 'flowbite-react'
import React from 'react'
import People from './People'

export default function App() {
    return (
        <>
            <main className="flex flex-col items-center gap-4 container">
                <h1 className="text-center text-4xl">People</h1>

                <People/>

            </main>
            <Footer container={true}>
                <Footer.Copyright
                    href="https://parseiro.github.io"
                    by="Leonardo Vilela Pinheiro"
                    year={2023}
                />
            </Footer>
        </>
    )
}

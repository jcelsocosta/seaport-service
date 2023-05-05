import { Inter } from '@next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import Container from './container'
import Movement from './movement'
import Report from './report'
import NavBar from '@/components/navbar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [showContainer, setShowContainer] = useState<boolean>(true)
    const [showMovement, setShowMovement] = useState<boolean>(false)
    const [showReport, setShowReport] = useState<boolean>(false)

    function showComponentContainer() {
        clearFields()
        setShowContainer(!showContainer)
    }

    function showComponentMovement() {
        clearFields()
        setShowMovement(!showMovement)
    }

    function showComponentReport() {
        clearFields()
        setShowReport(!showReport)
    }

    function clearFields() {
        setShowContainer(false)
        setShowMovement(false)
        setShowReport(false)
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            </Head>
            <NavBar />
        </>
    )
}

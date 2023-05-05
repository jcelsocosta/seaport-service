import { useState } from 'react'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import ListContainer from './components/ListMovement'
import CreateContainer from './components/CreateMovement'
import NavBar from '@/components/navbar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Movement() {
    const [showCreateComponent, setShowCreateComponent] = useState<boolean>(false)

    function createToGoBack() {
        setShowCreateComponent(false)
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            </Head>
            <NavBar />
            <div className="container">
                <div className='m-2'>

                    <div className="row">
                        <div className="col-sm d-flex justify-content-start mx-1">
                            <h4>Movimentação</h4>
                        </div>
                        <div className='col-sm d-flex justify-content-end pr-2'>
                            {
                                !showCreateComponent ?
                                    <button type="button" className='btn btn-outline-dark'
                                        onClick={() => setShowCreateComponent(true)}>
                                        Novo
                                    </button> :
                                    <button type="button" className='btn btn-outline-dark'
                                        data-bs-toggle="modal" data-bs-target="#editContainerModal"
                                        onClick={() => setShowCreateComponent(false)}>
                                        Voltar
                                    </button>
                            }
                        </div>
                    </div>
                    <div>
                        {!showCreateComponent ? <ListContainer /> : <CreateContainer toGoBack={createToGoBack} />}
                    </div>
                </div>
            </div>
        </>
    )
}

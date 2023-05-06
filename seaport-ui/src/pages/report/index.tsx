import Head from 'next/head'
import NavBar from '@/components/navbar/NavBar'
import ListReportContainer from './components/ListReportContainer'
import ListReportMovement from './components/ListReportMovement'

export default function Report() {
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
                            <h4>Relatório</h4>
                        </div>
                    </div>
                </div>
                <div className='row mt-4 mb-2 ms-2 align-middle'>
                    <div className="col-sm d-flex justify-content-start align-middle mx-1">
                        <h5 className="text-muted">Relatório</h5>
                    </div>
                </div>
            </div>
            <ListReportMovement />
            <ListReportContainer />
        </>
    )
}

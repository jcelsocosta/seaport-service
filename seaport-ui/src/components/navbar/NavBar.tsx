import Head from 'next/head'

export default function NavBar() {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            </Head>
            <div className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <a href="" className="navbar-brand">Seaport</a>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link"
                                href='/container'
                                >Contêiner</a>
                            </li>
                            <li className="nav-item">
                                <a type='button' className="nav-link"
                                href='/movement'
                                >Movimentação</a>
                            </li>
                            <li className="nav-item">
                                <a type='button' className="nav-link"
                                href='/report'
                                >Relatório</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

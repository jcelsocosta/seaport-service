import { useState, useEffect, useRef } from "react"

import { listContainersReportSump } from './ReportController'

export default function ListReportContainer() {
    const [reportMovementsSump, setReportMovementsSump] = useState<any>([])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response = await listContainersReportSump()
        setReportMovementsSump(response)
    }

    return (
        <>
            <div className='container'>
                <div>
                    {reportMovementsSump.length === 0 ?
                        <div className="alert alert-dark text-center" role="alert">
                            Não existe nenhuma informação a ser listada.
                        </div>
                        :
                        <ul className="list-group list-group-horizontal-xxl">
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Tipo</span>
                                <span className="text-end">Valor Total</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Importação</span>
                                <span className="">{reportMovementsSump[0].importAmount}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Exportação</span>
                                <span className="">{reportMovementsSump[0].exportAmount}</span>
                            </li>
                                
                        </ul>
                    }
                </div>
            </div>
        </>
    )
}

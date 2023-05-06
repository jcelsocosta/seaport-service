import { useState, useEffect } from "react"

import { listMovementsReport } from '../../../_ui/Report/ReportController'

export default function ListReportMovement() {
    const [reportMovements, setReportMovements] = useState([])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response = await listMovementsReport()
        setReportMovements(response)
    }

    return (
        <>
            <div className='container'>
                <div>
                    {reportMovements.length === 0 ?
                        <div className="alert alert-dark text-center" role="alert">
                            Não existe nenhuma informação a ser listada.
                        </div>
                        :
                        <table className='table mt-4'>
                            <thead>
                                <tr className='text-md-center'>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Tipo</th>
                                    <th scope='col'>Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportMovements.length > 0 && reportMovements.map((el: any, index: any) => {
                                    return (
                                        <tr key={index} className='text-md-center'>
                                            <th className='fw-normal text-break'>{el.client}</th>
                                            <th className='fw-normal text-break'>{el.type}</th>
                                            <th className='fw-normal'>{el.amount}</th>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

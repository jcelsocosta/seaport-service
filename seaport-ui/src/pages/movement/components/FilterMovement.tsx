import ContainerSelect from "@/components/container/container/Container";
import TypeSelect from "@/components/movement/type/Type";
import Container from "@/pages/container";
import Head from "next/head";
import { type } from "os";
import { useState } from "react";

interface FilterMovementProps {
    handleFilterMovement: (filter: any) => void
}

export default function FilterMovement(props: FilterMovementProps) {
    const [typeSelect, setTypeSelect] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    const [containerID, setContainerID] = useState('')

    function handleCloseModal() {
        const target = document.getElementById('filterMovementModal')
        target?.classList.remove('show')
        target?.setAttribute('style', 'display: none;')
        target?.setAttribute('aria-hidden', 'true')
        target?.removeAttribute('aria-modal')
        target?.removeAttribute('role')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.removeAttribute('style')
    }

    function handleTypeSelect(value: any) {
        setTypeSelect(value)
    }

    function handleFilter() {
        const filter = {
            type: typeSelect ? typeSelect : undefined,
            dateInitial: dateInitial ? dateInitial : undefined,
            dateFinal: dateFinal ? dateFinal : undefined,
            containerID: containerID ? containerID : undefined
        }
        props.handleFilterMovement(filter)

        handleCloseModal()
    }
    
    function handleContainerSelect(value: any) {
        setContainerID(value)
    }

    return (
        <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        </Head>
        <div id="overlay">
        </div>
        <div className="modal fade" tabIndex={-1} id="filterMovementModal" aria-labelledby="filterMovementModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Filtro</h5>
                        <button type="button" className="btn-close"data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mt-4">
                            <div className="row mt-4">
                                <div className="col-sm-6">
                                    <TypeSelect
                                        handleTypeSelect={handleTypeSelect}/>
                                </div>
                                <div className="col-sm-6">
                                    <ContainerSelect
                                        handleContainerSelect={handleContainerSelect}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm">
                                    <label className="text-muted">Data e Hora do Início</label>
                                    <input className="form-control" type={"datetime-local"}
                                        value={dateInitial}
                                        onChange={(e) => setDateInitial(e.target.value)}>
                                    </input>
                                </div>
                                <div className="col-sm">
                                    <label className="text-muted">Data e Hora do Fim</label>
                                    <input className="form-control" type={"datetime-local"}
                                        value={dateFinal}
                                        onChange={(e) => setDateFinal(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-start">
                        <button type="button" className="btn btn-primary" onClick={() => handleFilter()}>Filtrar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCloseModal()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

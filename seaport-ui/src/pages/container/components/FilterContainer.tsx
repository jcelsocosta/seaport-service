import CategorySelect from "@/components/container/category/Category";
import StatusSelect from "@/components/container/status/Status";
import TypeSelect from "@/components/container/type/Type";
import Head from "next/head";
import { type } from "os";
import { useState } from "react";

interface FilterContainerProps {
    handleFilterContainer: (filter: any) => void
}

export default function FilterContainer(props: FilterContainerProps) {
    const [client, setClient] = useState('')
    const [numberContainer, setNumberContainer] = useState('')
    const [typeSelect, setTypeSelect] = useState('')
    const [statusSelect, setStatusSelect] = useState('')
    const [categorySelect, setCategorySelect] = useState('')

    function handleCloseModal() {
        const target = document.getElementById('filterContainerModal')
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

    function handleStatusSelect(value: any) {
        setStatusSelect(value)
    }

    function handleCategorySelect(value: any) {
        setCategorySelect(value)
    }

    function handleFilter() {
        const filter = {
            client: client ? client : undefined,
            numberContainer: numberContainer ? numberContainer : undefined,
            type: typeSelect ? typeSelect : undefined,
            status: statusSelect ? statusSelect : undefined,
            category: categorySelect ? categorySelect : undefined
        }
        props.handleFilterContainer(filter)

        handleCloseModal()
    }
    
    return (
        <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        </Head>
        <div id="overlay">
        </div>
        <div className="modal fade" tabIndex={-1} id="filterContainerModal" aria-labelledby="filterContainerModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Filtro</h5>
                        <button type="button" className="btn-close"data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mt-4">
                            <div className="row mt-2">
                                <div className="col-sm-6">
                                    <input className="form-control"
                                    type="text" placeholder="Nome do Cliente"
                                    maxLength={254}
                                    onChange={(e) => setClient(e.target.value)}></input>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control"
                                    type="text" placeholder="Número do Container"
                                    maxLength={11}
                                    onChange={(e) => setNumberContainer(e.target.value)}></input>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-sm">
                                    <TypeSelect
                                        handleTypeSelect={handleTypeSelect}/>
                                </div>
                                <div className="col-sm">
                                    <StatusSelect
                                        handleStatusSelect={handleStatusSelect}/>
                                </div>
                                <div className="col-sm">
                                    <CategorySelect
                                        handleCategorySelect={handleCategorySelect}/>
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

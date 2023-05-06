import CategorySelect from "@/components/container/category/Category";
import StatusSelectComponent from "@/components/container/status/Status";
import TypeSelect from "@/components/container/type/Type";
import controller from "@/_ui/Container/ContainerController";
import { ContainerType } from "@/_ui/Container/ContainerType";
import Head from "next/head";
import { useState, useEffect } from 'react'

interface EditContainerProps {
    componentRender: boolean
    container: ContainerType
    handleFlagContainer: () => void
}

export default function EditContainer(props: EditContainerProps) {
    const [containerID, setContainerID] = useState('')
    const [client, setClient] = useState('')
    const [numberContainer, setNumberContainer] = useState('')
    const [typeSelect, setTypeSelect] = useState('')
    const [statusSelect, setStatusSelect] = useState('')
    const [categorySelect, setCategorySelect] = useState('')

    useEffect(() => {
        if (Object.keys(props.container).length > 0) {
            setContainerID(() => props.container.id)
            setClient(() => props.container.client)
            setNumberContainer(() => props.container.numberContainer)
            setTypeSelect(() => props.container.type)
            setCategorySelect(() => props.container.category)
            setStatusSelect(() => props.container.status)
        }
    }, [props.componentRender])

    function handleCloseModal() {
        const target = document.getElementById('editContainerModal')
        target?.classList.remove('show')
        target?.setAttribute('style', 'display: none;')
        target?.setAttribute('aria-hidden', 'true')
        target?.removeAttribute('aria-modal')
        target?.removeAttribute('role')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.removeAttribute('style')

        props.handleFlagContainer()
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

    async function handleEditContainer() {
        const params = {
            id: containerID,
            client: client,
            numberContainer: numberContainer,
            type: typeSelect,
            status: statusSelect,
            category: categorySelect
        }
        await controller.updateContainer(params)

        handleCloseModal()
    }
    return (
        <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        </Head>
        <div className="modal fade" tabIndex={-1} id="editContainerModal" aria-labelledby="editContainerModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Contêiner</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="">
                            <div className="row">
                                <div className="col-sm-6">
                                    <input className="form-control"
                                    type="text" placeholder="Nome do Cliente"
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control"
                                        placeholder="Número do contêiner ex:1234ABCDEF"
                                        value={numberContainer}
                                        maxLength={11}
                                        onChange={(e) => setNumberContainer((e.target.value).toLocaleUpperCase())}
                                        >
                                    </input>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm">
                                    <TypeSelect
                                        initialValueSelected={typeSelect}
                                        handleTypeSelect={handleTypeSelect}
                                    />
                                </div>
                                <div className="col-sm">
                                    <StatusSelectComponent
                                        initialValueSelected={statusSelect}
                                        handleStatusSelect={handleStatusSelect}
                                    />
                                </div>
                                <div className="col-sm">
                                    <CategorySelect
                                        initialValueSelected={categorySelect}
                                        handleCategorySelect={handleCategorySelect}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-start mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => handleEditContainer()}>Salvar mudanças</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCloseModal()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

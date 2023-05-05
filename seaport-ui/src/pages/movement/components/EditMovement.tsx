import TypeSelect from "@/components/movement/type/Type"
import ContainerSelect from "@/components/container/container/Container"
import Head from "next/head"
import { useState, useEffect } from 'react'
import { MovementType } from "./MovementType"
import { updateMovement } from "./MovementController"
import { checkStringEmpty } from "@/components/common/validate"

interface EditMovementProps {
    componentRender: boolean
    movement: MovementType
    handleFlagMovement: () => void
}

export default function EditMovement(props: EditMovementProps) {
    const [movementID, setMovementID] = useState('')
    const [containerID, setContainerID] = useState('')
    const [typeSelect, setTypeSelect] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [numberContainer, setNumberContainer] = useState<string>('')

    useEffect(() => {
        if (Object.keys(props.movement).length > 0) {
            setMovementID(() => props.movement.id)
            setTypeSelect(() => props.movement.type)
            setDateInitial(() => props.movement.dateInitial)
            setDateFinal(() => props.movement.dateFinal)
            setContainerID(() => props.movement.container.id)
            setNumberContainer(() => props.movement.container.numberContainer)
        }
    }, [props.componentRender])

    function handleCloseModal() {
        const target = document.getElementById('editMovementModal')
        target?.classList.remove('show')
        target?.setAttribute('style', 'display: none;')
        target?.setAttribute('aria-hidden', 'true')
        target?.removeAttribute('aria-modal')
        target?.removeAttribute('role')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.removeAttribute('style')

        props.handleFlagMovement()
    }

    function handleTypeSelect(value: any) {
        setTypeSelect(value)
    }

    async function handleEditMovement() {
        try {
            const errorMessage = validate()

            if (!errorMessage) {
                const params = {
                    id: movementID,
                    type: typeSelect,
                    dateInitial: dateInitial,
                    dateFinal: dateFinal,
                    container: {
                        id: containerID
                    }
                }
                await updateMovement(params)
        
                handleCloseModal()
            } else {
                setErrorMessage(errorMessage)
            }
        } catch (error: any) {
            setErrorMessage(errorMessage)
        }
    }

    function validate() {
        setErrorMessage('')

        if (checkStringEmpty(movementID)) {
            return 'O identificador da movimentação não é válido.'
        }

        if (checkStringEmpty(containerID)) {
            return 'O identificador do contêiner não é válido.'
        }

        if (checkStringEmpty(typeSelect)) {
            return 'Tipo do contêiner não é válido.'
        }

        if (checkStringEmpty(dateInitial)) {
            return 'A data inicial é inválida.'
        }

        if (checkStringEmpty(dateFinal)) {
            return 'A data final é inválida.'
        }

        return null
    }

    function handleContainerSelect(value: string) {
        setContainerID(value)
    }

    return (
        <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        </Head>
        <div className="modal fade" tabIndex={-1} id="editMovementModal" aria-labelledby="editMovementModalLabel">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Movimentação</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseModal()}></button>
                    </div>
                    {errorMessage ?
                    <div className="row m-2">
                        <div className="col-sm text-center">
                            <div className="alert alert-warning" role="alert">
                                {errorMessage}
                            </div>
                        </div>
                    </div>
                    : ''}
                    <div className="modal-body">
                        <div className="row mt-3">
                            <div className="col-sm-6">
                                <TypeSelect
                                    initialValueSelected={typeSelect}
                                    handleTypeSelect={handleTypeSelect}
                                 />
                            </div>
                            <div className="col-sm-6">
                                <ContainerSelect
                                    disable={true}
                                    initialValueSelected={numberContainer}
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
                    <div className="modal-footer d-flex justify-content-start mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => handleEditMovement()}>Salvar mudanças</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleCloseModal()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

import TypeSelect from "@/components/movement/type/Type"
import Head from "next/head"
import { useState } from "react"
import { checkStringEmpty } from "@/components/common/validate"
import ContainerSelect from "@/components/container/container/Container"
import { createMovement } from "@/_ui/Movement/MovementController"

interface CreateContainerProps {
    toGoBack: () => void
}

export default function CreateContainer(props: CreateContainerProps) {
    const [typeSelect, setTypeSelect] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [dateInitial, setDateInitial] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    const [containerID, setContainerID] = useState("")

    async function handleCreateMovement() {
        try {
            const errorMessage = validate()
            if (!errorMessage) {
                const params = {
                    type: typeSelect,
                    dateInitial: dateInitial,
                    dateFinal: dateFinal,
                    container: {
                        id: containerID
                    }
                }
                await createMovement(params)
        
                props.toGoBack()
            } else {
                setErrorMessage(errorMessage)
            }
        } catch (error: any) {
            setErrorMessage(error)
        }
    }

    function handleTypeSelect(value: any) {
        setTypeSelect(value)
    }


    function validate() {
        setErrorMessage('')

        if (checkStringEmpty(containerID)) {
            return 'O identificador do contêiner não é válido.'
        }

        if (checkStringEmpty(typeSelect)) {
            return 'Tipo da movimentação não é válido.'
        }

        if (checkStringEmpty(dateInitial)) {
            return 'A data inicial é inválida.'
        }

        if (checkStringEmpty(dateFinal)) {
            return 'A data final é inválida.'
        }

        const prevDate = new Date(dateInitial)

        const nextDate = new Date(dateFinal)

        if (nextDate < prevDate) return 'A data final não pode ser menor a data inicial.'

        return null
    }

    function handleContainerSelect(value: any) {
        setContainerID(value)
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            </Head>
            <div className='row m-2'>
                <div className="col-sm d-flex justify-content-start mx-1">
                    <h5 className="text-muted">Nova Movimentação</h5>
                </div>
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
            <div className="mt-4">
                <div className="row m-2">
                    <div className="col-sm-6">
                        <TypeSelect
                            handleTypeSelect={handleTypeSelect}
                        />
                    </div>
                    <div className="col-sm-6">
                        <ContainerSelect  handleContainerSelect={handleContainerSelect} />
                    </div>
                </div>

                <div className="row m-2 mt-4">
                    <div className="col-sm">
                        <label className="text-muted">Data e Hora do Início</label>
                        <input className="form-control" type={"datetime-local"}
                            onChange={(e) => setDateInitial(e.target.value)}>
                        </input>
                    </div>
                    <div className="col-sm">
                        <label className="text-muted">Data e Hora do Fim</label>
                        <input className="form-control" type={"datetime-local"}
                            onChange={(e) => setDateFinal(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div className="row m-2 mt-4">
                    <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary" onClick={() => handleCreateMovement()}>Criar</button>
                        <button type="button" className="btn btn-outline-secondary mx-2" onClick={() => props.toGoBack()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

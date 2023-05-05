import CategorySelect from "@/components/container/category/Category";
import StatusSelect from "@/components/container/status/Status";
import TypeSelect from "@/components/container/type/Type";
import Head from "next/head";
import { createContainer } from './ContainerController'
import { useRef, useState } from "react";
import { checkNumberEmpty, checkStringEmpty } from "@/components/common/validate";

interface CreateContainerProps {
    toGoBack: () => void
}

export default function CreateContainer(props: CreateContainerProps) {
    const [client, setClient] = useState<string>('')
    const [numberContainer, setNumberContainer] = useState<string>('')
    const [typeSelect, setTypeSelect] = useState<number>(-1)
    const [statusSelect, setStatusSelect] = useState<string>('')
    const [categorySelect, setCategorySelect] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    async function handleCreateContainer() {
        try {
            const errorMessage = validate()
            if (!errorMessage) {
                const params = {
                    client: client,
                    numberContainer: numberContainer,
                    type: typeSelect,
                    status: statusSelect,
                    category: categorySelect
                }
                await createContainer(params)
        
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

    function handleStatusSelect(value: any) {
        setStatusSelect(value)
    }

    function handleCategorySelect(value: any) {
        setCategorySelect(value)
    }

    function validate() {
        setErrorMessage('')

        if (checkStringEmpty(client)) {
            return 'O nome do cliente não pode ser vazio.'
        }

        if (checkStringEmpty(numberContainer)) {
            return 'O número do contêiner não pode ser vazio.'
        }
        const reg = new RegExp(/^[0-9]{4}[a-zA-Z]{7}/,'g')

        if (numberContainer && !reg.test(numberContainer)) {
            return 'O número do contêiner é inválido.'
        }
        if (checkStringEmpty(statusSelect)) {
            return 'O status do contêiner não pode ser vazio.'
        }
        
        if (checkStringEmpty(categorySelect)) {
            return 'A categoria do cliente não pode ser vazia.'
        }
        
        if (checkNumberEmpty(typeSelect)) {
            return 'Tipo do contêiner não é válido.'
        }

        return null
    }

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            </Head>
            <div className='row m-2'>
                <div className="col-sm d-flex justify-content-start mx-1">
                    <h5 className="text-muted">Novo Contêiner</h5>
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
                        <input className="form-control " type="text"
                            placeholder="Nome do Cliente" maxLength={254}
                            onChange={(e) => setClient(e.target.value) }
                        ></input>
                    </div>
                    <div className="col-sm-6">
                        <input className="form-control"
                            placeholder="Número do contêiner"
                            onChange={(e) => setNumberContainer(e.target.value)}>
                        </input> 
                    </div>
                </div>

                <div className="row m-2 mt-4">
                    <div className="col-sm">
                        <TypeSelect
                            handleTypeSelect={handleTypeSelect}
                        />
                    </div>
                    <div className="col-sm">
                        <StatusSelect
                            handleStatusSelect={handleStatusSelect}
                        />
                    </div>
                    <div className="col-sm">
                        <CategorySelect
                            handleCategorySelect={handleCategorySelect}
                        />
                    </div>
                </div>

                <div className="row m-2 mt-4">
                    <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary" onClick={() => handleCreateContainer()}>Criar</button>
                        <button type="button" className="btn btn-outline-secondary mx-2" onClick={() => props.toGoBack()}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

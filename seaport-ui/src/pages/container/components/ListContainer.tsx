import { useState, useEffect, useRef } from "react"
import { BsPencilSquare, BsTrash, BsFilter } from "react-icons/bs"

import controller from '../../../_ui/Container/ContainerController'
import EditContainer from './EditContainer'
import DeleteContainer from './DeleteContainer'
import FilterContainer from './FilterContainer'
import { ContainerType } from "../../../_ui/Container/ContainerType"

export default function ListContainer() {
    const [containers, setContainers] = useState([])
    const [containerID, setContainerID] = useState('')
    const [numberContainer, setNumberContainer] = useState('')
    const containerRef = useRef({} as ContainerType)
    const [componentRender , setComponentRender] = useState(false)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response = await controller.listContainersPagination()
        setContainers(response)
    }

    function handleClickEdit(container: ContainerType) {
        containerRef.current = container
        const target = document.getElementById('editContainerModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')
        setContainerID(container.id)
        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
        setComponentRender(true)
    }

    function handleClickDelete(container: any) {
        const target = document.getElementById('deleteContainerModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
        
        setContainerID(container.id)
        setNumberContainer(container.numberContainer)
    }

    function handleClickFilter() {
        const target = document.getElementById('filterContainerModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
    }

    async function handleFilterContainer(filter: any) {
        const data = await controller.listContainersByFilter(filter)
        setContainers(data)
    }

    async function handleFlagContainer() {
        const response = await controller.listContainersPagination()
        setContainers(response)

        setComponentRender(false)
    }

    return (
        <>
            <div className='container'>
                <div className='row mt-4 mb-2 ms-2 align-middle'>
                    <div className="col-sm d-flex justify-content-start align-middle mx-1">
                        <h5 className="text-muted">Contêineres</h5>
                    </div>
                    <div className="col-sm d-flex justify-content-end align-bottom">
                        <span style={{cursor: 'pointer', fontSize: '25px'}} onClick={() => handleClickFilter()}>
                            <BsFilter />
                        </span>
                    </div>
                </div>
                <div>
                    {containers.length === 0 ?
                    <div className="alert alert-dark text-center" role="alert">
                        Não existe nenhum contêiner a ser listado.
                    </div>
                    :
                    <table className='table mt-4'>
                        <thead>
                            <tr className='text-md-center'>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Número do contêiner</th>
                                <th scope='col'>Tipo</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Categoria</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.length > 0 && containers.map((el: any, index: any) => {
                                return (
                                    <tr key={index} className='text-md-center'>
                                        <th className='fw-normal text-break'>{ el.client }</th>
                                        <th className='fw-normal'>{ el.numberContainer}</th>
                                        <th className='fw-normal'>{ el.type }</th>
                                        <th className='fw-normal'>
                                            { el.status === 'Vazio' ?
                                                <span className='badge rounded-pill bg-success'>{el.status}</span> :
                                                <span className='badge rounded-pill bg-danger'>{el.status}</span>
                                            }
                                        </th>
                                        <th className='fw-normal'>{ el.category }</th>
                                        <th>
                                            <span className='px-2'
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleClickEdit(el)}>
                                                <BsPencilSquare />
                                            </span>
                                            <span
                                                className='icon-trash'
                                                style={{cursor: 'pointer'}}
                                                onClick={() => handleClickDelete(el)}
                                                >
                                                <BsTrash />
                                            </span>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>

            <EditContainer
                componentRender={componentRender}
                container={containerRef.current}
                handleFlagContainer={handleFlagContainer}
            />
            <DeleteContainer
                containerID={containerID}
                numberContainer={numberContainer}
                handleFlagContainer={handleFlagContainer}/>
            <FilterContainer handleFilterContainer={handleFilterContainer}/>
        </>
    )
}

import { useState, useEffect, useRef } from "react"
import { BsPencilSquare, BsTrash, BsFilter } from "react-icons/bs"

import EditMovement from './EditMovement'
import { MovementType } from "../../../_ui/Movement/MovementType"
import OrderSelect from "@/components/container/order/Order"
import DeleteMovement from "./DeleteMovement"
import FilterMovement from "./FilterMovement"
import moment from 'moment'
import { listMovements, listMovementsByFilter } from "@/_ui/Movement/MovementController"

export default function ListMovement() {
    const [movements, setMovements] = useState([])
    const [movementID, setMovementID] = useState('')
    const [numberContainer, setNumberContainer] = useState('')
    const movementRef = useRef({} as MovementType)
    const [componentRender , setComponentRender] = useState(false)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response = await listMovements()
        setMovements(response)
    }

    function handleClickEdit(movement: MovementType) {
        movementRef.current = movement
        const target = document.getElementById('editMovementModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')
        setMovementID(movement.id)
        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
        setComponentRender(true)
    }

    function handleClickDelete(movement: any) {
        const target = document.getElementById('deleteMovementModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
        
        setMovementID(movement.id)
        setNumberContainer(movement.numberContainer)
    }

    function handleClickFilter() {
        const target = document.getElementById('filterMovementModal')
        target?.classList.add('show')
        target?.setAttribute('style', 'display: block;')
        target?.setAttribute('aria-modal', 'true')
        target?.setAttribute('role', 'dialog')

        const targetBackground = document.getElementById('overlay')
        targetBackground?.setAttribute('style','background-color:black;position:fixed;z-index:999;top:0;left:0;right:0;bottom:0;opacity:0.6')
    }

    async function handleFilterMovement(filter: any) {
        const data = await listMovementsByFilter(filter)
        setMovements(data)
    }

    async function handleFlagMovement() {
        const response = await listMovements()
        setMovements(response)

        setComponentRender(false)
    }

    return (
        <>
            <div className='container'>
                <div className='row mt-4 mb-2 ms-2 align-middle'>
                    <div className="col-sm d-flex justify-content-start align-middle mx-1">
                        <h5 className="text-muted">Movimentações</h5>
                    </div>
                    <div className="col-sm d-flex justify-content-end align-bottom">
                        <span style={{cursor: 'pointer', fontSize: '25px'}} onClick={() => handleClickFilter()}>
                            <BsFilter />
                        </span>
                        <span className="ms-4">
                            <OrderSelect />
                        </span>
                    </div>
                </div>
                <div>
                    {movements.length === 0 ?
                    <div className="alert alert-dark text-center" role="alert">
                        Não existe nenhum movimento a ser listado.
                    </div>
                    :
                    <table className='table mt-4'>
                        <thead>
                            <tr className='text-md-center'>
                                <th scope='col'>Tipo</th>
                                <th scope='col'>Número do Contêiner</th>
                                <th scope='col'>Data e Hora de Início</th>
                                <th scope='col'>Data e Hora do Fim</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements.length > 0 && movements.map((el: any, index: any) => {
                                return (
                                    <tr key={index} className='text-md-center'>
                                        <th className='fw-normal text-break'>{ el.type }</th>
                                        <th className='fw-normal'>{el.container.numberContainer}</th>
                                        <th className='fw-normal'>{ moment(el.dateInitial).format('DD/MM/YYYY HH:MM')}</th>
                                        <th className='fw-normal'>{ moment(el.dateFinal).format('DD/MM/YYYY HH:MM') }</th>
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

            <EditMovement
                componentRender={componentRender}
                movement={movementRef.current}
                handleFlagMovement={handleFlagMovement}
            />
            <DeleteMovement
                movementID={movementID}
                handleFlagMovement={handleFlagMovement}/>

            <FilterMovement handleFilterMovement={handleFilterMovement}/>
        </>
    )
}

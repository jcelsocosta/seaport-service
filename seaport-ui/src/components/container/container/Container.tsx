import { ContainerType } from '@/_ui/Container/ContainerType'
import { useEffect, useState } from 'react'
import { listContainers } from './ContainerController'

interface ContainerSelectType {
    initialValueSelected?: string
    disable?: boolean
    handleContainerSelect: (value: any) => void
}

export default function ContainerSelect(props: ContainerSelectType) {
    const [containers, setContainer] = useState<ContainerType[]>([])

    useEffect(() => {
        fetchContainers()
    }, [])

    async function fetchContainers() {
        const data = await listContainers()
        data.unshift({id: '', numberContainer: 'Selecione um contêiner'})
        setContainer(data)
    }
    return (
        <>
            <div>
                <select className="form-select" aria-label="Default select"
                    onChange={(e) => e.target.value != 'Selecione um contêiner' ? props.handleContainerSelect(e.target.value) : undefined}
                    value={containers.find((el: any) => el.numberContainer === props.initialValueSelected)?.id}
                    disabled={props.disable}
                    >
                    {containers && containers.map((el: any, index) => {
                        return (
                            <option key={index} value={el.id}> {el.numberContainer} </option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}
interface StatusSelectType {
    initialValueSelected?: string
    handleStatusSelect: (value: any) => void
}

export default function StatusSelect(props: StatusSelectType) {
    const statuses = ['Selecione um status', 'Vazio', 'Cheio']

    return (
        <>
            <div>
                <select className="form-select" aria-label="Default select"
                    value={props.initialValueSelected}
                    onChange={(e) => props.handleStatusSelect(e.target.value != 'Selecione um status' ? e.target.value : undefined)}>
                    {statuses && statuses.map((el, index) => {
                        return (
                            <option key={index} value={el}> {el} </option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}
interface TypeSelectType {
    initialValueSelected?: string
    handleTypeSelect: (value: any) => void
}

export default function TypeSelect(props: TypeSelectType) {
    const types = [
            'Selecione uma movimentação', 'Embarque', 'Descarga', 'Gate In', 'Gate out',
            'Reposicionamento', 'Pesagem', 'Scanner'
        ]

    function init() {
        return (
        <>
            <div>
                <select className="form-select form-control" aria-label="Default select"
                    value={props.initialValueSelected}
                    onChange={(e) => {
                        props.handleTypeSelect(e.target.value != 'Selecione uma movimentação'? e.target.value : undefined)
                        }}
                    >
                    {types && types.map((el, index) => {
                        return (
                        <option key={index} value={el}> {el}
                        </option>
                        )
                    })}
                </select>
            </div>
        </>
        )
    }

    return init()
}
interface TypeSelectType {
    initialValueSelected?: string
    handleTypeSelect: (value: any) => void
}

export default function TypeSelect(props: TypeSelectType) {
    const types = ['Selecione um tipo', 20, 40]

    function init() {
        return (
        <>
            <div>
                <select className="form-select form-control" aria-label="Default select"
                    value={props.initialValueSelected}
                    onChange={(e) => {
                        props.handleTypeSelect(e.target.value != 'Selecione um tipo'? parseInt(e.target.value, 10) : undefined)
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
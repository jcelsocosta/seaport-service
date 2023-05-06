interface CategorySelectProps {
    initialValueSelected?: string
    handleCategorySelect: (value: any) => void
}

export default function CategorySelect(props: CategorySelectProps) {
    const categories = ['Selecione uma categoria', 'Importação', 'Exportação']

    return (
        <>
            <select className="form-select" aria-label="Default select"
                value={props.initialValueSelected}
                onChange={(e) => props.handleCategorySelect(e.target.value != 'Selecione uma categoria' ? e.target.value : undefined)}>
                {categories && categories.map((el, index) => {
                    return (
                        <option key={index} value={el}> {el} </option>
                    )
                })}
            </select>
        </>
    )
}
export default function OrderSelect() {
    const categories = [
        ['Selecione uma ordenação', undefined],
        ['Mais recentes', 'createdAt', 'ASC'],
        ['Mais antigos', 'createdAt', 'DESC']
    ]

    return (
        <>
            <div>
                <select className="form-select" aria-label="Default select">
                    {categories && categories.map((el, index) => {
                        return (
                            <option key={index}> {el[0]} </option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}
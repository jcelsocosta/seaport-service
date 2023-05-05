function checkStringEmpty(value: string) {
    if (typeof(value) !== 'string' || value === undefined || value === null || value.trim().length === 0) {
        return true
    }
    return false
}

function checkNumberEmpty(value: number) {
    if (typeof(value) !== 'number' || value === undefined || value === null || value === -1) {
        return true
    }
    return false
}

export {
    checkStringEmpty,
    checkNumberEmpty
}
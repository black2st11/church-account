export const returnValueByNumberFormat = (value) => {
    if(typeof(value) == 'number'){
        value = `${value}`
    }
    return new Intl.NumberFormat().format(value)
}

export const returnValueByNumber = (value) => {
    if(!value){
        return 0
    }
    return parseInt(value.split(',').join(''))
}

export const focusItem = (key) => {
    document.getElementById(key).focus()
}

export const getToday = () => {
    return new Date().toISOString().substring(0, 10);
}

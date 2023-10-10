export const getConstantArray = (size) => {
    if(typeof size !== 'number'){
        return [];
    }
    return Array.from(Array(size).keys())
}
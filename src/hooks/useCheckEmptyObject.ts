export const useCheckNotEmptyObject = (obj: { [key : string] : any}): boolean => {
    return obj && Object.keys(obj).length !== 0 ;
     
}
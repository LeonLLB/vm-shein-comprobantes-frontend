export interface ValidationError{
    "property": string,
    "children": ValidationError[],
    "constraints"?: {[valError:string]:string}
}

export interface CommonError{
    "status": number,
    "message": string
    "name": string
}
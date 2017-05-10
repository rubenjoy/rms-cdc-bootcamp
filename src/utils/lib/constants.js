export const genders = [{text: "Male", value: "Male"}, {text: "Female", value: "Female"}]
export const relations = [
    {text: "Husband", value: "Husband"},
    {text: "Wife", value: "Wife"},
    {text: "Daughter", value: "Daughter"},
    {text: "Son", value: "Son"}
]

export const employeeStatusMap = [{text: "Contract", value: "Contract"}, {text: "Permanent", value: "Permanent"}]

export const maritalStatusMap = [{text: "Single", value: "Single"}, {text: "Married", value: "Married"}, {text: "Divorced", value: "Divorced"}]

export const statusCodeMap = [
    {"code": 409, "message": "One or more of the submitted entries are duplicated"}
]

export const getResponseCodeMessage = (code) => {
    const ret = statusCodeMap.filter((item) => item.code === code)[0];
    return ret ? ret.message : "";
}

export const errorMessage = {
    generalPrefix: "Error while updating",
    general: "Error while updating, please check your input and try again. If problem persists please contact our customer service.",
    fieldValidation: "Please complete the required data",
    netError: "Exception while connecting to server, please check your connection and try again",
}

export const sortByOptions = [
    {text: "Name", value: "firstName"},
    {text: "Hired Date", value: "hiredDate"},
    {text: "Created Date", value: "dateAdded"},
    {text: "Modified Date", value: "lastModified"}
]

export function getCurrentGrade(grades) {
    return grades.filter((grade) => !grade.endDate)[0]
}

export function getEmployeeFullName(employee) {
    return employee.firstName + " " + employee.lastName
}

export function getCurrentLocation(locations) {
    return locations.filter((loc) => !loc.endDate)[0]
}
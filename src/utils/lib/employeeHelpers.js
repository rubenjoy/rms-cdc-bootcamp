export function getCurrentGrade(grades) {
    return grades.filter((grade) => !grade.endDate)[0]
}

export function getEmployeeFullName(employee) {
    return employee.firstName + " " + employee.lastName
}

export function getCurrentLocation(locations) {
    return locations.filter((loc) => !loc.endDate)[0]
}

const maxSub = 100;

export function generateSubID() {
    return Math.floor(Math.random() * maxSub);
}

export function generateGradeID(empId) {
    return "g_" + empId + "_" + generateSubID();
}

export function generateMemberID(empId) {
    return "f_" + empId + "_" + generateSubID();
}

export function generateLocId(empId) {
    return "l_" + empId + "_" + generateSubID();
}

export function generateProjectId(empId) {
    return "p_" + empId + "_" + generateSubID();
}
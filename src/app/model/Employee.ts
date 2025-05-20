export class EmployeeModel{
    empId: number;
    name: String;
    country: String;
    state: String;
    emailId: String;
    department: String;
    contactNo: String;
    address: String;

    constructor(){
        this.empId = 0;
        this.name = '';
        this.country = '';
        this.state = '';
        this.emailId = '';
        this.department = '';
        this.contactNo = '';
        this.address = '';
        
    }
}
import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare const bootstrap: any;
@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent implements OnInit {
  
  departments: any[] = [];
  employeeList: any[] = [];
  isListView:boolean = true;
  @ViewChild('editModal', { static: false }) editModal!: ElementRef;

  



  //Employee Object
  empObj: any ={
            "fName": "",
            "lName": "",
            "department": "",
            "gender": "",
            "email": "@gmail.com",
            "ph_number": ""
  }


  // constructor(private http :HttpClient){}
  http =inject(HttpClient);

  ngOnInit(): void {
    this.loadDepartMents();
    this.loadEmployees();
  }

  loadDepartMents(){
    this.http.get("assets/department.json").subscribe((res:any)=>{
     this.departments = res.data;
    });
  }

  loadEmployees(){
    // debugger;
    this.http.get("http://localhost:3000/employeeList").subscribe((res:any)=>{
     this.employeeList = res;
    //  this.loadEmployees();
    });
  }


createAndSaveEmp(){
  debugger;
  this.http.post("http://localhost:3000/employeeList", this.empObj).subscribe((res: any)=>{
    alert("Employee Added success!");
  })
}

 openEditModal(emp: any) {
  debugger;
  this.empObj = { ...emp };
  setTimeout(() => {
    const modalRef = new bootstrap.Modal(this.editModal.nativeElement);
    modalRef.show();
  }, 0);
}


  updateEmployee() {
    alert('Employee updated successfully');
    const modalInstance = bootstrap.Modal.getInstance(this.editModal.nativeElement);
    modalInstance.hide();
  }

}

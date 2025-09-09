import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeObj : EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd !:boolean;
  showupdate !:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname:[],
      lastname:[],
      email:[],
      mobile:[],
      salary:[]
    })    
    this.getEmployeeDetails();
  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd =true;
    this.showupdate= false;
  }

  postEmployeeDetails(){
      this.employeeObj.firstname = this.formValue.value.firstname;
      this.employeeObj.lastname = this.formValue.value.lastname;
      this.employeeObj.email = this.formValue.value.email;
      this.employeeObj.mobile = this.formValue.value.mobile;
      this.employeeObj.salary = this.formValue.value.salary;

      this.api.postEmployee(this.employeeObj)
      .subscribe((res:any)=>{
        console.log(res);
        alert("Employee Added successfully");
        let ref= document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      },
     (err)=>{
        alert("Something went wrong");
     });
    }

    getEmployeeDetails(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res;
      })
    }

    deleteEmployeeDetails(row:any){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        alert("Employee Deleted");
        this.getEmployeeDetails();
      })
    }

    onEdit(row:any){
      this.showAdd =false;
    this.showupdate= true;
      this.employeeObj.id = row.id;
      this.formValue.controls['firstname'].setValue(row.firstname);
      this.formValue.controls['lastname'].setValue(row.lastname);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['salary'].setValue(row.salary);
    }

    updateEmployeeDetails(){
      this.employeeObj.firstname = this.formValue.value.firstname;
      this.employeeObj.lastname = this.formValue.value.lastname;
      this.employeeObj.email = this.formValue.value.email;
      this.employeeObj.mobile = this.formValue.value.mobile;
      this.employeeObj.salary = this.formValue.value.salary;

      this.api.updateEmployee(this.employeeObj,this.employeeObj.id)
      .subscribe(res=>{
        alert("Employee updated Successfully");
        let ref= document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      })
    }
}

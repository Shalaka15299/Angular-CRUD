import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from '../model/employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  public employeeObj  = new EmployeeModel();
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
      this.employeeObj.FirstName = this.formValue.value.firstname;
      this.employeeObj.LastName = this.formValue.value.lastname;
      this.employeeObj.Email = this.formValue.value.email;
      this.employeeObj.Mobile = this.formValue.value.mobile;
      this.employeeObj.Salary = this.formValue.value.salary;

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
        this.employeeData = res.employeeDetails;
        console.log("getEmployeeDetails"+res.employeeDetails);
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
      this.employeeObj.Id = row.id;
      this.formValue.controls['firstname'].setValue(row.firstName);
      this.formValue.controls['lastname'].setValue(row.lastName);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobile'].setValue(row.mobile);
      this.formValue.controls['salary'].setValue(row.salary);
    }

    updateEmployeeDetails(){
      this.employeeObj.FirstName = this.formValue.value.firstname;
      this.employeeObj.LastName = this.formValue.value.lastname;
      this.employeeObj.Email = this.formValue.value.email;
      this.employeeObj.Mobile = this.formValue.value.mobile;
      this.employeeObj.Salary = this.formValue.value.salary;
      console.log("updateEmployeeDetails "+this.formValue.value.firstname);
      this.api.updateEmployee(this.employeeObj)
      .subscribe(res=>{
        alert("Employee updated Successfully");
        let ref= document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      })
    }
}

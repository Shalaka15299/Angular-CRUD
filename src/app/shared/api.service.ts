import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public loginUrl : string = "https://localhost:7268/api/Login/";

  constructor(private http:HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>("https://localhost:7268/api/Employee/add_employee",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>("https://localhost:7268/api/Employee/get_all_employee")
    .pipe(map((res:any)=>{
      console.log("getEmployee value"+res);
      return res;
    }))
  }

  updateEmployee(data:any){
    console.log("updateEmployee api value" +data);
    return this.http.put<any>("https://localhost:7268/api/Employee/update_employee/",data)
    .pipe(map((res:any)=>{
      return res;
      console.log("updateEmployee api value" +res);
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("https://localhost:7268/api/Employee/delete_employee/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  signUp(empObj:any){    
    return this.http.post<any>(this.loginUrl+"signup",empObj);   
  }

  login(empObj:any){
    return this.http.post<any>(`${this.loginUrl}login`,empObj);
  }
}

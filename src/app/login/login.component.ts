import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;

  constructor(private formbuilder:FormBuilder,private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:[''],
      password:['']
    })
  }

  onLogin(){
    console.log(this.loginForm.value);
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      console.log(res);
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        console.log(user);
        alert("Login Successful");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
    },err=>{
      alert("Something went wrong");
    })
  }

}

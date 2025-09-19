import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  public loginobj = new UserModel();

  constructor(private formbuilder:FormBuilder,private http:HttpClient, private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onLogin(){
    // console.log(this.loginForm.value);
    // this.http.get<any>("http://localhost:3000/signupUsers")
    // .subscribe(res=>{
    //   console.log(res);
    //   const user = res.find((a:any)=>{
    //     return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    //   });
    //   if(user){
    //     console.log(user);
    //     alert("Login Successful");
    //     this.loginForm.reset();
    //     this.router.navigate(['dashboard']);
    //   }
    // },err=>{
    //   alert("Something went wrong");
    // })
    
    this.loginobj.UserName = this.loginForm.value.email;
    this.loginobj.Password = this.loginForm.value.password;
    this.api.login(this.loginobj)
    .subscribe(res=>{
      alert(res.message);
      this.loginForm.reset();
      this.router.navigate(['dashboard']);
    })
  }

}

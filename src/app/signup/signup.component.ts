import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public signupForm!:FormGroup;
  public signupobj = new UserModel();

  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username:['',Validators.required],
      mobile:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      usertype:['',Validators.required]
    })
  }

  onSignUp(){
    // console.log(this.signupForm.value);
    // this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    // .subscribe(res=>{
    //   alert("Signup Successfull");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // })
    this.signupobj.FullName = this.signupForm.value.username;
    this.signupobj.UserName = this.signupForm.value.email;
    this.signupobj.Password = this.signupForm.value.password;
    this.signupobj.Mobile = this.signupForm.value.mobile;
    this.signupobj.UserType = this.signupForm.value.usertype;
    
    this.api.signUp(this.signupobj)
    .subscribe(res=>{
      alert(res.message);
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;
  errorMessage : undefined;
  constructor(private fb : FormBuilder,
              private route : Router,
              private authService : AuthService) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    })
  }

  handleLogin() {
   /* console.log(this.loginForm.value);
    if(this.loginForm.value.username=="admin" && this.loginForm.value.password=="1234"){
       this.route.navigateByUrl("/admin")
    }*/
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.login(username,password)
      .then(resp=>{
        this.route.navigateByUrl("/admin");
      })
      .catch(error=>{
        this.errorMessage=error;
      })
  }
}

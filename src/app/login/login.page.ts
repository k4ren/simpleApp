import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }
  
  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value)
    .subscribe(
      res => {
        console.log(res)      
    }, (err) => {
      console.log(err)      
    })
    // this.router.navigate(["home"]);
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'
import { ToastController } from "@ionic/angular";

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
    private authService: AuthService,
    private toastController: ToastController
  ) { 
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })
  }
  
  login(){
    this.authService.login(this.loginForm.value)
    .subscribe( res => {
      if( res.token ) {
        // localStorage.setItem('token', res.token);
        console.log('login!: ',res);        
        this.router.navigate(["list"]);
      } else {
        this.presentToastOnError();
      }
    });
  }

  async presentToastOnError() {
    const toast = await this.toastController.create({
      message: 'Incorrect Credentials, Try Again',
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

  ngOnInit() {
  }

}

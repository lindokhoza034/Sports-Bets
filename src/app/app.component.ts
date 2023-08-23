import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFactory } from './classes/form-factory';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TransactionService } from './services/transaction/transaction.service';
declare const Notiflix: any, $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  balance:number = 0;
  title = '404Bets';
  loginForm:FormGroup;
  registerForm:FormGroup;
  constructor(public authentication: AuthenticationService, fb:FormBuilder, private router:Router,public transaction: TransactionService){
    this.loginForm = FormFactory.loginForm(fb);
    this.registerForm = FormFactory.registerForm(fb);
  }

  logout(){
    this.authentication.logout();
    Notiflix.Notify.Success('Log out succesful');
  }
  login() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    if (this.authentication.login(this.loginForm.get('username')?.value ?? '', this.loginForm.get('password')?.value ?? '')) {
      this.router.navigateByUrl('/');
      Notiflix.Notify.Success("Log in succesful");
      return;
    }

    Notiflix.Notify.Failure("Invalid Username/ Password");
  }
  darkMode() {
    document.body.classList.toggle("dark-mode");
  }
  register() {
    if (this.registerForm.invalid ) {
      return;
    }

    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      Notiflix.Notify.Failure('Password do not match');
      return;
    }
    const msg = this.authentication.register({
      email: this.registerForm.get('email')?.value ?? '',
      username: this.registerForm.get('username')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
      firstNames: this.registerForm.get('firstNames')?.value ?? '',
      lastName: this.registerForm.get('lastName')?.value ?? '',
      phone: {
        number: this.registerForm.get('phoneNumber')?.value ?? '',
        dialingCode: this.registerForm.get('dialingCode')?.value ?? '',
      }
    });
    if (msg) {
      Notiflix.Notify.Failure(msg);
      return;
    }
    $('#registerModal').modal('hide');
    Notiflix.Notify.Success('Registration succesful');
  }

  openForm(){
    const e =document.getElementById("myForm");
    if(e){
      e.style.display = "block";
    }
      
  }
  closeForm(){
    const e =document.getElementById("myForm");
    if(e){
      e.style.display = "none";
    }
      
  }
}

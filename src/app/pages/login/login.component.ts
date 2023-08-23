import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { FormFactory } from 'src/app/classes/form-factory';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
declare const Notiflix: any, $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  constructor(fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.form = FormFactory.loginForm(fb);
  }
  login() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    if (this.authenticationService.login(this.form.get('username')?.value ?? '', this.form.get('password')?.value ?? '')) {
      this.router.navigateByUrl('/');
      Notiflix.Notify.Success("Log in succesful");
      return;
    }

    Notiflix.Notify.Failure("Invalid Username/ Password");
  }
}

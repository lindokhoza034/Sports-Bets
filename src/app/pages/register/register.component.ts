import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFactory } from 'src/app/classes/form-factory';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
declare const Notiflix: any, $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(fb: FormBuilder, private authentication: AuthenticationService, private router: Router) {
    this.form = FormFactory.registerForm(fb);
  }
  register() {
    if (this.form.invalid ) {
      return;
    }

    if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
      Notiflix.Notify.Failure('Password do not match');
      return;
    }
    const msg = this.authentication.register({
      email: this.form.get('email')?.value ?? '',
      username: this.form.get('username')?.value ?? '',
      password: this.form.get('password')?.value ?? '',
      firstNames: this.form.get('firstNames')?.value ?? '',
      lastName: this.form.get('lastName')?.value ?? '',
      phone: {
        number: this.form.get('phoneNumber')?.value ?? '',
        dialingCode: this.form.get('dialingCode')?.value ?? '',
      }
    });
    if (msg) {
      Notiflix.Notify.Failure(msg);
      return;
    }
    this.router.navigateByUrl('/login');
    Notiflix.Notify.Success('Registration succesful');
  }
}

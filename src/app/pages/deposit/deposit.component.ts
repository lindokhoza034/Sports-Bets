import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFactory } from 'src/app/classes/form-factory';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
declare const Notiflix: any, $: any;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  form:FormGroup;
  constructor(private router:Router,private authentication:AuthenticationService,public transaction: TransactionService,fb:FormBuilder){
    this.form = FormFactory.transactionForm(fb);
  }
  add(){
    console.log(this.authentication.currentUser,this.form.controls)
    if(this.form.invalid || !this.authentication.currentUser?.username){
      return;
    }

    var amount = parseFloat(this.form.get('amount')?.value);
    if(amount && !isNaN(amount)){
      this.transaction.addTransaction(this.authentication.currentUser?.username,amount);
      Notiflix.Notify.Success('Deposit Successfully Made.');
      this.router.navigateByUrl('/');
      return;
    }
    Notiflix.Notify.Failure('Unable to make Deposit.');
  }
}

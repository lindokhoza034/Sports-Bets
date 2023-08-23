import { FormBuilder,FormGroup,Validators} from '@angular/forms'
export class FormFactory {
    static loginForm(fb:FormBuilder):FormGroup{
        return fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    static registerForm(fb:FormBuilder):FormGroup{
        return fb.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            firstNames:['', Validators.required],
            lastName:['', Validators.required],
            dialingCode:['', Validators.required],
            phoneNumber:['', Validators.required]
        });
    }

    static transactionForm(fb:FormBuilder):FormGroup{
        return fb.group({
            amount: ['', Validators.required],
            nameOnCard: ['', Validators.required],
            cardNumber: ['', Validators.required],
            expiryDate: ['', Validators.required],
            cvc:['', Validators.required]
        });
    }
}

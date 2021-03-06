import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotifyService } from '@services/notify.service';

@Component({
    selector: 'ta-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.scss']
})

export class ForgotPasswordComponent {


    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new ErrorStateMatcher();

    constructor(
        public notifyService: NotifyService
    ) {

    }

    onSubmit() {
        this.notifyService.notify(`email has been sent to ${this.emailFormControl.value}`, null, {
            duration: 4000,
            panelClass: ['snack-success']
        });
    }
}

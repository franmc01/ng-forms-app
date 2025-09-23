import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../../shared/form-state.service';

@Component({
  selector: 'app-sign-up',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private fb = inject(FormBuilder);
  protected formState = inject(FormStateService);

  authForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(this.formState.namePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(this.formState.emailPattern)],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formState.notOnlySpacesPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formState.notOnlySpacesPattern),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formState.notOnlySpacesPattern),
        ],
        [this.formState.passwordMatchValidator('password', 'confirmPassword')]
      ],
    },
  );

  onSubmit() {
    this.authForm.markAllAsTouched();

    const isValid = this.authForm.valid;

    if (isValid) {
      console.log(this.authForm.value);
    }
  }
}

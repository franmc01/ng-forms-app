import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../../shared/form-state.service';

@Component({
  selector: 'app-switch-form',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switch-form.html',
  styleUrl: './switch-form.scss'
})
export class SwitchForm {
  private fb = inject(FormBuilder);
  protected formState = inject(FormStateService)

  myForm = this.fb.group({
    gender: ['M', [Validators.required]],
    enableNotifications: [true],
    termsAndConditions: [false, [Validators.requiredTrue]]
  })

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}

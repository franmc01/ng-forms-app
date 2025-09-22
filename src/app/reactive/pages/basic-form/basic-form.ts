import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormStateService } from '../../../shared/form-state.service';

@Component({
  selector: 'app-basic-form',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-form.html',
  styleUrl: './basic-form.scss',
})
export class BasicForm {
  /* myForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }); */

  private formBuilder = inject(FormBuilder);
  protected formStateService = inject(FormStateService);

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted', this.myForm.value);

    this.myForm.reset();
  }
}

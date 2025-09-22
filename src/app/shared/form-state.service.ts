import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  private errorMessages: Record<string, (err: any) => string> = {
    required: () => 'Este campo es requerido',
    minlength: (err) => `Este campo debe tener al menos ${err.requiredLength} caracteres`,
    min: (err) => `Este campo debe ser mayor o igual a ${err.min}`,
  };

  isValidField(form: FormGroup, fieldName: string): boolean {
    const control = form.controls[fieldName];
    return !!(control && control.valid && control.touched);
  }

  getErrorMessage(form: FormGroup, fieldName: string): string | null {
    const control = form.controls[fieldName];
    if (!control || !control.touched || !control.errors) return null;
    return this.composeErrorMessage(control.errors);
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean {
    const control = formArray.controls[index];
    return !!(control && control.valid && control.touched);
  }

  getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    const control = formArray.controls[index];
    if (!control || !control.touched || !control.errors) return null;
    return this.composeErrorMessage(control.errors);
  }

  private composeErrorMessage(errors: any): string | null {
    if (!errors) return null;
    return Object.keys(errors)
      .map((key) => {
        const fn = this.errorMessages[key];
        return fn ? fn(errors[key]) : `Error: ${key}`;
      })
      .join(', ');
  }
}
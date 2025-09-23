import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  private errorMessages: Record<string, (err: any) => string> = {
    required: () => 'Este campo es requerido',
    minlength: (err) => `Este campo debe tener al menos ${err.requiredLength} caracteres`,
    min: (err) => `Este campo debe ser mayor o igual a ${err.min}`,
    requiredPattern: (err) => 'Este campo no cumple con el patrón requerido',
  };

  isValidField(form: FormGroup, fieldName: string): boolean {
    const control = form.controls[fieldName];
    return !!(control && control.valid && (control.touched || control.dirty));
  }

  getErrorMessage(form: FormGroup, fieldName: string): string | null {
    const control = form.controls[fieldName];
    if (!control || !(control.touched || control.dirty) || !control.errors) return null;
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
    if (!control || !(control.touched || control.dirty) || !control.errors) return null;
    return this.composeErrorMessage(control.errors);
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (form: FormGroup) => {
      const passwordControl = form.controls[password];
      const confirmPasswordControl = form.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) return null;

      const isValid = passwordControl.value === confirmPasswordControl.value;
      return isValid ? null : { passwordMismatch: true };
    };
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

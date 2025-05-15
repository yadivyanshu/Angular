import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-wizard-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './wizard-form.component.html',
})
export class WizardFormComponent {
  step = 0;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
      }),
      account: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }),
    });
  }

  nextStep() {
    if (this.currentStepGroup().valid) {
      this.step++;
    } else {
      this.currentStepGroup().markAllAsTouched();
    }
  }

  prevStep() {
    if (this.step > 0) {
      this.step--;
    }
  }

  currentStepGroup(): FormGroup {
    const groups = ['personal', 'address', 'account'];
    return this.form.get(groups[this.step]) as FormGroup;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Final Form Value:', this.form.value);
    }
  }

  get personalGroup(): FormGroup {
    return this.form.get('personal') as FormGroup;
  }

  get addressGroup(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get accountGroup(): FormGroup {
    return this.form.get('account') as FormGroup;
  }
}

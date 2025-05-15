import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsFormComponent } from "../skills-form/skills-form.component";
import { WizardFormComponent } from "../wizard-form/wizard-form.component";

@Component({
  selector: 'app-reactive-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SkillsFormComponent, WizardFormComponent],
  templateUrl: './reactive-user-form.component.html',
})
export class ReactiveUserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert(`Welcome ${this.userForm.value.name}`);
    } else {
      alert('Form is invalid!');
    }
  }
}
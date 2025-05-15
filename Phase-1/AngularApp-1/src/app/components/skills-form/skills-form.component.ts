import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills-form.component.html'
})
export class SkillsFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      skills: this.fb.array([]), // 🔁 FormArray here
    });
  }

  // Get the skills form array
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Add a new skill
  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  // Remove a skill
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

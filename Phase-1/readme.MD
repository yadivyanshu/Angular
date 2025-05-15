# 🔰 Phase 1: Core Foundations

## 🧠 Lesson 1: How Angular Works – A High-Level Overview
### 🧩 Angular is Made of:
	1.	Modules – Like containers for features (AppModule is the root).
	2.	Components – The building blocks of UI (header, nav bar, etc.).
	3.	Templates – HTML files with Angular syntax.
	4.	Services – Logic that’s reusable (like APIs or local storage).
	5.	Routing – Handles navigation without full-page reloads.

### 🚀 Angular Workflow (Under the Hood)
```
Browser loads index.html
   ↓
Angular bootstraps AppModule
   ↓
AppModule loads AppComponent
   ↓
AppComponent loads its HTML template
   ↓
Angular renders components on the page
   ↓
User interacts → Angular handles UI + logic
```

## 🎯 Lesson 2: Components & Data Binding
### 🚧 What’s a Component?
> A component is a piece of your UI, like a card, button, nav bar, or form. Angular apps are built entirely from components — think of them like LEGO blocks.

- Each component has:
	- A TypeScript class (logic)
	- An HTML template (UI)
	- A CSS file (styling)
	- A selector (used to embed this component)

### ⚡ Let’s Talk Data Binding
> Data binding is how you connect your component logic (TS) with your UI (HTML).

#### 1. Interpolation – Display data from TS in HTML
``` <h1>{{ title }}</h1> ```
> This shows the title variable from the component class.

#### 2. Property Binding – Bind values to HTML element properties
> <img [src]="imageUrl" />

#### 3. Event Binding – Respond to user actions
```
<button (click)="sayHello()">Click Me</button>

<!-- .ts file -->
sayHello() {
  console.log('Hello from Angular!');
}
```

#### 4. Two-Way Binding – Sync data both ways using [(ngModel)]
```
<input [(ngModel)]="title" />
<p>You typed: {{ title }}</p>
```

### ✅ Full Example 
```
<!-- app.component.ts -->
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
  username: string = 'Div Yadav';

  clearName() {
    this.username = '';
  }
}

<!-- app.component.html -->
<h1>Welcome to the Angular App!</h1>

<h2>Welcome, {{ username }}!</h2>
<input type="text" [(ngModel)]="username" placeholder="Enter your name" />
<p>Live Preview: {{username}}</p>

<button (click)="clearName()">Clear</button>
```

## 🎯 Lesson 3: Forms 
> Forms are how users input data. 
- Angular gives you two powerful ways to build forms:
	- 🧩 1. Template-Driven Forms
		- Easier to use for simple forms
		- Uses HTML + [(ngModel)] binding

	- 🧬 2. Reactive Forms
		- More powerful and scalable
		- Uses FormGroup, FormControl, FormBuilder


### Build a Template-Driven Form
```
<h2>📝 User Registration</h2>

<form (ngSubmit)="onSubmit()" #formRef="ngForm"> // 🔹 ngSubmit is an Angular event triggered when the form is submitted
  <label>Name:</label>
  <input name="name" [(ngModel)]="user.name" required /> // () part means it listens for changes, [] part means it sets the value initially
  <br /><br />

  <label>Email:</label>
  <input name="email" type="email" [(ngModel)]="user.email" required />
  <br /><br />

  <button type="submit" [disabled]="formRef.invalid">Submit</button>
</form>

// #formRef="ngForm"
// 🔹 This is called a template reference variable — basically a way to get a reference to the form itself.
// formRef is just a name we choose (you could call it bananaForm if you want)
// "ngForm" tells Angular: “Give me access to the Angular form object, not just the HTML form.”

// [(ngModel)]="user.name" - This is called two-way binding using Angular’s ngModel.

// name="name" - This is required for Angular to register the field into the form
// If you skip this, Angular can’t track its validity (formRef.invalid won’t work correctly)

```
 
### 🧬 What Are Reactive Forms?
- Unlike Template-driven forms (which use HTML + ngModel), Reactive Forms:
	- ✅ Build the entire form model in TypeScript
	- ✅ Bind form fields using formControlName
	- ✅ Handle validation and changes in code
	- ✅ Are perfect for complex, dynamic, large-scale forms

### 🧩 The Building Blocks 
#### ✅ 1. FormBuilder
- A helper class that lets you quickly create a form group or control.
``` constructor(private fb: FormBuilder) {} ```
> Think of it like a factory that helps you create form objects.

#### ✅ 2. FormGroup
- A container for form controls. It’s like a JS object where each key is a field, and value is a FormControl.
```
this.fb.group({
  name: [''],
  email: ['']
});
```
#### ✅ 3. FormControl
- Represents a single field in the form (e.g., one input).
``` name: new FormControl('') ```
> Tracks the value, whether it’s touched, dirty, valid, etc.

#### ✅ 4. Validators
- These are built-in Angular functions that you apply to form fields to enforce rules.
```
Validators.required      // field must be filled
Validators.email         // must be a valid email
Validators.minLength(3)  // must be at least 3 characters
```
> You pass them like this:

``` name: ['', [Validators.required, Validators.minLength(3)]] ```

#### ✅ Example
```
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-user-form.component.html',
})
export class ReactiveUserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // 💡 Create the form group with two fields
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
    }
  }
}

<!-- .html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <input formControlName="name" placeholder="Name" />
  <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
    Name is required and must be at least 3 characters
  </div>

  <input formControlName="email" placeholder="Email" />
  <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
    Please enter a valid email
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

#### ✅ 5. formGroup directive in HTML
> Tells Angular: “This \<form> is powered by Reactive Forms — here’s the group to use.”

#### ✅ 6. formControlName directive in HTML
> Tells Angular: “This \<input> is connected to a specific control in the form group.”

This ties it to:
``` this.fb.group({ name: [''] })```

#### ✅ 7. form.valid or form.invalid
- These are properties on the FormGroup that tell you whether the entire form passes validation.

- Used like this:
``` <button [disabled]="userForm.invalid">Submit</button> ```

#### ✅ 8. form.get('fieldName')
- Lets you grab one field from the form in TypeScript or HTML.
- Used for showing error messages:
``` *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched" ```


### 🔁 DYNAMIC FORM FIELDS — with FormArray

#### 🧠 What is a FormArray?
- A FormArray is like a list of FormControls (or even FormGroups), used when you don’t know how many items the user might add — think:
  - 📞 Multiple phone numbers
  - 🧠 Multiple skills
  - 🏷️ Dynamic tags

#### 🧪 Example
```
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

<!-- .html -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name" placeholder="Your name" />
  <br /><br />

  <div formArrayName="skills"> // ❗NO []
    <div *ngFor="let skill of skills.controls; let i = index">
      <input [formControlName]="i" placeholder="Enter a skill" /> // Because i is a variable (number) — it must be dynamically bound using [ ].
      <button type="button" (click)="removeSkill(i)">❌ Remove</button>
    </div>
  </div>

  <br />
  <button type="button" (click)="addSkill()">➕ Add Skill</button>

  <br /><br />
  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

#### 🔥 What You Learned
- FormArray - Lets you manage dynamic lists of controls (or groups)
- .push() - Add new control to the array
- .removeAt() - Remove a control by index
- formArrayName - Used in HTML to loop and bind controls
- ✅ formControlName expects an index when you’re inside a FormArray.



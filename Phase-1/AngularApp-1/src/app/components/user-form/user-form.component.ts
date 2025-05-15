import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user = {
    name: '',
    email: '',
  };

  onSubmit() {
    console.log('Form submitted:', this.user);
    alert(`Hello, ${this.user.name}! Form submitted successfully.`);
  }
}

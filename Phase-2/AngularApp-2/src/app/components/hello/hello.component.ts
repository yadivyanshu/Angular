import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../../services/objects.service';

@Component({
  selector: 'app-hello',
  imports: [CommonModule],
  templateUrl: './hello.component.html'
})
export class HelloComponent implements OnInit{
  users: any = [];
  loading = true;
  error = '';

  constructor(private objectService: ObjectService) {}

  ngOnInit() {
    this.objectService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}

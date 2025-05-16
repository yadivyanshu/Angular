# 🚀 Phase 2: Intermediate Angular
## 📚 Core Topics:
1.	Services & Dependency Injection
2.	Routing & Navigation
3.	HTTP Calls with HttpClient


## 🔍 Services & Dependency Injection
### ✅ What is a Service?
- A service is a class that contains logic you want to share across components.
- 🔧 Examples
	- Fetching data from APIs
	- Business logic (e.g., calculating totals)
	- Utility functions (e.g., formatting dates)
	- Managing global state (e.g., auth status, cart)

``` ng generate service user ```

### ✅ What is @Injectable()?
- It’s a decorator that marks a class as available for Dependency Injection (DI).
```
@Injectable({
  providedIn: 'root'  // Auto-register service in the app-wide injector
})
export class UserService {
  constructor() {}
}
```
> 💡 providedIn: 'root' = Makes the service singleton and available app-wide without manual module registration.

### ✅ What is Dependency Injection?
- Angular’s DI system automatically creates and gives you the instance of the service wherever you need it.
- You never write:
``` const userService = new UserService(); ❌ ```
- Instead, Angular does:
``` constructor(private userService: UserService) ✅ ```

#### ➡️ Benefits:
- Reusable
- Decouples logic from UI
-	Easy to test & mock
-	Singleton (shared instance) - One shared instance across app


### ✅ Where do you use a service?
In components or other services:
```
export class UserComponent {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers(); // call method
  }
}
```



## 🌐 Angular Routing & Navigation
> Routing is how Angular handles navigation between views (pages) in your app — without reloading the whole page like traditional websites.

### 🏗️ Setting Up Routing in a Standalone Angular App
#### Step 1: Define Routes
```
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { AboutComponent } from './components/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
```
> 🧠 This is the route configuration — mapping paths to components.

#### Step 2: Enable Routing in Main App
```
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```
#### Step 3: Add <router-outlet> in AppComponent
In app.component.html:
```
<nav>
  <a routerLink="/">🏠 Home</a> |
  <a routerLink="/about">ℹ️ About</a>
</nav>

<hr />

<router-outlet></router-outlet>
```
> 💡 <router-outlet> is a placeholder — Angular injects the current route’s component here.

### 🧠 BONUS: RouterLink vs href
```
<a href="/about">  <!-- 🔥 Triggers full page reload -->
<a routerLink="/about"> <!-- ✅ Angular-style navigation -->
```

### 🧠 PRO TIP: Wildcard Routes & 404
Add a 404 page route at the end:
``` { path: '**', component: NotFoundComponent }   ```


### 🔹 Route Parameters (:id, :slug, etc.)
#### ✅ Step-by-Step: Reading :id with ActivatedRoute
- Step 1: Create the Route
``` 
import { UserDetailsComponent } from './components/user-details.component';

export const routes: Routes = [
  { path: 'users/:id', component: UserDetailsComponent },
];
```

- Step 2: Read the id Param
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>👤 User Details</h2>
    <p>User ID: {{ userId }}</p>
  `
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}
```
> 🔥 Now Visit: http://localhost:4200/users/99 And you’ll see: User ID: 99

#### 🔄 BONUS: Use Observable for Live Changes
Instead of snapshot (static), use observable for dynamic updates:
``` 
  this.route.paramMap.subscribe(params => {
  this.userId = params.get('id');
});
```

### 🔹 Query Parameters
- ✅ Reading Query Params
```
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const category = params.get('category');
    const sort = params.get('sort');
    console.log({ category, sort });
  });
}
```

### 🔹 Navigating with Query Params
```
<a [routerLink]="['/products']" [queryParams]="{ category: 'books', sort: 'price' }">
  Books Sorted by Price
</a>
```

### 🔁 Programmatic Navigation with Angular Router
- You’ve already used <a routerLink="..."> for navigation. But what if you want to navigate from code? Like:
	- After a form submission, redirect the user
	- On button click, go to a dynamic route
	- Navigate based on logic (e.g. authentication)

#### ✅ The Hero: Router
> Angular’s Router service lets you navigate from TypeScript code.

#### 🔹 Step-by-Step Example:
##### 1. Inject the Router
```
import { Router } from '@angular/router';

constructor(private router: Router) {}
```

##### 2. Navigate via navigate()
```ts
loginUser() {
  // pretend login succeeded...
  this.router.navigate(['/profile']);
}
```
> 💡 /profile matches a route in your routes array.

##### 3. Navigate with Params
```ts
this.router.navigate(['/users', userId]);
// goes to /users/42
```

##### 4. Navigate with Query Params
```ts
this.router.navigate(['/products'], {
  queryParams: { category: 'books', sort: 'price' }
});
// goes to /products?category=books&sort=price
```

#### 🔥 BONUS: Replace URL Without History
Use replaceUrl: true to avoid adding it to browser history:
``` this.router.navigate(['/login'], { replaceUrl: true }); ```
#### 💡 Difference: navigate() vs navigateByUrl()
- navigate() - ['/user', 5] - More Angular-friendly (supports params/queryParams)
- navigateByUrl() - '/user/5?edit=true' - Raw string URLs

### 🔐 Route Guards (CanActivate)
> “Protect your app like a fortress 🛡️”
- 🤔 Real-world Examples
	- ✅ Allow only logged-in users to see /dashboard
	- 🚫 Block users without admin rights from /admin
	- ⚠️ Prompt user if they try to leave a form without saving


#### 🔹 CanActivate Guard (most used)
> Checks before navigating into a route.

##### ✅ Step-by-Step Example: AuthGuard
- Step 1: Create a Guard
``` ng generate guard guards/auth ```
> This creates auth.guard.ts with default canActivate() method.

- Step 2: Implement Logic in the Guard
```ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('auth_token');

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

- Step 3: Add Guard to Route
```ts
// In app.routes.ts
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
];
```
> Now /dashboard is protected – only accessible if logged in.

#### 🧠 Summary
- Angular evaluates them before completing route navigation
- Great for:
  - ✅ Auth
  - ✅ Role checks
  - ✅ Unsaved changes
  - ✅ Data preloading


### 🔐 Other Types of Guards
| **Guard**           | **When it Runs**                          | **Use Case**                |
|---------------------|-------------------------------------------|-----------------------------|
| `CanActivate`       | Before route is activated                 | Auth protection             |
| `CanActivateChild`  | Before child routes activate              | Protect subroutes           |
| `CanDeactivate`     | Before navigating away from a route       | Unsaved form warning        |
| `Resolve`           | Before loading route data                 | Prefetch from API           |
| `CanLoad`           | Before lazy-loaded module loads           | Heavy access control        |




## 🌐 HttpClient + API Integration in Angular

### 🔹 Step 1: Enable HTTP in Angular
```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```
> ✅ This gives your app the power to send HTTP requests.


### 🔹 Step 2: Create an API Service
Let’s use Angular’s dependency injection to isolate HTTP logic.

``` ng g service services/user ```

#### 🧰 Sample Service (user.service.ts)
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### 🔹 Step 3: Use API in Component
```ts
@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
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
```
#### 🧪 Template Example (user-list.component.html)
```ts
<h2>👥 User List</h2>

<div *ngIf="loading">Loading...</div>
<div *ngIf="error">{{ error }}</div>

<ul>
  <li *ngFor="let user of users">
    {{ user.name }} – {{ user.email }}
  </li>
</ul>
```

### 🚀 BONUS: Use POST in a Form
If you’ve got a registration form:
```ts
onSubmit() {
  this.userService.addUser(this.userForm.value).subscribe({
    next: (newUser) => alert('User created!'),
    error: () => alert('Failed to create user.')
  });
}
```

### 🔄 Reset & Patch Forms
```ts
// Pre-fill (patch)
this.form.patchValue({
  name: 'John',
  email: 'john@example.com'
});

// Reset
this.form.reset();
```

### 🧠 Key Concepts
| **Concept**      | **Description**                                           |
|------------------|-----------------------------------------------------------|
| `HttpClient`     | Built-in Angular service to make HTTP requests            |
| `Observable<T>`  | Async stream of data from HTTP request                    |
| `.subscribe()`   | Subscribes to the Observable to start it                  |
| `catchError`     | RxJS operator to handle errors                            |
| `tap()`          | Useful for side effects (like loading spinners)           |



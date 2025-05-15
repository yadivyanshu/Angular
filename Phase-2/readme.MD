# 🚀 Phase 2: Intermediate Angular
## 📚 Core Topics:
1.	Services & Dependency Injection
2.	Routing & Navigation
3.	HTTP Calls with HttpClient


## 🔍 Topic 1: Services & Dependency Injection
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







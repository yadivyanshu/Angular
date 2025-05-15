import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
        children: [
        {
            path: '',
            loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        },
        {
            path: 'hello',
            loadComponent: () => import('./components/hello-user/hello-user.component').then(m => m.HelloUserComponent),
        },
        {
            path: 'user-form',
            loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
        },
        {
            path: 'reactive-form',
            loadComponent: () =>
                import('./components/reactive-user-form/reactive-user-form.component').then(m => m.ReactiveUserFormComponent),
        }
        ]
    }
];

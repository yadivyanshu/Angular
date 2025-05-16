import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
            },
        ]
    },
    {
        path: 'hello',
        loadComponent: () => import('./components/hello/hello.component').then(m => m.HelloComponent),
        canActivate: [AuthGuard]
    }
];

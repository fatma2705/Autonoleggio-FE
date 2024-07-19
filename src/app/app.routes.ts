import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CarListComponent } from './components/car-list/car-list.component';

export const routes: Routes = [
    {
        path:"", redirectTo:"/home", pathMatch: "full"
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component:HomeComponent
    },
    {
        path: 'user/home' , component:UserHomeComponent
    },
    {
        path:'car/list' , component:CarListComponent
    }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserHomeComponent } from './components/user-profile/user-home/user-home.component';
import { CarListComponent } from './components/auto/car-list/car-list.component';
import { AutoDetailComponent } from './components/auto/auto-detail/auto-detail.component';
import { PrenotazioniListComponent } from './components/prenotazioni/prenotazioni-list/prenotazioni-list.component';
import { PrenotazioniDetailComponent } from './components/prenotazioni/prenotazioni-detail/prenotazioni-detail.component';
import { UserAccountComponent } from './components/user-profile/user-account/user-account.component';
import { PaymentComponent } from './components/user-profile/payment/payment.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "/home", pathMatch: "full"
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'user/home', component: UserHomeComponent
    },
    {
        path: 'car/list', component: CarListComponent
    },
    {
        path: 'car/:id', component: AutoDetailComponent
    },
    {
        path: 'prenotazioni', component: PrenotazioniListComponent
    },
    {
        path: 'prenotazioni/detail/:id', component: PrenotazioniDetailComponent
    },
    {
         path: 'user/account', component: UserAccountComponent 
    },
    { 
        path: 'user/payment', component: PaymentComponent 
    }
];

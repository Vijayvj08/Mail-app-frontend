import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Inbox } from './pages/inbox/inbox';
import { Compose } from './pages/compose/compose';
import { Sent } from './pages/sent/sent';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'inbox', component: Inbox},
    {path: 'compose', component: Compose},
    {path: 'sent', component:Sent}
];

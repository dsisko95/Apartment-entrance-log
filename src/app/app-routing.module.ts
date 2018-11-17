import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogsDetailListComponent } from './logs-detail-list/logs-detail-list.component';
import { AdministrationComponent } from './administration-comp/administration-comp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'

  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'logsdetail',
    canActivate: [AuthGuard],
    component: LogsDetailListComponent,
  },
  {
    path: 'logsdetail/insertdata',
    canActivate: [AuthGuard],
    component: AdministrationComponent,
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

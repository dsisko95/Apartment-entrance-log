import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogsDetailListComponent } from './logs-detail-list/logs-detail-list.component';
import { AuthAdminGuard } from './auth-admin.guard';
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
      children: [{
        path: 'insertdata',
        canActivate: [AuthAdminGuard],
        component: AdministrationComponent,
      }]
    },
    { path: '**', redirectTo: '/login' }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

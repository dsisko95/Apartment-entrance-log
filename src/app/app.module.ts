import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule } from 'ng2-materialize';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { RouterModule, Routes } from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { AuthGuard } from './auth.guard';
import { AuthAdminGuard  } from './auth-admin.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { setUsernameAndRoleOnMenuService } from './set-username-and-role-on-menu.service';
//ngx 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
//materialize
import { MzSidenavModule } from 'ng2-materialize';
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize';
import { MzDropdownModule } from 'ng2-materialize';
import { MzSelectModule } from 'ng2-materialize';
import { MzProgressModule } from 'ng2-materialize';
import { MzRadioButtonModule } from 'ng2-materialize';
import { MzDatepickerModule } from 'ng2-materialize';
import { MzSwitchModule } from 'ng2-materialize';
import { MzCardModule } from 'ng2-materialize';
import { MzInputModule } from 'ng2-materialize';
import { MzTooltipModule } from 'ng2-materialize';
import { MzModalModule } from 'ng2-materialize';
import { MzCollapsibleModule } from 'ng2-materialize';
// progressbar
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http'; 
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'; 
//materializeToast
import { MaterializeModule } from "angular2-materialize";

import { AppComponent } from './app.component';
import { LogsDetailListComponent } from './logs-detail-list/logs-detail-list.component';
import { FilterCityPipe } from './pipes/filter-city.pipe';
import { FilterOwnerPipe } from './pipes/filter-owner.pipe';
import { FilterClientNamePipe } from './pipes/filter-client-name.pipe';
import { FilterStatusPipe } from './pipes/filter-status.pipe';
import { LoginFormComponent } from './login-form/login-form.component';
import { MzTabModule } from 'ng2-materialize';
import { FooterComponent } from './footer/footer.component';
import { AdministrationCompComponent } from './administration-comp/administration-comp.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'logsdetail',
    canActivate: [AuthGuard],
    component: LogsDetailListComponent,
  },
  {
    path: 'logsdetail/insertdata',
    canActivate: [AuthAdminGuard],
    component: AdministrationCompComponent,
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  declarations: [
    AppComponent,
    LogsDetailListComponent,
    FilterCityPipe,
    FilterOwnerPipe,
    FilterClientNamePipe,
    FilterStatusPipe,
    LoginFormComponent,
    FooterComponent,
    AdministrationCompComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgPipesModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzIconModule,
    MzIconMdiModule,
    MzButtonModule,
    MzDropdownModule,
    MzSelectModule,
    MzProgressModule,
    MzRadioButtonModule,
    MzDatepickerModule,
    MaterializeModule,
    MzSwitchModule,
    MzCardModule,
    HttpClientModule,
    NgProgressModule,
    Ng2OrderModule,
    MzTabModule,
    MzInputModule,
    RouterModule.forRoot(appRoutes),
    NgxSpinnerModule,
    HttpClientModule, 
    NgHttpLoaderModule,
    MzTooltipModule,
    MzModalModule,
    MzCollapsibleModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true}, LoginServiceService, AuthGuard, setUsernameAndRoleOnMenuService, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

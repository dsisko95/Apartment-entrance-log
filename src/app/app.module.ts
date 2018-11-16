import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './services/login-service.service';
import { AuthGuard } from './auth.guard';
import { AuthAdminGuard } from './auth-admin.guard';
import { setUserOnMenu } from './services/set-username-on-menu.service';
import { AppComponent } from './app.component';
import { LogsDetailListComponent } from './logs-detail-list/logs-detail-list.component';
import { FilterCityPipe } from './pipes/filter-city.pipe';
import { FilterOwnerPipe } from './pipes/filter-owner.pipe';
import { FilterClientNamePipe } from './pipes/filter-client-name.pipe';
import { FilterStatusPipe } from './pipes/filter-status.pipe';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { AdministrationComponent } from './administration-comp/administration-comp.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from './feature-modules/materialize.module';
import { ProgressBarModule } from './feature-modules/progressbar.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LogsDetailListComponent,
    LoginFormComponent,
    FooterComponent,
    AdministrationComponent,
    FilterCityPipe,
    FilterOwnerPipe,
    FilterClientNamePipe,
    FilterStatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterializeModule,
    ProgressBarModule
  ],
  providers: [LoginService, setUserOnMenu, AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

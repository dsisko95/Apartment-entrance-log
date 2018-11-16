import { NgModule } from '@angular/core';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http'; 
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
    declarations: [],
    imports: [ ],
    exports: [
        NgProgressModule,
        HttpClientModule,
        NgHttpLoaderModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true}],
})
export class ProgressBarModule {}
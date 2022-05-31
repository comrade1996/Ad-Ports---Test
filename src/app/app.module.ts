import { HttpLoadingInterceptor } from './common/http-loading.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser' 
import { NgxAwesomePopupModule, DialogConfigModule, ConfirmBoxConfigModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';  
import { GlobalErrorHandler } from './common/global-error-handler';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxAwesomePopupModule.forRoot(), 
    DialogConfigModule.forRoot(),  
    ConfirmBoxConfigModule.forRoot(),  
    ToastNotificationConfigModule.forRoot() ,
    NgxUiLoaderModule
  
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

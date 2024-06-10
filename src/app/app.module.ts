import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7025"],
      }
    }),

  ],
  providers: [
    provideClientHydration(),
    {provide:"baseUrl",useValue:"https://localhost:7025",multi:true},
    provideHttpClient(withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

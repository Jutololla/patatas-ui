import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './helpers/interceptor/auth.interceptor';
@NgModule({
	declarations: [ AppComponent, LoginComponent, ListComponent ],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule.forRoot([ 
      { path: '', component: LoginComponent },
      {path:'dashboard', component: DashboardComponent},
      {path: 'list', component: ListComponent}
    ]),
  NgbModule
	],
	providers: [authInterceptorProviders],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

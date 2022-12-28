import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
	declarations: [ AppComponent, LoginComponent ],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule.forRoot([ 
      { path: '', component: LoginComponent },
      {path:'dashboard', component: DashboardComponent}
    ])
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

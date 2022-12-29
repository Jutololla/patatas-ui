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
import { NavigationBarComponent } from './components/navigationBar/navigation-bar.component';
import { UserDetailsComponent } from './components/userDetails/user-details/user-details.component';

const routes = [
	{ path: '', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'list', component: ListComponent },
	{ path: 'detail/:id', component: UserDetailsComponent 	},
	{ path: '**', component: LoginComponent }
];
@NgModule({
	declarations: [ AppComponent, LoginComponent, ListComponent, NavigationBarComponent ],
	imports: [ BrowserModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(routes), NgbModule ],
	providers: [ authInterceptorProviders ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptorProviders } from './helpers/interceptor/auth.interceptor';
import { NavigationBarComponent } from './components/navigationBar/navigation-bar.component';
import { UserDetailsComponent } from './components/userDetails/user-details.component';

const routes = [
	{ path: '', component: LoginComponent },
	{ path: 'list', component: ListComponent },
	{ path: 'detail/:id', component: UserDetailsComponent 	},
	{ path: '**', component: LoginComponent }
];
@NgModule({
	declarations: [ AppComponent, LoginComponent, ListComponent, NavigationBarComponent, UserDetailsComponent ],
	imports: [ BrowserModule, HttpClientModule, ReactiveFormsModule,
        FormsModule, RouterModule.forRoot(routes), NgbModule ],
	providers: [ authInterceptorProviders ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

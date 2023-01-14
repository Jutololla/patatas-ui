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
import { CreateUserComponent } from './components/create-user/create-user.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

registerLocaleData(en);

const routes = [
	{ path: '', component: ListComponent },
	{ path: 'create', component: CreateUserComponent },
	{ path: 'detail/:id', component: UserDetailsComponent 	},
	{ path: '**', component: ListComponent }
];
@NgModule({
	declarations: [ AppComponent, LoginComponent, ListComponent, NavigationBarComponent, UserDetailsComponent, CreateUserComponent ],
	imports: [ BrowserModule, HttpClientModule, ReactiveFormsModule,
        FormsModule, RouterModule.forRoot(routes), NgbModule, BrowserAnimationsModule,NzNotificationModule ],
	providers: [ authInterceptorProviders, { provide: NZ_I18N, useValue: en_US } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

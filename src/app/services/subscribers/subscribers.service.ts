import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SubscribersService {
	constructor(private http: HttpClient, private router: Router) {}

	authenticationToken: string = '';
	logIn(username: string, password: string) {
		const url: string = `${environment.subscribersBackEnd}account/login`;
		const body = { UserName: username, Password: password };
		this.http.post(url, body).pipe(take(1)).subscribe((data: any) => {
			if (data.Status === 1) {
				this.authenticationToken = data.Token;
				this.router.navigate([ '/dashboard' ]);
			}
		}, (error) => null);
	}
	getListOfSubscribers(criteria: string, page: number, count: number, sortOrder: string, sortType: number) {
		const url: string = `${environment.subscribersBackEnd}subscribers/`;
		const params = { criteria, page, count, sortOrder, sortType };
		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', 'Bearer ' + this.authenticationToken);
		return this.http.get(url, { headers, params });
	}
}

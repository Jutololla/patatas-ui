import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class SubscribersService {
	constructor(private http: HttpClient, private router: Router, private token: TokenStorageService) {}
	getListOfSubscribers(criteria: string, page: number, count: number, sortOrder: string, sortType: number) {
		const url: string = `${environment.subscribersBackEnd}subscribers/`;
		const params = { criteria, page, count, sortOrder, sortType };
		return this.http.get(url, { params });
	}
	getSubscriberInfoById(id: string) {
		const url: string = `${environment.subscribersBackEnd}subscribers/${id}`;
		return this.http.get(url);
	}
	deleteSubscriberById(id: string) {
		const url: string = `${environment.subscribersBackEnd}subscribers/${id}`;
		return this.http.delete(url);
	}
	updateSubscriber(body: {
		Id: string;
		Name: string;
		Email: string;
		CountryCode: string;
		PhoneNumber: string;
		Area: string;
		JobTitle: string;
		Topics: any[];
	}) {
		const url: string = `${environment.subscribersBackEnd}subscribers/${body.Id}`;
		const updateBody = body;
		return this.http.put(url, updateBody);
	}
	getListOfCountryCodes() {
		const criteria = '';
		const page = 1;
		const count = 300;
		const sortOrder = 'Name';
		const sortType = 0;		
		const url: string = `${environment.subscribersBackEnd}countries/`;
		const params = { criteria, page, count, sortOrder, sortType };
		return this.http.get(url, { params });
	}
}

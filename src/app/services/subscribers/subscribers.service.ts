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
	constructor(private http: HttpClient, private router: Router,private token: TokenStorageService) {}	
	getListOfSubscribers(criteria: string, page: number, count: number, sortOrder: string, sortType: number) {
		const url: string = `${environment.subscribersBackEnd}subscribers/`;
		const params = { criteria, page, count, sortOrder, sortType };
		return this.http.get(url, { params });
	}
	getSubscriberInfoById(id:string){
		const url:string=`${environment.subscribersBackEnd}subscribers/${id}`
		return this.http.get(url)
	}
}

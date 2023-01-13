import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SubscribersService {
	constructor(private http: HttpClient) {}
	createTechnician(body: {
		id: number;
		full_name: string;
		id_number: number;
		phone_number: string;
		email_address: string;
		positon_name: string;
		resources: string[];
	}) {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician`;
		const postBody = body;
		return this.http.post(url, postBody);
	}
	getTechnitians(_page: number=1, _limit: number=10):Observable<any> {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician`;
		const params = { _page, _limit};
		return this.http.get(url, { params,observe: "response" });
	}
	getTechnicianInfoById(id: string) {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician/${id}`;
		return this.http.get(url);
	}
	updateTechnician(body: {
		id: number;
		full_name: string;
		id_number: number;
		phone_number: string;
		email_address: string;
		positon_name: string;
		resources: string[];
	}) {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician/${body.id}`;
		const updateBody = body;
		return this.http.put(url, updateBody);
	}
	deleteTechnicianById(id: string) {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician/${id}`;
		return this.http.delete(url);
	}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technician } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TechniciansService {
	constructor(private http: HttpClient) {}
	createTechnician(body: Technician) {
		const url: string = environment.techniciansUrl;
		const postBody = body;
		return this.http.post(url, postBody);
	}
	getTechnitians(_page: number=1, _limit: number=10):Observable<any> {
		const url: string = `${environment.techniciansUrl}/5OATTa/technician`;
		const params = { _page, _limit};
		return this.http.get(url, { params,observe: "response" });
	}
	getFilteredTechnician(fieldName:string,queryParam:string){
		const url: string = `${environment.techniciansUrl}/5OATTa/technician`;
		const key:string=`${fieldName}_like`
		const params={[key]:queryParam}
		return this.http.get(url,{params})
	}
	getTechnicianInfoById(id: string) {
		const url: string = `${environment.techniciansUrl}/${id}`;
		return this.http.get(url);
	}
	updateTechnician(id:string,body: Technician) {
		const url: string = `${environment.techniciansUrl}/${id}`;
		const updateBody = body;
		return this.http.put(url, updateBody);
	}
	deleteTechnicianById(id: string) {
		const url: string = `${environment.techniciansUrl}/${id}`;
		return this.http.delete(url,{ observe: "response" });
	}
}

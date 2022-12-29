import { Component } from '@angular/core';
import { TokenStorageService } from './services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ],
	template: ` <child (changeLogStatus)="getNotification($event)"></child> `
})
export class AppComponent {
	title = 'patatas-ui';
	isLoggedIn = false;
	constructor(private tokenStorageService: TokenStorageService) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorageService.getToken();
	}
	getNotification(evt: any) {
		this.isLoggedIn = evt;
		console.log(evt);
	}
}

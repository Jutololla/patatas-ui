import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: [ './user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
	id: string = '';
	subscriberInfo: any;
	constructor(
		private route: ActivatedRoute,
		private subcribersService: SubscribersService,
		private tokenStorageService: TokenStorageService,
		private router: Router
	) {}
	ngOnInit(): void {
		if (!this.tokenStorageService.getToken()) {
			this.router.navigateByUrl('');
		}
		this.route.queryParams.subscribe((params) => {
			this.id = params['id'];
		});
		this.subcribersService.getSubscriberInfoById(this.id).pipe(take(1)).subscribe({
			next: (data) => {
				const content: any = data;
				if (!!content) {
					this.subscriberInfo = content;
				}
			},
			error: (err) => {
				console.log(JSON.parse(err.error).message);
			}
		});
	}
}

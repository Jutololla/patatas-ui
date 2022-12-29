import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
	constructor(
		private subcribersService: SubscribersService,
		private tokenStorageService: TokenStorageService,
		private router: Router
	) {}
	criteria = '';
	page = 1;
	count = 10;
	sortOrder = 'Name';
	sortType = 0;
	collectionSize = 0;
	subscribers: any;

	ngOnInit(): void {
		if (!!this.tokenStorageService.getToken()) {
			this.refreshTable();
		} else {
			this.router.navigateByUrl('');
		}
	}

	refreshTable() {
		this.subcribersService
			.getListOfSubscribers(this.criteria, this.page, this.count, this.sortOrder, this.sortType)
			.pipe(take(1))
      .subscribe({
        next: data => {
          const content:any = data;
          if(!!content){this.subscribers = content.Data;
          this.collectionSize = content.Count;}
        },
        error: err => {
          console.log(JSON.parse(err.error).message)
        }
      });
    }
  }


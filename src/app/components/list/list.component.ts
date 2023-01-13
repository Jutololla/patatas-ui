import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal
	) {}
	criteria = '';
	_page = 1;
	_limit = 10;
	sortBy = 'Name';
	sortType = 0;
	collectionSize = 0;
	technicians: any[] = [];
	closeResult: string = '';
	isLoading: boolean = true;

	ngOnInit(): void {
		this.refreshTable();
	}

	refreshTable() {
		this.isLoading = true;
		this.subcribersService.getTechnitians(this._page, this._limit).pipe(take(1)).subscribe({
			next: (response) => {
				const content: any = response;
				if (!!content) {
					this.technicians = content.body;
					this.collectionSize = response.headers.get('x-total-count');
				}
			},
			error: (err) => {
				if (err.status == 401) {
					this.router.navigateByUrl('');
				}
			},
			complete: () => {
				this.isLoading = false;
			}
		});
	}
	deleteSubscritor(id: string) {
		this.subcribersService.deleteTechnicianById(id).pipe(take(1)).subscribe({
			next: (response) => {
				if (response.status == 200) {
					const index = this.technicians.findIndex((item) => item.id === id);
					if (index > -1) {
						this.technicians.splice(index, 1);
						//aqui se lanza una notificación de que se eliminó
					}
				}else{
						//aqui se lanza una notificación de que no se pudo
				}
			},
			error: (_err) => {}
		});
	}
	open(content: any, id: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: string) => {
			if (result === 'yes') {
				this.isLoading=true
				this.deleteSubscritor(id);
				this.isLoading=false
			}
		});
	}

	goToUserDetails(id: string) {
		this.router.navigate([ 'detail', id ]);
	}
	goToCreateUser() {
		this.router.navigateByUrl('create');
	}
}

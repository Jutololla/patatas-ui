import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take } from 'rxjs';
import { TechniciansService } from 'src/app/services/technicians/technicians.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
	constructor(
		private techniciansService: TechniciansService,
		private router: Router,
		private modalService: NgbModal,
		private notification: NzNotificationService	) {}

	_page = 1;
	_limit = 10;
	collectionSize = 0;
	technicians: any[] = [];
	closeResult: string = '';
	isLoading: boolean = true;
	selectedValue:string=""	
	listOfOption: Array<{ value: string; text: string }> = [];
	nzFilterOption = (): boolean => true;

	ngOnInit(): void {
		this.refreshTable();
	}

	refreshTable() {
		this.isLoading = true;
		this.techniciansService.getTechnitians(this._page, this._limit).pipe(take(1)).subscribe({
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
	deleteTechnician(id: string) {
		this.techniciansService.deleteTechnicianById(id).pipe(take(1)).subscribe({
			next: (response) => {
				if (response.status == 200) {
					const index = this.technicians.findIndex((item) => item.id === id);
					if (index > -1) {
						this.notification.success(
							'Success',
							`The technician ${this.technicians[index].full_name} with id ${id} was deleted`,
							{
								nzDuration: 0,
								nzPlacement: 'topRight'
							}
							);
							this.technicians.splice(index, 1);	
					}
				} else {
					this.notification.error('Error', `There was an unexpected error. Please try again`, {
						nzDuration: 0,
						nzPlacement: 'topRight'
					});
				}
			},
			error: (_err) => {}
		});
	}
	open(content: any, id: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: string) => {
			if (result === 'yes') {
				this.isLoading = true;
				this.deleteTechnician(id);
				this.isLoading = false;
			}
		});
	}

	goToUserDetails(id: string) {
		this.router.navigate([ 'detail', id ]);
	}
	goToCreateUser() {
		this.router.navigateByUrl('create');
	}
	handleSearch(){
		console.log(this.selectedValue);
		if(this.listOfOption.map((option)=>option.value).includes(this.selectedValue)){
			this.goToUserDetails(this.selectedValue)
		} 
	}

	search(value: string): void {
		this.techniciansService.getFilteredTechnician("full_name",value).subscribe(data => {
			const arrayData=data as any[]
			const listOfOption: Array<{ value: string; text: string }> = [];
			arrayData.forEach(item => {
			  listOfOption.push({
				value: item.id,
				text: item.full_name
			  });
			}); 
			this.listOfOption = listOfOption;
		  });
	  }
}

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
	page = 1;
	count = 10;
	sortOrder = 'Name';
	sortType = 0;
	collectionSize = 0;
	subscribers: any;
	closeResult: string="";

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
			if(err.status==401){
				this.router.navigateByUrl('')
			}
        }
      });
    }
	deleteSubscritor(id:string){
		this.subcribersService.deleteSubcriberById(id).pipe(take(1))
		.subscribe({
		  next: _data => {this.router.navigateByUrl(''); },
		  error: _err => {}
		})
		
	}
	open(content: any, id: any) {  
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: string) => {  
		  this.closeResult = `Closed with: ${result}`;  
		  if (result === 'yes') {  
			this.deleteSubscritor(id);  
		  }  
		});  
	  }

	goToUserDetails(id:string) {
		this.router.navigate([ 'detail', id ]);
   }
  }


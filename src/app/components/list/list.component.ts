import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private subcribersService: SubscribersService) { }
  criteria=""
  page=1
  count=10
  sortOrder="Name"
  sortType=0
  collectionSize=0
  subscribers: any

  
  ngOnInit(): void {
    this.refreshTable()
  }

  refreshTable(){
    this.subcribersService.getListOfSubscribers(this.criteria,this.page,this.count,this.sortOrder,this.sortType)
    .pipe(take(1)).subscribe((data: any) => {
			if (!!data) {
				this.subscribers = data.Data;
				this.collectionSize=data.Count
			}
		}, (_error) => null);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,private router: Router) { }
  userInfo:any
  welcomeMessage:string=""
  ngOnInit(): void {
    this.userInfo=this.tokenStorageService.getUser()
    this.welcomeMessage=`Bienvenid@ ${this.userInfo.FirstName} ${this.userInfo.LastName}`||"Nombre de usuario"
  }
  logOut(){
    this.tokenStorageService.signOut()
    this.router.navigateByUrl('');
  }

}

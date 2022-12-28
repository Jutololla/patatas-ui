import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginError:string="";

  constructor(private subcribersService: SubscribersService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
});

  authenticationToken:string=""
  handleLogInSubmit(){
    const {username,password} = this.loginForm.value
    if(this.loginForm.valid){
      this.subcribersService.logIn(username,password)
    }else{
      this.loginError=" |||Ingrese sus datos "
    }
/*     this.subcribersService.logIn("patata","MrPotat0").pipe(take(1)).subscribe((data:any)=>{
      console.log(data)
      this.authenticationToken=data?.Token}) */
    
/*     if(this.loginForm.valid){
      this.subcribersService.logIn(username,password)
      .pipe(take(1)).subscribe((data:any)=>{
        if(data.Status==1){
          this.authenticationToken=data?.Token
          //this.router.navigate(['/dashboard']);
        }else{
          this.loginError = "Verifique sus datos de ingreso";
        }        
      }
      )
    }  else{
      this.loginError = "Ingrese sus datos";
    }  
  } */
}
}
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private toastr:CustomToastrService,private router:Router,public authService:AuthService){
    authService.identityCheck();
  }
  LogOut(){
    if(localStorage)
    {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    this.toastr.ShowMessage("Çıkış yapma işlemi tamamlandı","Çıkış Yapıldı",ToastrMessageType.Success,ToastrPositon.TopRight);
    this.authService.identityCheck();
    this.router.navigateByUrl('');

  }
}

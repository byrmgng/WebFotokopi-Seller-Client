import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../services/custom-toastr.service';
import { AuthService, _isAuthenticate } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router:Router = inject(Router);
  const toastr:CustomToastrService = inject(CustomToastrService);
  const authService:AuthService=inject(AuthService);
  authService.identityCheck();
  if(!_isAuthenticate)
  {
    router.navigate(["login"], { queryParams: { returnUrl: state.url }})
          .then(() => {
            toastr.ShowMessage("Sayfaya erişebilmek için giriş yapmanız gerekmektedir.","Yetkisiz Erişim!",ToastrMessageType.Warning,ToastrPositon.BottomFullWidth);
          });
  }
  
  return true;
};

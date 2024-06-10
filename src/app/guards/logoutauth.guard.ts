import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../services/custom-toastr.service';
import { _isAuthenticate } from '../services/auth.service';

export const logoutauthGuard: CanActivateFn = (route, state) => {

  const router:Router = inject(Router);
  const toastr:CustomToastrService = inject(CustomToastrService);

  if(_isAuthenticate)
  {
    router.navigate([""]);
  }
  
  return true;
};

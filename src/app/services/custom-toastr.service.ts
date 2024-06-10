import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  
  
  ShowMessage(message:string,title:string,messageType:ToastrMessageType,messagePosition:ToastrPositon){
    this.toastr[messageType](message,title,{positionClass:messagePosition});
    setTimeout(() => {
      this.toastr.clear(); // veya kapatma işlemini gerçekleştiren bir metod kullanın
    }, 5000);
  }

}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
export enum ToastrPositon{
  TopCenter = "toast-top-center",
  TopLeft ="toast-top-left",
  TopRight = "toast-top-right",
  TopFullWidth="toast-top-full-width",
  BottomCenter = "toast-bottom-center",
  BottomLeft = "toast-top-left",
  BottomRight = "toast-top-right",
  BottomFullWidth ="toast-bottom-full-width"

}

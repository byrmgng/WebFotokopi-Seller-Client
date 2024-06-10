import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner:NgxSpinnerService){
  }
  showSpinner(){
    this.spinner.show("ngxSpinner");
    setTimeout(()=>this.hideSpinner(),20000);
  }
  hideSpinner(){
    this.spinner.hide("ngxSpinner");
  }
}

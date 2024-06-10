import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder } from '@angular/forms';
import { SellerService } from '../../services/models/seller.service';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CityService } from '../../services/models/city.service';
import { DistrictService } from '../../services/models/district.service';
import { ListCity } from '../../contracts/city/ListCity';
import { ListDistrict } from '../../contracts/district/ListDistrict';
import { UpdateSellerAddress } from '../../contracts/seller/updateSellerAddress';
import { GetSellerAccountInfo } from '../../contracts/seller/getSellerAccountInfo';
import { BaseResponse } from '../../contracts/BaseResponse';
import { UpdateSeller } from '../../contracts/seller/updateSeller';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrl: './seller-info.component.scss'
})
export class SellerInfoComponent extends BaseComponent implements OnInit, AfterViewChecked{
  constructor(private sellerService:SellerService,spinner:NgxSpinnerService,private cityService:CityService,private districtService:DistrictService, private toastrService:CustomToastrService){
    super(spinner);
  }
  cities: ListCity[] = [];
  districts: ListDistrict[] = [];
  districtId!: string;
  result!:object|GetSellerAccountInfo|any;
  @ViewChild('citySelect') citySelect: any;
  @ViewChild('districtSelect') districtSelect: any;
  @ViewChild('address') address: any;
  @ViewChild('companyName') companyName: any;
  @ViewChild('description') description: any;
  @ViewChild('phoneNumber') phoneNumber:any;
  @ViewChild('logo') logo:any;
  @ViewChild('logo2') logo2:any;

  
  ngOnInit():void{
    this.showSpinner();
    this.cityService.getCities().subscribe({next: (citiesData:object|any) => {this.cities = citiesData.cities; }});
    this.sellerService.GetSellerAccountInfo().subscribe({next: (result:object|any) => {
      this.result = result.getSellerAccountInfo; 
      this.citySelect.nativeElement.value = this.result.cityID;
      this.changeCity();
      this.address.nativeElement.value = this.result.address;
      this.companyName.nativeElement.value = this.result.companyName;
      this.description.nativeElement.value = this.result.description;
      this.phoneNumber.nativeElement.value = this.result.phoneNumber;
      this.districtId = this.result.districtID;
      this.hideSpinner();

    }});
  }

 ngAfterViewChecked():void{
  if(this.districtId)
    this.districtSelect.nativeElement.value = this.districtId;

 }

 changeCity(){
  this.showSpinner();
  const id = this.citySelect.nativeElement.value;
  this.districtService.getCities(id)
    .subscribe({
      next: (districtsData:object|any) => {
        this.districts = districtsData.districts;
        },
      error: (error) => {
        if (error.error){
          this.toastrService.ShowMessage(error+" "+error.error+" "+error.error.message,"Hata",ToastrMessageType.Error,ToastrPositon.BottomFullWidth);
        }
        else{
          this.toastrService.ShowMessage("İlçeler yüklenirken bir hata karşılaşıldı","Hata",ToastrMessageType.Error,ToastrPositon.BottomFullWidth);
        }
      }
    });
    this.hideSpinner();
  }
  changeDistrict(){
    this.districtId = this.districtSelect.nativeElement.value;
  }
  async AddressUpdate(){
    const data: UpdateSellerAddress = {
      districtID : this.districtSelect.nativeElement.value,
      address : this.address.nativeElement.value
    }
    this.showSpinner();
    const result: BaseResponse = await this.sellerService.UpdateSellerAddress(data);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastrService.ShowMessage(result.message, "Güncelleme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
    } else {
      this.toastrService.ShowMessage(result.message, "Güncelleme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }

  }
  async SellerInfoUpdate(){
    const data: UpdateSeller = {
      companyName : this.companyName.nativeElement.value,
      description : this.description.nativeElement.value
    }
    this.showSpinner();
    const result: BaseResponse = await this.sellerService.UpdateSeller(data);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastrService.ShowMessage(result.message, "Güncelleme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
    } else {
      this.toastrService.ShowMessage(result.message, "Güncelleme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }

  }

  async SellerLogoUpdate(){
    const formData = new FormData();
    const fileInput = this.logo.nativeElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('Logo', file, file.name);
    }
    this.showSpinner();
    const result:BaseResponse = await this.sellerService.UpdateSellerLogo(formData);
    this.hideSpinner();

    if(result.succeeded)
      this.toastrService.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
    else
      this.toastrService.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarısız",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
  }
  async SellerLogoUpdate2(){
    const formData = new FormData();
    const fileInput = this.logo2.nativeElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('Logo2', file, file.name);
    }
    this.showSpinner();
    const result:BaseResponse = await this.sellerService.UpdateSellerLogo2(formData);
    this.hideSpinner();

    if(result.succeeded)
      this.toastrService.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
    else
      this.toastrService.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarısız",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
  }
}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Seller } from '../../entities/seller';
import { CreateSeller } from '../../contracts/seller/createSeller';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SellerService } from '../../services/models/seller.service';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { CityService } from '../../services/models/city.service';
import { ListCity } from '../../contracts/city/ListCity';
import { DistrictService } from '../../services/models/district.service';
import { ListDistrict } from '../../contracts/district/ListDistrict';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private sellerService:SellerService,private toastrService:CustomToastrService,spinner:NgxSpinnerService,private cityService:CityService,private districtService:DistrictService,private router: Router) {
    super(spinner);
  }
  frm!:FormGroup;
  cities: ListCity[] = [];
  districts: ListDistrict[] = [];
  districtId!: string;
  @ViewChild('citySelect') citySelect: any;
  @ViewChild('districtSelect') districtSelect: any;

  ngOnInit(): void {
    this.cityService.getCities().subscribe({next: (citiesData:object|any) => {this.cities = citiesData.cities; }});
    
    this.frm = this.formBuilder.group({
      companyName: ["",[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
      districtId:["",[Validators.required]],
      address:["",[Validators.required,Validators.maxLength(200),Validators.minLength(20)]],
      phoneNumber:["",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]{10}')]],
      email:["",[Validators.required,Validators.email,Validators.maxLength(50),Validators.minLength(5)]],
      password:["",[Validators.required,Validators.maxLength(30),Validators.minLength(8)]],
      passwordAgain:["",[Validators.required,Validators.maxLength(30),Validators.minLength(8)]],
      iAgree:[false,[Validators.requiredTrue]]
    }, { validators: (group:AbstractControl):ValidationErrors | null => {
      let password = group.get("password")?.value;
      let passwordAgain = group.get("passwordAgain")?.value;
      return password === passwordAgain ? null : { notSame:true};
    }}); 
  }
  get component(){
    return this.frm.controls;
  }
  submitted:boolean=false;
  async onSubmit( data:Seller ){
    this.submitted=true;
    if(this.frm.invalid)
      return;
    this.showSpinner();
    const result : CreateSeller = await this.sellerService.createSeller(data);
    this.hideSpinner();
    if(result.succeeded)
    {
      this.toastrService.ShowMessage(result.message,"Kayıt Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth);
      this.router.navigateByUrl('/login')
    }
    else
    {
      this.toastrService.ShowMessage(result.message,"Kayıt Başarısız",ToastrMessageType.Error,ToastrPositon.BottomFullWidth);
    }
  }
  async changeCity(){
    const id = this.citySelect.nativeElement.value;
    this.showSpinner();
    this.districtService.getCities(id)
      .subscribe({
        next: (districtsData:object|any) => {this.districts = districtsData.districts;},
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
  async changeDistrict(){
    this.districtId = this.districtSelect.nativeElement.value;
  }
}

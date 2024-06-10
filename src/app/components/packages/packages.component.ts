import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PackageService } from '../../services/models/package.service';
import { PackageFeature } from '../../contracts/Package/PackageFeatures';
import { PostPackage } from '../../entities/postPackage';
import { FormGroup } from '@angular/forms';
import { CreatePackage } from '../../contracts/Package/CreatePackage';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { GetPackage } from '../../entities/getPackage';
import { DeletePackage } from '../../contracts/Package/DeletePackage';
import { UpdatePackage } from '../../contracts/Package/UpdatePackage';
import { PutPackage } from '../../entities/putPackage';
import { FilterPackage } from '../../entities/filterPackage';
import { debug } from 'console';



@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent extends BaseComponent implements OnInit, AfterViewInit {
  packageFeature!: PackageFeature;
  packages: GetPackage[] = [];
  removePackagesID:string|any;
  updatePackagesID:string|any;
  updateOrCreate:boolean = false; //false = create , true = update
  frm!: FormGroup;
  submitted = false;
  

  constructor(
    spinner: NgxSpinnerService,
    private packageService: PackageService,
    private toastr: CustomToastrService,
  ) {
    super(spinner);
  }
  //Filter Elements
  @ViewChild('filterName') filterName: any;
  @ViewChild('filterPaperSize') filterPaperSize: any;
  @ViewChild('filterPaperType') filterPaperType: any;
  @ViewChild('filterSheetsPerPage') filterSheetsPerPage: any;
  @ViewChild('filterColorMode') filterColorMode: any;
  @ViewChild('filterDuplexMode') filterDuplexMode: any;  
  @ViewChild('filterIsActive') filterIsActive: any;
  
  // Add & Update Package Elements
  @ViewChild('addPackageName') addPackageName: any;
  @ViewChild('addPackagePaperSize') addPackagePaperSize: any;
  @ViewChild('addPackagePaperType') addPackagePaperType: any;
  @ViewChild('addPackageSheetsPerPage') addPackageSheetsPerPage: any;
  @ViewChild('addPackageColorMode') addPackageColorMode: any;
  @ViewChild('addPackageColorMode2') addPackageColorMode2: any;
  @ViewChild('addPackageDuplexMode') addPackageDuplexMode: any;
  @ViewChild('addPackageDuplexMode2') addPackageDuplexMode2: any;
  @ViewChild('addPackagePrice') addPackagePrice: any;


  //Alt Kısım Temizlenecek (Doğrulama adımını innerHtml ile ekleyeceğim)
  // Add & Update Package Confirm Elements
  @ViewChild('addPackageNameConfirm') addPackageNameConfirm: any;
  @ViewChild('addPackagePaperSizeConfirm') addPackagePaperSizeConfirm: any;
  @ViewChild('addPackagePaperTypeConfirm') addPackagePaperTypeConfirm: any;
  @ViewChild('addPackageSheetsPerPageConfirm') addPackageSheetsPerPageConfirm: any;
  @ViewChild('addPackageColorModeConfirm') addPackageColorModeConfirm: any;
  @ViewChild('addPackageDuplexModeConfirm') addPackageDuplexModeConfirm: any;
  @ViewChild('addPackagePriceConfirm') addPackagePriceConfirm: any;
  //Üst Kısım Temizlenecek


  @ViewChild('addPackageSwitchConfirm') addPackageSwitchConfirm: any;
  @ViewChild('deletePackageModalBody') deletePackageModalBody: any;


  ngOnInit(): void {
    this.showSpinner();
    this.packageService.getFeatures().subscribe({
      next: (featureData: object | PackageFeature | any) => {
        this.packageFeature = featureData.packageFeature;
      }
    });
    this.hideSpinner();
  }
  ngAfterViewInit(): void {
    this.filter();
    
  }

  async filter(){
    const packageNameS:string =  this.filterName.nativeElement.value;
    const paperSizeIDS:string = this.filterPaperSize.nativeElement.options[this.filterPaperSize.nativeElement.selectedIndex].value;
    const paperTypeIDS:string =  this.filterPaperType.nativeElement.options[this.filterPaperType.nativeElement.selectedIndex].value;
    const sheetsPerPageIDS:string = this.filterSheetsPerPage.nativeElement.options[this.filterSheetsPerPage.nativeElement.selectedIndex].value;
    const colorModeS: string = this.filterColorMode.nativeElement.options[this.filterColorMode.nativeElement.selectedIndex].value;
    const duplexModeS: string =  this.filterDuplexMode.nativeElement.options[this.filterDuplexMode.nativeElement.selectedIndex].value;
    const isActiveS:string = this.filterIsActive.nativeElement.options[this.filterIsActive.nativeElement.selectedIndex].value;
    const filterPackage:FilterPackage={
      packageName: packageNameS,
      paperSizeID:paperSizeIDS,
      paperTypeID:paperTypeIDS,
      sheetsPerPageID:sheetsPerPageIDS,
      duplexMode: duplexModeS,
      colorMode : colorModeS,
      isActive : isActiveS,
    };
    this.showSpinner();
    await this.packageService.FilterPackage(filterPackage).subscribe({
      next: (packageDatas: object | GetPackage | any) => {
        this.packages = packageDatas.packages;
      }
    });
    this.hideSpinner();
  }

  async fillUpdate(packageData:GetPackage){
    this.addPackageName.nativeElement.value= packageData.packageName;
    this.addPackagePaperSize.nativeElement.value = packageData.paperSize.paperSizeID;
    this.addPackagePaperType.nativeElement.value = packageData.paperType.paperTypeID;
    this.addPackageSheetsPerPage.nativeElement.value = packageData.sheetsPerPage.sheetsPerPageID;
    this.addPackageColorMode.nativeElement.checked = packageData.colorMode;
    this.addPackageColorMode2.nativeElement.checked = !packageData.colorMode;
    this.addPackageDuplexMode.nativeElement.checked = packageData.duplexMode;
    this.addPackageDuplexMode2.nativeElement.checked = !packageData.duplexMode;
    this.addPackagePrice.nativeElement.value = packageData.price;
    this.deletePackageModalBody.nativeElement.checked = packageData.isActive;
  }
  async clearModal(){
    this.addPackageName.nativeElement.value="";
    this.addPackagePaperSize.nativeElement.selectedIndex = 0;
    this.addPackagePaperType.nativeElement.selectedIndex = 0;
    this.addPackageSheetsPerPage.nativeElement.selectedIndex = 0;
    this.addPackageColorMode.nativeElement.checked = false;
    this.addPackageColorMode2.nativeElement.checked = false;
    this.addPackageDuplexMode.nativeElement.checked = false;
    this.addPackageDuplexMode2.nativeElement.checked = false;
    this.addPackagePrice.nativeElement.value = 0;
    this.deletePackageModalBody.nativeElement.checked = true;
  }
  async clearFilter(){
    this.filterName.nativeElement.value="";
    this.filterPaperSize.nativeElement.selectedIndex =0;
    this.filterPaperType.nativeElement.selectedIndex =0;
    this.filterSheetsPerPage.nativeElement.selectedIndex =0;
    this.filterIsActive.nativeElement.selectedIndex =0;
    this.filterDuplexMode.nativeElement.selectedIndex =0;
    this.filterColorMode.nativeElement.selectedIndex =0;
  }
  async updatePackage(id:string){
    const packageName: string = this.addPackageName.nativeElement.value;
    const addPackagePaperSize: string = this.addPackagePaperSize.nativeElement.options[this.addPackagePaperSize.nativeElement.selectedIndex].text;
    const addPackagePaperType: string = this.addPackagePaperType.nativeElement.options[this.addPackagePaperType.nativeElement.selectedIndex].text;
    const addPackageSheetsPerPage: string = this.addPackageSheetsPerPage.nativeElement.options[this.addPackageSheetsPerPage.nativeElement.selectedIndex].text;
    const addPackageColorMode: string = this.addPackageColorMode.nativeElement.checked ? "Renkli" : "Siyah-Beyaz";
    const addPackageDuplexMode: string = this.addPackageDuplexMode.nativeElement.checked ? "Arkalı-Önlü" : "Tek Yüz";
    const addPackagePrice: string = this.addPackagePrice.nativeElement.value;
    const colorMode: boolean = (addPackageColorMode === "Renkli");
    const duplexMode: boolean = (addPackageDuplexMode === "Arkalı-Önlü");
    const data: PutPackage = {
      packageId:this.updatePackagesID,
      packageName: packageName,
      paperSizeID: this.addPackagePaperSize.nativeElement.options[this.addPackagePaperSize.nativeElement.selectedIndex].value,
      paperTypeID: this.addPackagePaperType.nativeElement.options[this.addPackagePaperType.nativeElement.selectedIndex].value,
      sheetsPerPageID: this.addPackageSheetsPerPage.nativeElement.options[this.addPackageSheetsPerPage.nativeElement.selectedIndex].value,
      colorMode: colorMode,
      duplexMode: duplexMode,
      price: parseFloat(addPackagePrice),
      isActive: this.addPackageSwitchConfirm.nativeElement.checked
    };
    this.submitted = true;
    this.showSpinner();
    const result: UpdatePackage = await this.packageService.UpdatePackage(data);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message, "Güncelleme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
    } else {
      this.toastr.ShowMessage(result.message, "Güncelleme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }
    this.filter();
  }
  removeBtn(packageData:GetPackage):void{
    this.deletePackageModalBody.nativeElement.innerHTML = `<b>Paket Adı: </b>${packageData.packageName}</br>
    <b>Kağıt Boyu: </b>${packageData.paperSize.paperSizeName}</br>
    <b>Kağıt Türü: </b>${packageData.paperType.paperTypeName}</br>
    <b>Bir Yüzdeki Sayfa Sayısı: </b>${packageData.packageName}</br>
    <b>Renk Seçeneği: </b>${packageData.colorMode ? 'Arkalı-Önlü':'Tek Yüz'}</br>
    <b>Baskı Seçeneği: </b>${packageData.duplexMode?'Renkli':'Siyah-Beyaz'}</br>
    <b>Gösterim Durumu:</b>${packageData.isActive ? 'Aktif' : 'Pasif'}</br>
    <b>Fiyat:</b>${packageData.price} TL</br>
    <b class="text-warning"><i>Paketin aktiflik durumunu pasif hale getirerek müşterilerin kullanmasını engelleyebilirsiniz.</i></b>`;
    this.removePackagesID = packageData.packageID;
  }
  async remove(){
    this.showSpinner();
    const result: DeletePackage = await this.packageService.deletePackage(this.removePackagesID);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message, "Silme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
      const packageContainer : HTMLElement | any= document.getElementById(this.removePackagesID);
      packageContainer.classList.add('fade-out');
      setTimeout(() => {
        packageContainer.remove();
      }, 1000);

    } 
    else {
      this.toastr.ShowMessage(result.message, "Silme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }
  }



  nextClick(): void {
    //Create Package Modal1 datas
    const packageName: string = this.addPackageName.nativeElement.value;
    const addPackagePaperSize: string = this.addPackagePaperSize.nativeElement.options[this.addPackagePaperSize.nativeElement.selectedIndex].text;
    const addPackagePaperType: string = this.addPackagePaperType.nativeElement.options[this.addPackagePaperType.nativeElement.selectedIndex].text;
    const addPackageSheetsPerPage: string = this.addPackageSheetsPerPage.nativeElement.options[this.addPackageSheetsPerPage.nativeElement.selectedIndex].text;
    const addPackageColorMode: string = this.addPackageColorMode.nativeElement.checked ? "Renkli" : "Siyah-Beyaz";
    const addPackageDuplexMode: string = this.addPackageDuplexMode.nativeElement.checked ? "Arkalı-Önlü" : "Tek Yüz";
    const addPackagePrice: string = this.addPackagePrice.nativeElement.value;
    //Create Package Modal2 datas
    this.addPackageNameConfirm.nativeElement.textContent =packageName;
    this.addPackagePaperSizeConfirm.nativeElement.textContent =addPackagePaperSize;
    this.addPackagePaperTypeConfirm.nativeElement.textContent =addPackagePaperType;
    this.addPackageSheetsPerPageConfirm.nativeElement.textContent =addPackageSheetsPerPage;
    this.addPackagePriceConfirm.nativeElement.textContent =addPackagePrice;
    this.addPackageColorModeConfirm.nativeElement.textContent  = addPackageColorMode;
    this.addPackageDuplexModeConfirm.nativeElement.textContent = addPackageDuplexMode;
  }

  async createPackage(): Promise<void> {
    const packageName: string = this.addPackageName.nativeElement.value;
    const addPackagePaperSize: string = this.addPackagePaperSize.nativeElement.options[this.addPackagePaperSize.nativeElement.selectedIndex].text;
    const addPackagePaperType: string = this.addPackagePaperType.nativeElement.options[this.addPackagePaperType.nativeElement.selectedIndex].text;
    const addPackageSheetsPerPage: string = this.addPackageSheetsPerPage.nativeElement.options[this.addPackageSheetsPerPage.nativeElement.selectedIndex].text;
    const addPackageColorMode: string = this.addPackageColorMode.nativeElement.checked ? "Renkli" : "Siyah-Beyaz";
    const addPackageDuplexMode: string = this.addPackageDuplexMode.nativeElement.checked ? "Arkalı-Önlü" : "Tek Yüz";
    const addPackagePrice: string = this.addPackagePrice.nativeElement.value;
    const colorMode: boolean = (addPackageColorMode === "Renkli");
    const duplexMode: boolean = (addPackageDuplexMode === "Arkalı-Önlü");
    const data: PostPackage = {
      packageName: packageName,
      paperSizeID: this.addPackagePaperSize.nativeElement.options[this.addPackagePaperSize.nativeElement.selectedIndex].value,
      paperTypeID: this.addPackagePaperType.nativeElement.options[this.addPackagePaperType.nativeElement.selectedIndex].value,
      sheetsPerPageID: this.addPackageSheetsPerPage.nativeElement.options[this.addPackageSheetsPerPage.nativeElement.selectedIndex].value,
      colorMode: colorMode,
      duplexMode: duplexMode,
      price: parseFloat(addPackagePrice),
      isActive: this.addPackageSwitchConfirm.nativeElement.checked
    };
    this.submitted = true;
    this.showSpinner();
    const result: CreatePackage = await this.packageService.createPackage(data);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message, "Kayıt Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
    } else {
      this.toastr.ShowMessage(result.message, "Kayıt Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }
    this.filter();
  }
}
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { BaseComponent } from '../base/base.component';
import { FileService } from '../../services/models/file.service';
import { GetFilterFileResponse } from '../../contracts/file/getFilterFileResponse';
import { GetFilterFileResquest } from '../../contracts/file/getFilterFileRequest';
import { GetByIdFile } from '../../contracts/file/getByIdFile';
import { BaseResponse } from '../../contracts/BaseResponse';
import { UpdateFile } from '../../contracts/file/updateFile';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent extends BaseComponent implements OnInit,AfterViewInit {
  constructor(
    spinner: NgxSpinnerService,
    private toastr: CustomToastrService,
    private fileService:FileService,
  ) {
    super(spinner);
  }



  files: GetFilterFileResponse[] = [];
  getByIdFile:GetByIdFile = new GetByIdFile();
  updateFileID:string|any;
  deleteFileID:string|any;
  fileContentPDF!:string;
  @ViewChild('pdfContent') pdfContent:any;

  @ViewChild('fileTitleFilter') fileTitleFilter:any;
  @ViewChild('fileNoteFilter') fileNoteFilter:any;

  @ViewChild('fileTitleModal') fileTitleModal: any;
  @ViewChild('fileNoteModal') fileNoteModal: any;
  @ViewChild('fileContentModal') fileContentModal: any;

  @ViewChild('fileTitleModalConfirm') fileTitleModalConfirm: any;
  @ViewChild('fileNoteModalConfirm') fileNoteModalConfirm: any;
  @ViewChild('fileNameModalConfirm') fileNameModalConfirm: any;

  @ViewChild('fileTitleUpdateModal') fileTitleUpdateModal:any;
  @ViewChild('fileNoteUpdateModal') fileNoteUpdateModal:any;

  @ViewChild('deleteFileModalBody') deleteFileModalBody:any;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.filter()
  }

  async clearModal(){
    this.fileTitleModal.nativeElement.value="";
    this.fileNoteModal.nativeElement.value="";
    this.fileContentModal.nativeElement.value = "";

  }
  async clearFilter(){
    this.fileTitleFilter.nativeElement.value = "";
    this.fileNoteFilter.nativeElement.value = "";
  }
  async updateFile(){
    const updateFile:UpdateFile={
      fileID:this.updateFileID,
      fileNote:this.fileNoteUpdateModal.nativeElement.value,
      fileTitle:this.fileTitleUpdateModal.nativeElement.value,
    };
    this.showSpinner();
    const response : BaseResponse = (await this.fileService.updateFileAsync(updateFile));
    this.hideSpinner();
    if(response.succeeded)
      this.toastr.ShowMessage(response.message,"Güncelleme İşlemi Başarıyla Tamamlandı",ToastrMessageType.Success,ToastrPositon.TopRight);
    else
      this.toastr.ShowMessage(response.message,"Güncelleme İşlemi Tamamlanamadı",ToastrMessageType.Error,ToastrPositon.TopRight);
    await this.filter();
  }
  removeBtn(fileData:GetFilterFileResponse):void{
    this.deleteFileModalBody.nativeElement.innerHTML = `<b>Dosya Başlığı: </b>${fileData.fileTitle}</br>
    <b>Dosya Açıklaması: </b>${fileData.fileNote}</br>
    <b>Dosya Sayfa Sayısı: </b>${fileData.numberOfPage}</br>
    <b>Dosya Oluşturulma Tarihi: </b>${fileData.createdDate}</br>
    ${(fileData.updatedDate ? '<b>Son Güncelleme Tarihi: </b>' + fileData.updatedDate : "")}`
    this.deleteFileID = fileData.id;
  }
  async remove(){
    this.showSpinner();
    const result: BaseResponse = await this.fileService.deletePackage(this.deleteFileID);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message, "Silme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
      const packageContainer : HTMLElement | any= document.getElementById(this.deleteFileID);
      packageContainer.classList.add('fade-out');
      setTimeout(() => {
        packageContainer.remove();
      }, 1000);
    } 
    else {
      this.toastr.ShowMessage(result.message, "Silme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }
  }
  async updateModalFill(id: string){
    this.showSpinner();
    this.getByIdFile = (await this.fileService.GetByIdFileAsync(id));
    this.hideSpinner();
    const b64Data = this.getByIdFile.fileContent;
    const contentType = 'application/pdf';
    const blob = this.b64toBlob(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);
    this.pdfContent.nativeElement.innerHTML = await `<iframe src="${blobUrl}" type="${contentType}" width="100%" height="750px">`;
    this.fileNoteUpdateModal.nativeElement.value = this.getByIdFile.fileNote;
    this.fileTitleUpdateModal.nativeElement.value = this.getByIdFile.fileTitle;
  }
  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }


  nextClick(): void {
    const formData = new FormData();
    const fileInput = this.fileContentModal.nativeElement;
    this.fileTitleModalConfirm.nativeElement.textContent = this.fileTitleModal.nativeElement.value;
    this.fileNoteModalConfirm.nativeElement.textContent = this.fileNoteModal.nativeElement.value;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('file', file, file.name);
      this.fileNameModalConfirm.nativeElement.textContent = file.name;
    }
  }


  async createFile(){
    const formData = new FormData();
    const fileInput = this.fileContentModal.nativeElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('FileContent', file, file.name);
      formData.append('FileTitle',this.fileTitleModal.nativeElement.value)
      formData.append('FileNote',this.fileNoteModal.nativeElement.value)
    }
    this.showSpinner();
    const result:BaseResponse = await this.fileService.createFile(formData);
    this.hideSpinner();

    if(result.succeeded)
      this.toastr.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarılı",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)
    else
      this.toastr.ShowMessage(result.message,"Dosya Ekleme İşlemi Başarısız",ToastrMessageType.Success,ToastrPositon.BottomFullWidth)

    this.filter();
  }
  async filter(){
    const fileTitle:string =  this.fileTitleFilter.nativeElement.value;
    const fileNote:string =  this.fileNoteFilter.nativeElement.value;
    const filterPackage:GetFilterFileResquest={
      FileNote:fileNote,
      FileTitle:fileTitle
    };
    this.showSpinner();
    await this.fileService.FilterFile(filterPackage).subscribe({
      next: (filesDatas: object | GetFilterFileResponse | any) => {
        this.files = filesDatas.files;
      }
    });
    this.hideSpinner();
  }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/models/order.service';
import { GetOrderDetails } from '../../contracts/order/getOrderDetails';
import { FileService } from '../../services/models/file.service';
import { FilterOrder } from '../../contracts/order/filterOrder';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../../services/custom-toastr.service';
import { BaseResponse } from '../../contracts/BaseResponse';
import { UpdateOrderStatus } from '../../contracts/order/updateOrderStatus';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends BaseComponent implements OnInit{

  orders: GetOrderDetails[] = [];
  openedItems: { [key: string]: boolean } = {};
  updateOrder!:GetOrderDetails;
  constructor(ngxSpinner:NgxSpinnerService, private orderService:OrderService,private fileService:FileService,private toastr:CustomToastrService) {
    super(ngxSpinner);
  }

  @ViewChild('filterCustomerName') filterCustomerName: any;
  @ViewChild('filterCustomerPhoneNumber') filterCustomerPhoneNumber: any;
  @ViewChild('filterProductStatus') filterProductStatus: any;
  @ViewChild('statusSelect') statusSelect: any;



  async ngOnInit() {
    await this.orderService.getAllOrderDetails().subscribe({
      next: (orderDatas: object | GetOrderDetails[] | any) => {
        this.orders = orderDatas.orderDetails;
      }
    });
  }
  async filter(){
    const filterCustomerName:string =  this.filterCustomerName.nativeElement.value;
    const filterCustomerPhoneNumber:string =  this.filterCustomerPhoneNumber.nativeElement.value;
    const filterProductStatus:number =this.filterProductStatus.nativeElement.options[this.filterProductStatus.nativeElement.selectedIndex].value;
    const filterOrder:FilterOrder={
      filterCustomerName: filterCustomerName,
      filterCustomerPhoneNumber:filterCustomerPhoneNumber,
      filterProductStatus:filterProductStatus,
    };
    this.showSpinner();
    await this.orderService.FilterOrder(filterOrder).subscribe({
      next: (orderDatas: object | GetOrderDetails[] | any) => {
        this.orders = orderDatas.orderDetails;
      }
    });
    this.hideSpinner();
  }
  async updateModalFill(i: string, fileID: string, orderID: string) {
    const key = `${orderID}-${i}`;
    if (!this.openedItems[key]) {
        try {
          this.showSpinner();
            const content = await this.fileService.GetByIdFileAsync(fileID);
            const b64Data = content.fileContent;
            const contentType = 'application/pdf';
            const blob = await this.b64toBlob(b64Data, contentType);
            const blobUrl = URL.createObjectURL(blob);
            const productContainer: HTMLElement | any = document.getElementById(i + orderID);
            this.renderPdf(blobUrl, productContainer);
            this.openedItems[key] = true;
        } catch (error) {
            console.error('Dosya alınamadı:', error);
        } finally {
            this.hideSpinner();
        }
    }
  }
  async b64toBlob(b64Data: string, contentType: string = ''): Promise<Blob> {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          byteArrays.push(new Uint8Array(byteNumbers));
      }
      return new Blob(byteArrays, { type: contentType });
  }
  renderPdf(blobUrl: string, container: HTMLElement) {
      const embed = document.createElement('embed');
      embed.setAttribute('src', blobUrl);
      embed.setAttribute('type', 'application/pdf');
      embed.setAttribute('width', '100%');
      embed.setAttribute('height', '750px');
      container.innerHTML = '';
      container.appendChild(embed);
  }
  async clearFilter(){
    this.filterCustomerName.nativeElement.value="";
    this.filterCustomerPhoneNumber.nativeElement.value="";
    this.filterProductStatus.nativeElement.selectedIndex =0;
  }
  async updateOrderStatus(){
    const data: UpdateOrderStatus = {
       orderID : this.updateOrder.orderID,
       status : this.statusSelect.nativeElement.options[this.statusSelect.nativeElement.selectedIndex].value
    }
    this.showSpinner();
    const result: BaseResponse = await this.orderService.UpdateOrderStatus(data);
    this.hideSpinner();
    if (result.succeeded) {
      this.toastr.ShowMessage(result.message, "Güncelleme Başarılı", ToastrMessageType.Success, ToastrPositon.BottomFullWidth);
    } else {
      this.toastr.ShowMessage(result.message, "Güncelleme Başarısız", ToastrMessageType.Error, ToastrPositon.BottomFullWidth);
    }
    this.filter();
  }



}

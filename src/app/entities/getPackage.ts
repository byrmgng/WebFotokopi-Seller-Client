import { ListPaperSize } from "../contracts/paperSize/ListPaperType";
import { ListPaperType } from "../contracts/paperType/ListPaperType";
import { ListSheetsPerPage } from "../contracts/sheetsPerPage/ListSheetsPerPage";

export class GetPackage{
    packageID!:string
    packageName!:string;
    price!:number;
    duplexMode!:boolean;
    colorMode!:boolean;
    sheetsPerPage!:ListSheetsPerPage;
    paperSize!:ListPaperSize;
    paperType!:ListPaperType;
    isActive!:boolean;
    createdDate!:string;
    updatedDate!:string;
}
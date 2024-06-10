import { ListPaperSize } from "../paperSize/ListPaperType";
import { ListPaperType } from "../paperType/ListPaperType";
import { ListSheetsPerPage } from "../sheetsPerPage/ListSheetsPerPage";

export class PackageFeature {
    paperSizes!:ListPaperSize[];
    paperTypes!: ListPaperType[];
    sheetsPerPages!:ListSheetsPerPage[];
  }
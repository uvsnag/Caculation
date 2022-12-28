import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import * as _ from 'lodash'

import { environment } from '../environments/environment';
import { Product, productAttributesMapping } from './model/product.model';
import { Config } from './config/config';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  sheetName = Config.SHEET_ARR[0];


  products$!: Observable<Product[]>;
  productBodys: Product[] = [];
  productHeader: Product = {} as Product;

  constructor(private googleSheetsDbService: GoogleSheetsDbService, 
    // private cookieService: CookieService
    ) { }
  // constructor( private cookieService: CookieService ) { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.getDataSheetAPI()
    // this.strCookieContinue = this.cookieService.get('rdContinue'); // To Get Cookie.
  }

  getDataSheetAPI() {
    this.productBodys = [];
    // this.strField = "";

    this.products$ = this.googleSheetsDbService.getActive<Product>(
      environment.characters.spreadsheetId,
      this.sheetName,
      productAttributesMapping,
      'Active'
    );

    // this.productHeader = this.googleSheetsDbService.rowsToEntries();


    this.products$
      .subscribe(products => {
        if(!_.isEmpty(products)){
          this.productHeader = products[0];
          for (let i = 1; i <= products.length; i++) {
            let productLine= products[i]
            if (!_.isEmpty(productLine)) {
                this.productBodys.push(productLine);
            }
          }
          // products.forEach(res=>{
          //   this.productBodys.push(res);

          // })

          console.log(this.productHeader);
          console.log(this.productBodys);
        }
      })
  }

}

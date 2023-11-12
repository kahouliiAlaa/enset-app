import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{



  constructor(private ps:ProductService,
              private router:Router,
              public appState :AppStateService) {
  }

  ngOnInit() {
    this.searchProducts();
  }

  //on peut ecrire une methode getProduct() dans laquelle on met le code de req get
  // et on appelle this.getProducts ds ngOnInit() et apres on appelle cette methode
  // dans patch next mais cela va charger tt la page à chaque modification.
  // et a chaque changement une req patch et apres une req get va etre appele

  searchProducts(){
   /* this.appState.setProductState({
      status:"LOADING"
    })*/
    this.ps.searchProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize)
      .subscribe({
        next :(resp)=>{

          //this.appState.productsState.products
           let products  =resp.body as Product[];

          let totalProducts=parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productsState.totalProducts=totalProducts;

          //this.appState.productsState.totalPages
           let totalPages = Math.floor(totalProducts /this.appState.productsState.pageSize);
          if((totalProducts % this.appState.productsState.pageSize)!=0){
            ++totalPages;
          }
          this.appState.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status : "LOADED"
          })
        },
        error : err =>{
          this.appState.setProductState({
            status : "ERROR",
            errorMessage : err
          })}

      })

    //this.products$=this.ps.getProduct();
  }


  handleCheckProduct(product: Product) {
    this.ps.checkProduct(product)
      .subscribe({
        next:updatedProduct=>{
          product.checked=!product.checked;

    }
      })

  }

  handleDeleteProduct(product: Product) {
    if(confirm("Etes vous sure"))
     this.ps.deleteProduct(product).subscribe(
      {
        next:value =>{
          //on peut juste demander la requete get pour reafficher la nouvelle liste
          this.searchProducts();
          //this.appState.productsState.products=this.appState.productsState.products.filter((p :any)=>p.id!=product.id);
        }
      }
    );

  }

  /*searchProduct() {
    this.ps.searchProduct(this.keyword).subscribe({
      next : data=>{
        this.products=data;
      }
    })
  }*/
  handleGoToPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}

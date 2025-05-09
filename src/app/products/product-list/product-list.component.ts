import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => console.error('Error fetching products', error)
    );
  }

  editProduct(id: number): void {
    this.router.navigate([`/products/${id}/edit`]);
  }

  viewProduct(id: number): void {
    this.router.navigate([`/products/${id}`]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error => console.error('Error deleting product', error)
      );
    }
  }
}
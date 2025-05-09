import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: false

})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0
  };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProduct(+id).subscribe(
        product => this.product = product,
        error => console.error('Error fetching product', error)
      );
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id!, this.product).subscribe(
        () => this.router.navigate(['/products']),
        error => console.error('Error updating product', error)
      );
    } else {
      this.productService.createProduct(this.product).subscribe(
        () => this.router.navigate(['/products']),
        error => console.error('Error creating product', error)
      );
    }
  }
}
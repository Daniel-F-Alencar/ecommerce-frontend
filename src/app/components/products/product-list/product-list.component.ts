import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { CreateProductDialogComponent } from '../create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        if (error.status === 401) {
          this.snackBar.open('Please login to view products', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        }
      }
    });
  }

  createProduct() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe({
          next: () => {
            this.snackBar.open('Product created successfully', 'Close', { duration: 3000 });
            this.loadProducts();
          },
          error: (error) => {
            this.snackBar.open(error.error.message || 'Error creating product', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe({
          next: () => {
            this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
            this.loadProducts();
          },
          error: (error) => {
            this.snackBar.open(error.error.message || 'Error updating product', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Error deleting product', 'Close', { duration: 3000 });
      }
    });
  }
}

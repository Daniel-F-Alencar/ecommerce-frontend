import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Edit Product</h2>
    <mat-dialog-content>
      <form [formGroup]="editForm">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="editForm.get('name')?.errors?.['required']">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" required rows="3"></textarea>
          <mat-error *ngIf="editForm.get('description')?.errors?.['required']">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" required min="0">
          <mat-error *ngIf="editForm.get('price')?.errors?.['required']">
            Price is required
          </mat-error>
          <mat-error *ngIf="editForm.get('price')?.errors?.['min']">
            Price must be positive
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Stock</mat-label>
          <input matInput type="number" formControlName="stock" required min="0">
          <mat-error *ngIf="editForm.get('stock')?.errors?.['required']">
            Stock is required
          </mat-error>
          <mat-error *ngIf="editForm.get('stock')?.errors?.['min']">
            Stock must be positive
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="button-container">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!editForm.valid">
          Save Changes
        </button>
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 400px;
      padding: 8px;
    }
    mat-form-field {
      width: 100%;
    }
    mat-dialog-actions {
      padding: 16px 0;
      justify-content: center !important;
    }
    .button-container {
      display: flex;
      gap: 16px;
      justify-content: center;
      width: 100%;
    }
    button {
      min-width: 120px;
    }
  `]
})
export class EditProductDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      stock: [data.stock, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

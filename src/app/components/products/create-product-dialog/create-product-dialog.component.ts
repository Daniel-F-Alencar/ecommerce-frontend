import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-product-dialog',
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
    <h2 mat-dialog-title>Create New Product</h2>
    <mat-dialog-content>
      <form [formGroup]="createForm">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="createForm.get('name')?.errors?.['required']">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" required rows="3"></textarea>
          <mat-error *ngIf="createForm.get('description')?.errors?.['required']">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" required min="0">
          <mat-error *ngIf="createForm.get('price')?.errors?.['required']">
            Price is required
          </mat-error>
          <mat-error *ngIf="createForm.get('price')?.errors?.['min']">
            Price must be positive
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Stock</mat-label>
          <input matInput type="number" formControlName="stock" required min="0">
          <mat-error *ngIf="createForm.get('stock')?.errors?.['required']">
            Stock is required
          </mat-error>
          <mat-error *ngIf="createForm.get('stock')?.errors?.['min']">
            Stock must be positive
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="button-container">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!createForm.valid">
          Create Product
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
export class CreateProductDialogComponent {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.dialogRef.close(this.createForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

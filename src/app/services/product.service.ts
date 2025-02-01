import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateUpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:5000/api/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  createProduct(product: CreateUpdateProduct): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  updateProduct(productId: number, product: CreateUpdateProduct): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${productId}`, product, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }
}

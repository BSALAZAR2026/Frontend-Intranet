import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from '../models/certificate.model';

@Injectable({ providedIn: 'root' })
export class CertificateService {

  private readonly baseUrl =
    'https://intranet-api-gateway.onrender.com/api/academy/certificates';

  constructor(private http: HttpClient) {}

  getMyCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.baseUrl}/me`);
  }

  generateCertificate(courseId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${courseId}`, null);
  }

  openCertificate(courseId: number): void {
    this.http.get(
      `${this.baseUrl}/${courseId}`,
      { responseType: 'blob' }
    ).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
}

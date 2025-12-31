import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private baseUrl = '/api/academy/certificates';

  constructor(private http: HttpClient) {}

  getMyCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.baseUrl}/me`);
  }

  openCertificate(courseId: number): void {
    window.open(`${this.baseUrl}/${courseId}`, '_blank');
  }
}

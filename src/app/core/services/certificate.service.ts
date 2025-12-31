import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Certificate } from "../models/certificate.model";

@Injectable({ providedIn: 'root' })
export class CertificateService {

  private readonly baseUrl =
    'https://intranet-api-gateway.onrender.com/api/academy/certificates';

  constructor(private http: HttpClient) {}

  getMyCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.baseUrl}/me`);
  }

  openCertificate(courseId: number): void {
    const url = `${this.baseUrl}/${courseId}`;
    window.open(url, '_blank');
  }
}

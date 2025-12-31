import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Certificate } from "../../../../core/models/certificate.model";
import { CertificateService } from "../../../../core/services/certificate.service";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.scss']
})

export class CertificatesComponent implements OnInit {

 certificates: Certificate[] = [];
  loading = true;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.certificateService.getMyCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openCertificate(courseId: number): void {
    this.certificateService.openCertificate(courseId);
  }
}

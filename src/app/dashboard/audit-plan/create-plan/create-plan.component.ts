import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  public createPlanForm: FormGroup;
  vendorObj: any = [];
  locationObj: any = [];
  selectedFile: any;
  bulkFile: any;
  today= new Date();
  minStartDate = {};
  constructor(
    private formBuilder: FormBuilder,
    private auditPlanService: AuditPlanService,
    private commonService: CommonService,
    private employeeService: EmployeeMasterService,
    private router: Router
  ) {
    this.minStartDate = `${this.today.getFullYear()}-${("0" + (this.today.getMonth() + 1)).slice(-2)}-${("0" + this.today.getDate()).slice(-2)}`;
    this.createPlanForm = this.formBuilder.group({
      vendorId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      otherLocation: new FormControl('', [Validators.required]),
      otherCode: new FormControl('', [Validators.required]),
      typeCode: new FormControl('', []),
      typeName: new FormControl('', []),
      typeLocation: new FormControl('', []),
      plannedStartDate: new FormControl('', [Validators.required]),
      plannedEndDate: new FormControl('', [Validators.required]),
      additionalMSILEmail: new FormControl('', []),
      auditeeEmail: new FormControl('', [Validators.required]),
      attachment: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  onFileSelected(event: any) {
    const fsize = event.target.files[0].size;
    const file = Math.round((fsize / 1024)/1024);
    if(file > dataConstants.maxImageSize){
      Swal.fire(
        'Invalid File!',
        `File is more than ${dataConstants.maxImageSize} mb. Please select a valid file`,
        'warning'
      )
      event.target.value = '';
      return;
    }
    this.selectedFile = event.target.files[0];
  }

  submit() {
    this.commonService.showLoading();
    if (this.createPlanForm.invalid) {
      Swal.fire({
        title: 'Please fill all mandatory fields.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
    const body = this.createPlanForm.value;

    const formData = new FormData();
    formData.append('AttachmentFile', this.selectedFile);
    formData.append('vendorId', body.vendorId);
    formData.append('locationId', body.locationId);
    formData.append('otherLocation', body.otherLocation);
    formData.append('otherCode', body.otherCode);
    formData.append('typeCode', body.typeCode);
    formData.append('typeName', body.typeName);
    formData.append('typeLocation', body.typeLocation);
    formData.append('plannedStartDate', body.plannedStartDate);
    formData.append('plannedEndDate', body.plannedEndDate);
    formData.append('additionalMSILEmail', body.additionalMSILEmail);
    formData.append('auditeeEmail', body.auditeeEmail);

   this.auditPlanService.add(formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Plan Created Successfully',
          icon: 'success',
        });
        this.createPlanForm.controls['attachment'].setValue('');
        this.createPlanForm.reset();
        this.commonService.hideLoading();
      },
      error: (err: any) => {
        this.commonService.hideLoading();
      }
    }); 
  }

  getEmployeeList() {
    this.commonService.showLoading();
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if (res) {
          this.vendorObj = res.filter((x: any) => {
            return x.roleId == "ae44799a-e90a-43a1-8c77-e6b68bf3a9f0" &&
              x.roleName == 'Vendor';
          });
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  getVendor(event: any) {
   let vendorId = event?.id;
   this.createPlanForm.controls['vendorId'].setValue(vendorId);
   vendorId ? this.getLocation(vendorId) :  this.createPlanForm.controls['locationId'].setValue('');
  }

  getLocation(id: any) {
    this.commonService.showLoading();
    this.auditPlanService.getLocationByVendor(id).subscribe({
      next: (res) => {
        if (res) {
          this.locationObj = res;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  bulkUpload(event: any) {
    this.commonService.showLoading();
    this.bulkFile = event.target.files[0];
    const formData = new FormData();
    formData.append('File', this.bulkFile);
    this.auditPlanService.bulkUpload(formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Plan Uploaded Successfully',
          icon: 'success',
        });
        this.bulkFile = '';
        this.commonService.hideLoading();
      },
      error: (err: any) => {
        /* Swal.fire({
          title: 'Please check format & try again',
          icon: 'error',
        }); */
        this.bulkFile = '';
        this.commonService.hideLoading();
      }
    });
  }

  download() {
    this.commonService.showLoading();
    this.auditPlanService.downloadTemplate().pipe(take(1))
      .subscribe({
        next: (response: any) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));

          const contentDisposition = response.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          downloadLink.download = fileName;
          downloadLink.click();
          this.commonService.hideLoading();
        }, error: (e) => {
          console.error(e);
          this.commonService.hideLoading();
        }
      });
  }

  close() {
    this.router.navigateByUrl('/dashboard');
  }
}

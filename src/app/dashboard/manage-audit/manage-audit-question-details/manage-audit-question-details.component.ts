import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';
import { LastYearRemarksComponent } from '../last-year-remarks/last-year-remarks.component';
import { SectionHeadRemarksComponent } from '../section-head-remarks/section-head-remarks.component';

@Component({
  selector: 'app-manage-audit-question-details',
  templateUrl: './manage-audit-question-details.component.html',
  styleUrls: ['./manage-audit-question-details.component.css']
})
export class ManageAuditQuestionDetailsComponent implements OnInit {
  questionForm: FormGroup;
  regulationList: any = [];
  bsModalRef?: BsModalRef;
  auditAreaList: any = [];
  observationList: any = [];
  auditPlanId: any;
  categoryId: any;
  getUserDetails: any;
  userId: any;
  judgeDetails: any = {
    JudgementId: '',
    ObservationList: []
  };
  observeArray = [];
  nullId = dataConstants.NullId;
  judgeNew: any = [];
  regulationId: any;
  triangle = dataConstants.JudgementValues.Triangle;
  cross = dataConstants.JudgementValues.X;
  pie = dataConstants.JudgementValues.Pie;
  auditPlanDetails: any;
  viewPlanId: any;
  vendorName: any;
  selectedTab: any;
  categoryName: any;
  myFile: any = [];
  myFileIndex = Array<String>();
  fileUploadArray: any = [];
  constructor(
    private auditPlanService: AuditPlanService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private commonService: CommonService,
    private categoryService: CategoryMasterService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.getUserDetails = this.authService.getLoginDetails();
    this.userId = this.getUserDetails.UserId;

    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      const cid = params.get('cid');
      this.auditPlanId = Id ? Id : 0;
      this.categoryId = cid ? cid : 0;
    });
    this.questionForm = this.fb.group({
      metadata: this.fb.array([]),
    });
    (this.questionForm.get('metadata') as FormArray).valueChanges.subscribe(values => {
      values.forEach((element: any, index: any) => {
        if (element.ObservationList && element.ObservationList.length > 2 && element.JudgementId != this.cross) {
          (<FormGroup>this.metadataArray.controls[index]).controls['JudgementId'].setValue(this.cross);
          //this.questionForm.get('metadata').controls[0].controls.JudgementId.setValue('asdasdsadsadsad')
        }
      });
    });
  }

  ngOnInit(): void {
    this.getAuditAreaByCategory();
    this.getAuditPlanDetails();
    this.getCategoryDetails();
  }

  private metaDataGroup(): FormGroup {

    return this.fb.group({
      JudgementId: new FormControl('', [Validators.required]),
      ObservationList: this.fb.array([this.judgeGroup()])
    });
  }

  private judgeGroup(): FormGroup {
    return this.fb.group({
      remark: new FormControl('', []),
      file: new FormControl(null, []),
      auditPlanId: new FormControl(this.auditPlanId, []),
      createdBy: new FormControl(this.userId, []),
      regulationId: new FormControl('', []),
      id: new FormControl('', []),
      repeatIssue: new FormControl(false, []),
    });
  }

  get metadataArray(): FormArray {
    return <FormArray>this.questionForm.get('metadata');

  }

  obsArray(index: number): FormArray {
    return <FormArray>this.metadataArray.at(index).get("ObservationList");
  }

  get judgeArray(): FormArray {
    return this.questionForm.get("ObservationList") as FormArray;
  }

  addJudge(index: any, val: any): void {
    let abc = (<FormArray>(<FormGroup>this.metadataArray.controls[index]).controls['ObservationList']);
    if (abc.length > 1) {
      Swal.fire({
        title: 'More than 2 remarks.',
        text: "If you fill more than 2 remarks, your judgement will be 'X'!",
        icon: 'warning',
      });
    }
    (<FormArray>(<FormGroup>this.metadataArray.controls[index]).controls['ObservationList']).push(this.judgeGroup());
  }

  removeJudge(sessIndex: any, breakIndex: any): void {
    (<FormArray>(<FormGroup>this.metadataArray.controls[sessIndex]).controls['ObservationList']).removeAt(breakIndex);
    var fileIndex = this.myFileIndex.findIndex(x => x == sessIndex + "|" + breakIndex)
    if (fileIndex > -1) {
      this.myFile.removeAt(fileIndex)
      this.myFileIndex.splice(fileIndex, 1)
    }
  }

  addMetadata(): void {
    this.metadataArray.push(this.metaDataGroup());
  }

  updateMetadata(data: any) {
    this.metadataArray.push(this.metaUpdateGroup(data));
  }

  private metaUpdateGroup(data: any): FormGroup {
    return this.fb.group({
      JudgementId: new FormControl(data.judgementId, [Validators.required]),
      ObservationList: this.fb.array(data.judgeNew, [])
    })
  }

  getAuditAreaByCategory() {
    this.commonService.showLoading();
    this.auditPlanService.getAuditAreaByCategory(this.categoryId).subscribe({
      next: (res) => {
        if (res) {
          this.auditAreaList = res;
          this.auditAreaList.forEach((x: any) => {
            x.isActiveTab = false;
          });
          this.getRegulation(this.auditAreaList[0]);
          this.auditAreaList[0].isActiveTab = true;
          this.selectedTab = this.auditAreaList[0];
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  getRegulation(item: any) {
    this.commonService.showLoading();
    if (this.selectedTab != undefined) this.selectedTab.isActiveTab = false;
    this.selectedTab = item;
    item.isActiveTab = true;
    this.metadataArray.controls = [];
    const data = {
      auditPlanId: this.auditPlanId,
      categoryId: this.categoryId,
      auditAreaId: item.id
    };
    this.auditPlanService.getPlanRegulation(data).subscribe({
      next: (res) => {
        if (res) {
          this.regulationList = res;
          this.regulationList.forEach((reg: any) => {
            this.judgeNew = [];
            reg.remarks = [];
            reg.judgeNew = [];
            if (reg.issubmitted == true) {
              this.regulationId = reg.id;
              if (reg.lstObservation.length > 0) {
                reg.lstObservation.forEach((x: any) => {
                  reg.remarks.push({ remark: x.remark, id: x.id, repeatIssue:x.repeatIssue  });
                });
                console.log("repeatIssue",reg.remarks);
                for (let item of reg.lstObservation) {
                  this.judgeNew.push(this.fb.group({
                    remark: item.remark,
                    fileAttachment: item.file,
                    file: "",
                    auditPlanId: this.auditPlanId,
                    createdBy: this.userId,
                    regulationId: reg.id,
                    id: item.id,
                    repeatIssue: item.repeatIssue
                  }));
                }
              }
              else {
                this.judgeNew.push(this.judgeGroup())
              }
              reg.judgeNew = this.judgeNew;
              this.updateMetadata(reg);
            }
            else {
              this.addMetadata();
            }

            this.commonService.hideLoading();
          });
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  getPlanObservation(id: any) {
    this.commonService.showLoading();
    this.auditPlanService.getPlanObservation({ auditPlanId: this.auditPlanId, regulationId: id }).subscribe({
      next: (res) => {
        if (res) {
          this.observationList = res;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  submit(index: any, id: any) {
    this.commonService.showLoading();
    //
    const body = this.questionForm.controls['metadata'].value;
    if (!body[index].JudgementId) {
      Swal.fire({
        title: 'Please Submit Judgement.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
    body[index].ObservationList.forEach((x: any) => {
      x.regulationId = id;
    });
    body[index].isSubmitted = true;
    const data = body[index];
    const formData: any = new FormData();
    var remarkIndex = 0
    for (let dataKey in data) {
      if (dataKey === 'ObservationList') {
        for (let previewKey in data[dataKey]) {
          let list = new Map<string, any>();
          for (let nestedKey in data[dataKey][previewKey]) {
            if (nestedKey == "file") {
              var fileIndex = this.myFileIndex.findIndex(x => x == index + "|" + remarkIndex)
              if (fileIndex > -1) {
                var file = this.myFile[fileIndex]
                formData.append(`ObservationList[${previewKey}].${nestedKey}`, file, file.name);
              } else {
                formData.append(`ObservationList[${previewKey}].fileAttachment`, data[dataKey][previewKey]["fileAttachment"]);
              }
            } else
              formData.append(`ObservationList[${previewKey}].${nestedKey}`, data[dataKey][previewKey][nestedKey]);
          }
          remarkIndex++;
        }
      }
      else {
        formData.append(dataKey, data[dataKey]);
      }
    }
    this.commonService.hideLoading();
    this.auditPlanService.saveObservation(formData).subscribe({
      next: (res) => {
        if (res) {
          this.commonService.hideLoading();
          Swal.fire({
            title: res.message,
            icon: 'success',
          });
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  fileInput(event: any, sessIndex: any, breakIndex: any) {
    this.myFile.push(event.target.files[0]);
    this.myFileIndex.push(sessIndex + '|' + breakIndex);
    while (this.fileUploadArray.length < sessIndex + 1) {
      this.fileUploadArray.push([]);
    }
    while (this.fileUploadArray[sessIndex].length < breakIndex + 1) {
      this.fileUploadArray[sessIndex].push([]);
    }
    this.fileUploadArray[sessIndex][breakIndex] = { file: event.target.files[0], name: event.target.files[0].name };
  }

  back() {
    this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);;
  }

  getAuditPlanDetails() {
    this.commonService.showLoading();
    this.auditPlanService.getPlanDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if (res) {
          this.auditPlanDetails = res;
          this.vendorName = res.vendorName;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
    });
  }

  getCategoryDetails() {
    this.commonService.showLoading();
    this.categoryService.getCategoryDetails(this.categoryId).subscribe({
      next: (res) => {
        if (res) {
          this.categoryName = res.name;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
      ,
    });
  }

  openSectionModal(reg: any) {
    const initialState: ModalOptions = {
      initialState: {
        data: reg,
        auditId: this.auditPlanId,
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(SectionHeadRemarksComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openLastModal(reg: any) {
    const initialState: ModalOptions = {
      initialState: {
        data: reg,
        auditId: this.auditPlanId,
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(LastYearRemarksComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

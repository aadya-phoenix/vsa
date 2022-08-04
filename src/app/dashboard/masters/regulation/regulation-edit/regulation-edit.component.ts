import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditAreaMasterService } from 'src/app/shared/services/audit-area-master/audit-area-master.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { RegulationMasterService } from 'src/app/shared/services/regulation-master/regulation-master.service';

@Component({
  selector: 'app-regulation-edit',
  templateUrl: './regulation-edit.component.html',
  styleUrls: ['./regulation-edit.component.css']
})
export class RegulationEditComponent implements OnInit {

  regulationForm: FormGroup;
  regulation_id:any;
  regulationDetails:any;
  auditAreaObj:any=[];
  categoryObj:any=[];
  
  constructor(
    private formBuilder: FormBuilder,
    private regulationService:RegulationMasterService,
    private categoryService:CategoryMasterService,
    private auditAreaService:AuditAreaMasterService,
    private router:Router,
    private route: ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.regulation_id = Id ? Id : 0;
    });
    this.regulationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
     // code: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      auditAreaId: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
    this.getCategoryList();
    this. getAuditAreaList();

    this.regulation_id ? this.getRegulationDetails() : '';
  }

  save(){
    if (this.regulationForm.invalid) {
      return;
    }
    const body = this.regulationForm.value;
    this.regulation_id ?  this.editRegulation(body) : this.addRegulation(body); 
  }

  editRegulation(body:any){
    body.id = this.regulation_id;
    this.regulationService.edit(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/regulation'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  addRegulation(body:any){
    this.regulationService.add(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/regulation'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  getRegulationDetails(){
    this.regulationService.getRegulationDetails(this.regulation_id).subscribe({
      next: (res) => {
        if(res){
         this.regulationDetails = res;
         this.regulationForm.controls['name'].setValue(this.regulationDetails.name);
         this.regulationForm.controls['categoryId'].setValue(this.regulationDetails.categoryId);
         this.regulationForm.controls['auditAreaId'].setValue(this.regulationDetails.auditAreaId);
        }
       },
      error: (e) => console.error(e), 
     });
  }

  getCategoryList(){
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        if(res){
         this.categoryObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  getAuditAreaList(){
    this.auditAreaService.getAuditArea().subscribe({
      next: (res) => {
        if(res){
         this.auditAreaObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  close(){
    this.router.navigateByUrl('dashboard/regulation');
  }

}

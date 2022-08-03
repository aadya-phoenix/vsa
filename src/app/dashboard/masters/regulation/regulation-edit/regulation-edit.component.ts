import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private regulationService:RegulationMasterService,
    private router:Router
  ) { 
    this.regulationForm = this.formBuilder.group({
      regulation_name: new FormControl('', [Validators.required]),
      regulation_code: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      audit_area: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
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
         this.regulationForm.controls['code'].setValue(this.regulationDetails.code);
        }
       },
      error: (e) => console.error(e), 
     });
  }

  close(){
    this.router.navigateByUrl('dashboard/regulation');
  }

}

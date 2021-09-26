import {Component, OnInit} from '@angular/core';
//import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from '@angular/forms';



export interface Subject {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLinear = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  ffcForm: FormGroup;
  @ViewChild('chipList', { static: true }) chipList;
  GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  selected: string = "Test";
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  //firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;

  registerForm: FormGroup;
  submitted = false;

  /*
  * Initialize cliqued tab in interface
  */
  is_tab_fcc_cliqued : boolean = true;
  is_tab_desc_cliqued : boolean = false;
  is_tab_matr_cliqued : boolean = false;
  is_tab_spec_cliqued : boolean = false;

  /*
  * Initialize dynamic variable
  */

  /*Initialize FCC variable */
  planta_project : string = "";
  engineering_num : string = "";
  bio_num : string = "";
  drawing_type : string = "";
  revision_type : string = "";
  article_num : string = "";
  purchase_num : string = "";
  first_description : string = "";
  second_description : string = "";
  model_type : string = "";
  connection_type : string = "simple";

  /*Initialize DESCRIPTION variable */
  desc_l : string = "";


  constructor(public fb: FormBuilder, private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      planta_project: ['', Validators.required],
      engineering: ['', Validators.required],
      bios_number: ['', Validators.required],
      drawing_type: ['', [Validators.required, Validators.email]],
      revision: ['', [Validators.required, Validators.minLength(6)]],
      num_article: ['', Validators.required],
      purchase_num: ['', Validators.requiredTrue],
      first_description: ['', Validators.requiredTrue],
      second_description: ['', Validators.requiredTrue],
      model_type: ['', Validators.requiredTrue],
      connection_type: ['simple', Validators.requiredTrue]



  }, {
  });

    this.reactiveForm()

    /*
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  */
  }

    /* Reactive form */
    reactiveForm() {
      this.ffcForm = this.fb.group({
        planta_project: [''],
        email: [''],
        engineering: [''],
        bios_number: [''],      
        drawing_type: [''],
        revision: [''],
        num_article: [''],
        num_purchase: [''],
        initial_description: [''],
        second_description: ['']
      })
    }

    /* Date */
    date(e) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.ffcForm.get('dob').setValue(convertDate, {
        onlyself: true
      })
    }

      /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

   /* Remove dynamic languages */
   remove(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }  

  submitForm() {
    console.log(this.ffcForm.value)
  }


  //////////

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }



onReset() {
    this.submitted = false;
    this.registerForm.reset();
}






/*
function buttons
* Make cuurrent tas active
* Make all other tab as inactive
*/
open_fcc_tab () {
  this.is_tab_fcc_cliqued = true;
  this.is_tab_desc_cliqued = false;
  this.is_tab_matr_cliqued = false;
  this.is_tab_spec_cliqued = false;

  document.getElementById("fcc_button").className ="nav-link active"
  document.getElementById("desc_button").className ="nav-link "
  document.getElementById("matr_button").className ="nav-link "
  document.getElementById("spec_button").className ="nav-link "

}
open_desc_tab () {
  this.is_tab_desc_cliqued = true;
  this.is_tab_fcc_cliqued = false;
  this.is_tab_matr_cliqued = false;
  this.is_tab_spec_cliqued = false;

  document.getElementById("desc_button").className ="nav-link active"
  document.getElementById("fcc_button").className ="nav-link "
  document.getElementById("matr_button").className ="nav-link "
  document.getElementById("spec_button").className ="nav-link "

  
}
open_matr_tab () {
  this.is_tab_matr_cliqued = true;
  this.is_tab_desc_cliqued = false;
  this.is_tab_fcc_cliqued = false;
  this.is_tab_spec_cliqued = false;

  document.getElementById("matr_button").className ="nav-link active"
  document.getElementById("fcc_button").className ="nav-link"
  document.getElementById("desc_button").className ="nav-link "
  document.getElementById("spec_button").className ="nav-link "

 
}
open_spec_tab () {
  this.is_tab_spec_cliqued = true;
  this.is_tab_desc_cliqued = false;
  this.is_tab_fcc_cliqued = false;
  this.is_tab_matr_cliqued = false;
  
  document.getElementById("spec_button").className ="nav-link active"
  document.getElementById("fcc_button").className ="nav-link "
  document.getElementById("desc_button").className ="nav-link "
  document.getElementById("matr_button").className ="nav-link "

}

}

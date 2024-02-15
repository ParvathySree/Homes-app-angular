import { HousingLocation } from './../housing-location';
import { HousingService } from './../housing.service';
import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
   <article>
    <img class="listing-photo" [src]="housingLocation?.photo">
    <div class="content-div">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">ABOUT THE LOCATION</h2>
      <ul>
        <li>Units available : {{housingLocation?.availableUnits}}</li>
        <li>Does this location have WiFi : {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry : {{housingLocation?.laundry}}
      </ul>
    </section>
    <section class="listing-apply">
    <h2 class="section-heading"> Apply to live here</h2>
    <form [formGroup]="applyForm" (submit)="submitApplication()">
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" type="text" formControlName="firstName">

      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" type="text" formControlName="lastName">
      
      <label for="email">Last Name</label>
      <input type="text" id="email" type="email" formControlName="email">
      <button class="primary" type="submit">Apply Now</button>
    </form>
    </section>
</div>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route : ActivatedRoute =  inject(ActivatedRoute)
  housingService =  inject(HousingService);
  housingLocation: HousingLocation | undefined;
  housingLocationId = 0;
  applyForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
      this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}

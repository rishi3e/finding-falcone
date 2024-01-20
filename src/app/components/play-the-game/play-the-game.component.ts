import { Component, OnInit } from '@angular/core';
import { FalconAPIService } from 'src/app/falcon-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-the-game',
  templateUrl: './play-the-game.component.html',
  styleUrls: ['./play-the-game.component.css'],
})
export class PlayTheGameComponent implements OnInit {
  TimeTaken: number = 0;
  Destinations: any;
  Vehicles: any;
  playTheGameForm!: FormGroup;
  selectedDestination: string = '';
  selectedVehicle: string = '';
  planet_names: string[] = [];
  vehicle_names: string[] = [];
  falconTokenObj: any;
  enableSubmitButton: boolean = false;
  letsPlayTheGame: boolean = true;
  showResultScreen: boolean = false;
  resultResponse: any;

  destination1Value: boolean = false;
  destination2Value: boolean = false;
  destination3Value: boolean = false;
  destination4Value: boolean = false;

  desOneSelectedValue: string = '';
  desTwoSelectedValue: string = '';
  desThreeSelectedValue: string = '';
  desFourSelectedValue: string = '';

  isDestinationOneSelected: boolean = false;
  isDestinationTwoSelected: boolean = false;
  isDestinationThreeSelected: boolean = false;
  isDestinationFourSelected: boolean = false;

  private subscriptionAPI: Subscription[] = [];

  constructor(formBuilder: FormBuilder, public falconApi: FalconAPIService) {
    this.playTheGameForm = formBuilder.group({
      destination1: [],
      destination2: [{ value: '', disabled: true }],
      destination3: [{ value: '', disabled: true }],
      destination4: [{ value: '', disabled: true }],
      destination1VehicleSelected: [],
      destination2VehicleSelected: [],
      destination3VehicleSelected: [],
      destination4VehicleSelected: [],
    });
  }

  ngOnInit(): void {
    const subs1 = this.falconApi.getPlanets().subscribe((data) => {
      this.Destinations = data;
      // console.log(this.Destinations);
    });
    this.subscriptionAPI.push(subs1);

    const subs2 = this.falconApi.getVehicles().subscribe((data) => {
      this.Vehicles = data;
      // console.log(this.Vehicles);
    });
    this.subscriptionAPI.push(subs2);

    const subs3 = this.falconApi.apiToken().subscribe((res) => {
      this.falconTokenObj = res;
    });
    this.subscriptionAPI.push(subs3);
  }

  ngOnDestroy(): void {
    this.subscriptionAPI.forEach((unsub) => {
      // console.log(unsub);
      unsub.unsubscribe();
    });
  }

  destinationSelected(e: any) {
    // console.log(e)
    // this.selectedDestination = this.playTheGameForm.controls['destination1'].value;
    // console.log(this.selectedDestination);

    // console.log(e.target.textContent.trim());
    this.selectedDestination = e.target.textContent.trim();
  }

  enableDestinationOneVehicles() {
    this.isDestinationOneSelected = true;
  }

  enableDestinationTwoVehicles() {
    this.isDestinationTwoSelected = true;
  }

  enableDestinationThreeVehicles() {
    this.isDestinationThreeSelected = true;
  }

  enableDestinationFourVehicles() {
    this.isDestinationFourSelected = true;
  }

  disableDestinationOneSelect() {
    this.destination1Value = true;
    this.desOneSelectedValue = this.selectedDestination;
    this.playTheGameForm.controls['destination1'].disable();
    this.playTheGameForm.controls['destination1VehicleSelected'].disable();
    this.playTheGameForm.controls['destination2'].enable();
  }

  disableDestinationTwoSelect() {
    this.destination2Value = true;
    this.desTwoSelectedValue = this.selectedDestination;
    this.playTheGameForm.controls['destination2'].disable();
    this.playTheGameForm.controls['destination2VehicleSelected'].disable();
    this.playTheGameForm.controls['destination3'].enable();
  }

  disableDestinationThreeSelect() {
    this.destination3Value = true;
    this.desThreeSelectedValue = this.selectedDestination;
    this.playTheGameForm.controls['destination3'].disable();
    this.playTheGameForm.controls['destination3VehicleSelected'].disable();
    this.playTheGameForm.controls['destination4'].enable();
  }

  disableDestinationFourSelect() {
    this.destination4Value = true;
    this.desFourSelectedValue = this.selectedDestination;
    this.playTheGameForm.controls['destination4'].disable();
    this.playTheGameForm.controls['destination4VehicleSelected'].disable();
    this.enableSubmitButton = true;
  }

  vehicleSelected(e: any) {
    // console.log(e)
    // this.selectedVehicle = this.playTheGameForm.controls['destination1VehicleSelected'].value;

    this.selectedVehicle = e.target.value;
    // console.log(this.selectedVehicle);
    this.timeTakenCount();
  }

  timeTakenCount(): any {
    let tempArray1 = [...this.Destinations];
    let destinationDistance = tempArray1.find((element) => {
      if (element.name === this.selectedDestination) {
        return element;
      }
    });

    // console.log(destinationDistance.distance);

    let tempArray2 = [...this.Vehicles];
    let vehicleDistance = tempArray2.find((element) => {
      if (element.name === this.selectedVehicle) {
        return element;
      }
    });

    // console.log(vehicleDistance.max_distance);

    if (destinationDistance.distance <= vehicleDistance.max_distance) {
      let tempTimeTaken = destinationDistance.distance / vehicleDistance.speed;
      this.TimeTaken = this.TimeTaken + tempTimeTaken;
      // console.log(this.TimeTaken);

      tempArray1.find((element: any, index): any => {
        if (element.name === destinationDistance.name) {
          this.planet_names.push(element.name);
          this.Destinations.splice(index, 1);
        }
      });

      // console.log(this.Destinations);

      tempArray2.find((element, index): any => {
        if (element.name === vehicleDistance.name) {
          this.vehicle_names.push(element.name);
          this.Vehicles[index].total_no--;
        }
      });
    } else {
      alert('Please choose other vehicle :)');
      this.resetGame();
    }
  }

  findFalcon() {
    // console.log(this.planet_names);
    // console.log(this.vehicle_names);
    // console.log(this.falconTokenObj.token);

    let result = {
      token: this.falconTokenObj.token,
      planet_names: this.planet_names,
      vehicle_names: this.vehicle_names,
    };

    let findResult = JSON.stringify(result);
    // console.log(findResult);

    this.falconApi.findFalcon(findResult).subscribe((res) => {
      // console.log(res);
      this.resultResponse = res;
      this.showResultScreen = true;
    });
    this.letsPlayTheGame = false;
  }

  resetGame() {
    this.falconApi.sendClickEvent();
    // window.location.reload();
  }
}

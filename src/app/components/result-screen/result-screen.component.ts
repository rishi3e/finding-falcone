import { Component, Input, OnInit } from '@angular/core';
import { FalconAPIService } from 'src/app/falcon-api.service';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css'],
})
export class ResultScreenComponent implements OnInit {
  isSuccess: boolean = false;
  isFailure: boolean = false;
  isError: boolean = false;

  @Input('falconResult') falconResult: any = {};
  @Input('timeTaken') timeTaken?: number;

  constructor(public falconApi: FalconAPIService) {}

  ngOnInit(): void {
    // console.log(this.falconResult);
    // console.log(this.timeTaken);
    this.getResult();
  }

  getResult() {
    if (this.falconResult.status === 'success') {
      this.isSuccess = true;
    } else if (this.falconResult.status === 'false') {
      this.isFailure = true;
    } else {
      this.isError = true;
    }
  }

  startAgain() {
    this.falconApi.sendClickEvent();
    // window.location.reload();
  }
}

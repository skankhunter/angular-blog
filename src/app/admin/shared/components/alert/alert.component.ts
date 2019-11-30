import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() delay = 5000; // miliseconds
  public text: string;
  public  type = 'success';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alert$.subscribe(alert => {
      // @ts-ignore
      this.text = alert.text;
      // @ts-ignore
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

}

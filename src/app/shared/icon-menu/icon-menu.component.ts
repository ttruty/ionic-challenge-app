import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrls: ['./icon-menu.component.scss'],
})
export class IconMenuComponent implements OnInit {

  public iconList: string[]

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.iconList = [
      "beer",
      "heart",
      "school",
      "pulse",
      "pizza",
      "american-football",
      "alarm",
      "bag",
      "basketball",
      "baseball",
      "bicycle",
      "barbell",
      "dice",
      "diamond",
      "golf",
      "leaf",
      "cash",
      "walk"



    ]
  }

  onSelectIcon(icon: string){
    console.log(icon);
    this.popoverCtrl.dismiss(
      {
        iconData: {
          icon: icon
        },
      },
      'confirm'
    );
  }

}

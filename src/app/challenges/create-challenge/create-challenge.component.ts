import { IconMenuComponent } from './../../shared/icon-menu/icon-menu.component';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss'],
})
export class CreateChallengeComponent implements OnInit {
  @Input() selectedMode: 'single' | 'series';
  challengeForm: FormGroup;
  users: User[];

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private authService: AuthService
  ) {
    this.challengeForm = this.formBuilder.group({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      icon: new FormControl(null, {
        validators: [Validators.required],
      }),
      unit: new FormControl(null, {
        validators: [Validators.required],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required],
      }),
      due: new FormControl(null, {
        validators: [Validators.required],
      }),
      assignedTo: new FormControl(null)
    });
    // this.bookingForm.valueChanges.subscribe(obs => {
    //   console.log("Changes");
    // })
  }

  ngOnInit() {
    this.users = this.authService.UserData
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: IconMenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', data.iconData.icon);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    console.log(this.challengeForm.value);
  }

  onCreateChallenge() {
    this.modalCtrl.dismiss(
      {
        challengeData: {
          title: this.challengeForm.value.title,
          description: this.challengeForm.value.description,
          icon: this.challengeForm.value.icon,
          unit: this.challengeForm.value.unit,
          amount: this.challengeForm.value.amount,
          due: new Date(this.challengeForm.value.due),
          assigned: new Date(),
          assignedTo: this.challengeForm.value.assignedTo
        },
      },
      'confirm'
    );
  }
}

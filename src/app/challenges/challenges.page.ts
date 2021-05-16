import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge.model';
import { Component, OnInit } from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage implements OnInit {
  challengeList: Challenge[];
  loadedChallenges: Challenge[];
  listLoadedChallenges: Challenge[];
  releventChallenges: Challenge[];
  private filter = 'mine';
  isLoading = false;
  user: User;
  private challengeSub: Subscription;

  constructor(
    private challengesService: ChallengesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.challengeList = this.challengesService.ChallengeData;
    this.listLoadedChallenges = this.challengeList;
    this.loadedChallenges = this.challengeList;
    this.releventChallenges = this.challengeList;
    this.user = this.authService.UserData[0]

    this.challengeSub = this.challengesService.challenges.subscribe(challenges => {
      this.listLoadedChallenges = challenges;
      this.segmentChanged(this.filter);
      this.releventChallenges = this.loadedChallenges;
      this.loadedChallenges = challenges;
    })

  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.challengesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.challengeSub) {
      this.challengeSub.unsubscribe();
    }
  }

  // reload the places whenever on enter the discover page
  // ionViewDidEnter() {
  //   this.loadedPlaces = this.placesService.places;
  //   this.listLoadedPlaces = this.loadedPlaces.slice(1);
  // }

  // segmentChanged(filter: string) {
  //   console.log("Segment Changed", filter)
  //   this.authService.userId.pipe(take(1)).subscribe(userId => {
  //     const isShown = place => filter === 'all' || place.userId !== userId;
  //     this.releventPlaces = this.loadedPlaces.filter(isShown);
  //     this.filter = filter;
  //     this.listLoadedPlaces = this.releventPlaces.slice(1);
  //   })
  // }

  segmentChanged(filter: string) {
    console.log('Segment Changed', filter);
  }

  onClick() {
    console.log('Profile clicked');
  }

  onAddClick() {
    console.log('add clicked');
  }

  onAddChallenge() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'New Single Challenge',
            handler: () => {
              this.openChallengeModel('single');
            },
          },
          {
            text: 'New Series',
            handler: () => {
              this.openChallengeModel('series');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openChallengeModel(mode: 'single' | 'series') {
    console.log(mode);

    this.modalCtrl
      .create({
        component: CreateChallengeComponent,
        componentProps: { user: this.user, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);

        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({
              message: 'Making Bet...',
            })
            .then((loadingEl) => {
              loadingEl.present();
              const data = resultData.data.challengeData;
              this.challengesService
                .addChallenge(
                  data.title,
                  data.description,
                  data.icon,
                  data.unit,
                  data.amount,
                  data.due,
                  data.assinged,
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
}

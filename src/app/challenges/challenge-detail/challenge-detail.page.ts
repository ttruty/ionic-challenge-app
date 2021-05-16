import { ChallengesService } from './../challenges.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../challenge.model';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.page.html',
  styleUrls: ['./challenge-detail.page.scss'],
})
export class ChallengeDetailPage implements OnInit {
  challenge: Challenge;
  challengeId: string;
  isBookable = false;
  private challengeSub: Subscription;
  isLoading = false;
  fetchedUserId: string;

  constructor(
    private challengesService: ChallengesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap)
      if (!paramMap.has('challengeId')) {
        this.navCtrl.navigateBack('/challenges');
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;

      console.log("FETCHED USER ID", this.fetchedUserId)
      //this.challenge = this.challengesService.ChallengeData[this.challengesService.getChallenge(this.fetchedUserId)]

      this.challengesService.getChallenge(paramMap.get('challengeId')).subscribe( challenge => {
          this.challenge = challenge
        }, error => {
          this.alertCtrl.create({
            header: 'An Error Occurred',
            message: 'Could not load challenge',
            buttons: [{text: 'Okay', handler: () => {
              this.router.navigate(['/places/tabs/discover']);
            }}]
          }).then(alertEl => {
            alertEl.present();
          });
        })
      });
  }


    //   this.authService.userId.pipe(take(1), switchMap(userId => {
    //     if (!userId){
    //       throw new Error('Found no user Id')
    //     }
    //     fetchedUserId = userId;
    //     return this.challengesService.getChallenge(paramMap.get('challengeId'));
    //   })).subscribe( challengeId => {
    //     console.log("GET", challengeId)
    //     this.challengeId = challengeId;
    //     this.isLoading = false;
    //   }, error => {
    //     this.alertCtrl.create({
    //       header: 'An Error Occurred',
    //       message: 'Could not load place',
    //       buttons: [{text: 'Okay', handler: () => {
    //         this.router.navigate(['/challenges']);
    //       }}]
    //     }).then(alertEl => {
    //       alertEl.present();
    //     });
    //   })
    // });
  // }

}

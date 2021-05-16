import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Challenge } from './challenge.model';
import { Injectable } from '@angular/core';
import { take, switchMap, delay, tap, map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  constructor(private authService: AuthService, private http: HttpClient) {
    this._challenges.next(this.ChallengeData);
  }

  private _challenges = new BehaviorSubject<Challenge[]>([]);

  get challenges() {
    return this._challenges.asObservable();
  }

  ChallengeData = [
    new Challenge(
      'abc',
      'Truty Tech Class',
      'Learn tech for dum dums',
      'beer',
      'beer',
      2,
      new Date(),
      new Date(),
      '789',
      [this.authService.UserData[0],this.authService.UserData[1]]


    ),
    new Challenge(
      'cde',
      'Running Group',
      'Go running yall',
      'heart',
      'beer',
      2,
      new Date(),
      new Date(),
      '123',
      [this.authService.UserData[1],this.authService.UserData[2]]
    ),
    new Challenge(
      'fgh',
      'Yoga Class',
      'Lorem Epsim dfjsdf',
      'pulse',
      'beer',
      2,
      new Date(),
      new Date(),
      '456',
      [this.authService.UserData[0],this.authService.UserData[2]]
    ),
  ];

  fetchPlaces() {
    return of(this.ChallengeData)
  }


  getChallenge(id: string) {
    console.log("GET CHALLENGE", id)

    const foundChallenge = this.ChallengeData.findIndex((p) => p.id === id);
    console.log(foundChallenge)
    console.log(this.ChallengeData[foundChallenge])
    return of(this.ChallengeData[foundChallenge])
  }

  addChallenge(
    challengeTitle: string,
    challengeDescription: string,
    challegeIcon: string,
    challengeUnit: string,
    challengeAmount: number,
    challengeDue: Date,
    challengeAssigned: Date,
  ) {
    console.log("CREATEING CHALLENGE")
    let newChallenge = new Challenge(
      Math.random().toString(),
      challengeTitle,
      challengeDescription,
      challegeIcon,
      challengeUnit,
      challengeAmount,
      challengeDue,
      challengeAssigned,
      "123"
    );
    //this.ChallengeData.push(newChallenge)
    return this.challenges.pipe(take(1), delay(1500), tap(bookings => {
        this._challenges.next(bookings.concat(newChallenge));
  }))
}
}

    // let generatedId: string;
    // let newChallenge: Challenge;
    // let fetchedUserId: string;
    // return this.authService.userId.pipe(
    //   take(1),
    //   switchMap((userId) => {
    //     if (!userId) {
    //       throw new Error('No user id found');
    //     }
    //     fetchedUserId = userId;
    //     return this.authService.token;
    //   }),
    //   take(1),
    //   switchMap((token) => {
    //     newChallenge = new Challenge(
    //       Math.random().toString(),
    //       challengeTitle,
    //       challengeDescription,
    //       challegeIcon,
    //       challengeUnit,
    //       challengeAmount,
    //       challengeDue,
    //       challengeAssigned,
    //       fetchedUserId
    //     );
    //     return this.http.post<{ name: string }>(
    //       `https://ionic-air-bb-clone-default-rtdb.firebaseio.com/bookings.json?auth=${token}`,
    //       {
    //         ...newChallenge,
    //         id: null,
    //       }
    //     );
    //   }),
    //   switchMap((resData) => {
    //     generatedId = resData.name;
    //     return this.bookings;
    //   }),
    //   take(1),
    //   tap((bookings) => {
    //     newBooking.id = generatedId;
    //     this._bookings.next(bookings.concat(newBooking));
    //   })
    // );

    // return this.bookings.pipe(take(1), delay(1500), tap(bookings => {
    //   this._bookings.next(bookings.concat(newBooking));
    //   })
    // );
  // }
// }

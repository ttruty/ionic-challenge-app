import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengesPage } from './challenges.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengesPage
  },
  {
    path: 'challenge-detail',
    loadChildren: () => import('./challenge-detail/challenge-detail.module').then( m => m.ChallengeDetailPageModule)
  },
  {
    path: 'challenge-detail/:challengeId',
    loadChildren: () => import('./challenge-detail/challenge-detail.module').then( m => m.ChallengeDetailPageModule)
  },
  {
    path: 'new-challenge',
    loadChildren: () => import('./new-challenge/new-challenge.module').then( m => m.NewChallengePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengesPageRoutingModule {}

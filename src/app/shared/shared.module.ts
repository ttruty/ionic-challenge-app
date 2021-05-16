import { IconMenuComponent } from './icon-menu/icon-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent, ProfileMenuComponent, IconMenuComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }



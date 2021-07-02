import { NgModule } from '@angular/core';

import {MatRadioModule} from "@angular/material/radio";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    MatRadioModule, MatCardModule,
    MatInputModule, MatButtonModule
  ],
  exports: [
    MatRadioModule, MatCardModule,
    MatInputModule, MatButtonModule
  ]
})
export class MaterialModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultItemComponent } from './result-item/result-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReposService } from './app.services/reposService';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    ResultListComponent,
    ResultItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TODO: do we realy need to inject all it here? not in component where it used
    NoopAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
    ReposService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

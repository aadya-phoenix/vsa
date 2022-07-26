import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

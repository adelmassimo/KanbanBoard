import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguCarouselModule } from '@ngu/carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from "@angular/material";

import { AppComponent } from './app.component';
import { PUComponent } from './pu/pu.component';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegisterComponent } from './register/register.component';
import { HeaderPaginaComponent } from './header-pagina/header-pagina.component';
import { LavagnaComponent } from './lavagna/lavagna.component';
import { PostItComponent } from './post-it/post-it.component';
import { ProjectComponent } from './project/project.component';
import { PostItDialogComponent } from './postIt-dialog/postIt-dialog.component';
import { ImpostazioniProgettoDialogComponent } from './impostazioni-progetto-dialog/impostazioni-progetto-dialog.component'

import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ProjectService } from './services/project.service';
import { PuService } from './services/pu.service'
import { UserService } from './services/user.service'
import { NewProjectService } from './services/new-project.service';

import { LocalStorageService } from './services/local-storage.service';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [
    AppComponent,
    PUComponent,
    HeaderPaginaComponent,
    LoginComponent,
    LoginRegisterComponent,
    RegisterComponent,
    ProjectComponent,
    LavagnaComponent,
    PostItComponent,
    PostItDialogComponent,
    ImpostazioniProgettoDialogComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StorageServiceModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    NguCarouselModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents: [
    PostItDialogComponent,
    ImpostazioniProgettoDialogComponent
  ]
})
export class AppModule { }

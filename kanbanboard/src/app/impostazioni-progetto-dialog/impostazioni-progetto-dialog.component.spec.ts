import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniProgettoDialogComponent } from './impostazioni-progetto-dialog.component';

describe('ImpostazioniProgettoDialogComponent', () => {
  let component: ImpostazioniProgettoDialogComponent;
  let fixture: ComponentFixture<ImpostazioniProgettoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostazioniProgettoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostazioniProgettoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

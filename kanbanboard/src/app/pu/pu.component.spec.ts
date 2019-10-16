import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PUComponent } from './pu.component';

describe('PUComponent', () => {
  let component: PUComponent;
  let fixture: ComponentFixture<PUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


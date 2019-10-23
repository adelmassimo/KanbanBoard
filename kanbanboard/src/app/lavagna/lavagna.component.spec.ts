import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LavagnaComponent } from './lavagna.component';

describe('LavagnaComponent', () => {
  let component: LavagnaComponent;
  let fixture: ComponentFixture<LavagnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LavagnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LavagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

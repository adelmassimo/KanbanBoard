import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItDialogComponent } from './postIt-dialog.component';

describe('CourseDialogComponent', () => {
  let component: PostItDialogComponent;
  let fixture: ComponentFixture<PostItDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostItDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

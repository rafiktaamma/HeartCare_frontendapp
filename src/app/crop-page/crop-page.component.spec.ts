import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPageComponent } from './crop-page.component';

describe('CropPageComponent', () => {
  let component: CropPageComponent;
  let fixture: ComponentFixture<CropPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

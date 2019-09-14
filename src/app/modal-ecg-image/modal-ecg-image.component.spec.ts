import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEcgImageComponent } from './modal-ecg-image.component';

describe('ModalEcgImageComponent', () => {
  let component: ModalEcgImageComponent;
  let fixture: ComponentFixture<ModalEcgImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEcgImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEcgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

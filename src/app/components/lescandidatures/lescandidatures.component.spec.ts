import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LescandidaturesComponent } from './lescandidatures.component';

describe('LescandidaturesComponent', () => {
  let component: LescandidaturesComponent;
  let fixture: ComponentFixture<LescandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LescandidaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LescandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

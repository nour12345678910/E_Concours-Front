import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenConcoursComponent } from './men-concours.component';

describe('MenConcoursComponent', () => {
  let component: MenConcoursComponent;
  let fixture: ComponentFixture<MenConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

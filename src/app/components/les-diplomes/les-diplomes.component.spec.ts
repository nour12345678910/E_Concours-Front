import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesDiplomesComponent } from './les-diplomes.component';

describe('LesDiplomesComponent', () => {
  let component: LesDiplomesComponent;
  let fixture: ComponentFixture<LesDiplomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesDiplomesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesDiplomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgesStatComponent } from './ages-stat.component';

describe('AgesStatComponent', () => {
  let component: AgesStatComponent;
  let fixture: ComponentFixture<AgesStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgesStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgesStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

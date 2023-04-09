import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifConcoursComponent } from './modif-concours.component';

describe('ModifConcoursComponent', () => {
  let component: ModifConcoursComponent;
  let fixture: ComponentFixture<ModifConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

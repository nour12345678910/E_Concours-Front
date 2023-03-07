import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterConcoursComponent } from './ajouter-concours.component';

describe('AjouterConcoursComponent', () => {
  let component: AjouterConcoursComponent;
  let fixture: ComponentFixture<AjouterConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

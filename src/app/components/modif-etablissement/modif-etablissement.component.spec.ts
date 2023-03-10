import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEtablissementComponent } from './modif-etablissement.component';

describe('ModifEtablissementComponent', () => {
  let component: ModifEtablissementComponent;
  let fixture: ComponentFixture<ModifEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifEtablissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

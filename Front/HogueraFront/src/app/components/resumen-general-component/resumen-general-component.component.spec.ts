import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGeneralComponentComponent } from './resumen-general-component.component';

describe('ResumenGeneralComponentComponent', () => {
  let component: ResumenGeneralComponentComponent;
  let fixture: ComponentFixture<ResumenGeneralComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenGeneralComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenGeneralComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

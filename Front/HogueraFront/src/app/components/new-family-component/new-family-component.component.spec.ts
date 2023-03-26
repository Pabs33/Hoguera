import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFamilyComponentComponent } from './new-family-component.component';

describe('NewFamilyComponentComponent', () => {
  let component: NewFamilyComponentComponent;
  let fixture: ComponentFixture<NewFamilyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFamilyComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFamilyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

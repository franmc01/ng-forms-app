import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchForm } from './switch-form';

describe('SwitchForm', () => {
  let component: SwitchForm;
  let fixture: ComponentFixture<SwitchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

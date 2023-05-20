import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTaskComponent } from './info-task.component';

describe('InfoTaskComponent', () => {
  let component: InfoTaskComponent;
  let fixture: ComponentFixture<InfoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

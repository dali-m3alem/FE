import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagerLayoutComponent } from './admin-manager-layout.component';

describe('AdminManagerLayoutComponent', () => {
  let component: AdminManagerLayoutComponent;
  let fixture: ComponentFixture<AdminManagerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserBottomSheetsComponent } from './update-user-bottom-sheets.component';

describe('UpdateUserBottomSheetsComponent', () => {
  let component: UpdateUserBottomSheetsComponent;
  let fixture: ComponentFixture<UpdateUserBottomSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserBottomSheetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserBottomSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

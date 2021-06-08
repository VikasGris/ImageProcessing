import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomComponentComponent } from './zoom-component.component';

describe('ZoomComponentComponent', () => {
  let component: ZoomComponentComponent;
  let fixture: ComponentFixture<ZoomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

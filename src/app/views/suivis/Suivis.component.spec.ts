import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuivisComponent } from './Suivis.component';

describe('SuivisComponent', () => {
  let component: SuivisComponent;
  let fixture: ComponentFixture<SuivisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularDelegate } from '@ionic/angular';
import { environment } from 'src/environments/environment';  
import { StorageService } from './storage.service';

//local storage - falta revisar si anda o no 
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, AngularDelegate],
      imports: [
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFireAuthModule,
      ],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

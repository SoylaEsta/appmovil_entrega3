import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  vehicleForm: FormGroup;
  regions: any;
  comunas: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private regionService: RegionService) {
    this.vehicleForm = this.formBuilder.group({
      make: ['',[Validators.required, Validators.maxLength(50)],],
      model: ['',[Validators.required, Validators.maxLength(50)],],
      year: [ null, [Validators.required, this.customYearValidator()],],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.regionService.getRegions().subscribe((data) => {
      this.regions = data.data;
      console.log('Regiones cargadas:', this.regions);
    });
  }

  customYearValidator(): ValidatorFn {
    return (control) => {
      const year = control.value;
      const currentYear = new Date().getFullYear();
      if (year && (year < 1900 || year > currentYear)) {
        return { invalidYear: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      console.log('Datos del formulario:', formData);
    } else {
      console.log('Formulario no válido');
    }
  }

  obtenerComunas() {
    const selectedRegion = this.vehicleForm.get('region')?.value;
    console.log('Región seleccionada:', selectedRegion);

    if (selectedRegion) {
      this.regionService.getComunas(selectedRegion).subscribe((comunas) => {
        this.comunas = comunas;
        console.log('Comunas cargadas:', this.comunas);
      });
    }
  }

  volverAlPrincipal() {
    this.router.navigate(['/principal']);
  }
}

import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country, CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-home',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-home.html',
  styleUrl: './country-home.scss',
})
export class CountryHome {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal([] as Country[]);
  borders = signal([] as string[]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  // Detect que region fue seleccionada, usando senales
  onFormChanged = effect((onCleanup) => {
    const region = this.myForm.get('region')!.valueChanges.subscribe((region) => {
      this.myForm.get('country')?.reset('');
      this.myForm.get('border')?.reset('');
      this.borders.set([]);

      if (!region) {
        this.countriesByRegion.set([]);
        return;
      }

      this.countryService.getCountriesByRegion(region).subscribe((countries: Country[]) => {
        this.countriesByRegion.set(countries);
      });
    });

    const country = this.myForm.get('country')!.valueChanges.subscribe((code) => {
      this.myForm.get('border')?.reset('');
      this.borders.set([]);

      if (!code) {
        this.borders.set([]);
        return;
      }

      const country = this.countriesByRegion().find((c) => c.cca3 === code);
      if (country && country.borders) {
        this.countryService.getCountriesByCodes(country.borders).subscribe((countries) => {
          this.borders.set(countries.map((c) => c.name.common));
        });
      } else {
        this.borders.set([]);
      }
    });

    onCleanup(() => country.unsubscribe());
    onCleanup(() => region.unsubscribe());
  });
  
}

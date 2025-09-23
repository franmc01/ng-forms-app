import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

export interface Country {
    name: Name;
    cca3:         string;
    borders?:     string[];
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: NativeName };
}

export interface NativeName {
    official: string;
    common:   string;
}


@Injectable({
  providedIn: "root"
})
export class CountryService {
  private baseURL = "https://restcountries.com/v3.1";
  private http = inject(HttpClient);

  private _regions: string[] = [
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania"
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!this._regions.includes(region)) {
      throw new Error(`Invalid region: ${region}`);
    }

    return this.http.get<Country[]>(`${this.baseURL}/region/${region}`);
  }

  getCountryByCode(code: string): Observable<Country | null> {
    return this.http.get<Country | null>(`${this.baseURL}/alpha/${code}`);
  }

  getCountriesByCodes(borders: string[]): Observable<Country[]> {
    if (borders.length === 0) {
      return new Observable<Country[]>(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    const codes = borders.join(",");

    return this.http.get<Country[]>(`${this.baseURL}/alpha?codes=${codes}`);
  }
}
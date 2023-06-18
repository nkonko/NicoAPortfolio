import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IconsMap } from '@core/models/icons/iconsMap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getSkillsJson(): Observable<IconsMap[]> {
    return this.http.get<IconsMap[]>('assets/json/iconsMapping.json');
  }
}

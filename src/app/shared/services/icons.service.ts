import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IconsMap } from '@core/models/icons/iconsMap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(private http: HttpClient) { }

  getSkillsIconsJson(): Observable<IconsMap[]> {
    return this.http.get<IconsMap[]>('assets/json/skillsIconsMapping.json');
  }

  getTabsIconsJson(): Observable<IconsMap[]> {
    return this.http.get<IconsMap[]>('assets/json/tabsIconsMapping.json');
  }
}

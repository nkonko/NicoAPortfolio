import { Injectable, inject } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { AppState } from '@core/store/models/app.state';
import { SkillSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { IconsService } from '@shared/services/icons.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { assignSkillKeywords } from '../utils/skill-categorizer';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private store = inject(Store<AppState>);
  private iconsService = inject(IconsService);
  private skillsData$: Observable<Skill[] | undefined> = this.store.select(SkillSelector);

  getSkillsByKeyWord(tabName: string): Observable<Skill[]> {
    return this.skillsData$.pipe(
      switchMap((skills) => {
        return this.iconsService.getSkillsIconsJson().pipe(
          map(iconData => {
            const categorized = skills ? assignSkillKeywords(skills) : [];
            const newarray = categorized.map(skill => {
              const newSkill = { ...skill };
              newSkill.icon = iconData.find(icon => icon.name === skill.name)?.iconMap!;
              return newSkill;
            });
            return newarray.filter(skill => skill.keywords.includes(tabName));
          }));
      })
    );
  }
}

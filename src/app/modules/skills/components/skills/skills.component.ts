import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { IconsMap } from '@core/models/icons/iconsMap';
import { AppState } from '@core/store/models/app.state';
import { SkillSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillsData$: Observable<Skill[] | undefined> = this.store.select(SkillSelector);
  skills!: Observable<Skill[]>;
  completSkills!: Skill[];

  constructor(
    private store: Store<AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.skillsData$.pipe(
      switchMap((skills) => {
        return this.http.get<IconsMap[]>('assets/json/iconsMapping.json').pipe(
          map(iconData => {
            const newarray = skills?.map(skill => {
              const newSkill = { ...skill };
              newSkill.icon = iconData.find(icon => icon.name === skill.name)?.iconMap!;
              newSkill.isPlainIcon = iconData.find(icon => icon.name === skill.name)?.isPlainIcon!;
              return newSkill;
            });
            return newarray;
          }));
      })
    ).subscribe(skillsWIcon => {
      this.completSkills = skillsWIcon!
    });
  }
}

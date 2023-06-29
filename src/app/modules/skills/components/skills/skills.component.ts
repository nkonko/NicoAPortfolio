import { Component, OnDestroy, OnInit } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { AppState } from '@core/store/models/app.state';
import { SkillSelector } from '@core/store/selectors/app.selector';
import { SkillsService } from '@modules/skills/service/skills.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  private skillsData$: Observable<Skill[] | undefined> = this.store.select(SkillSelector);
  protected completeSkills!: Skill[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private skillsService: SkillsService) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {

    this.skillsData$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((skills) => {
        return this.skillsService.getSkillsJson().pipe(
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
      this.completeSkills = skillsWIcon!
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Basics } from '@core/models/gitConnectProfile/base';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { StateEvents } from '@core/models/state.events';
import { AppState } from '@core/store/models/app.state';
import { BasicsSelector, SkillSelector } from '@core/store/selectors/app.selector';
import { IconsService } from '@shared/services/icons.service';
import { Store } from '@ngrx/store';
import { ModalContentService } from '@shared/modal/service/modal-content.service';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  protected completeSkills!: Skill[];
  protected name!: string;
  protected jobTitle!: string;
  protected location!: string;
  private unsubscribe$ = new Subject<void>();
  private basics$: Observable<Basics | undefined> = this.store.select(BasicsSelector);
  private skillsData$: Observable<Skill[] | undefined> = this.store.select(SkillSelector);

  constructor(private store: Store<AppState>,
              private skillsService: IconsService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {

    this.basics$.pipe(takeUntil(this.unsubscribe$), map(basics => {
      this.name = basics?.name!;
      const jtitle = `I'm a ${basics?.label!.replace('(', '(').replace(')', ')')}`;
      this.jobTitle = jtitle;
      this.location = basics?.region!;
    })).subscribe();

    this.skillsData$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((skills) => {
        return this.skillsService.getSkillsIconsJson().pipe(
          map(iconData => {
            const newarray = skills?.map(skill => {
              const newSkill = { ...skill };
              newSkill.icon = iconData.find(icon => icon.name === skill.name)?.iconMap!;
              return newSkill;
            });
            return newarray;
          }));
      })
    ).subscribe(skillsWIcon => {
      this.completeSkills = skillsWIcon!;
    });
  }
}

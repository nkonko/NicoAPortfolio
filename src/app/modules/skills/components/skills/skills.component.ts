import { Component, OnDestroy, OnInit } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { AppState } from '@core/store/models/app.state';
import { SkillSelector } from '@core/store/selectors/app.selector';
import { IconsService } from '@shared/services/icons.service';
import { Tab } from '@shared/tabs/model/tab';
import * as skillActions from '../../state/actions/skills.action';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { SkillBoxesComponent } from '../../../../shared/skill-boxes/component/skill-boxes.component';
import { TabsComponent } from '../../../../shared/tabs/component/tabs.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    standalone: true,
    imports: [TabsComponent, SkillBoxesComponent]
})
export class SkillsComponent implements OnInit, OnDestroy {
  private skillsData$: Observable<Skill[] | undefined> = this.store.select(SkillSelector);
  private unsubscribe$ = new Subject<void>();
  protected completeSkills!: Skill[];
  protected skills!: Skill[];
  protected tabs!: Tab[];

  constructor(
    private store: Store<AppState>,
    private iconsService: IconsService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.skillsData$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((skills) => {

        const preTabs = [...new Set(skills!.map(s => s.keywords[0]))];

        this.iconsService.getTabsIconsJson().subscribe(iconData => {
          const tabMap = preTabs.map(tab => {
            return { name: tab, icon: iconData.find(icon => icon.name === tab)?.iconMap! };
          });
          this.tabs = tabMap;
        });

        return this.iconsService.getSkillsIconsJson().pipe(
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

    this.tabChange('Language');
  }

  tabChange(name: string) {
    this.store.dispatch(skillActions.ChangeTab({ tab: name }));
  }
}

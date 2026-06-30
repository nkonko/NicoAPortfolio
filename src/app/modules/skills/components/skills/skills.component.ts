import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '@core/store/models/app.state';
import { SkillSelector } from '@core/store/selectors/app.selector';
import { IconsService } from '@shared/services/icons.service';
import { Tab } from '@shared/tabs/model/tab';
import * as skillActions from '../../state/actions/skills.action';
import { combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { SkillBoxesComponent } from '@shared/skill-boxes/component/skill-boxes.component';
import { TabsComponent } from '@shared/tabs/component/tabs.component';
import { assignSkillKeywords } from '../../utils/skill-categorizer';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TabsComponent, SkillBoxesComponent]
})
export class SkillsComponent {
  private combined = toSignal(combineLatest({
    skills: this.store.select(SkillSelector),
    tabIcons: this.iconsService.getTabsIconsJson(),
  }).pipe(
    map(({ skills, tabIcons }) => {
      if (!skills?.length) return { tabs: [] as Tab[] };

      const categorized = assignSkillKeywords(skills);
      const preTabs = [...new Set(categorized.map(s => s.keywords[0]).filter(k => k != null))];

      return {
        tabs: preTabs.map(tab => ({
          name: tab,
          icon: tabIcons.find(icon => icon.name === tab)?.iconMap ?? '',
        })),
      };
    })
  ));

  protected tabs = computed(() => this.combined()?.tabs ?? []);

  constructor(
    private store: Store<AppState>,
    private iconsService: IconsService,
  ) {
    this.tabChange('Language');
  }

  tabChange(name: string): void {
    this.store.dispatch(skillActions.ChangeTab({ tab: name }));
  }
}

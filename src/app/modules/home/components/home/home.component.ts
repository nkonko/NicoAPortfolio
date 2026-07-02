import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { AppState } from '@core/store/models/app.state';
import { BasicsSelector, SkillSelector } from '@core/store/selectors/app.selector';
import { IconsService } from '@shared/services/icons.service';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TranslocoModule]
})
export class HomeComponent {
  protected yearsOfExperience = new Date().getFullYear() - 2018;

  private basics = toSignal(this.store.select(BasicsSelector));
  private skillsData$ = this.store.select(SkillSelector);

  protected name = computed(() => this.basics()?.name ?? '');
  protected jobLabel = computed(() => this.basics()?.label ?? '');
  protected location = computed(() => this.basics()?.region ?? '');

  private skillsWithIcons$ = combineLatest([
    this.skillsData$,
    this.iconsService.getSkillsIconsJson(),
  ]).pipe(
    map(([skills, iconData]) =>
      skills?.map(skill => {
        const icon = iconData.find(i => i.name === skill.name)?.iconMap;
        return { ...skill, icon: icon ?? '' };
      }) ?? []
    )
  );
  protected completeSkills = toSignal(this.skillsWithIcons$, { initialValue: [] as Skill[] });

  constructor(
    private store: Store<AppState>,
    private iconsService: IconsService,
  ) {}
}

import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillByTabSelector } from '@modules/skills/state/selectors/skills.selectors';
import { Store } from '@ngrx/store';
import { SkillBoxComponent } from '../../skill-box/component/skill-box.component';

@Component({
    selector: 'app-skill-boxes',
    templateUrl: './skill-boxes.component.html',
    styleUrls: ['./skill-boxes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkillBoxComponent]
})
export class SkillBoxesComponent {
  private store = inject(Store);
  private skillState = toSignal(this.store.select(SkillByTabSelector));

  protected selectedTab = computed(() => this.skillState()?.tab ?? 'Arquitecture');
  protected skills = computed(() => this.skillState()?.skills ?? []);
}

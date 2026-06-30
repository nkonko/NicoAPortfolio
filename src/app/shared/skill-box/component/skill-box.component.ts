import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';

@Component({
    selector: 'app-skill-box',
    templateUrl: './skill-box.component.html',
    styleUrls: ['./skill-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SkillBoxComponent {
  skill = input.required<Skill>();
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';

@Component({
    selector: 'app-skill-box',
    templateUrl: './skill-box.component.html',
    styleUrls: ['./skill-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class SkillBoxComponent {
  @Input() skill!: Skill;
}

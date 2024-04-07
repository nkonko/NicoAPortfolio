import { Component, Input } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';

@Component({
    selector: 'app-skill-box',
    templateUrl: './skill-box.component.html',
    styleUrls: ['./skill-box.component.scss'],
    standalone: true
})
export class SkillBoxComponent {
  @Input() skill!: Skill;
}

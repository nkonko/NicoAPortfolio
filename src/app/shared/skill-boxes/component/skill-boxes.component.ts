import { Component, OnDestroy, OnInit } from '@angular/core';
import { Skill } from '@core/models/gitConnectProfile/skill';
import { SkillState } from '@modules/skills/state/models/skills.state';
import { SkillByTabSelector } from '@modules/skills/state/selectors/skills.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SkillBoxComponent } from '../../skill-box/component/skill-box.component';

@Component({
    selector: 'app-skill-boxes',
    templateUrl: './skill-boxes.component.html',
    styleUrls: ['./skill-boxes.component.scss'],
    standalone: true,
    imports: [SkillBoxComponent]
})
export class SkillBoxesComponent implements OnInit, OnDestroy {
  private skillsByTab$: Observable<SkillState | undefined> = this.store.select(SkillByTabSelector);
  private unsubscribe$ = new Subject<void>();
  selectedTab: string = 'Arquitecture';
  skills!: Skill[];

  constructor(private store: Store) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.skillsByTab$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(s => {
        this.skills = s?.skills!;
        this.selectedTab = s?.tab!;
      });
  }


}

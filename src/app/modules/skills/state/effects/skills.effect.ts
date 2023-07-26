import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as skillActions from '../actions/skills.action';
import { SkillService } from '@modules/skills/service/skill.service';

@Injectable()
export class SkillEffects {

  constructor(private actions$: Actions, private skillService: SkillService) { }

  skillsByTab$ = createEffect(() => this.actions$.pipe(
    ofType(skillActions.ChangeTab),
    switchMap((action) => this.skillService.getSkillsByKeyWord(action.tab)
      .pipe(
        map(skills => (skillActions.ChangeTabSucessfull({ skills: skills }))),
      ))));
}

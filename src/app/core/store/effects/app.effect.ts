import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import * as appActions from '../actions/app.action';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private profileService: ProfileService) { }

  profile$ = createEffect(() => this.actions$.pipe(
    ofType(appActions.AppInit),
    switchMap(() => this.profileService.getProfile()
      .pipe(
        map(resProfile => appActions.ProfileLoadedSucessfull({ profile: resProfile })),
        catchError((errorResponse: HttpErrorResponse) =>
          of(appActions.UserProfileChangedFailure({
            error: {
              error: errorResponse.error,
              status: errorResponse.status
            }
          }))
        )
      )
    )
  )
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { ContactService } from '../../service/contact.service';
import * as contactActions from '../actions/contact.action';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ContactEffects {

  constructor(private actions$: Actions, private contactService: ContactService) { }

  $ = createEffect(() => this.actions$.pipe(
    ofType(contactActions.SubmitContactDetails),
    switchMap((action) => this.contactService.submit(action.contact)
      .pipe(
        map(() => contactActions.SubmitContactDetailsSuccess()),
        catchError((errorResponse: HttpErrorResponse) =>
          of(contactActions.SubmitContactDetailsFailure({
            error: {
              error: errorResponse.error,
              status: errorResponse.status
            }
          }))
        )
      ))));
}

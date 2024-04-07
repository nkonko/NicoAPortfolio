import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ContactRoutingModule,
        ReactiveFormsModule,
        ContactComponent,
    ],
    exports: [ContactComponent]
})
export class ContactModule { }

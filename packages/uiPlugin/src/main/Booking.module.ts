import { CommonModule } from "@angular/common";
import { Inject, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Store } from "@ngrx/store";
import { VcdApiClient, VcdSdkModule } from "@vcd/sdk";
import { EXTENSION_ASSET_URL } from "@vcd/sdk";
import { PluginModule } from "@vcd/sdk";
import { I18nModule, TranslationService } from "@vcd/i18n";
import { ClarityModule } from "@clr/angular";
import { BookingComponent } from "./Booking/Booking.component";
import {BookingService} from "./Booking/Booking.service";
import { ApiClientService } from "./api/api-client.service";
import {TicketModalComponent} from "./Booking/ticket-modal/ticket-modal.component";
import {DeleteModalComponent} from "./Booking/delete-modal/delete-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from "./subnav/about.component";
import { SubnavComponent } from "./subnav/subnav.component";

const ROUTES: Routes = [
    {
        path: "", component: SubnavComponent, children: [
            {path: "", component: BookingComponent},
            {path: "about", component: AboutComponent}
        ]
    }
];

@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        VcdSdkModule,
        I18nModule.forChild(EXTENSION_ASSET_URL, false),
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        BookingComponent,
        TicketModalComponent,
        DeleteModalComponent,
        SubnavComponent,
        AboutComponent
    ],
    bootstrap: [SubnavComponent],
    exports: [],
    providers: [VcdApiClient, BookingService, ApiClientService]
})
export class BookingPluginModule extends PluginModule {
    constructor(appStore: Store<any>, translationService: TranslationService) {
        super(appStore);
        translationService.registerTranslations();
    }
}

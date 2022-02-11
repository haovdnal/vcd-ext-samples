import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Ticket} from "ticketing-types";
import {DefinedEntity} from "../api/models/DefinedEntityModel";
import {BookingService} from "./Booking.service";
import {TicketModalComponent} from "./ticket-modal/ticket-modal.component";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import { TranslationService } from "@vcd/i18n";

@Component({
    selector: "ticketing-plugin",
    templateUrl: "./Booking.component.html",
    styleUrls: ['./Booking.component.scss'],
    host: {'class': 'content-container'}
})
export class BookingComponent implements OnInit, OnDestroy {

    @ViewChild("ticketModal", {static: false}) private ticketModal: TicketModalComponent;
    @ViewChild("deleteModal", {static: false}) private deleteModal: DeleteModalComponent;

    isLoading: boolean = true;
    errorMessage: string;
    selected: DefinedEntity<Ticket>[] = [];
    tickets: DefinedEntity<Ticket>[] = [];

    ticketSelected: DefinedEntity<Ticket>;

    constructor(private ticketingService: BookingService,
                private translationService: TranslationService) {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.fetchData()

    }

    async fetchData() {
            const res = await this.ticketingService.fetchTickets(20, 1, null, null);
            this.tickets = res.values;
            this.isLoading = false;
    }

    openModalTicket() {
        this.ticketModal.open()
    }

    selectionChanged($event: any) {
        this.ticketSelected = $event
    }

    openDeleteTicket() {
        const deleteModalConfig = {
            header: this.translationService.translate("ticketing.deleteModal.header",
                [this.ticketSelected.id]),
            body: this.translationService.translate("ticketing.deleteModal.body",
                [this.ticketSelected.id]),
            deleteHandler: this.onDeleteConfirm.bind(this),
            payload: this.ticketSelected
        };

        this.deleteModal.open(deleteModalConfig);
    }

    openEditTicket() {
        this.ticketModal.open(this.ticketSelected);
    }

    private async onCreateConfirm(ticket: Ticket) {
        this.isLoading = true;
        try {
            await this.ticketingService.createTicket(ticket)
            await this.fetchData()
        } catch (e) {
            this.errorMessage = e.message || e.details || e;
        } finally {
            this.isLoading = false;
        }

    }

    private async onEditConfirm(definedEntity: DefinedEntity<Ticket>) {
        this.isLoading = true;
        try {
            await this.ticketingService.updateTicket(definedEntity);
        } catch (e) {
            this.errorMessage = e.message || e.details || e;
        } finally {
            this.isLoading = false;
        }
    }

    private async onDeleteConfirm(definedEntity: DefinedEntity<Ticket>) {
        this.isLoading = true;
        try {
            await this.ticketingService.removeTicket(definedEntity.navigable);
            await this.fetchData()
            this.ticketSelected = null
        } catch (e) {
            this.errorMessage = e.message || e.details || e;
        } finally {
            this.isLoading = false;
        }
    }
}

/**
 * A definition of a ticket entity.
 * @definedEntityType
 */
export declare class Ticket {
    type: TicketType;
    description: string;
    status: TicketStatus;
}
export declare const enum TicketType {
    SoftwareIssue = "SoftwareIssue",
    HardwareIssue = "HardwareIssue"
}
export declare const enum TicketStatus {
    Open = "Open",
    Closed = "Closed"
}

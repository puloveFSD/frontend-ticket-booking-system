export interface TicketIssue {
    ticketIdDto: number;
    numberOfPassengerDto: number;
    pickUpLocationDto: string;
    issuedDateDto: string;
    totalAmountDto:number;
    issuedByIdDto: number;
    contactPersonDto: string;
    contactPersonPhoneNumberDto: string;
    busIdDto: number;
    tripIdDto: number;
    seatList: number[];
}

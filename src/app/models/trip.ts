import { Bus } from "./bus";

export interface Trip {
    tripIdDto: number;
    tripDateDto: string;
    tripDepartureTimeDto: string;
    tripArrivalTimeDto: string;
    startLocationDtoId: number;
    destinationDtoId: number;
    ticketPricePerPersonDto:number;
    busIdDto: number;



}

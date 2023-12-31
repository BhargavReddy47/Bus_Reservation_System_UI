import { Bus } from "./bus.model";
import { Stop } from "./stop.model";

export class Schedule {
    id: number | any;
    busId: number | any;
    departureDateTime: Date| any;
    arrivalDateTime: Date | any;
    departureStopId: number | any;
    arrivalStopId: number | any;
    price: number | any;
    availableSeats: number | any;
    
    bus:Bus | any;
    departureStop: Stop | any;
    arrivalStop: Stop | any;
}

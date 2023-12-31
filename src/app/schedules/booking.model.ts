import { Customer } from "../Authentication/sign-up/Customer.model";
import { Schedule } from "./schedule.model";

export interface Booking {
    id: number;
    scheduleId: number;
    customerId: number;
    noOfSeats: number;
    amountPaid: number;
    customer: Customer;
    schedule: Schedule;
}
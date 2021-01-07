import { observable, computed, action, makeObservable } from  'mobx'
import {Reservation} from './ReservationStore'


export class RestaurantStore {
    constructor() {
        this.reservations = []
        this.numTables = 10

        makeObservable(this, {
            reservations: observable,
            numTables: observable,
            totalReservations: computed,
            openTables: computed,
            restPopulation: computed,
            completedTables: computed,
            addRes: action,
            seatRes: action,
            completeRes: action,
        })
    }

    get totalReservations() { //automatically calculates the total reservations
        return this.reservations.length
    }
    get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
        let counter = 0
        this.reservations.forEach(r => r.seated ? counter ++: null)
        return (this.numTables - counter)
    }
    get restPopulation() {
        // calculate the number of people in the restaurant now
        // (e.g. total number of people who are seated, but their reservation is not complete)
        let peopleNum = 0
        this.reservations.forEach(r => {if(r.seated && !r.completed){
            peopleNum += parseInt(r.numPeople)
        }})
        return peopleNum
    }
    get completedTables() {
        //calculate the number of tables that have been completed
        let tablesNum = 0
        this.reservations.forEach(r => r.completed ? tablesNum++: null)
        return tablesNum
    }
    addRes = (name, numPeople) => {
        this.reservations.push(new Reservation(name, numPeople))
    }
    seatRes = (id) => {
        //find the reservation and change its seated value to true
        this.reservations.find(r => r.id === id).seated = true
    }
    completeRes = (id) => {
        //find the reservation and mark it as completed
        this.reservations.find(r => r.id === id).completed = true
        //after you write this function, add some conditional rendering on compelted tables
        //e.g. strike through our a different color - this will happen on your react, not here.
    }
}
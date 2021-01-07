import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

class Reservation extends Component {
    seatRes = (e) => {
        this.props.RestaurantStore.seatRes(e.target.id)
    }

    completeRes = (e) => {
        this.props.RestaurantStore.completeRes(e.target.id)
    }
    render() {
        let res = this.props.res
        return (
            <div className={res.completed ? "conditional" : null}>
                 {res.name} : {res.numPeople}
                <button className="completeRes"
                    id={res.id}
                    onClick={this.completeRes}>
                    Complete Reservation </button>
                <button
                    id={res.id}
                    onClick={this.seatRes}>
                    Seat Reservation </button>
            </div>
            //render the reservation data here
            //make sure you store the ID somewhere so you can find the reservation
            //use the class "conditional" to conditionally render completed reservations
            //You should hav ea complete reservation button to complete the reservation
        )
    }
}

//inject your store here
export default inject("RestaurantStore")(observer(Reservation))
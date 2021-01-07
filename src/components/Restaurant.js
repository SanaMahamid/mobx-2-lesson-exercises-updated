import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ResInput from './ResInput';
import Reservation from './Reservation'

class Restaurant extends Component{
    addRes = () => {
        let name = this.props.GeneralStore.name
        let num = this.props.GeneralStore.numPeople
        this.props.RestaurantStore.addRes(name, num)
    }
    render () {
        return (
            <div>
                <span>You have {this.props.RestaurantStore.openTables} open tables</span>
                <div>There are <span id="restPop">{this.props.RestaurantStore.restPopulation}</span> people in the restaurant</div>
                <div><span id="completedTables">{this.props.RestaurantStore.completedTables}</span> tables have been served today</div>
                <ResInput/>
                <button id="addRes" onClick={this.addRes}>Add Reservation</button>
                <div className = "reservations">
                    {this.props.RestaurantStore.reservations.map((r,i) => <Reservation res={r} key={i} />)}
                </div>
            </div>
        )
    }
}

export default inject("GeneralStore", "RestaurantStore")(observer(Restaurant))
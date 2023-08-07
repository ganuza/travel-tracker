const dayjs = require('dayjs');

import {
  findNewDestinationCost,
} from './data-model/user-data.js'

// querySelectors

var welcomeHeading = document.querySelector('.welcome-heading')

var dashboardTotalSpent = document.querySelector('.trips-total')
var tripsGrid = document.querySelector('.all-trips-grid')
var destinationsGrid = document.querySelector(".destinations-grid")


const displayUser = (currentUser) => {
  console.log('currentUser: ', currentUser.userDetails.name)

  let firstName = currentUser.userDetails.name.split(' ')[0]
  console.log('firstName: ', firstName)

  welcomeHeading.innerText = `Welcome ${firstName}`

  return firstName
}

const displayTrips = (userDestinations) => {
  // console.log('----->>>>>>>', userDestinations.name)
  tripsGrid.innerHTML = ''
  
  const totalSpent = userDestinations.reduce((sum, trip) => {
    // console.log('typeof: ',typeof(sum))

    sum += trip.cost
    // console.log('SUM: ', sum)

    return sum
  }, 0)
  // console.log('totalSpent: ', totalSpent)
  
  dashboardTotalSpent.innerHTML = `<h2>Total Spent:  $${totalSpent.toFixed(2)}</h2>`

  userDestinations.forEach((destination) => {
    tripsGrid.innerHTML += `<article class="trip-card">
  
  <img class="user-trips-img" src=${destination.image}>
  <h2 class="trip-card-destination">${destination.name}</h2>
  <h3 class="trip-card-dates">Dates: ${destination.dates}</h3>
  <h3 class="trip-card-travelers">Travelers: ${destination.travelers}</h3>
  </article>`
  
})
}

const displayDestinationCards = (destinationCardsInfo) => {
  destinationsGrid.innerHTML = ''
  const destinations = destinationCardsInfo.forEach((destination) => {
    const newTripCost = destination.cost
    console.log('NewTripDuration: ', destination.duration)
    console.log('NewTripTravelers: ', destination.travelers)
    console.log('NewTripData: ', destination)
    
    console.log('TRIP COST: ', newTripCost)

    const newTripDates = `${dayjs(destination.date).format('MM-DD-YYYY')} - ${dayjs(destination.date).add((destination.duration),'day').format('MM-DD-YYYY')}`

    destinationsGrid.innerHTML += `<article class="destination-card">
    <img class="destination-card-img" src=${destination.image}>
    <h2 class="destination-card-name">${destination.name}</h2>
    <h4 class="destination-card-dates">Dates: ${newTripDates}</h4>
    <h4 class="destination-card-duration">Duration: ${destination.duration} days</h4>
    <h4 class="destination-card-travelers">Travelers: ${destination.travelers}</h4>
    <h4 class="destination-card-trip-cost">Total Cost: $${newTripCost.toFixed(2)}</h4>
    <button class="button" id="${destination.destinationID}">Book Trip</button>
    </article>`


  })
}


export {
  displayUser,
  displayTrips,
  displayDestinationCards,
}
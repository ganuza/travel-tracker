// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const dayjs = require('dayjs');

import {
  getUserDetails,
  getUserTripsDetails,
  getUserDestinations,
  createDestinationsInfo,
} from './data-model/user-data'

import {
  fetchData,
  promises,
  postData,
} from './apiCalls'

import {
  displayUser,
  displayTrips,
  displayDestinationCards,
  displayBookedTripMessage,
} from './domUpdates'

var possibleTripDetails

// MOVE THESE TO DOMUPDATES
const loginButton = document.querySelector('.login-submit-button')
const loginPage = document.querySelector('.login-page')
const mainPage = document.querySelector('.main-trip-page')
const header = document.querySelector('header')
const findTripButton = document.querySelector('.find-trip-button')
const findTripInputPage = document.querySelector('.find-trip-input-page')
const newTripDate = document.querySelector('#date-input')
const newTripDuration = document.querySelector('#duration-input')
const newTripTravelers = document.querySelector('#traveler-input')
const destinationsPage = document.querySelector('.destinations-page')
const bookedTripPage = document.querySelector('.trip-booked-page')
// const destinationCardsGrid = document.querySelector('destinations-grid')

const findDestinationsButton = document.querySelector('.search-destinations-button')
const bookedTripPageDashBtn = document.querySelector('#button-to-dash')

var mainData = {}

window.addEventListener('load', () => {
  Promise.all(promises)
  .then(data => {
    mainData.userDetails = getUserDetails(data[0], 33)
    mainData.userTrips = getUserTripsDetails(data[1], 33)
    mainData.destinations = data[2].destinations
    // console.log(getUserDestinations(mainData))
    getUserDestinations(mainData)
    console.log('mainData: ', mainData)
    displayUser(mainData)
    const userDestinations = getUserDestinations(mainData)
    console.log('HERE: ', userDestinations)
    displayTrips(userDestinations)
  })
  
})

//// move to DomUpdates
const hideLoginShowMain = () => {
  loginPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
}

loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  hideLoginShowMain()
})


////// move to DumUpdates
const hideTripPageShowTripInputPage = () => {
  mainPage.classList.add('hidden')
  findTripInputPage.classList.remove('hidden')
}

findTripButton.addEventListener('click', () => {
  hideTripPageShowTripInputPage()
})

findDestinationsButton.addEventListener('click', () => {
  const newTripDateInput = newTripDate.value
  const newTripDurationInput = parseInt(newTripDuration.value)
  const newTripTravelersInput = parseInt(newTripTravelers.value)

  console.log('newTripDateInput: ', newTripDateInput)
  console.log('newTripDurationInput', newTripDurationInput)
  console.log('newTripTravelersInput', newTripTravelersInput)
  
  hideTripInputPageShowDestinations()
  const destinationCardsInfo = createDestinationsInfo(mainData, newTripDateInput, newTripDurationInput, newTripTravelersInput)
  console.log('HEREdestinationCardsInfo: ', destinationCardsInfo)
  displayDestinationCards(destinationCardsInfo)
  possibleTripDetails = destinationCardsInfo
})


//////  move to DomUpdates
const hideTripInputPageShowDestinations = () => {
  findTripInputPage.classList.add('hidden')
  destinationsPage.classList.remove('hidden')
}

/////////  move to DomUpdates
const hideDestPageShowBookedPage = () => {
  destinationsPage.classList.add('hidden')
  bookedTripPage.classList.remove('hidden')
}

destinationsPage.addEventListener('click', (event) => {
  console.log('>>>>>>>>>>HERE: ', possibleTripDetails)

  console.log('eventtargetclosest: ', event.target)

  console.log('parsedbuttonid: ',(parseInt(event.target.closest('button').id )))
  console.log('>>>>>: ', mainData.destinations)
  const buttonId = (parseInt(event.target.closest('button').id ))
  const chosenDestination = possibleTripDetails[buttonId - 1]
    
  console.log('chosenDestination: ', chosenDestination)
  
  postData(chosenDestination)
    .then(() => {
      fetchData('trips')
        .then(data => {
          mainData.userTrips = getUserTripsDetails(data, 33)
          console.log('mainData.userTrips: ', mainData.userTrips)
      })
    })
  
  hideDestPageShowBookedPage()
  displayBookedTripMessage(chosenDestination)

  
})


///////   move to DomUpdates  //////////
const hideBookedTripShowDash = () => {
  bookedTripPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
}

bookedTripPageDashBtn.addEventListener('click', () => {
  hideBookedTripShowDash()
  const userDestinations = getUserDestinations(mainData)
    console.log('UPDATED userDestinations', userDestinations)
    displayTrips(userDestinations)
})


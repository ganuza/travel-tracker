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
} from './data-model/user-data'

import {
  fetchData,
  promises,
} from './apiCalls'

import {
  displayUser,
  displayTrips
} from './domUpdates'

// MOVE THESE TO DOMUPDATES
const loginButton = document.querySelector('.login-submit-button')
const loginPage = document.querySelector('.login-form')
const mainPage = document.querySelector('.main-trip-page')
const header = document.querySelector('header')
const findTripButton = document.querySelector('.find-trip-button')
const findTripInputPage = document.querySelector('.find-trip-input-page')
const newTripDate = document.querySelector('#date-input')
const newTripDuration = document.querySelector('#duration-input')
const newTripTravelers = document.querySelector('#traveler-input')
const destinationsPage = document.querySelector('.destinations-page')


const findDestinationsButton = document.querySelector('.search-destinations-button')

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

const hideLoginShowMain = () => {
  loginPage.classList.add('hidden')
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
}

loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  hideLoginShowMain()
})

const hideTripPageShowTripInputPage = () => {
  mainPage.classList.add('hidden')
  findTripInputPage.classList.remove('hidden')
}

findTripButton.addEventListener('click', () => {
  hideTripPageShowTripInputPage()
})

findDestinationsButton.addEventListener('click', () => {
  const newTripDateInput = newTripDate.value
  const newTripDurationInput = newTripDuration.value
  const newTripTravelersInput = newTripTravelers.value

  console.log('newTripDateInput: ', newTripDateInput)
  console.log('newTripDurationInput', newTripDurationInput)
  console.log('newTripTravelersInput', newTripTravelersInput)
  
  hideTripInputPageShowDestinations()

  

})

const hideTripInputPageShowDestinations = () => {
  findTripInputPage.classList.add('hidden')
  destinationsPage.classList.remove('hidden')
}
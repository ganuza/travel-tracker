// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

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
  loginButton,
  loginPage,
  mainPage,
  header,
  findTripButton,
  findTripInputPage,
  newTripDate,
  newTripDuration,
  newTripTravelers,
  destinationsPage,
  bookedTripPage,
  findDestinationsButton,
  bookedTripPageDashBtn,
  loginNameInput,
  loginPasswordInput,
  loginForm,
  displayUser,
  displayTrips,
  hideTripInputPageShowDestinations,
  displayDestinationCards,
  displayBookedTripMessage,
  hideLoginShowMain,
  hideTripPageShowTripInputPage,
  hideDestPageShowBookedPage,
  hideBookedTripShowDash,
} from './domUpdates'

var possibleTripDetails
var currentUser
var mainData = {}

loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  const loginWord = loginNameInput.value.slice(0, 8)
  const loginNum = Number(loginNameInput.value.slice(8))
  currentUser = loginNum
  const loginPassword = loginPasswordInput.value
  const originalLoginLength = loginNameInput.value.slice(8).length
  const trimmedLoginLength = loginNameInput.value.slice(8).trim().length
  loginNameInput.value = ''
  loginPasswordInput.value = ''
  
  if (originalLoginLength !== trimmedLoginLength){
    setTimeout(function(){
      loginForm.innerText = ''
    }, 2000);
    loginForm.innerText += 'Please Enter a Valid Username and Password' 
  } else {
      if (loginWord !== 'traveler' || !Number.isInteger(loginNum) || loginNum > 50 || loginNum < 1 || loginPassword !== 'travel') {
      setTimeout(function(){
      loginForm.innerText = ''
    }, 2000);
    loginForm.innerText += 'Please Enter a Valid Username and Password'
  } else {
    hideLoginShowMain()
    Promise.all(promises)
    .then(data => {
      mainData.userDetails = getUserDetails(data[0], loginNum)
      mainData.userTrips = getUserTripsDetails(data[1], loginNum)
      mainData.destinations = data[2].destinations
      getUserDestinations(mainData)
      displayUser(mainData)
      const userDestinations = getUserDestinations(mainData)
      displayTrips(userDestinations)
    })
    }
    } 
})

findTripButton.addEventListener('click', () => {
  hideTripPageShowTripInputPage()
})

findDestinationsButton.addEventListener('click', (e) => {
  e.preventDefault()
  const newTripDateInput = dayjs(newTripDate.value)
  const newTripDurationInput = parseInt(newTripDuration.value)
  const newTripTravelersInput = parseInt(newTripTravelers.value)
  const today = dayjs()
  if (!newTripDateInput || !newTripDurationInput || !newTripTravelersInput || newTripDateInput.isBefore(today)) {
    return
  }
  hideTripInputPageShowDestinations()
  const destinationCardsInfo = createDestinationsInfo(mainData, newTripDateInput, newTripDurationInput, newTripTravelersInput)
  displayDestinationCards(destinationCardsInfo)
  possibleTripDetails = destinationCardsInfo
})

destinationsPage.addEventListener('click', (event) => {
  const buttonId = (parseInt(event.target.closest('button').id ))
  const chosenDestination = possibleTripDetails[buttonId - 1]
  postData(chosenDestination)
    .then(() => {
      fetchData('trips')
        .then(data => {
          mainData.userTrips = getUserTripsDetails(data, currentUser)
      })
    })
  
  hideDestPageShowBookedPage()
  displayBookedTripMessage(chosenDestination) 
})

bookedTripPageDashBtn.addEventListener('click', () => {
  hideBookedTripShowDash()
  const userDestinations = getUserDestinations(mainData)
  displayTrips(userDestinations)
})

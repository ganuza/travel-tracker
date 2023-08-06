
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

const displayDestinationCards = (globalData, date, duration, travelers) => {
  destinationsGrid.innerHTML = ''
  const destinations = globalData.destinations.forEach((destination) => {
    destinationsGrid.innerHTML += `<article class="destination-card">
    <img class="destination-card-img" src=${destination.image}>
    <h2 class="destination-card-name">${destination.destination}</h2>
    <h3 class="destination-card-dates">Date: ${date}</h3>
    <h3 class="destination-card-duration">Duration: ${duration} days</h3>
    <h3 class="destination-card-travelers">Travelers: ${travelers}
    </article>`
    

  })
  




}


export {
  displayUser,
  displayTrips,
  displayDestinationCards,
}
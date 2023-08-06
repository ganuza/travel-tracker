


var welcomeHeading = document.querySelector('.welcome-heading')

var dashboardTotalSpent = document.querySelector('.trips-total')
var tripsGrid = document.querySelector('.all-trips-grid')


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



export {
  displayUser,
  displayTrips
}
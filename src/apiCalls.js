export const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
  .then(res => res.json())
  .catch(error => console.log(error))
}

export const promises = [
  fetchData('travelers'),
  fetchData('trips'),
  fetchData('destinations')
]
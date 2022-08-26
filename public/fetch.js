const urlGarage = 'http://127.0.0.1:3000/garage'
const urlEngine = 'http://127.0.0.1:3000/engine'
const urlWinners = 'http://127.0.0.1:3000/winners'


async function sendRequest(method, url, body = null, id = null, status = null, limit = null, page = null, sort = null, order = null) {
    if(id) url += `/${id}`;
    if(limit || page || sort || order) {
        url += '?';
        url += limit ? `_limit=${limit}` : '';
        url += page ? `_page=${page}` : '';
        url += sort ? `_sort=${sort}` : '';
        url += order ? `_order=${order}` : ''
    }
    if(method === 'PATCH') url = `${urlEngine}?id=${id}&status=${status}`;
    if(method === 'POST' || method === 'PUT') body = JSON.stringify(body);

    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: headers
    });
    
    if(response.ok) {
        let form = await response.json();
        let totalCount =  response.headers.get('X-Total-Count');
        if(totalCount) form['total-count'] = totalCount;
        return form
    } 
    else {
      const error = await response.json()
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    }
}


// Get Cars // Get Winners
// sendRequest('GET', urlGarage, null, null, null, null, null, null, null)
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err)
//   } )

//  Get Car   // Get Winner
// sendRequest('GET', urlWinners, null , 1)
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err)
//     alert('Машина не найдена')
//   } )

// Delete Car // Delete Winner
// sendRequest('DELETE', urlGarage, null , 4)
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err)
//     alert('Машина не найдена')
//   })

const car = {
  name: 'Porsche',
  color: 'white'
}

const winner = {                           
  id: 4,                                     //обьект на апдейта виннера без id
  wins: 3,
  time: 40
}

// Create Car // Create Winner              // меняется обьект 
// sendRequest('POST', urlGarage, car)    
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

// Update Car // Update Winner                 // меняется обьект 
// sendRequest('PUT', urlGarage, car, 4)
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

// Start / Stop / Drive Car's Engine
// sendRequest('PATCH', urlEngine, null, 1, 'started')
//   .then(data => console.log(data))
//   .catch(err => {
//     console.log(err)
//   })



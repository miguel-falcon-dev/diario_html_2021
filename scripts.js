const container = document.getElementById('main-content')

function createCard(entry) {
    // Create a div with a card class
	const card = document.createElement('div')
	card.setAttribute('class', 'card')
	
	// Create an h1 and set the text content to the film's title
	const h1 = document.createElement('h1')
	h1.textContent = entry.creation_date
	
	// Create a p and set the text content to the film's description
	const p = document.createElement('p')
	entry.description = entry.description.substring(0, 300) // Limit to 300 chars
	p.textContent = `${entry.description}` // End with an ellipses
  
	const photo = document.createElement('img')
	photo.src = 'http://127.0.0.1:8000' + entry.photo 
  
	const h2 = document.createElement('h2')
	var feel_text
	switch (entry.feeling) {
		case 'HA':
			feel_text = 'Feliz'
			break;
		case 'SA':
			feel_text = 'Triste'
			break;
		case 'AN':
			feel_text = 'Enojado'
			break;
		case 'CO':
			feel_text = 'Confiado'
			break;
		case 'SI':
			feel_text = 'Enfermo'
			break;
		case 'AM':
			feel_text = 'Sorprendido'
			break;
		default:
			feel_text = 'No encontrado'
	}
	h2.textContent = feel_text
	
	// Append the cards to the container element
	container.appendChild(card)
	
	// Each card will contain an h1 and a p
	card.appendChild(h1)
	card.appendChild(p)
	card.appendChild(photo)
	card.appendChild(h2)
}

fetch('http://127.0.0.1:8000/blog/api/').then(function (response)
{
    // The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	data.forEach((entry) => {
       createCard(entry);
    })
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

const entryForm = document.getElementById('newEntryForm');
console.log(entryForm);

entryForm.addEventListener('submit', function(e){
	e.preventDefault();

	const formData = new FormData(this);

	fetch('http://127.0.0.1:8000/blog/api/', {
		method:'post',
		body: formData
	}).then(function (response){
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {
		// This is the JSON from our response
		createCard(data);
	}).catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	})
});
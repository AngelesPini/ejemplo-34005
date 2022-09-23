const personajesHTML = document.getElementById('personajes')

// FETCH 
const url = "https://fedeperin-harry-potter-api.herokuapp.com/db"

fetch(url)
	.then((res) => res.json())
	.then((data) => {
    let characters = ""
        console.log(data)
		data.personajes.map((i)=>{
            characters += `
     
            <div class="card elemento m-2" style="width: 18rem;">
                <img src="${i.imagen}" class="card-img-top" alt="image">
                <div class="card-body">
                <h5 class="card-title">${i.personaje}</h5>
                <p class="card-text">Apodo: ${i.apodo}</p>
                <p class="card-text">Casa: ${i.casaDeHogwarts}</p>
                </div>
                </div>`
            personajesHTML.innerHTML = characters;

        })
	})
	.catch((e) => console.log(e))


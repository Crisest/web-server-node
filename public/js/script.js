console.log("Js client file works")

const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value 
    fetch('http://localhost:3000/weather?address=' +  location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error
        } else{
            message1.textContent = data.location 
            message2.textContent = data.forecast
        }
    })
})
})


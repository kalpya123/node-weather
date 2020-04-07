
//here was fetch data
const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='From JavaScript'
weatherForm.addEventListener('submit',(e)=> //event listener
{
    e.preventDefault()

    const location= searchElement.value //geting value from searchvalue
   messageOne.textContent='loading...' //loading 
   messageTwo.textContent='' 
    
fetch('http://localhost:3000/weather?address='+location).then((response)=>//geting url of our page 
{
    response.json().then((data)=>
    {
        console.log(data)
        if(data.error)
        {
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcast
        

        }
    })
})
})


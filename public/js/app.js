console.log("In js file")


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=> {
e.preventDefault()
const addr=search.value

msg1.textContent='Loading.....'
msg2.textContent=''

fetch('/weather?address='+addr).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
        }
        else{
            msg1.textContent=data.location
            msg2.textContent=data.forecast
           
            }
        
    })
})

})
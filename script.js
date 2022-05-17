// https://randomuser.me/api/

const leftData = document.querySelector('.left-data');
const rightData = document.querySelector('.right-data');
const btnCreatePerson = document.querySelector('.btn-creat-person')

//second day work Double money
const doubleMoneyBtn = document.querySelector('.double-money-btn')
const millionersBtn = document.querySelector('.millioners-btn')
const btnRichest = document.querySelector('.btn-richest')
const entireWealth = document.querySelector('.entire-wealth')

let data = []
//add user this will be PUSH user to the array
   //before pushing the array i need to call API
   //i will create random number of money
async function creatNewPerson(){
    try{
        const req = await fetch(`https://randomuser.me/api/`)
        const res = await req.json()
        const newPerson = {}
        //console.log(res['results'] [0].name)
        newPerson.name = `${res['results'] [0].name.first} ${res['results'] [0].name.last}`
        //console.log(newPerson)
        newPerson.wealth = (Math.random()*1000000).toFixed(2)
        //console.log(newPerson)
        data.push(newPerson)
        //console.log(data)
        renderToDOM()
    }catch(err){
        console.log(err.message)
    }
}
    creatNewPerson()

btnCreatePerson.addEventListener('click', function(){
    creatNewPerson()
})

function renderToDOM(){
    leftData.innerHTML = ''
    rightData.innerHTML = ''
    data.forEach(person=>{
        console.log(person)
        const nameElement = document.createElement('h3')
        const wealthElement = document.createElement('h3')
        nameElement.innerText = person['name']
        wealthElement.innerText = person['wealth']
        leftData.appendChild(nameElement)
        rightData.appendChild(wealthElement)
    })
}

//double money this will MAP the array and make wealth double

doubleMoneyBtn.addEventListener('click', function(){
    //console.log('i double the money')
    data = data.map(person=>{
        person.wealth = (person.wealth * 2).toFixed(2)
        //return (...person, wealth: person.wealth*2);//another way of doing it
        return person
    })
    //console.log(data)
    renderToDOM()
})

// FILTER and show only the millioners

millionersBtn.addEventListener('click', function(){
    //data = data.filter(person=>person.wealth>=1000000)
    data = data.filter(person=>{
        if(person.wealth>=1000000){
            return person
        }
    })
    renderToDOM()
})
//sort by wealth

btnRichest.addEventListener('click', ()=>{
    data.sort((person, person2)=>person2['wealth'] - person['wealth'])
    //console.log(data)
    renderToDOM()
})

//REDUCE - calculate the total wealth

entireWealth.addEventListener('click', ()=>{
    //console.log(data)
    const total = data.reduce((acc, el)=>(acc + Number(el.wealth)), 0)
    const totalElement = document.createElement('h3')
    totalElement.innerText = total.toFixed(2)
    rightData.appendChild(totalElement)
    })


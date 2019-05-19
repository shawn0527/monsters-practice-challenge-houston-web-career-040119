const MONSTERS_URL = "http://localhost:3000/monsters"
const divContainer = document.querySelector('#monster-container')
const divForm = document.querySelector('#create-monster')
const backBtn = document.querySelector('#back')
const fwdBtn = document.querySelector('#forward')
let index1 = 0
let index2 = 50
let monsters = []
let monsterRenderArray = []

document.addEventListener('DOMContentLoaded', () => {
    newMonsterForm()
    fetch(MONSTERS_URL)
        .then(res => res.json())
        .then(obj => {
            monsters = obj
            monsterRenderArray = monsters.slice(index1, index2)
            monsterRenderArray.forEach(monster => {
                renderMonster(monster)
            })
        })
    document.body.insertBefore(divContainer, backBtn)
    document.body.insertBefore(divForm, divContainer)
})

function renderMonster(monster) {
    let div = document.createElement('div')
    div.id = 'monster'
    let h2 = document.createElement('h2')
    h2.innerText = monster.name
    let h4 = document.createElement('h4')
    h4.innerText = `Age: ${monster.age}`
    let p = document.createElement('p')
    p.innerText = `Bio: ${monster.description}`
    div.append(h2, h4, p)
    divContainer.append(div)
}

function newMonsterForm() {
    let form = document.createElement('form')
    form.id = 'monster-form'
    let inputName = document.createElement('input')
    inputName.id = 'name'
    inputName.placeholder = 'name...'
    let inputAge = document.createElement('input')
    inputAge.id = 'age'
    inputAge.placeholder = 'age...'
    let inputBio = document.createElement('input')
    inputBio.id = 'description'
    inputBio.placeholder = 'description...'
    let createBtn = document.createElement('button')
    createBtn.innerText = 'Create'
    form.append(inputName, inputAge, inputBio, createBtn)
    divForm.append(form)
}

divForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = e.target.children[0].value
    let age = e.target.children[1].value
    let bio = e.target.children[2].value
    fetch(MONSTERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'age': age,
            'description': bio
        })
    })
    e.target.reset()
})

document.body.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.id === 'back') {
        if (index1 - 50 < 0) {
            alert("Aint no monsters here")
        } else {
            index1 = index1 - 50
            index2 = index2 - 50
        }
    }

    if (e.target.id === 'forward') {
        if (monsterRenderArray.length < 50 ) {
            alert("Aint no monsters here")
        } else {
            index1 = index1 + 50
            index2 = index2 + 50
        }
    }
    monsterRenderArray = monsters.slice(index1, index2)
    divContainer.innerHTML = ''
    monsterRenderArray.forEach(monster => {
        renderMonster(monster)
    })
})
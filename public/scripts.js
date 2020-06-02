const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    
    card.addEventListener("click", function() {
        let id = card.getAttribute("id")
        let cardTitle = card.querySelector(".card-title").innerHTML
        let cardAutor = card.querySelector(".card-autor").innerHTML
        modalOverlay.classList.add("active")
        modalOverlay.querySelector('img').src = `/assets/${id}.png`
        modalOverlay.querySelector('.modal-title').innerHTML = cardTitle
        modalOverlay.querySelector('.modal-autor').innerHTML = cardAutor

    })
}

modalOverlay.querySelector('.modal-close').addEventListener("click", function() {
    modalOverlay.classList.remove("active")
})
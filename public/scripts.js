const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    
    card.addEventListener("click", function() {
        let cardId = card.getAttribute("id")
        console.log(cardId)
        window.location.href = `/recipes/${cardId}`

    })
}

modalOverlay.querySelector('.modal-close').addEventListener("click", function() {
    modalOverlay.classList.remove("active")
})
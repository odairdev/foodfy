const cards = document.querySelectorAll('.card')

for (let card of cards) {
    
    card.addEventListener("click", function() {
        let cardId = card.getAttribute("id")
        console.log(cardId)
        window.location.href = `/recipe/${cardId}`
    })
}

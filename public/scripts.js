const cards = document.querySelectorAll('.card')
const btnShow = document.querySelectorAll('.btn-show')
const btnShowEvent = document.querySelectorAll('.btn-show-event')

for (let card of cards) {
    
    card.addEventListener("click", function() {
        let cardId = card.getAttribute("id")
        console.log(cardId)
        window.location.href = `/recipes/${cardId}`
    })
}

for (let i = 0; i < btnShow.length; i++) {
    btnShow[i].innerHTML = 'esconder'

    btnShow[i].addEventListener("click", function() {
        if (btnShow[i].innerHTML == 'esconder') {
            btnShow[i].innerHTML = 'mostrar'
            btnShowEvent[i].style.display = 'none'
        } else {
            btnShow[i].innerHTML = 'esconder'
            btnShowEvent[i].style.display = ''
        }
    })
}
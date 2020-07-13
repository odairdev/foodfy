const currentPage = location.pathname
const pageHeading = document.querySelector('.headline-container div h2')

console.log(currentPage)
console.log(pageHeading);

if (currentPage.includes("create")) {
    pageHeading.innerHTML = 'Criando Chef'
} else if(currentPage.includes("edit")) {
    pageHeading.innerHTML = 'Editando Chef'
} else currentPage.indexOf = 'Erro.'
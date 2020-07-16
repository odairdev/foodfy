const pagination = document.querySelector('.pagination')

let selectedPage = +pagination.dataset.page,
      totalPages = +pagination.dataset.total,
      filter = pagination.dataset.filter

function paginate(selectedPage, totalPages) {
    let oldPage,
    pages = []

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
    
        if(firstAndLastPages || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if(currentPage - oldPage > 2) {pages.push('...')}
            if(currentPage - oldPage == 2) {pages.push(currentPage - 1)}
    
            pages.push(currentPage)
    
            oldPage = currentPage
        }
    }

    return pages
}

function activeSelectedPage(pagination, selectedPage) {
    let elements = pagination.querySelectorAll('a')

    for(element of elements) {
        if(element.innerHTML.includes(selectedPage)) {
            element.classList.add('active')
            element.style.fontSize = "20px"
        }
    }
}

function createPagination(pagination) {
    elements = ""
    let pages = paginate(selectedPage, totalPages)

    for (page of pages) {
        if(String(page).includes('...')) {
            elements += `<span>...</span>`
        } else {
            if (filter) {
                elements += `<a href="/recipes/search?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="/recipes?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
    activeSelectedPage(pagination, selectedPage)
}



createPagination(pagination)



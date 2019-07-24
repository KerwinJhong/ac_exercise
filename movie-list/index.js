(function() {
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const pagination = document.getElementById('pagination')
    const ITEM_PER_PAGE = 12
    const dataPanel = document.getElementById('data-panel')
    let paginationData = []
    const searchForm = document.getElementById('search')
    const searchInput = document.getElementById('search-input')
    const displayBar = document.getElementById('display-bar')
    let displayType = 'd-card-btn'
    let pageNum = 1


    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results)
        getTotalPages(data)
        getPageData(1, data)
    }).catch((err) => console.log(err))

    // listen to data panel
    dataPanel.addEventListener('click', (event) => {
        if (event.target.matches('.btn-show-movie')) {
            showMovie(event.target.dataset.id)
        }
    })

    function displayDataList(data, displayType) {
        let htmlContent = ''
        data.forEach(function(item, index) {
            if (displayType === 'd-card-btn') {
                htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>

            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
            } else if (displayType === 'd-list-btn') {
                htmlContent += `
        <div class="d-flex justify-content-between w-100 p-1 border border-muted border-left-0 border-bottom-0 border-right-0">
          <div class="col p-3">
            <h3 class="card-title">${item.title}</h3>
          </div>
          <!-- "More" button -->
          <div class="col-2 p-3">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
            <button class="btn btn-info btn-add-favorite align-self-center" data-id="${item.id}">+</button>
          </div>
        </div>
      `
            }
        })
        dataPanel.innerHTML = htmlContent
    }

    function showMovie(id) {
        // get elements
        const modalTitle = document.getElementById('show-movie-title')
        const modalImage = document.getElementById('show-movie-image')
        const modalDate = document.getElementById('show-movie-date')
        const modalDescription = document.getElementById('show-movie-description')

        // set request url
        const url = INDEX_URL + id
        console.log(url)

        // send request to show api
        axios.get(url).then(response => {
            const data = response.data.results
            console.log(data)

            // insert data into modal ui
            modalTitle.textContent = data.title
            modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
            modalDate.textContent = `release at : ${data.release_date}`
            modalDescription.textContent = `${data.description}`
        })
    }


    // listen to search form submit event

    searchForm.addEventListener('click', event => {
        event.preventDefault()

        let results = []
        const regex = new RegExp(searchInput.value, 'i')

        results = data.filter(movie => movie.title.match(regex))
        console.log(results)
        getTotalPages(results)
        getPageData(1, results)
    })

    dataPanel.addEventListener('click', (event) => {
        if (event.target.matches('.btn-show-movie')) {
            showMovie(event.target.dataset.id)
        } else if (event.target.matches('.btn-add-favorite')) {
            addFavoriteItem(event.target.dataset.id)
        }
    })

    function addFavoriteItem(id) {
        const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        const movie = data.find(item => item.id === Number(id))

        if (list.some(item => item.id === Number(id))) {
            alert(`${movie.title} is already in your favorite list.`)
        } else {
            list.push(movie)
            alert(`Added ${movie.title} to your favorite list!`)
        }
        localStorage.setItem('favoriteMovies', JSON.stringify(list))
    }




    function getTotalPages(data) {
        let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
        let pageItemContent = ''
        for (let i = 0; i < totalPages; i++) {
            pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
        }
        pagination.innerHTML = pageItemContent
    }



    pagination.addEventListener('click', (event) => {
        pageNum = (event.target.dataset.page)
        if (event.target.tagName === 'A') {
            getPageData(event.target.dataset.page)
        }
    })


    function getPageData(pageNum, data) {
        paginationData = data || paginationData
        let offset = (pageNum - 1) * ITEM_PER_PAGE
        let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
        displayDataList(pageData, displayType)
    }


    displayBar.addEventListener('click', (event) => {
        if (event.target.matches('.d-card-btn')) {
            displayType = 'd-card-btn'
        } else if (event.target.matches('.d-list-btn')) {
            displayType = 'd-list-btn'
        }
        console.log(displayType)
        getPageData(pageNum)
    })



})()
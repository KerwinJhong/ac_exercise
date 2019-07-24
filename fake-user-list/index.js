(function() {
    const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
    const INDEX_URL = BASE_URL + '/api/v1/users'
    const SHOW_URL = BASE_URL + '/api/v1/users/'
    const navHome = document.querySelector('.nav-home')
    const navLike = document.querySelector('.nav-like')
    const searchBtn = document.getElementById('search-Btn')
    const searchInput = document.getElementById('search-input')
    const ITEM_PER_PAGE = 20
    const pagination = document.getElementById('pagination')
    const panel = document.querySelector("#show")
    const heartBtn = document.querySelector('.fa-heart')
    const likeList = JSON.parse(localStorage.getItem('likeList')) || []
    let dataBox = []
    let key = 0
    let pageNum = 1
    let paginationData = []


    //============= 1. 顯示人物 =============
    function displayData(data) {
        //console.log(dataBox)
        const show = document.querySelector("#show")
        let htmlContent = ''
        data.forEach(function(item, index) {
            let btnCheck = ""
            likeList.forEach(function(likeItem) {
                if (item.id == likeItem.id) { return btnCheck = "active" }
            })
            htmlContent += `
        <div class="col-12 col-sm-3 col-xl-2 shadow text-center m-3">
          <div class="${item.id}">
            <h6 class="">${item.name} ${item.surname}</h6>
            <img style="cursor:pointer" class="w-100 show-btn" data-toggle="modal" data-target="#modal" src="${item.avatar}" alt="Smiley face">
<i class="far fa-heart btn btn-outline-danger m-2 ${btnCheck}" data-toggle="button" aria-pressed="true"></i>
          </div>
        </div>
        `
        })
        show.innerHTML = htmlContent
    }


    //============= 2.資料傳入modal =============
    function showData(id) {
        const name = document.getElementById('name')
        const avatar = document.getElementById('avatar')
        const description = document.getElementById('description')

        // set request url
        const url = SHOW_URL + id

        // send request to show api
        axios.get(url).then(response => {
            const data = response.data

            // insert data into modal ui
            name.textContent = `${data.name} ${data.surname}`
            avatar.innerHTML = `<img src="${data.avatar}" class="img-fluid h-100" alt="Responsive image">`
            description.innerHTML = `
<div><p>Age : ${data.age}</p></div>
<div><p><i class="mr-2 fas fa-venus-mars"></i> ${data.gender}</p></div>
<div><p><i class="mr-2 fas fa-map-marker-alt"></i> ${data.region}</p></div>
<div><p><i class="mr-2 fas fa-birthday-cake"></i> ${data.birthday}</p></div>
<div><p><i class="mr-2 fas fa-envelope"></i>${data.email}</p></div>
`
        })
    }


    //============= 3.頁數顯示 =============
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


    //============= 4.顯示頁數人物 =============
    function getPageData(pageNum, data) {
        paginationData = data || paginationData
        let offset = (pageNum - 1) * ITEM_PER_PAGE
        let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
        displayData(pageData)
    }




    //============= 5. like control =============
    function likeControl(id) {
        const index = likeList.findIndex(item => item.id === Number(id))
        const player = dataBox.find(item => item.id === Number(id))
        if (likeList.some(item => item.id === Number(id))) {
            alert(`removed ${player.name} to your like list!`)
            likeList.splice(index, 1)
        } else {
            likeList.push(player)
            alert(`Added ${player.name} to your like list!`)
        }
        localStorage.setItem('likeList', JSON.stringify(likeList))
    }


    //============= 6. 首頁 =============
    function home() {
        dataBox = []
        axios.get(INDEX_URL)
            .then((response) => {
                dataBox.push(...response.data.results)
                getTotalPages(dataBox)
                getPageData(1, dataBox)
            })
            .catch(function(error) {
                // 2.handle error
                console.log("error")
            })
    }


    //============ 7. 執行 ============
    home()

    //============= 8. 首頁按鈕 =============
    navHome.addEventListener('click', (event) => {
            home()
        })
        //============= 9. like list =============
    navLike.addEventListener('click', (event) => {
        dataBox = JSON.parse(localStorage.getItem('likeList')) || []
        getTotalPages(dataBox)
        getPageData(1, dataBox)
    })

    //============= 10. 人物按鈕 =============
    panel.addEventListener('click', (event) => {
        let nub = event.target.parentElement.getAttribute("class")
        if (event.target.matches('.show-btn')) {
            showData(nub)
        } else if (event.target.matches('.fa-heart')) {
            likeControl(nub)
        }
    })

    //============= 11. 搜尋按鈕 =============
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault()
        let results = []
        const regex = new RegExp(searchInput.value, 'i')
        results = dataBox.filter(movie => movie.name.match(regex))
        getTotalPages(results)
        getPageData(1, results)
    })

    //============= 12. 頁數按鈕 =============
    pagination.addEventListener('click', (event) => {
        pageNum = (event.target.dataset.page)
        if (event.target.tagName === 'A') {
            getPageData(event.target.dataset.page)
        }
    })

})()
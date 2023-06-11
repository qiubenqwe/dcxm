// 发起请求获取数据
axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then(response => {
        // 处理数据
        const cities = response.data;
        let pageSize = 50;
        let currentPage = 1;
        let totalPages = Math.ceil(cities.length / pageSize);
        console.log(cities.length);
        console.log(pageSize);

        //数据拼接

        function renderCities(city) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            let citiesHtml = '';
            const filteredCities = city ? cities.filter(item => item.city === city.city) : cities;
            for (let i = startIndex; i < endIndex && i < filteredCities.length; i++) {
                citiesHtml += `
                <div class="card text-start m-5">
                  <div class="card-header">城市-${filteredCities[i].city}, ${filteredCities[i].state}</div>
                  <div class="card-body">
                    <p class="card-text">人口：${filteredCities[i].population}</p>
                    <p class="card-text">排名：${filteredCities[i].rank}</p>
                    <p class="card-text">增长：${filteredCities[i].growth_from_2000_to_2013}</p>
                    <p class="card-text">经度：${filteredCities[i].latitude}</p>
                    <p class="card-text">纬度：${filteredCities[i].longitude}</p>
                    <p class="card-text">州/省：${filteredCities[i].state}</p>
                  </div>
                </div>
              `;
            }
            document.getElementById('card-container').innerHTML = citiesHtml;
        }

        //渲染分页
        function renderPagination() {
            // 判断是否需要禁用上下页按钮
            const previousPageClass = currentPage === 1 ? 'disabled' : '';
            console.log(currentPage);
            const nextPageClass = currentPage === totalPages ? 'disabled' : '';
            console.log(totalPages);

            let paginationHtml = `
              <li class="page-item ${previousPageClass}" id="previous-page">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
            `;

            for (let i = 1; i <= totalPages; i++) {
                // 判断是否需要添加 active 类名
                const activeClass = i === currentPage ? 'active' : '';
                paginationHtml += `
                <li class="page-item ${activeClass}">
                  <a class="page-link" href="#">${i}</a>
                </li>
              `;
            }

            paginationHtml += `
              <li class="page-item ${nextPageClass}" id="next-page">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            `;

            document.querySelector('.pagination').innerHTML = paginationHtml;
        }
        renderCities();
        renderPagination();

        // 添加搜索功能
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.addEventListener('input', () => {
            const inputValue = searchInput.value.toLowerCase();
            let resultsHtml = '';

            for (let i = 0; i < cities.length; i++) {
                const cityName = cities[i].city.toLowerCase();
                if (cityName.indexOf(inputValue) !== -1) {
                    resultsHtml += `<li class="list-group-item">${cities[i].city}, ${cities[i].state}</li>`;
                }
            }

            searchResults.innerHTML = resultsHtml;
        });

        // 用于清空搜索结果列表和搜索框内容
        function clearSearchResults() {
            searchResults.innerHTML = '';
            searchInput.value = '';
        }

        // 获取对应的数据 进行查找 在渲染对应城市信息
        searchResults.addEventListener('click', (event) => {
            const cityName = event.target.innerText;
            const city = cities.find(item => item.city === cityName.split(',')[0]);
            if (city) {
                renderCities(city);
                clearSearchResults();
            }
        });

        // 当在输入框点击回车时返回renderCities()并且清空
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const inputValue = searchInput.value.toLowerCase();
                if (inputValue === '') {
                    return renderCities();
                }
                if (searchResults.querySelector('li.active')) {
                    return renderCities();
                }
                clearSearchResults();
            }
        });
        // 点击其他地方时清空搜索结果列表和搜索框内容
        document.addEventListener('click', (event) => {
            if (!event.target.matches('#search-input') && !event.target.matches('#search-results li')) {
                clearSearchResults();
            }
        });



        // searchResults.addEventListener('click', ({ target: { innerText } }) => {
        //     const cityName = innerText;
        //     const city = cities.find(({ city }) => city === cityName.split(',')[0]);
        //     if (city) {
        //       renderCities(city);
        //       console.log(city);

        //     } else {
        //       currentPage = 1;
        //       renderCities();
        //       renderPagination();
        //     }
        //     searchResults.innerHTML = '';
        //   });


        // 添加分页功能
        document.querySelector('.pagination').addEventListener('click', (event) => {
            event.preventDefault();

            if (event.target.parentElement.classList.contains('disabled')) {
                return;
            }

            if (event.target.parentElement.id === 'previous-page') {
                currentPage--;
            } else if (event.target.parentElement.id === 'next-page') {
                currentPage++;
            } else {
                currentPage = parseInt(event.target.innerHTML);
            }

            renderCities();
            renderPagination();
        });
    })
    .catch(error => {
        console.log(error);
    });


//canvas 动画背景
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");
const ch = canvas.height = window.innerHeight + 4;
const cw = canvas.width = window.innerWidth + 4;

class Circle {
    constructor() {
        this.x = Math.random() * cw;
        this.y = Math.random() * ch;
        this.r = 3;
        this.speedX = Math.random() * 2 + 2 >= 3 ? -2 : 2;
        this.speedY = Math.random() * 2 + 2 >= 3 ? -2 : 2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#9B89B3";
        ctx.fill();
        ctx.closePath();
    }
    move() {
        if (this.x >= cw || this.x <= 0) {
            this.speedX = -this.speedX;
            this.speedY = this.speedY;
        }
        if (this.y >= ch || this.y <= 0) {
            this.speedX = this.speedX;
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

const circles = [];
for (let i = 0; i < 40; i++) {
    circles.push(new Circle());
}

setInterval(() => {
    ctx.fillStyle = "rgba(254, 254, 223, 0.1)";
    ctx.fillRect(0, 0, cw, ch);
    circles.forEach(circle => {
        circle.draw();
        circle.move();
    });
}, 1000 / 60);

// 获取返回顶部按钮
const backToTopBtn = document.getElementById('back_top');

// 监听页面滚动事件
window.addEventListener('scroll', () => {
    // 当页面滚动超过一定距离时显示返回顶部按钮，否则隐藏
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// 监听返回顶部按钮点击事件
backToTopBtn.addEventListener('click', () => {
    // 使用平滑滚动回到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

# 功能
#### 1.返回顶部
#### 2.canvas动画
#### 3.分页
#### 4.模糊搜索
#### 5.点击搜索可以到对应的城市，点击回车返回全部城市
## API获取
```javascript
axios.get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then(response => {
        // 处理数据
        const cities = response.data;
        let pageSize = 50;
        let currentPage = 1;
        let totalPages = Math.ceil(cities.length / pageSize);
        console.log(cities.length);
        console.log(pageSize);
```

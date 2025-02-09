let stockData = [];
  let newsData = [];
  let companies = [];
  let mutualFunds = [];
  let golds = [];
  let forex = [];

  fetch(
    "https://moneypulse-47eeb-default-rtdb.asia-southeast1.firebasedatabase.app/stocks.json"
  )
    .then((res) => res.json())
    .then((resp) => {
      let arr = Object.entries(resp);
      // console.log(arr);
      stockData = [...arr];
      displayMarket(stockData);
    })
    .catch((err) => console.log(err));

  function displayMarket(arr) {
    const marketData = document.getElementById("marketData");
    arr.forEach(([name, data]) => {
      const arrow = Number(data.percentage_change) > 0 ? "▲" : "▼";
      const changeColor = Number(data.change) > 0 ? "green" : "red";
      const stockData = document.createElement("p");
      stockData.innerHTML = `
      <p style="font-weight: bold">${data.index}</p>
        <p style="font-weight: bold; color: rgb(59, 58, 58)">${data.value}</p>
        <p style="color: ${changeColor}">${arrow}</p>
        <p style="color: ${changeColor}">${data.change}</p>
        <p style="color: ${changeColor}">(${data.percentage_change}%)</p>
      `;
      marketData.appendChild(stockData);
    });
  }

  fetch(
    "https://moneypulse-47eeb-default-rtdb.asia-southeast1.firebasedatabase.app/news.json"
  )
    .then((res) => res.json())
    .then((resp) => {
      newsData = [...resp];
      // console.log(newsData);
      displayNews(newsData);
    })
    .catch((err) => console.log(err));

  function displayNews(arr) {
    const newsContainer = document.getElementById("news-section");
    arr.forEach((el) => {
      const news = document.createElement("div");
      news.classList.add("news");
      news.innerHTML = `
            <h4 class="news-title">${el.headline}</h4>
            <span class="newsSource">Source: ${el.source}</span>
            <span class="newsDate">${el.date}</span>
            <p class="newsDescription">${el.description}</p>
            `;
      newsContainer.appendChild(news);
    });
  }

  fetch(
    "https://moneypulse-47eeb-default-rtdb.asia-southeast1.firebasedatabase.app/companies.json"
  )
    .then((res) => res.json())
    .then((resp) => {
      companies = [...resp];
      const topGainers = [...resp]
        .sort((a, b) => b.change - a.change)
        .slice(0, 6);
      const topLosers = [...resp]
        .filter((el) => el.change < 0)
        .sort((a, b) => a.change - b.change)
        .slice(0, 6);
      displayGainersLosers(topGainers, topLosers);
      // console.log(topGainers, topLosers);
      displayChart(companies);
      // console.log(companies);
    })
    .catch((err) => console.log(err));

  function displayChart(arr) {
    const charts = document.getElementById("charts");
    const stocksChart = document.getElementById("stocks-chart");
    arr.forEach((el) => {
      const company = document.createElement("tr");
      const changeColor = Number(el.change) < 0 ? "red" : "green";
      company.innerHTML = `
      <td style="font-weight: bold">${el.symbol}</td>
      <td style="font-weight: bold; color: rgb(59, 58, 58)">${el.current_price}</td>
      <td style="color: ${changeColor}">${el.change}</td>
      <td style="color: ${changeColor}">${el.market_cap}</td>
    `;

      stocksChart.appendChild(company);
    });
  }

  function displayGainersLosers(gainers, losers) {
    const gainersChart = document.getElementById("gainers-chart");
    const losersChart = document.getElementById("losers-chart");
    gainers.forEach((el) => {
      const gainers = document.createElement("tr");
      const changeColor = Number(el.change) < 0 ? "red" : "green";
      gainers.innerHTML = `
      <td style="font-weight: bold">${el.symbol}</td>
      <td style="font-weight: bold; color: rgb(59, 58, 58)">${el.current_price}</td>
      <td style="color: ${changeColor}">${el.change}</td>
      <td style="color: ${changeColor}">${el.market_cap}</td>
    `;

      gainersChart.appendChild(gainers);
    });

    losers.forEach((el) => {
      const losers = document.createElement("tr");
      const changeColor = Number(el.change) < 0 ? "red" : "green";
      losers.innerHTML = `
      <td style="font-weight: bold">${el.symbol}</td>
      <td style="font-weight: bold; color: rgb(59, 58, 58)">${el.current_price}</td>
      <td style="color: ${changeColor}">${el.change}</td>
      <td style="color: ${changeColor}">${el.market_cap}</td>
    `;

      losersChart.appendChild(losers);
    });
  }

  fetch(
    "https://moneypulse-47eeb-default-rtdb.asia-southeast1.firebasedatabase.app/commodities.json"
  )
    .then((res) => res.json())
    .then((resp) => {
      const arr = Object.entries(resp);
      golds = [...arr];
      // console.log(golds);
      displayCommodities(golds);
    })
    .catch(err=>console.log(err))

  function displayCommodities(arr) {
    const commoChart = document.getElementById("commodities-chart");
    arr.forEach(([com, data]) => {
      const comData = document.createElement("tr");
      const changeColor = Number(data.change) < 0 ? "red" : "green";
      comData.innerHTML = `
                <td style="font-weight: bold">${data.name}</td>
                <td style="font-weight: bold; color: rgb(59, 58, 58)">${data.value}</td>
                <td style="color: ${changeColor}">${data.change}</td>
                <td style="color: ${changeColor}">${data.percentage_change}</td>
      `;
      commoChart.appendChild(comData);
    });
  }

  fetch('https://moneypulse-47eeb-default-rtdb.asia-southeast1.firebasedatabase.app/forex.json')
      .then(res => res.json())
      .then(resp => {
        const data = Object.entries(resp);
        const forex = [...data];
        // console.log(forex);
        displayForex(forex);
      })
      .catch(err => console.log(err));

    function displayForex(arr) {
        const currChart = document.getElementById('curr-chart');
        arr.forEach(([curr, data]) => {
            const currName = curr.trim().split('_');
            const currency = '' + currName[0] + currName[1];
            const changeColor = Number(data.change) < 0 ? 'red' : 'green';
            const currData = document.createElement('tr');
            currData.innerHTML = `
              <td style="font-weight: bold">${currency.toUpperCase()}</td>
              <td style="font-weight: bold; color: rgb(59, 58, 58)">${data.rate}</td>
              <td style="color: ${changeColor}">${data.change}</td>
              <td style="color: ${changeColor}">${data.percentage_change}</td>
            `;

            currChart.appendChild(currData);
        });
    }
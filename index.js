// const btnIpTracker = document.getElementById('button-ip-tracker');
const searchIpTracker = document.getElementById('search-ip-tracker');
const inputIpTracker = document.getElementById('input-ip-tracker');
const infoIp = document.getElementById('info-ip');
const infoLocation = document.getElementById('info-location');
const infoTimezone = document.getElementById('info-timezone');
const infoIsp = document.getElementById('info-isp');

const getIp = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data;
}

const trackerIp = (value) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_GwFJHXWZSUDLqtZynPvEZLqNBKMMd&domain=${value}`).then(res => res.json()).then(res => {
        infoIp.innerText = res.ip
        infoLocation.innerText = `${res.location.region}, ${res.location.city}`
        infoTimezone.innerText = res.location.timezone
        infoIsp.innerText = res.isp

        initMap(res.location.lat, res.location.lng)
    })
}

const initMap = (lat, lng) => {
    document.getElementById('map-renderer').innerHTML="<div id='map'></div>"
    
    let map = L.map('map', {
        center: [lat, lng],
        zoom: 14
    });
    
    let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
        
    const Icon = L.icon({
      iconUrl: './assets/images/icon-location.svg',
    
    });
    
    const marker = L.marker([lat, lng], {icon: Icon}).addTo(map);
}

getIp().then(res => {
    trackerIp(res.ip)
});

searchIpTracker.addEventListener('submit', (event) => {
    event.preventDefault()
    
    trackerIp(inputIpTracker.value)
});
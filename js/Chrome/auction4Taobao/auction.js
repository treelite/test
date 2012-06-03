var ele = document.querySelectorAll('strong.J_CurrentPrice')[0];

chrome.extension.sendRequest(null, {name: 'checkPrice', params: [parseInt(ele.innerHTML, 10)]});

setTimeout(function () {
    location.reload();
}, 3000);

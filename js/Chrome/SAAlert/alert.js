function getFLightsData(type) {
    var res = {type: type},
        ele;

    // get routing
    ele = document.querySelectorAll('.'+ type +'.priceRow .routing')[0];
    if (ele) {
        res.routing = ele.innerHTML.trim();
    }

    // get time
    ele = document.querySelectorAll('.airItineraryTable.' + type + ' .segmentTime')[0];
    if (ele) {
        res.time = ele.innerHTML.trim();
        ele = document.querySelectorAll('.airItineraryTable.' + type + ' .segmentTimeAMPM')[0];
        res.time += ele.innerHTML.trim();
    }

    //get date
    ele = document.querySelectorAll('.airItineraryTable.' + type + ' .departureLongDate')[0];
    if (ele) {
        res.date = ele.innerHTML.trim();
    }
    return res;
}

var dep = getFLightsData('depart'),
    ret = getFLightsData('return'),
    data = '';

data += 'depart, ' + dep.routing + ' ' + dep.date + ' @' + dep.time + '\n';
data += 'return, ' + ret.routing + ' ' + ret.date + ' @' + ret.time;

chrome.extension.sendRequest(null, {name: 'alert', params: [data]});

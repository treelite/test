define(function () {
    return {
        getQuery: function () {
            var params = location.search.substring(1);
            var res = {};
            
            if (!params) {
                return res;
            }

            params = params.split('&');
            for (var i = 0, item; item = params[i]; i++) {
                item = item.split('=');
                res[item[0]] = decodeURIComponent(item[1]);
            }

            return res;
        }
    }
});

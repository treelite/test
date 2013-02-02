var tween = (function () {

    var effects = {
        acc: function (from, to, time) {
            var counter = 0,
                a = 2 * (to - from) / Math.pow(time, 2);

            return function () {
                var t = 0.025 * (++counter),
                    s = a * Math.pow(t, 2) / 2;

                return s + from;
            };
        },

        ease: function (from, to, time) {
            var counter = 0,
                a = -(to - from) / Math.pow(time, 2),
                b = 2 * (to - from ) / time;

            return function () {
                var t = 0.025 * (++counter);
                    s = a * Math.pow(t, 2) + b * t;

                return s + from;
            }
        },

        sina: function (from, to, time) {
            var counter = 0;

            return function () {
                var t = 0.025 * (++counter);

                return (to - from) * Math.sin(Math.PI * t / (2 * time));
            }
        }
    };

    function createEffects(name, from, to, time) {
        return effects[name].call(null, from, to, time);
    };

    function change(el, style, fuc, max) {
        var x = fuc.call(),
            args = arguments;

        if (x <= max) {
            el.style[style] = x + 'px';
            if (x < max) {
                setTimeout(function () {
                    args.callee.apply(null, Array.prototype.slice.call(args));
                },  25);
            }
        }
    }

    return function (el, style, to, time, e) {
        var from = parseInt(el.style[style]),
            fuc = createEffects(e, from, to, time);

        change(el, style, fuc, to);
    };
})();

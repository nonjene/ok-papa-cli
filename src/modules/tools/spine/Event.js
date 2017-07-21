/**
 * Created by Nonjene on 16/9/23.
 */
var Event = function() {};

Event.prototype = {
    _checkSlot: function() {
        if (!this._slot) {
            this._slot = {};
        }
    },
    on: function(eve, cb) {
        if (typeof cb !== "function") return this;
        this._checkSlot();

        var slot = this._slot[eve];
        if (!slot) {
            this._slot[eve] = [cb.bind(this)];
        } else {
            slot.push(cb.bind(this));
        }
        return this;
    },
    off: function(eve) {
        this._checkSlot();
        delete this._slot[eve];
        return this;
    },
    _doTrigger: function(eve, params) {
        this._checkSlot();
        var that = this;

        var allEve = this._slot[eve];
        if (!allEve) return this;
        allEve.forEach(function(eFunc) {
            try {
                eFunc.apply(that, params);
            } catch (e) {}
        });
    },

    // trigger('xxx.ins') 立即触发
    // trigger('xxx')   异步触发
    trigger: function() {
        var args = Array.prototype.slice.call(arguments);
        var eve = args[0],
            params = args.slice(1);

        if (~eve.indexOf(".ins")) {
            return this._doTrigger(eve.slice(0, eve.indexOf(".ins")), params);
        } else {
            setTimeout(
                function() {
                    return this._doTrigger(eve, params);
                }.bind(this),
                0
            );
        }

        return this;
    }
};

module.exports = Event;

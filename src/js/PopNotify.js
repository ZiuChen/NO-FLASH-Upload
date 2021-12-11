/**
 * PopNotify.js
 * @author CKylinMC
 * @version 1.1
 * @licence MIT
 */

import popNotifyCSS from "../style/css/PopNotify.css"

function popNotifyUnit(title, content, onclick, timeout, style, autoshow) {
    this.constructor = function(title, content, onclick, timeout) {
        this.title = title;
        this.content = content;
        this.onclick = onclick instanceof Function ? onclick : this.close(this);
        this.timeout = timeout || 5000;
        this.id = "PNU_" + Math.floor(Math.random() * 1000000) + new Date().getMilliseconds().toString();
        this.posRight = 20;
        this.posTop = popNotify.getNextYPos();
        this.timer = null;
        this.style = style;
        this.showing = false;
        this.destoried = false;
        // window[this.id] = this;
        if (autoshow) this.show();
    };
    this.setPosRight = function(x) {
        // if (!this.showing) return;
        x = parseFloat(x);
        if (isNaN(x)) return;
        this.posRight = x;
        this.update();
    };
    this.setPosTop = function(y) {
        // if (!this.showing) return;
        y = parseFloat(y);
        if (isNaN(y)) return;
        this.posTop = y;
        this.update();
    };
    this.update = function() {
        let el = document.querySelector("#" + this.id);
        if (!el) return;
        el.style.top = this.posTop + "px";
        el.style.right = this.posRight + "px";
    };
    this.clicked = function(e, ev) {
        return function() {
            if (e.onclick(ev, e) !== false) e.destory();
        }
    };
    this.show = function() {
        if (this.timer) clearTimeout(this.timer);
        let el = document.querySelector("#" + this.id);
        if (el) el.remove();
        el = document.createElement("div");
        el.id = this.id;
        el.className = "popNotifyUnitFrame" + (this.style ? " popStyle-" + this.style : "");
        el.onclick = this.clicked(this);
        el.style.top = this.posTop + "px";
        el.style.right = this.posRight + "px";
        if (this.title != null) {
            let t = document.createElement("div");
            t.innerText = this.title;
            t.className = "popNotifyUnitTitle";
            t.style.animation = "pntextin .8s forwards .2s cubic-bezier(0, 0.6, 0, 1)";
            el.appendChild(t);
        }
        if (this.content != null) {
            let c = document.createElement("div");
            c.innerText = this.content;
            c.className = "popNotifyUnitContent";
            c.style.animation = "pntextin .8s forwards .3s cubic-bezier(0, 0.6, 0, 1)";
            el.appendChild(c);
        }
        let b = document.createElement("i");
        b.className = "popNotifyUnitBar";
        b.style.animationDuration = (this.timeout / 1000) + "s";
        el.appendChild(b);
        this.timer = setTimeout(this.close(this), this.timeout);
        document.body.appendChild(el);
        this.showing = true;
    };
    this.close = function(e) {
        return function() {
            e.destory();
        }
    };
    this.destory = function(force) {
        if (this.destoried) return;
        this.destoried = true;
        this.showing = false;
        if (this.timer) clearTimeout(this.timer);
        let el = document.querySelector("#" + this.id);
        if (el) {
            if (force) return el.remove();
            el.style.animation = "none";
            el.style.animation = "pnout forwards .3s ease-in-out";
            setTimeout(this.remove(this), 310);
            popNotify.refresh();
        }
        popNotify.cleanUp(this);
    };
    this.remove = function(e) {
        return function() {
            let el = document.querySelector("#" + e.id);
            if (el) el.remove();
        }
    };
    this.el = function() {
        return document.querySelector("#" + this.id);
    };
    this.constructor(title, content, onclick, timeout);
}

var popNotify = {
    queue: [],
    closingAll: false,
    show: function(title = null, content = null, style = "", timeout = 5, onclick = null) {
        this.notify(title, content, timeout * 1000, onclick, style);
    },
    success: function(title = null, content = null, timeout = 5, onclick = null) {
        this.show(title, content, "success", timeout, onclick);
    },
    info: function(title = null, content = null, timeout = 5, onclick = null) {
        this.show(title, content, "info", timeout, onclick);
    },
    warn: function(title = null, content = null, timeout = 5, onclick = null) {
        this.show(title, content, "warn", timeout, onclick);
    },
    error: function(title = null, content = null, timeout = 5, onclick = null) {
        this.show(title, content, "error", timeout, onclick);
    },
    notify: function(title, content, timeout, onclick, style) {
        let n = new popNotifyUnit(title, content, onclick, timeout, style, true);
        this.queue.push(n);
        this.refresh();
        return n;
    },
    cleanUp: function(obj) {
        if (this.closingAll) return;
        if (obj) this.queue.forEach((item, index) => {
            if (item === obj) this.queue.splice(index, 1);
        });
        else
            for (let i = 0; i < this.queue.length; i++) {
                if (this.queue[i].showing === false) {
                    this.queue.splice(i, 1);
                    i -= 1;
                }
            }
    },
    refresh: function() {
        let top = 20;
        let height = top;
        this.queue.forEach(item => {
            if (!item.showing) return;
            item.setPosTop(height);
            height += top + item.el().offsetHeight;
        })
    },
    getNextYPos: function() {
        let top = 20;
        let height = top;
        this.queue.forEach(item => {
            if (!item.showing) return;
            height += top + item.el().offsetHeight;
        });
        return height;
    },
    getObjById: function(id) {
        if (!id) return;
        let res = null;
        this.queue.forEach(item => {
            if (item.id === id) res = item;
        });
        return res;
    },
    getObjByElement: function(e) {
        if (!e) return;
        if (!e instanceof HTMLElement) return;
        let id = null;
        if (e.classList.contains("popNotifyUnitFrame")) {
            id = e.id;
        } else if (e.classList.contains("popNotifyUnitTitle") || e.classList.contains("popNotifyUnitContent")) {
            id = e.parentNode.id;
        }
        let res = null;
        this.queue.forEach(item => {
            if (item.id === id) res = item;
        });
        return res;
    },
    close: function(item) {
        let obj;
        if (item instanceof HTMLElement) {
            obj = this.getObjByElement(item);
        } else {
            obj = this.getObjById(item);
        }
        if (!obj) return;
        obj.destory();
    },
    closeAll: function() {
        this.closingAll = true;
        this.queue.forEach(item => item.destory());
        this.queue = [];
        this.closingAll = false;
    }
};
export default popNotify
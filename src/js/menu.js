// Menu responsive
// By NguyenLong
class wilMenu {
    constructor(el, opt) {
        const optDefault = {
            moreButton: '<a href="#">+ More</a>',
            classMore: 'item-menu-more',
            classMoreChild: 'sub-menu-more sub-menu'
        }
        this.opts = wilExtend(optDefault, opt);
        this.els = document.querySelectorAll(el);
        this.create(this.els);
    }
    
    create(els) {
        wilEach(els, (el) => {
            el.style.display = 'inline-block';
            this.addMore(el);
            this.responsive(el);
        });
    }
    
    addMore(el) {
        const {opts} = this;
        let moreHTML = `
            <li class="${opts.classMore}">
                ${opts.moreButton}
                <ul class="${opts.classMoreChild}"></ul>
            </li>
        `;
        if (el.innerHTML.indexOf(opts.moreButton) === -1) {
            el.insertAdjacentHTML('beforeend', moreHTML);
        }
    }
   
    
    responsive(el) {
        const itemMore = el.children[el.children.length-1];
        const subMore = itemMore.lastElementChild;
        let elWidthBegin = el.offsetWidth;
        let itemMoreWidth = itemMore.offsetWidth;
        let lastResize = 0;
        const cst = 100;
        
        itemMore.style.display = 'none';
        itemMore.firstElementChild.addEventListener('click', event => {
            event.stopPropagation();
            event.preventDefault();
        })
        
        const eventResize = document.createEvent('Event');
        eventResize.initEvent('eventResize', true, true);
        el.addEventListener('eventResize', () => {
            let ww = window.innerWidth;
            let elWidth = el.offsetWidth;
            let parentWidth = el.parentNode.offsetWidth;
            if (ww > lastResize) {
                if (elWidth + cst <= parentWidth) {
                    if (subMore.innerHTML !== '') {
                        el.insertBefore(
                            subMore.firstChild,
                            el.childNodes[el.childNodes.length-2]
                        );
                    }
                }
                if (elWidthBegin + cst + 10 <= parentWidth + itemMoreWidth) {
                    itemMore.style.display = 'none';
                }
            } else {
                let listItemLast = el.children[el.children.length-2];
                if (elWidth + cst > parentWidth) {
                    if (listItemLast !== undefined) {
                        subMore.insertBefore(
                            listItemLast,
                            subMore.firstChild
                        );
                    }
                }
                if (elWidthBegin + cst + 10 > parentWidth + itemMoreWidth) {
                    itemMore.style.display = 'inline-block';
                }
            }
            lastResize = ww;
        });
        const update = setInterval(() => {
            let elWidth = el.offsetWidth;
            let parentWidth = el.parentNode.offsetWidth;
            if (elWidth + cst > parentWidth) {
                el.dispatchEvent(eventResize);
            } else {
                clearTimeout(update);
            }
        }, 5);
        window.addEventListener('resize', () => {
            el.dispatchEvent(eventResize);
        });
    }
}
function wilEach(els, cb) {
    for(var i = 0, len = els.length; i < len; i++) {
        if (i === len) break;
        cb(els[i], i);
    }
}
function wilExtend(obj, src) {
    if (typeof src === 'object') {
        wilEach(Object.keys(src), (key) => {
            obj[key] = src[key];
        });
    }
    return obj;
}
// Menu responsive
// By NguyenLong
// moreButton: string ( tag html )
// classMore: string
// classMoreChild: string
const menu = new wilMenu('.nav-list', {
    moreButton: '<a href="#">+ More</a>',
    classMore: 'item-menu-more',
    classMoreChild: 'sub-menu-more sub-menu'
});
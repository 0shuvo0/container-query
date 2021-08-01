function containerQuery(_queries){
    const queries = []
    for(let q in _queries){
        for(let el in _queries[q]){
            queries.push({
                selector: el,
                minWidth: q,
                styles: _queries[q][el]
            })
        }
    }
    queries.sort((a, b) => b.minWidth - a.minWidth)
    queries.map(query => observe(query))
}


function observe(query){
    let els = document.querySelectorAll(query.selector)
    if(!els.length) return
    Array.from(els).map(el => {
        new ResizeObserver(entries => {
            for(let entry of entries){
                let cr = entry.contentRect
                let current = parseInt(entry.target.getAttribute("container-query"))

                if(cr.width <= query.minWidth){
                    applyStyles(entry.target, query.styles, cr)
                }else{
                    resetStyles(entry.target, query.styles)
                }
            }
        }).observe(el)
    })
}


function applyStyles(el, styles, rect){
    for(let style in styles){
        if(typeof styles[style] == "object"){
            Array.from(el.querySelectorAll(style)).map(child => {
                applyStyles(child, styles[style], rect)
            })
            continue
        }
        el.style[style] = typeof styles[style] == "function" ? styles[style](rect.height, rect.width) : styles[style]
    }
}


function resetStyles(el, styles){
    for(let style in styles){
        if(typeof styles[style] == "object"){
            Array.from(el.querySelectorAll(style)).map(child => {
                resetStyles(child, styles[style])
            })
            continue
        }
        el.style[style] = ""
    }
}

export default containerQuery
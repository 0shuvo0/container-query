import containerQuery from "../index.js"

containerQuery({
    350: {
        ".card": {
            flexDirection: "column",
            ".content": {
                textAlign: "center",
                paddingTop: "1em",
                paddingLeft: 0,
                margin: "1.5em 0"
            },
            img: {
                borderRadius: "50%",
                height: (h, w) => parseInt(w / 2) + "px",
                width: (h, w) => parseInt(w / 2) + "px"
            },
            ".icons": {
                flexDirection: "row"
            }
        },
    }
})

const resizer = document.querySelector(".resizer")
const card = document.querySelector(".card")

function handleResize(e){
    debounce(() => {
        let rect = card.getBoundingClientRect()
        let right = rect.right
        let mouseX = e.clientX
        let diff = mouseX - right
        
        card.style.width = rect.top + (diff * 2) + "px"
    })()
}

function debounce(func, timeout = 100){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

resizer.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", handleResize)
})
window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", handleResize)
})
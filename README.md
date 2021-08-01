# container-query
### CSS container query polyfill for js
### but with additional superpowers
It uses ResizeObserver to monitor changes

![demo](preview.gif)

## Installation
```npm i container-query-js```

## Example
```js
import containerQuery from "container-query-js"

containerQuery({
    600: { //when width of elemets is between 0 - 600 these styles will be applies
        ".card": {
            flexDirection: "row"
        }
    },
    350: { //when width of elemets is between 0 - 350 these styles will be applies
        ".card": {
            flexDirection: "column",
            ".content": { //You can style childs based on parents width
                textAlign: "center",
                paddingTop: "1em",
                paddingLeft: 0,
                margin: "1.5em 0",
                width: (h, w) => parseInt(w / 2) + "px" // You can also use functions, it will receive height and width of current element
            }
        },
    }
})
```
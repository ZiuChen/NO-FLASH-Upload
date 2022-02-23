function loadCSS(css: string) {
    document.querySelectorAll("head")[0].append(DOMParse(`<style class="append-style">${css}</style>`))
}

function DOMParse(string: string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstChild;
  }

export default loadCSS
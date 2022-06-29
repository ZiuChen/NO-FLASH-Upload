export function loadJS(url: string) {
  document
    .querySelectorAll("head")[0]
    .append(DOMParse(`<script type="text/javascript" src="${url}"></script>`));
}

export function loadLINK(link: string) {
  document
    .querySelectorAll("head")[0]
    .append(
      DOMParse(
        `<link class="append-style" type="text/css" rel="stylesheet" href="${link}"></link>`
      )
    );
}

export function loadCSS(css: string) {
  document
    .querySelectorAll("head")[0]
    .append(DOMParse(`<style class="append-style">${css}</style>`));
}

function DOMParse(string: string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstChild as ChildNode;
}

function loadCSS(link: string) {
  document
    .querySelectorAll("head")[0]
    .append(
      DOMParse(
        `<link class="append-style" type="text/css" rel="stylesheet" href="${link}"></link>`
      )
    );
}

function DOMParse(string: string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstChild as ChildNode;
}

export { loadCSS };

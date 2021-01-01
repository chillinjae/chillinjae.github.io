async function fetchDocs(docsUrl) {
    var response = await fetch(docsUrl);
    switch (response.status) {
        // status "OK"
        case 200:
            var template = await response.text();

            // replace text for CSS changes of embedded Docs
            replaceTextDict = {
                '"Consolas"': '"Inconsolata", monospace',
                '</span></li>': '</span></div></li>',
                '</table>': '</table>\n'
            }
            for (const [key, value] of Object.entries(replaceTextDict)) {
                template = template.replaceAll(`${key}`, `${value}`);
            }
            template = template.replace(/(margin-left:)(.{0,7})(pt)/g, marginLeftReplacer)
            template = template.replace(/(<li class=")(.*?)(">)(<span)/g, divAdderForList);
            template = template.replace(
                /(<table class=")(.{0,10}"><tbody><tr class=".{0,10}"><td class=".{0,10}" colspan="1" rowspan="1">)(<p)(?!.*(?:<p))(.*?<\/p>)(<\/td><\/tr><\/tbody><\/table>)/g,
                divAdderForCodeTable);

            // insert final html to blog page
            var place = document.querySelector('.fetchDocsHere');
            place.innerHTML = template;
            break;
        // status "Not Found"
        case 400:
        case 404:
            var place = document.querySelector('.fetchDocsHere');
            place.innerHTML = `<div style="font-size:3rem;">😅</div>
                            <div style="color:#ffd966;font-weight:bold;font-size:2rem;">
                            Sorry! Something went wrong.</div>
                            <div style="color:#e06666;font-size:1.5rem;padding-top:.7rem;">
                            → Failed to load resource.</div>
                            <div style="padding-top:2rem;">
                            Please let me know if you found this error page. I will fix it asap.
                            Thank you!</div>`;
            break;
    }
}

function marginLeftReplacer(match, p1, p2, p3, offset, string) {
  return p1 + (parseInt(p2) / 2) + p3;
}

function divAdderForList(match, p1, p2, p3, p4, offset, string) {
  return p1 + p2 + p3 + '<div>' + p4;
}

function divAdderForCodeTable(match, p1, p2, p3, p4, p5, offset, string) {
  return p1 + 'fetchDocsCodeTable ' + p2 + '<div>' + p3 + p4 + '</div>' + p5;
}

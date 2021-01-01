async function fetchDocs(docsUrl) {
    var response = await fetch(docsUrl);
    switch (response.status) {
        // status "OK"
        case 200:
            var template = await response.text();

            // replace text for CSS changes of embedded Docs
            replaceTextDict = {
                '"Consolas"': '"Inconsolata", monospace',
                'margin-left:36pt': 'margin-left:1.2rem',
                'margin-left:72pt': 'margin-left:2.8rem',
                'margin-left:108pt': 'margin-left:4.1rem',
                'margin-left:144pt': 'margin-left:5.4rem',
                'margin-left:180pt': 'margin-left:6.7rem',
                '</span></li>': '</span></div></li>',
                '</table>': '</table>\n'
            }
            for (const [key, value] of Object.entries(replaceTextDict)) {
                template = template.replaceAll(`${key}`, `${value}`);
            }

            template = template.replace(/(<li class=")(.*?)(">)(<span)/g, divAdderForList);
            template = template.replace(
                /(<table class=")(.{0,5}"><tbody><tr class=".{0,5}"><td class=".{0,5}" colspan="1" rowspan="1">)(<p)(?!.*(?:<p))(.*?<\/p>)(<\/td><\/tr><\/tbody><\/table>)/g,
                divAdderForCodeTable);
            
            // insert final html to blog page
            var place = document.querySelector('.fetchDocsHere');
            place.innerHTML = template;
            break;
        // status "Not Found"
        case 404:
            console.log('Not Found');
            break;
    }
}

function divAdderForList(match, p1, p2, p3, p4, offset, string) {
  return p1 + p2 + p3 + '<div>' + p4;
}

function divAdderForCodeTable(match, p1, p2, p3, p4, p5, offset, string) {
  return p1 + 'fetchDocsCodeTable ' + p2 + '<div>' + p3 + p4 + '</div>' + p5;
}

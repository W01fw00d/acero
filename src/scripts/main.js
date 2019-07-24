function init() {
  // const api = new FakeAPI();
  // const template = new PhraseTemplate();
  //
  // api.getFullSet().then(words => {
  //   paintOnHtml([
  //     template.randomStructure(words),
  //     // template.basicAction(words),
  //     // template.basicActionOnNoun(words),
  //   ]);
  // });
}

function foo1(argument) {
  let htmlToInsert = '';

  argument.forEach((text) => {
    htmlToInsert += this.insertIntoDiv(text);
  })

  document.getElementById("text").innerHTML = htmlToInsert;
}

function foo2(argument) {
  return `<div class="phrase">
    <span class="">${argument}</span>
    <span class="">${argument}</span>
  </div>`;
}

window.onload = init;

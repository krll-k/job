
Feature('Office');

Scenario('Получаем список адресов', function*(I) {
  I.amOnPage('https://domru.ru/service/contact');
  I.wait(4);
  I.click('.card-city__title.js-open-citieslist');
  let list = yield I.executeScript(function() {
    var a = [];document.querySelectorAll('.cities__city-elem').forEach(function(el){
      a.push({
        city:el.innerText,
        site:el.dataset.href
      })
    });
    return a;
  });
  list.forEach(function(item){
//  })
    Scenario(item.city, function*(I) {
      I.amOnPage('https:'+item.site);
      let list = yield I.executeScript(function() {
        var url = [], els = document.querySelector('.adress').querySelectorAll('.adress__item');
        Array.prototype.forEach.call(els, function(el){
          url.push({
            "name":el.dataset.markHeader,
            "streetAddress":el.dataset.markStreet,
            "workingHours":el.querySelectorAll('.adress__fullinfo span:last-child')[1].innerText
          })
        });
      })
      console.log(list);
    })
//    ??
  })                                   
                                   
                                   
})
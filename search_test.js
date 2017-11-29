
Feature('Search');

var logins = require('./logins.json');
var cities = require('./cities.json');

var randomLogin = logins[Math.floor(Math.random() * logins.length-1)];

Before((I) => {
  I.amOnPage('https://passport.yandex.ru/auth');
  I.wait(4);
  I.fillField('input[name="login"]',randomLogin);
  I.fillField('input[name="passwd"]',randomLogin+'+1');
  I.click('Войти');
});

//  {city:"Волгоград", value:600},
//  {city:"Екатеринбург", value:600},
//  {city:"Казань", value:600},
cities = [
  {city:"Нижний Новгород", value:600},
  {city:"Ростов-на-Дону", value:600}
];

cities.forEach(function(item){
  Scenario(item.city, function*(I) {
    I.amOnPage('http://yandex.ru/');
    I.fillField('.home-arrow__search .input__control.input__input', "дом ру " + item.city);
    I.click('.search2__button button');
    I.wait(2);
    var link = yield I.executeScript(function() {
      return document.querySelector('.object-footer a:last-child').href
    });
    I.amOnPage(link);
    I.executeScript(function(){document.querySelector('.sidebar-panel-header-back-view__label').click()});
    I.wait(4);
    let list = yield I.executeScript(function() {
      var url = [], els = document.getElementsByClassName('search-business-snippet-view__title');
      Array.prototype.forEach.call(els, function(el){url.push(el.href);});
      return url;
    });
    list.forEach(function(str){
      if(str.match(/\/dom_ru(?:|_interzet)\/(\d+)/g)!==null) {
        I.amOnPage('https://yandex.ru/maps/?ol=biz&feedback=edit-organization&oid='+str.match(/\/dom_ru(?:|_interzet)\/(\d+)/)[1]);
        I.wait(3);
        I.click('.toggle-button_white-medium__text');
        I.click('.menu-item__text');
        I.executeScript(function() {
          while(document.querySelectorAll('.feedback-business-card-view__phone .input_medium__clear._visible').length != 0) {
            document.querySelectorAll('.feedback-business-card-view__phone .input_medium__clear._visible')[0].click()
          }
          while(document.querySelectorAll('.feedback-business-card-view__urls .input_medium__clear._visible').length != 0) {
            document.querySelectorAll('.feedback-business-card-view__urls .input_medium__clear._visible')[0].click()
          }
        });
        I.fillField('.feedback-business-card-phones-view .input_medium__control', '+7 (929) 720-17-68');
        I.click('Добавить');
        I.fillField('.feedback-business-card-urls-view .input_medium__control', 'https://www.facebook.com/domru.ru/');
        I.click('Добавить');
        I.fillField('.feedback-business-card-urls-view .input_medium__control', 'https://vk.com/domru_ru');
        I.click('Добавить');
        I.fillField('.feedback-business-card-urls-view .input_medium__control', 'https://twitter.com/domru_/');
        I.click('Добавить');
        I.fillField('.feedback-business-card-urls-view .input_medium__control', 'https://ok.ru/domru.ru');
        I.click('Добавить');
        I.fillField('.feedback-business-card-urls-view .input_medium__control', item.site);
        I.click('Добавить');
        I.click('Отправить');
      };
    });
  });
})

//var clearPhones = document.querySelectorAll('.feedback-business-card-view__phone .input_medium__clear._visible')

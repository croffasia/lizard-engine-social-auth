![Lizard Engine](http://i.imgur.com/mhamGKF.png)
===================================
## [LizardEngine](https://github.com/PoluosmakAndrew/lizard-engine) / Авторизация через социальные сети

Плагин [LizardEngine](https://github.com/PoluosmakAndrew/lizard-engine) для авторизации через социальные сети.
В Плагине реализована авторизация через Facebook, Vk, Github. Остальные провайдеры вы можете добавить самостоятельно.

Полный список поддерживаемых сетей и инструкции по применению стратегий авторизации на странице модуля [Passport](http://passportjs.org/guide/providers/).
На данный момент поддерживается 119 сетей.

## Установка

### Установка в ручную

* Скачайте ZIP файл с плагином или клонируйте репозиторий
* Распакуйте ZIP файл (если скачивали плагин архивом)
* Перенесите содержимое директории install в корневой каталог вашего приложения

Данный плагин работает с LizardEngine не ниже v.0.2.1

Если вы не интегрировали middleware решения в ваш проект, вам нужно это зделать для работы плагина:

PROJECT_ROOT/index.js:

```javascript
var lizard = require('lizard-engine'),
      middleware = require('./middleware'); // Подключаем middleware модуль

  lizard.on(lizard.EVENT_COMPLETE_CONFIGURE, function(){
      lizard.start();
  });

  lizard.init({
    'name': 'YOUR_PROJECT_NAME'
    ,'main controller': 'YOU_CONTROLLER_NAME'
    ,'port': 80 // установлен 80 порт для доступа к сайту по адресу прописанному в host (понадобится для тестирования)
    ,'application configure': middleware // указываем middleware прослойку
  });
```

PROJECT_ROOT/middleware.js

```javascript
var lizard = require('lizard-engine');

module.exports = function(expressApplication, next){

    lizard.Plugins.Run(this, 'middleware', expressApplication); // запускаем системный плагин для поиска middleware плагинов
    next();

};
```

Установите необходимые для работы плагина NPM пакеты:

```bash
npm install passport --save

npm install passport-facebook --save

npm install passport-vkontakte --save

npm install passport-github --save
```

**Готово!** Поздравляем, плагин успешно установлен. Настройте информацию о приложениях в auth.json

### Автоматическая установка

Для этого у вас должен быть установлен [генератор LizardEngine](https://github.com/PoluosmakAndrew/generator-lizard-engine) от [Yeoman](http://yeoman.io/)

```bash
npm install -g generator-lizard-engine
```

В консоле перейдите в корневую директорию вашего приложения и выполните команду:
```bash
yo lizard-engine:install
```

Инсталятор предложит вам ввести URL на дополнение, вводите:

> https://github.com/PoluosmakAndrew/lizard-engine-social-auth.git

Готово. Все дополнительные npm пакеты будут установлены автоматически.
Если у вас не интегрированы middleware решения - выполните согласно инструкции выше.

## Настройка плагина

**user_access_plugin**
> В данном парамере указывается плагин, который обрабатывает данные пользователя после авторизации через любую сеть. В комплекте уже подключен плагин findOrCreate.js, в который вы можете добавить свой функционал по сохранению и нахождению пользователя в базе данных или дополнительных операций по авторизации.

**base_url**
> Базовый URL вашего проекта, без слеша в конце строки.

**auth_url**
> Относительный URL начальной точки авторизации через социальную сеть, где строка {provider} будет заменена на имя провайдера.

**callback_url**
> Относительный URL точки возврата после авторизации, где строка {provider} будет заменена на имя провайдера.

**logout_url**
> Относительный logout URL

**provides**
> Список доступных провайдеров для авторизации. Ключ - имя провайдера, свойства для каждого провайдера: enable - включен/выкючен провайдер; остальные параметры в зависимости от потребности стратегии авторизации, в них хранится как правило ID приложения в социальной сети, ключ авторизации приложения и т.п.

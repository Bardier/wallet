<h1>Приложение "Кошелек" для записи своих финансов и карточек.</h1>

Работу приложения можно глянуть тут: <a href="https://bardier-wallet.herokuapp.com/">bardier-wallet.herokuapp.com</a>

<h3>Установка и запуск:</h3>
<ul>
	<li>скачать ветку master</li>
	<li>установить зависимости <code>npm i</code></li>
	<li>запустить проект <code>npm start</code></li>
	<li>продакшн билд <code>npm run build</code></li>
</ul>

<h3>Используемые технологии:</h3>
<ul>
	<li><b>React</b> на стандартной сборке <code>create-react-app</code></li>
	<li><b>Redux</b> + <b>@reduxjs/toolkit</b></li>
	<li><b>Scss</b></li>
	<li><b>API</b> <a href="https://binlist.net/">binlist.net</a></li>
</ul>

<h3>Реализованный функционал:</h3>
<ul>
	<li>Выбор валют</li>
	<li>Добавление и редактирование наличного баланса</li>
	<li>Добавление, удаление, редактирование карт</li>
	<li>API запрос и получение дополнительных данных для верстки карточек</li>
	<li>Изображения для типов платежей в картах</li>
	<li>Спрятаный по умолчанию номер карты 1234 **** **** 7890 при клике отображается, при повторном прячется</li>
	<li>Копирование номера карты в буфер обмена</li>
	<li>Подсчет и вывод по разным валютам общего баланса</li>
	<li>Валидация inputov, кроме даты</li>
	<li>Все данные крутяться в файле storeSlice.js</li>
	
</ul>

<h3>need ToDo:</h3>
<ul>
	<li>Мобильная версия</li>
	<li>Валидация для input date</li>
	<li>Сделать красивые маски для inputov при создании новой карты</li>
	<li>Сделать простой вариант расширения списка валют, пока есть такая возможность только через файл storeSlice.js</li>
	<li>Добавить общий обьект данных в localStorage и при повторном заходе в приложение получать из него данные</li>
</ul>

<h3>Проблемы, ошибки:</h3>
<ul>
	<li>По API не получает название банков, поставил заглушку Unknown Bank через try/catch</li>
</ul>

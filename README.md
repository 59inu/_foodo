# Foodo-server

## concept

A simple web-app tool to manage misterious stock of your refregiraor!

## Skill Stack

React</br>
React-strap</br>
</br>
..
</br>
Sequelize</br>
Mysql</br>
Express</br>
Jwt

## Usase

```
npm install
```

If error about chart

```
npm install chart.js
```

## API
GET  / users </br>
; datas of all users </br>
request : [{'email', 'userName', 'createdAt'},...]</br></br>

GET  / users/:id</br>
; a data for one user specified by userid in database</br>
request : {'email', 'userName', 'createdAt'}</br></br>

GET  / users/signout</br>
request : 'ok'</br></br>

POST / users/signin</br>
request : {'email', 'password'}</br>
response : 'ok'</br></br>

POST / users/signup</br>
request : {'email', 'password', 'userName'}</br>
response : 'ok'</br></br>

GET  / ingredients/all</br>
; datas of all ingredients</br>
response : [{'id', 'ing_name', 'category'},...]</br></br>

GET  / ingredients  </br>
; ingredients stock datas for logged in user</br>
response : [{'id', 'name', 'put', 'rest', 'msg', 'userMemo','frozen','quantity','unit','entryQ'} ...]</br></br>

POST / ingredients/additem</br>
; add ingredients to a user's stock</br>
request : { 'ing_name', 'exp', 'quantity', 'userMemo', 'frozen', 'unit','quantity'}</br>
response : 'ok'</br></br>

POST / ingredients/quantity</br>
; modify quantity of ingredients</br>
request : {'ing_name', 'put', 'quantity'}</br>
response : 'ok'</br></br>

POST / ingredients/delete</br>
; delete quantity of ingredients</br>
request : {'ing_name', 'put'}</br>
response : 'ok'</br></br>

GET  / menus/all</br>
; all menu</br>
response : {['id', 'menu_name' ,'menu_ing'],...}</br></br>

GET  / menus</br>
; recomend menu for a user</br>
response : {'menu_name', 'menu_ing'}</br></br>






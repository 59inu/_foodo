# Foodo-server

## concept

A simple web-app tool to manage misterious stock of your refregiraor!

## Skill Stack

React
React-strap

- - -

Sequelize
Mysql
Express
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
GET  / users</br>
; datas of all users
request : [{'email', 'userName', 'createdAt'},...]

GET  / users/:id
; a data for one user specified by userid in database
request : {'email', 'userName', 'createdAt'}

GET  / users/signout
request : 'ok'

POST / users/signin
request : {'email', 'password'}
response : 'ok'

POST / users/signup
request : {'email', 'password', 'userName'}
response : 'ok'

GET  / ingredients/all
; datas of all ingredients
response : [{'id', 'ing_name', 'category'},...]

GET  / ingredients  
; ingredients stock datas for logged in user
response : [{'id', 'name', 'put', 'rest', 'msg', 'userMemo','frozen','quantity','unit','entryQ'} ...]

POST / ingredients/additem
; add ingredients to a user's stock
request : { 'ing_name', 'exp', 'quantity', 'userMemo', 'frozen', 'unit','quantity'}
response : 'ok'

POST / ingredients/quantity
; modify quantity of ingredients
request : {'ing_name', 'put', 'quantity'}
response : 'ok'

POST / ingredients/delete
; delete quantity of ingredients
request : {'ing_name', 'put'}
response : 'ok'

GET  / menus/all
; all menu
response : {['id', 'menu_name' ,'menu_ing'],...}

GET  / menus
; recomend menu for a user
response : {'menu_name', 'menu_ing'}






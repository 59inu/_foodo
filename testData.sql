-- 아래 1과 2 둘 중 한 가지 선택.
-- 1. mysql 접속, foodo db 선택(use foodo) 후,
-- source ./testData.sql;
-- 2. 프로젝트 루트 폴더 터미널에서,
-- mysql -u root -p foodo < ./testData.sql

INSERT INTO USERS (email, password, userName, createdAt, updatedAt) 
VALUES ('111@test.com','12341234','test01', '2019-11-03', '2019-11-03'),
 ('222@test.com','12341234','test02', '2019-11-03', '2019-11-03'),
 ('333@test.com','12341234','test03', '2019-11-03', '2019-11-03');
INSERT INTO INGREDIENTS (ing_name, category, main, createdAt, updatedAt) 
VALUES ('ing01','category01',true, '2019-11-03', '2019-11-03'), 
('ing02','category02',false, '2019-11-03', '2019-11-03'), 
('ing03','category03',false, '2019-11-03', '2019-11-03');
INSERT INTO MENUS (menu_name, menu_ing, createdAt, updatedAt, ingredientId) 
VALUES ('menu01', 'ing_0101', '2019-11-03', '2019-11-03',1),('menu02','ing_0201,ing_0202,ing_0203', '2019-11-03', '2019-11-03', 2),
('menu03','ing_0301', '2019-11-03', '2019-11-03',3);
INSERT INTO USER_INGS (exp, quantity, memo, frozen, unit, userId, ingredientId, createdAt, updatedAt) 
VALUES ('2019-11-20', 2, "memo", true, 'g', 1, 3, '2019-11-03', '2019-11-03'),
('2019-11-10', 5, "memo", false, 'pcs', 2, 1, '2019-11-03', '2019-11-03'),
('2019-11-01', 10, "memo", true, 'pcs', 3, 2, '2019-11-03', '2019-11-03');



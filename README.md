# UserInterface
User Interface made using **brandi**

### Mysql Stored Procedure

```mysql
delimiter //

CREATE PROCEDURE insertNewMember
(IN name varchar(20), IN join_date date, IN age int, IN phone_no varchar(10), IN email_id varchar(20), IN position varchar(20), IN dname varchar(20))
BEGIN
  IF NOT EXISTS (Select * FROM Members WHERE email_id=email and phone=phone_no) THEN
    INSERT INTO Members VALUES(name, join_date, age, phone_no, email_id, position);
  END IF;
  IF NOT EXISTS (Select * FROM Department d WHERE d.dname=dname) THEN
    INSERT INTO Department VALUES(dname, mgrssn);
  END IF;
END//

CREATE PROCEDURE newEvent (IN location varchar(20), IN budget decimal(10,0), IN ename varchar(20), IN supssn varchar(20), IN reciept_no int, IN date_time datetime)
BEGIN
  IF NOT EXITS (SELECT * FROM Events e WHERE e.ename = ename and e.date_time=date_time) THEN
    INSERT INTO Events VALUES (location, budget, ename, supssn, reciept_no, date_time);
  END IF;
END//

delimiter ;

```

- Use node query to get the supssn for a new event

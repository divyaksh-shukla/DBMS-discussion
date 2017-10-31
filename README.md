# UserInterface
User Interface made using **brandi**

### Mysql Stored Procedure

```mysql
delimiter //

DROP PROCEDURE IF EXISTS insertNewMember//
CREATE PROCEDURE insertNewMember
(IN name varchar(20), IN join_date date, IN age int, IN phone_no varchar(10), IN email_id varchar(20), IN position varchar(20), IN dname varchar(20))
BEGIN
  IF NOT EXISTS (Select * FROM Members WHERE email_id=email and phone=phone_no) THEN
    INSERT INTO Members (mname, joining_date, age, phone, email, position) VALUES(name, join_date, age, phone_no, email_id, position);
  END IF;
  IF NOT EXISTS (Select * FROM Department d WHERE d.dname=dname) THEN
    INSERT INTO Department(dname) VALUES(dname);
  END IF;
END//

delimiter ;
delimiter //

CREATE PROCEDURE newEvent (IN location varchar(20), IN budget decimal(10,0), IN ename varchar(20), IN supssn varchar(20), IN reciept_no int, IN date_time datetime)
BEGIN
  IF NOT EXITS (SELECT * FROM Events e WHERE e.ename = ename and e.date_time=date_time) THEN
    INSERT INTO Events VALUES (location, budget, ename, supssn, reciept_no, date_time);
  END IF;
END//

delimiter ;

```

- Use node query to get the supssn for a new event

### Issues
- getting data from query and populating a drop down list (Could be done using angularjs _But I don't want to use it_) **Solved by looping through JSON data in ejs. _Search by typing: Loop through JSON data in ejs_**
- remove foreign_key of receipt no in Events. and add foreign key of eid in donations (Update in Schema also)
- If while removing member, all members of a dept are removed then remove the department **trigger**
- Show small snippets of the tables using ajax
- **View** Members on particular Events

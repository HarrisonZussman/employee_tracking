use empolyee_tracker_db;

INSERT INTO department (name)
VALUES (cook),
        (booker);

INSERT INTO roles (title, salary, department_id)
VALUES  (cheif, 50000, 1),
        (reader, 30000, 2); 

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  (bill, bob, 1, 2)
        (harrison, zussman, 2, null)
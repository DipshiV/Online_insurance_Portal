db_name:OIP

| Tables_in_oip    |
+------------------+
| applied_policies |
| contact_messages |
| policies         |
| users            |
+------------------+

desc users;
+------------+----------------------+------+-----+-------------------+-------------------+
| Field      | Type                 | Null | Key | Default           | Extra             |
+------------+----------------------+------+-----+-------------------+-------------------+
| id         | int                  | NO   | PRI | NULL              | auto_increment    |
| fullName   | varchar(100)         | NO   |     | NULL              |                   |
| email      | varchar(100)         | NO   | UNI | NULL              |                   |
| password   | varchar(255)         | NO   |     | NULL              |                   |
| role       | enum('admin','user') | NO   |     | user              |                   |
| created_at | timestamp            | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+----------------------+------+-----+-------------------+-------------------+

mysql> desc contact_messages;
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| name       | varchar(100) | YES  |     | NULL              |                   |
| email      | varchar(100) | YES  |     | NULL              |                   |
| subject    | varchar(200) | YES  |     | NULL              |                   |
| message    | text         | YES  |     | NULL              |                   |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+

+-----------------+---------------+------+-----+-------------------+-------------------+
| Field           | Type          | Null | Key | Default           | Extra             |
+-----------------+---------------+------+-----+-------------------+-------------------+
| id              | int           | NO   | PRI | NULL              | auto_increment    |
| policy_name     | varchar(100)  | NO   |     | NULL              |                   |
| description     | text          | YES  |     | NULL              |                   |
| coverage_amount | decimal(15,2) | NO   |     | NULL              |                   |
| premium_amount  | decimal(15,2) | NO   |     | NULL              |                   |
| created_at      | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------------+---------------+------+-----+-------------------+-------------------+


CREATE TABLE policies (
    ->   id INT AUTO_INCREMENT PRIMARY KEY,
    ->   policy_name VARCHAR(100) NOT NULL,
    ->   description TEXT,
    ->   coverage_amount DECIMAL(15,2) NOT NULL,
    ->   premium_amount DECIMAL(15,2) NOT NULL,
    ->   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );

CREATE TABLE applied_policies (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     user_id INT NOT NULL,
    ->     policy_id INT NOT NULL,
    ->     applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ->     FOREIGN KEY (user_id) REFERENCES users(id),
    ->     FOREIGN KEY (policy_id) REFERENCES policies(id)
    -> );

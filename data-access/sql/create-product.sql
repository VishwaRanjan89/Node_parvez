INSERT INTO 
    `products`.`user` (
        `user_id`,
        `username`,
        `firstname`,
        `lastname`,
        `age`,
        `email`,
        `dtm`) 
    VALUES (
        :user_id,
        :username,
        :firstname,
        :lastname,
        :age,
        :email,
        :dtm);
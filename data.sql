DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS posts;


CREATE TABLE user_info
(
	uid int NOT NULL,
	name VARCHAR(64) NOT NULL,
	id VARCHAR(20) NOT NULL,
	uuid char(40) NOT NULL,
	profile_created DATE DEFAULT (DATETIME('now','localtime')),
	server VARCHAR(128) NOT NULL,
	news TEXT DEFAULT '',
	status TEXT NOT NULL DEFAULT '',
	profile_pic varchar(128) NOT NULL DEFAULT '/img/profile.jpg'
);
INSERT INTO user_info (uid, uuid, name, id, server, status) VALUES (0, '','GUBxhEHhQo', 'GUBxhEHhQo', '23.23.188.2', 'Carpe Diem!');

CREATE TABLE posts
(
	pid CHAR(40) NOT NULL,
	name VARCHAR(64) NOT NULL,
	id VARCHAR(20) NOT NULL,
	post TEXT NOT NULL DEFAULT '',
	time VARCHAR(20) NOT NULL,
	comments TEXT DEFAULT '',
	PRIMARY KEY (pid)
);
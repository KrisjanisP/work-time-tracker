CREATE TABLE workplaces (
    w_name TEXT PRIMARY KEY
);

CREATE TABLE entries (
    e_id INTEGER PRIMARY KEY,
    e_desc TEXT NOT NULL,
    e_time INTEGER NOT NULL, /* in milliseconds */
    e_start INTEGER NOT NULL, /* unix timestamp */
    e_work TEXT NOT NULL,
    FOREIGN KEY(e_work) REFERENCES workplaces(w_name)
);

INSERT INTO workplaces(w_name) VALUES
("MII"),
("MD"),
("PPS"),
("Other");
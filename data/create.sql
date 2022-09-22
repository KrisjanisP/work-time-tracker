CREATE TABLE workplaces (
    w_id INTEGER PRIMARY KEY,
    w_name TEXT NOT NULL
);

CREATE TABLE task (
    t_id INTEGER PRIMARY KEY,
    t_desc TEXT NOT NULL,
    t_elapsed INTEGER NOT NULL, /* in milliseconds */
    t_work_id INTEGER,
    FOREIGN KEY(t_work_id) REFERENCES workplaces(w_id)
);

INSERT INTO workplaces(w_id,w_name) VALUES
(1, "LU MII"),
(2, "LU MD"),
(3, "PPS"),
(4, "Other");
package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

const addr string = ":3000"
const dbFile string = "./data/data.db"

var db *sql.DB

type Task struct {
	t_id      int
	t_desc    string
	t_elapsed int64 // in milliseconds'
	t_work_id int
}

func InsertTask(db *sql.DB, task Task) (int, error) {
	res, err := db.Exec("INSERT INTO tasks VALUES(NULL,?,?,?);",
		task.t_desc, task.t_elapsed, task.t_work_id)

	if err != nil {
		return 0, err
	}

	var id int64
	if id, err = res.LastInsertId(); err != nil {
		return 0, err
	}

	return int(id), nil
}

func main() {

	var err error
	db, err = sql.Open("sqlite3", dbFile)
	handleFatalErr(err)

	id, err := InsertTask(db, Task{0, "123", 123, 1})
	fmt.Println(id)
	handleFatalErr(err)

	http.Handle("/", http.FileServer(http.Dir("./static")))
	err = http.ListenAndServe(addr, nil)
	handleFatalErr(err)
}

func handleFatalErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

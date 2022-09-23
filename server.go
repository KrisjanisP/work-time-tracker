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

type Entry struct {
	desc  string
	time  int
	start int
	work  string
}

func InsertTask(db *sql.DB, entry Entry) (int, error) {
	res, err := db.Exec("INSERT INTO entries VALUES(NULL,?,?,?,?);",
		entry.desc, entry.time, entry.start, entry.work)

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

	id, err := InsertTask(db, Entry{"123", 123123, 1234121231, "PPS"})
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

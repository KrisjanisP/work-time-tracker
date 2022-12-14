package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"text/template"

	"github.com/KrisjanisP/work-time-tracker/database"
)

const addr string = ":3000"
const dbPath string = "./database/data.db"

func main() {
	var err error
	err = database.Open(dbPath)
	if err != nil {
		log.Fatalln(err)
	}

	http.HandleFunc("/", serveIndex)
	http.HandleFunc("/submit", handleSubmit)

	log.Printf("Listening on %s", addr)
	err = http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalln(err)
	}
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFS(os.DirFS("./templates"), "*")

	if err != nil {
		// log the detailed error
		log.Println(err.Error())
		// return a generic "Internal Server Error" message
		http.Error(w, http.StatusText(500), 500)
		return
	}

	type Data struct {
		Results []database.Entry
	}
	data := Data{}
	database.DB.Find(&data.Results)
	err = tmpl.ExecuteTemplate(w, "layout", data)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}

func handleSubmit(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	log.Println(r.Form)

	seconds, err := strconv.Atoi(r.Form.Get("seconds"))
	started, err := strconv.Atoi(r.Form.Get("started"))
	if err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(500), 500)
		return
	}
	description := r.Form.Get("description")
	work := r.Form.Get("work")

	database.DB.Create(
		&database.Entry{
			Description: description,
			Seconds:     seconds,
			Started:     started,
			Work:        work,
		})
	http.Redirect(w, r, "/", http.StatusFound)
}

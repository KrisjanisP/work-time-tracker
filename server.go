package main

import (
	"log"
	"net/http"
)

const addr = ":3000"

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatalln(err)
	}
}

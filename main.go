package main

import (
	"html/template"
	"log"
	"net/http"
	"strings"
)

type myHandler struct {
}

func (c *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)
	if strings.HasPrefix(r.URL.Path, "/build") {
		http.StripPrefix("/build", http.FileServer(http.Dir("./build"))).ServeHTTP(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/docs") {
		http.StripPrefix("/docs", http.FileServer(http.Dir("./docs"))).ServeHTTP(w, r)
	} else {
		t, err := template.ParseFiles("./build/index.html")
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			t.Execute(w, nil)
		}
	}
}

func main() {
	http.ListenAndServe(":80", &myHandler{})
}

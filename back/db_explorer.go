package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type DBHandler struct {
	DB *sql.DB //db connection
}

func NewDBHandler(db *sql.DB) DBHandler {
	return DBHandler{DB: db}
}

type Task struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsDone      bool   `json:"is_done"`
}

func (db *DBHandler) ShowAllTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	tasks := make([]Task, 0)

	rows, err := db.DB.Query("SELECT * FROM tasks")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	task := Task{}

	for rows.Next() {
		err = rows.Scan(&task.Id, &task.Name, &task.Description, &task.IsDone)
		tasks = append(tasks, task)
	}

	body, err := json.Marshal(tasks)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	out := bytes.Buffer{}

	out.Write(body)

	_, err = w.Write(out.Bytes())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (db *DBHandler) ShowTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]

	rows := db.DB.QueryRow("SELECT * FROM tasks WHERE id = ?", id)

	task := Task{}

	err := rows.Scan(&task.Id, &task.Name, &task.Description, &task.IsDone)

	body, _ := json.Marshal(task)

	out := bytes.Buffer{}

	out.Write(body)

	_, err = w.Write(out.Bytes())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/api/tasks/", 200)
}

func (db *DBHandler) PutNewTask(w http.ResponseWriter, r *http.Request) {
	task := Task{}

	json.NewDecoder(r.Body).Decode(&task)

	_, err := db.DB.Exec("INSERT INTO tasks (`name`, `description`, `is_done`) VALUES (?, ?, ?)", task.Name, task.Description, task.IsDone)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/api/tasks/", 201)
	return
}

func (db *DBHandler) EditTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	task := Task{}

	json.NewDecoder(r.Body).Decode(&task)

	_, err := db.DB.Exec(
		"UPDATE tasks SET `name` = ?, `description` = ?, `is_done` = ? WHERE id = ?",
		task.Name,
		task.Description,
		task.IsDone,
		id,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/api/tasks/", 200)
	return
}

func (db *DBHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	_, err := db.DB.Exec("DELETE FROM tasks WHERE id = ?", id)

	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	http.Redirect(w, r, "/api/tasks/", http.StatusNoContent)
}

func NewDbExplorer(db *sql.DB) (http.Handler, error) {

	dbh := NewDBHandler(db)

	r := mux.NewRouter()
	r.HandleFunc("/api/tasks/", dbh.ShowAllTasks).Methods("GET")
	r.HandleFunc("/api/tasks/", dbh.PutNewTask).Methods("POST")
	r.HandleFunc("/api/tasks/{id}/", dbh.ShowTask).Methods("GET")
	r.HandleFunc("/api/tasks/{id}/", dbh.EditTask).Methods("PUT")
	r.HandleFunc("/api/tasks/{id}/", dbh.DeleteTask).Methods("DELETE")

	return http.Handler(r), nil
}

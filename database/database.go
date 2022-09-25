package database

import (
	_ "github.com/mattn/go-sqlite3"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Entry struct {
	ID          uint `gorm:"primarykey"`
	CreatedAt   int
	UpdatedAt   int
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Description string
	Seconds     int
	Started     int
	Work        string
}

var DB *gorm.DB

func Open(dbPath string) (err error) {
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		return err
	}

	err = DB.AutoMigrate(&Entry{})
	if err != nil {
		return err
	}

	return err
}

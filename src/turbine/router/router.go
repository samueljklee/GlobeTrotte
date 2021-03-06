package router

import (
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	"github.com/gorilla/mux"
)

type route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type routes []route

const API_PREFIX = "/api"

// NewRouter - Just an average router that create routes.
func NewRouter() http.Handler {
	router := mux.NewRouter()
	for _, actualRoute := range actualRoutes {
		router.
			Methods(actualRoute.Method).
			Path(API_PREFIX + actualRoute.Pattern).
			Name(actualRoute.Name).
			Handler(actualRoute.HandlerFunc)
	}
	router.
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("plz-out/gen/dist")))

	if flags.ProdServer() {
		router.Use(limit)
	}

	return router
}

var actualRoutes = routes{
	route{
		"Passwd",
		"GET",
		"/passwd",
		passwd,
	},
	route{
		"RateLimitStatus",
		"GET",
		"/ratelimit",
		getAPIRateLimitStatus,
	},
	route{
		"AddUser",
		"POST",
		"/user",
		newUser,
	},
	route{
		"GetUser",
		"GET",
		"/user/{id}",
		getUser,
	},
	route{
		"UpdateUser",
		"POST",
		"/user/{id}",
		updateUser,
	},
	route{
		"DeleteUser",
		"POST",
		"/del/user/{id}",
		deleteUser,
	},
	route{
		"Login",
		"POST",
		"/login",
		login,
	},
	route{
		"Logout",
		"GET",
		"/logout",
		logout,
	},
	route{
		"AddTrip",
		"POST",
		"/trip",
		addTrip,
	},
	route{
		"UpdateTrip",
		"POST",
		"/trip/{id}",
		updateTrip,
	},
	route{
		"GetTrip",
		"GET",
		"/trip/{id}",
		getTrip,
	},
	route{
		"DeleteTrip",
		"POST",
		"/del/trip/{id}",
		deleteTrip,
	},
	route{
		"WhoAmI",
		"GET",
		"/whoami",
		whoami,
	},
	route{
		"GetRecentTrips",
		"GET",
		"/sample_trips",
		getRecentTrips,
	},
	route{
		"ConfirmEmail",
		"POST",
		"/confirm/email",
		confirmEmail,
	},
	// PROD: Used for testing only. To remove on prod.
	route{
		"ForceConfirmEmail",
		"GET",
		"/force_confirm_email/{id}",
		forceConfirmEmail,
	},
}

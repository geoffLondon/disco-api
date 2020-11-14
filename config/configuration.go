package config

import (
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"os"
)

type Configuration struct {
	DemoConfig DemoConfig
}

type DemoConfig struct{}

var asciiViper = "\r\n               oo\r\n" + `. . . __/\_/\_/` + "`'\r\n"

func NewConfig() Configuration {
	log.Info("Initializing config and lambda shared resources")
	viperInstance := viper.New()

	var configuration Configuration

	errorViperUnmarshalling := viperInstance.Unmarshal(&configuration)
	if errorViperUnmarshalling != nil {
		log.Fatalf("[Configuration] Unable to decode into struct, %v", errorViperUnmarshalling)
	}

	log.Info("Configuration initialised")
	return configuration
}

func getOrDefault(envVar string, defaultValue string) string {
	valFromEnv := os.Getenv(envVar)
	if valFromEnv == "" {
		log.WithField("envVar", envVar).Info("could not find value for envVar, defaulting")
		return defaultValue
	}
	return valFromEnv
}

DATA_DIR=data
BUILD_DIR=build

COUNTRIES=http://download.geonames.org/export/dump/countryInfo.txt
CITIES=http://download.geonames.org/export/dump/cities15000.zip

all: dirs download install

dirs:
	mkdir -p $(DATA_DIR)
	mkdir -p $(BUILD_DIR)

download:
	curl -o $(DATA_DIR)/countryInfo.txt $(COUNTRIES)
	curl -o $(DATA_DIR)/cities15000.zip $(CITIES)
	unzip $(DATA_DIR)/cities15000.zip -d $(DATA_DIR)

install:
	npm i

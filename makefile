#Runs a development server
dev_server: backend/appserver.py
	python backend/appserver.py

# From GeoJobs (F22): docker for frontend on local 3001 port
frontend-docker:
	docker run --rm -i -t -p 3001:3000 -v $(PWD):/usr/front-end-docker -w /usr/front-end-docker zaunitekoopa/selenium-chrome

#Creates venv if it doesn't exist, opens virtual env,
#and installs requirements if not already
backend_venv: 
	python3.10 -m venv backend/venv
	bash backend/venv/bin/activate
	python3.10 -m pip install -r backend/requirements.txt

scraping_venv:
	python3.10 -m venv scraping/venv
	bash scraping/venv/bin/activate
	python3.10 -m pip install -r scraping/requirements.txt

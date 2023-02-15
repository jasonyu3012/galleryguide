#Runs a development server
dev_server: backend/appserver.py
	python backend/appserver.py

#Creates venv if it doesn't exist, opens virtual env,
#and installs requirements if not already
backend_venv: 
	python3 -m venv backend/venv
	. backend/venv/bin/activate
	pip install -r backend/requirements.txt
	
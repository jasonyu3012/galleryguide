#Runs a development server
dev_server: backend/appserver.py
	python backend/appserver.py

backend_venv:
	python3 -m venv venv
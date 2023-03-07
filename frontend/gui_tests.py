# From GeoJobs Fall 2022
import os
from sys import platform

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./frontend/testing/chromedriver.exe"
    elif platform == "linux":
        PATH = "./frontend/testing/chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)

    # Run all of the GUI tests
    os.system("python3 ./frontend/testing/splashpage_tests.py")
    os.system("python3 ./frontend/testing/navigation_tests.py")
    os.system("python3 ./frontend/testing/instance_tests.py")

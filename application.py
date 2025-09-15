# This is the WSGI entry point for Elastic Beanstalk
from app import app as application

if __name__ == "__main__":
    application.run()

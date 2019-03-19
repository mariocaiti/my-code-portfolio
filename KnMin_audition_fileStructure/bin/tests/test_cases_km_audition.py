# KonMin_audition/flask_app/bin/tests/test_cases_km_audition.py
import pytest
import urllib2
from flask import Flask

from flask_testing import TestCase

from flask_mail import Mail, Message

##	below are typical test case scenarios

class MyTests(TestCase):
    def test_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        mail = Mail(app)

	@app.route("/")
	def test_mail():
		msg = Message("Hello from Flask!", sender=("Me at flask", "marioat@juno.com"), recipients=["mario.caiti@gmail.com"])
		mail.send(msg)

	if __name__ == '__main__':
		app.run()
    
# 	def some_json():
# 		return jsonify(success=True)
# 
#     def test_some_json(self):
#     	response = self.client.get("/")
#         self.assertEquals(response.json, dict(success=True))
        	
# class SanityTest(object):
#     def __init__(self, val):
#         self.val = val
# 
#     def __eq__(self, other):
#         return self.val == other.val
# 
# def test_compare():
#     f1 = Foo(2)
#     f2 = Foo(3)
#     assert f1 == f2
	
    ## How to run with terminal, starting from 'flask_app' root directory:
	#     source bin/activate							<- starts the virtual environment
	#		cd bin/tests
	##	pip3 install pytest								<-if pytest is not present, you install it in the current virtual environment with pip3
	#		python3 -m unittest test_cases_km_audition	OR															#	
	#		python -m pytest -v							<- run the tests as you make them							##
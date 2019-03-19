from flask import (Flask, g, 
	jsonify, request, redirect, url_for, 								#session
	render_template, flash
	)
from flask_jwt_extended import (
    JWTManager, 																#jwt_required	jwt_refresh_token_required
    create_access_token, create_refresh_token				#,get_jwt_identity
	)
from werkzeug.security import (
	generate_password_hash, check_password_hash, safe_str_cmp
	)
from flask_wtf import FlaskForm
from wtforms import Form, StringField, PasswordField, validators
from flask_httpauth import HTTPTokenAuth
from flask_mail import Mail, Message
import re, os

	##	DEFINE USER	##
class User(object):
    def __init__(self, username, password, eMail, phone):
        self.username = username
        self.password = generate_password_hash(password)		## sha256 for now, needs salt?
        self.eMail = eMail
        self.phone = phone

    def __str__(self):
        return "User(id='%s')" % self.id

	## END Define User, START FORM definitons	##
	
class RegistrationForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    phone = StringField('Phone #', [validators.Length(min=10, max=11)])		# do we need the 1 at the beginning? foreign ph nums?
    
class LoginForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=25)])
    password = PasswordField('Password', [validators.DataRequired()])

class RetrievalForm(Form):
    username = StringField('Username')
    eMail = StringField('eMail')			# users need to select at least one of these!
    phone = StringField('Phone #') 
    
    ##	END Form definitions, START APP DEFS	##
    
app = Flask(__name__)
app.debug = True
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SECRET_KEY'] = 'JWT_code_isMadeOfThis'
	
	## and for sending retrieval eMails	##
	
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'marioat@juno.com'
app.config['MAIL_PASSWORD'] = '*****'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

auth = HTTPTokenAuth(scheme='Token')

mail = Mail(app)

	##	List of users should be built off Select * from users SQL command, but for now...	##
	
users = [
    User('Larry Gold', 'Death2Hackerz!', 'larrygold@notgmail.com', '8601234567'),
    User('Den Wu', 'N0bodywillguessthispwd!', 'denofwu@nothotmail.com', '2121234456'),
    User('Fred Smith', 'Interview!', 'fredsmith@notgmail.com', '2031234567'),
]

    ##	And define JWT token here with JWT Extended features	##
    
jwt = JWTManager(app)

	## START ROUTING DEFS	##

@app.route('/', methods=['Get'])												## default. if user is not logged in, direct to /login!
##@jwt_required
def start():
    return redirect(url_for('login'))
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User(form.username.data,
                    form.password.data, 											## password is hashed from the object level as stated above
                    form.email.data,
                    form.phone.data)
        found_reg_usr = False
        for u in users:
			if user.username == u.username:
				found_reg_usr = True
				break
        if found_reg_usr == True:
        	flash('Someone else has this username. If that is you, please log in below! if not, try registering a different username.')
        else:
        	users.append(user)
			##	SQL store would normally go here
        	flash('Thanks for registering')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

	## below is required for login to go to private page ... ?	##
	
@app.route('/login', methods=['Get', 'Post'])
def login():
	form = LoginForm(request.form)
	if request.method == 'POST' and form.validate():
		uname = form.username.data		
		hpassword = form.password.data
		if not uname or not hpassword:
 			return jsonify({"msg": "The login form was not filled in correctly!"}), 400		
		else:
			found_usr = False
			for u in users:
				if u.username == uname:
					if check_password_hash(u.password, hpassword):	## stored, hashed pwd first; human entered pwd second
						found_usr = True
						mung = {	
							'access_token': create_access_token(identity=uname),
							'refresh_token': create_refresh_token(identity=uname)
						}						
						return redirect(url_for('protected', current_user=jsonify(mung), status=200))
					else:
						flash('The password is wrong. Remember that it is case sensitive!')
						return redirect(url_for('login'))
			if found_usr == False:
				flash('The username is not on file. Maybe you have not registered yet?')		
				return redirect(url_for('login'))
	return render_template('login.html', form=form)
    	
@app.route('/retrievePwd', methods=['GET', 'POST'])
def rtrv():
	form = RetrievalForm(request.form)							## texts require the 'trial' subscription to Twilio, but appears simple to implement when that is doable
	if request.method == 'POST' and form.validate():
		uname = form.username.data
		uph = form.phone.data
		uE = form.eMail.data
		for u in users:
			if u.username == uname or u.phone == uph or u.eMail == uE:
				print '%s is having trouble logging in. Resetting the pwd...' % u.username
																						## reset the pwd to a random string
				u.password = 'resetThis2somethingRandom!'
				if request.form['submitEmailBtn'] == 'SendEMail':
					send_pwd_eMail(u.eMail)
					flash('Please refer to the eMail we sent you to log in. You should change the password we gave you ASAP!')
					return redirect(url_for('login'))
				##elif request.form['submitBtn'] == 'SendText':
					##send a temp password  via text
	return render_template('retrievePwd.html', form=form)

def send_pwd_eMail(e): 
 ##send a temp password  via eMail. this is not quite patched in my home environment!
	msg = Message("We've reset your password", 
								sender="marioat@juno.com", 
								recipients=e)
	msg.body='As you requested, we have reset your password. Please log in with it as soon as you can. Thank you!'
	print 'Sending an eMail to %s...' % msg.recipients
	mail.send(msg)  
	
##	you would use this to verify SMS ->@app.route('/SMSVerif')
	
@app.route('/private', methods=['Get', 'Post'])				## should really be /<username>	if user is not logged in, direct to /login!
def protected():
	if request.method == 'POST':
		if request.form['submitBtn'] == 'LogOut':
			return redirect(url_for('login'))	#, current_user={}, status=200))
	return render_template('private.html')				
    	
	##	END ROUTES ##
	
if __name__ == '__main__':
    app.run()
    
    ## How to run with OSX (bash) terminal, assuming outer folder is named 'flask_app':
#     cd flask_app/bin
#     source activate											<- runs virtual environment, providing this is installed with the virtualenv command per the Readme
#     FLASK_APP=km_audition.py flask run	<- runs the app with Flask
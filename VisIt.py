# Visualize It! in Python
import math
from flask import Flask, request, render_template, flash, Markup
from wtforms import Form, BooleanField, StringField, PasswordField, validators

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'Reykjavik'
								# DECLARE PLAN CLASS
class Plan:
	def __init__(self, salary, rent, groceries, commute, utilities, home_ent, budget, goal_home, goal_ride, goal_classes, goal_soc, goal_theater, goal_family, goal_health, user_goals, goals_budget):
		self.salary = 0
		self.rent = 0
		self.groceries = 0
		self.commute = 0
		self.utilities = 0
		self.home_ent = 0
		self.budget = 0
		self.goal_home = 0
		self.goal_ride = 0
		self.goal_classes = 0
		self.goal_soc = 0
		self.goal_theater = 0
		self.goal_family = 0
		self.goal_health = 0
		self.user_goals = {}
		self.goals_budget = 0
	
@app.route('/')
def start():
	start_top = ""
	start_top += top('Visualize It for Python w/Flask')
	start_top += """
		<p>Welcome to Visualize It, a basic calculator that takes your weekly income and helps you plan your budget for both immediate needs and long-term fun.
		<br>It's pay what you want, because you\'re obviously using this because you\'re broke :p but we hope you\'ll pay something. 
		Details follow at the end of your calculation run.</p><br>
		"""
	start_top += sal_form()
	start_top += "</body></html>"
	return start_top
								# HOME ROUTE FUNCTIONS
def top(title):
	head = """
		<!DOCTYPE html><html>
		<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>%r</title>
		<link href="/static/styles/visIt_py.css" rel="stylesheet" type="text/css">
		</head>
		<body>
		""" % title
	return head
def sal_form():					# first get the salary. below form(s) should really be templates
	sal_frm = """
		<p>OK, how much do you bring home weekly?</p>
		<form action="/salary" method="POST">
			<input type="text" name="salary_input" class="salary_input">
			<submit id="set_salary"><button value="Set Salary"></button></submit>
		</form>
		"""
	return sal_frm				#	below we take in the salary from the form.
	
@app.route('/salary', methods=['GET','POST'])
def set_salary():
	if request.method == 'POST':
		if int(request.form["salary_input"]) > 0:
			Plan.salary = int(request.form["salary_input"])
			print "salary is %r" % Plan.salary
			if Plan.salary < 500:
				conf_sal = """
					<p>$%r? Gee, I'm sorry.<br>
					But it's OK, I'm here to help.</p><a href="/">No wait, that\'s wrong</a><br>
					""" % abs(Plan.salary)
			elif Plan.salary > 5000:
				conf_sal = """
					<p>$%r?! Well, you must be one of those One Percenters I've read about.<br>
					Thanks for visiting my site. Are you hiring?</p><br><a href="/">No wait, that\'s wrong</a><br>
					""" % abs(Plan.salary)
			else:
				conf_sal = """
					<p>$%r, good.</p><br><a href="/">No wait, that\'s wrong</a><br>
					""" % abs(Plan.salary)
			flash(Markup(conf_sal))
			return render_template('_expenses.html', plan=Plan)	
		else:
			print "A salary was entered but is not valid."
	else:
		print "The form didn't return anything."	## invalid literal for int() with base 10 <- when typing in 'larry'
	return str(Plan.salary)

@app.route('/expenses', methods=['GET','POST'])		
def budget():	
	if request.method == 'POST':
		Plan.rent = int(request.form["rent_input"])
		print "Rent is %r:" % Plan.rent
		Plan.groceries = int(request.form["groc_input"])
		print "Food is %r:" % Plan.groceries
		Plan.commute = int(request.form["commute_input"])
		print "Transportation is %r:" % Plan.commute
		Plan.utilities = int(request.form["util_input"])
		print "Utilities is %r:" % Plan.utilities
		Plan.home_ent = int(request.form["cable_input"])
		print "TV is %r:" % Plan.home_ent
		
		weeklyExpenses = Plan.rent + Plan.groceries + Plan.commute + Plan.utilities + Plan.home_ent 
		
		Plan.budget = Plan.salary - weeklyExpenses
		if int(Plan.budget)<=0:
			budget_error = """
				<h3>You are $%r in the hole per week! You need to cut back on any expenses that you can.
				<br>Try Again below:<br>
				</h3>
				""" % abs(Plan.budget)
			flash(Markup(budget_error))
			return render_template('_expenses.html')
		else:
			print "In budget() function, Budget is %r" % Plan.budget
			budget_msg = """
				<h3>That leaves you with $%r every week to save.</h3>
				""" % Plan.budget
			flash(Markup(budget_msg))
			return render_template('goals.html')
	else:
		print "The expenses form is not returning valid values."
	return str(Plan.budget)

@app.route('/goals', methods=['GET','POST'])	# we want to update the values on this HTML page for each form line
def set_goals():
	if request.method == 'POST':
		try:
			goals_to_show = []
			if int(request.form["home_input"]):
				Plan.goal_home = int(request.form["home_input"])
				if Plan.goal_home > 0:
					print "In set_goals() function, Plan.goals->goal_home is %r" % Plan.goal_home
					goals_to_show.append([Plan.goal_home, "home ownership"])
			else: 
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["trans_input"]):
				Plan.goal_ride = int(request.form["trans_input"])
				if Plan.goal_ride > 0:
					print "Plan.goals->goal_ride is %r" % Plan.goal_ride
					goals_to_show.append([Plan.goal_ride, "car, boat or plane"])
			else:
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["classes_input"]):
				Plan.goal_classes = int(request.form["classes_input"])  
				if Plan.goal_classes > 0:
					print "Plan.user_goals->goal_classes is %r" % Plan.goal_classes
					goals_to_show.append([Plan.goal_classes, "going back to school"])
			else:
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["soc_input"]):
				Plan.goal_soc = int(request.form["soc_input"])  
				if Plan.goal_soc > 0:
					print "Plan.goals=>goal_soc is %r" % Plan.goal_soc
					goals_to_show.append([Plan.goal_soc, "nightlife or social event"])
			else:
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["concert_input"]):
				Plan.goal_theater = int(request.form["concert_input"])  
				if Plan.goal_theater > 0:
					print "Plan.goals->goal_theater is %r" % Plan.goal_theater
					goals_to_show.append([Plan.goal_theater, "concert or theater"])	
			else:
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["wedding_input"]):
				Plan.goal_family = int(request.form["wedding_input"])  
				if Plan.goal_family > 0:
					print "Plan.goals->goal_family is %r" % Plan.goal_family
					goals_to_show.append([Plan.goal_family, "wedding, family event, new baby"])
			else:
				print "This Plan.goals{} value was not updated."
				
			if int(request.form["sport_input"]):
				Plan.goal_health = int(request.form["sport_input"]) 
				if Plan.goal_health > 0:
					print "Plan.goals->goal_health is %r" % Plan.goal_health 
					goals_to_show.append([Plan.goal_health, "sports, health, or fitness"])
			else:
				print "This Plan.goals{} value was not updated."
			
			show_goals(goals_to_show)	
			
# 									## TEMPLATE LOOP for USER GENERATED ITEMS	##
#			for g in Plan.user_goals:
# 				if int(request.form[g]):
# 					Plan.user_goals[g] = int(request.form[g]) 
# 					if Plan.user_goals[g] > 0:
# 						Plan.goals_budget = Plan.budget - Plan.user_goals[g]
# 						print "Plan.user_goals[%r] is:" % g 
# 						print "\t%r"% Plan.user_goals[g] 
# 						show_goals()
# 				else:
# 					print "This Plan.goals{} value was not updated."
			
		except ValueError as e:
			print "This failed because %s." % e
			budget_update= """
				<h3>You didn't enter a number. Please enter a number. Thanks.</h3>
				"""
			flash(Markup(budget_update))
	else:
		print "The goals object is not being updated."
	return render_template('goals.html') 	#str(Plan.user_goals)	#Plan.goal_home and ride, Plan.goal_classes, Plan.goal_soc, Plan.goal_theater, Plan.goal_family, Plan.goal_health

def show_goals(l):
	Plan.goals_budget = 0	
	spend_budget = 0
	for s, d in l:
		print "Add $%s to the budget:" % str(s), ", line item %s" % str(d)
		Plan.goals_budget += s
	spend_budget = Plan.budget - Plan.goals_budget
	if spend_budget > 0:
		print "In show_goals(): Budget lowered to %r" % Plan.goals_budget
		indexx = 0
		budget_update= """
					<h3>You subtracted 
					"""
		for n, g in l:
			print "Declaring goal #%r: " % str(indexx)
			print "\t%r" % str(n), "\t%r \n On the home page." % str(g)
			if indexx == 0:
				budget_update += """
					$%r for a
					""" % n
				budget_update += """
						%r goal
					""" % g
			else:
				budget_update += """
					, and $%r for a
					""" % n
				budget_update += """
						%r goal
					""" % g
			indexx += 1
		## END FOR
		budget_update += """
			.<br>You have to save $%r every week
			""" % Plan.goals_budget
		budget_update += """	
			and would have $%r left.</h3>
			""" % spend_budget
	else:
		print "Budget went below zero, restart."
		budget_update= """
			<h3>Sorry, you can't afford a %r goal. Try harder to save or cut back on expenses.<br>
			But don't be discouraged. You can do it!</h3><br>
			<h4>Try again below.</h4>
			""" % l[0][1]
	flash(Markup(budget_update))
	
	# users should be able to add a goal and save all their results in a plan!

if __name__ == '__main__':
	sess.init_app(app)
	app.run(debug = True)
# end flask
# $ export FLASK_APP=VisIt.py
# $ python -m flask run
# VisIt in python
print 'Welcome to Visualize It, a basic calculator that takes your weekly income and helps you plan your budget'
print 'for both immediate needs and long-term fun.\nIt\'s pay what you want, because you\'re obviously using this '
print 'because you\'re broke \:p but we hope you\'ll pay something. Details follow at the end of your calculation run.\n'
# first get the salary
print '\nOK, how much do you make weekly?\n'
sal = input()
print '${}, good.'.format(sal)
# now calculate weekly expenses
print 'Now we need a breakdown of what you spend on a weekly basis.\nYou know, divide your monthly bill by 4.'

print 'Rent or mortgage?'
rent = input()
print 'Groceries?'
groc = input()
print 'Car, commute and other daily transportation costs?'
transt = input()
print 'Bills and utilities?'
utils = input()
print 'Home Entertainment?'
cable = input()

weeklyExpenses = rent+groc+transt+utils+cable
if weeklyExpenses>=sal:
	print 'You are spending ${} more than you make! You need to cut back on some expenses.'.format(weeklyExpenses-sal)
else:
	print 'That leaves you with ${} every week to save.'.format(sal-weeklyExpenses)
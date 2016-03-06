class ExpensesController < ApplicationController
	def new
		@expenses=Expenses.new(expenses_params)
	end
	
	def create
		if (params.has_key?(:expenses))
			puts "Controller is creating an expenses array\n from #{expenses_params}, "
	  		if (@weeklyExpenses > @salary)
	  			flash.now[:error] = "You are spending more than you make! You must cut back on some expenses."
	  		##	redirect_to '/plan/new'
	  		else 
				if @expenses.save
					render '/plan/budg'
				else
					flash.now[:error] = "No expenses were recorded. Sorry. Please try again."
				##	redirect_to root_url	##action: "new"	
				end
	#		end
		else
			flash.now[:notice] = "No values were entered for the expenses. Sorry."	# error is throwing here
	##		redirect_to '/plan/new'
		end
	end
	
	def expenses_params
		expenses.fetch(:expenses, {})
	end
end
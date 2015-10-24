class SalaryController < ApplicationController
	def new
	#	@plan=Plan.new(params)
	end
	
	def create
		if (params.has_key?(:salary))
			@salary=Salary.new(salary_params)
			puts "\nSalary of #{@salary.inspect}"
			if @salary.save
				render '/budget/expenses'
			else
				puts "No salary was recorded. Sorry. Please try again."
			##	redirect_to root_url	##action: "new"	
			end
		else
			puts "No salary was saved. Sorry."	# error is throwing here
			redirect_to '/plan/new'
		end
	end
end
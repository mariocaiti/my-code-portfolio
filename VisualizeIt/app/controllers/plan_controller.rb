class PlanController < ApplicationController
	def new
		@plan=Plan.new(plan_params)
	end
	
	def create
		if @plan.save
			render '/budget/expenses'
		else
			puts "No plan was recorded. Sorry. Please try again."
		##	redirect_to root_url	##action: "new"	
		end
	end
	
#	private 
	def plan_params
		params.fetch(:plan, {})
	end
##ActionView::MissingTemplate (Missing template plan/new, application/new
end


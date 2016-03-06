class PlanController < ApplicationController
	def new
		@plan=Plan.new(plan_params)
	end
	
	def create
		if @plan.save
			redirect_to '/plan/grid'
		else
			puts 'Plan was not saved. Sorry.'
		end
	end
	
	def show

	end
	
#	private 
	def plan_params
		params.fetch(:plan, {})
	end
##ActionView::MissingTemplate (Missing template plan/new, application/new
end


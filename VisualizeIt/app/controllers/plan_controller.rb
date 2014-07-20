class PlanController < ApplicationController
 	def change
 		create_table :plan do |p|
 				## salary
 			p.integer :salary
 				## expenses
 			p.integer :rent
			p.integer :groceries
			p.integer :transportation
			p.integer :utilities
			p.integer :homeEntertainment
			p.integer :kids
			p.integer :weeklyExpenses
				## costs_planning_for
 			p.integer :classesBudget
			p.integer :vacBudget
			p.integer :socBudget
			p.integer :entertainBudget
			p.integer :weddingBudget
			p.integer :gymBudget
			p.integer :hobbiesBudget
			p.integer :weeklySavingsGoal
			p.timestamps
		end
		add_index :plan, :new_plan
	end

	def create
		plan=Plan.new(plan_params)
		plan.save	
		render '/budget/grid'
	end
	
	private 
	
	def plan_params
		params.require(:salary).permit(:rent, :groceries, :transportation, :utilities, :homeEntertainment, :kids, :classesBudget, :vacBudget, :socBudget, :entertainBudget, :weddingBudget, :gymBudget, :hobbiesBudget) if params[:salary]	
	end
end

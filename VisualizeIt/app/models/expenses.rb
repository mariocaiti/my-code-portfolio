class Expenses < Plan
	def change
 		create_table :expenses do |e|
 			e.integer :rent
			e.integer :groceries
			e.integer :transportation
			e.integer :utilities
			e.integer :homeEntertainment
			e.integer :kids
			e.integer :weeklyExpenses
		end
	end
	
	belongs_to :plan
	
	def mortgage
		@mortgage = mortgage.blank? ? 0 : find(params[:mortgage]).to_i
	end
	
	def groceries
		@groceries = groceries.blank? ? 0 : find(params[:groceries]).to_i
	end
	
	def transportation
		@transportation = transportation.blank? ? 0 : find(params[:transportation]).to_i
	end
	
	def utilities
		@utilities = utilities.blank? ? 0 : find(params[:utilities]).to_i
	end
	
	def homeEntertainment
		@homeEntertainment = homeEntertainment.blank? ? 0 : plan.find(params[:homeEntertainment]).to_i
	end
	
	def kids
		@kids = kids.blank? ? 0 : find(params[:kids]).to_i
	end
	
	def weeklyExpenses
		@weeklyExpenses = @mortgage+@groceries+@transportation+@utilities+@homeEntertainment+@kids
	end
	
	validates :mortgage, presence: true, numericality: true
	validates :groceries, presence: true, numericality: true		#, message: "The groceries entered is not a number."
	validates :transportation, presence: true, numericality: true	#, message: "The transportation entered is not a number."
	validates :utilities, presence: true, numericality: true		#, message: "THe utilities entered is not a number."
	validates :homeEntertainment, presence: true, numericality: true#, message: "The homeEntertainment entered is not a number."

##		describe userCreated
##			it "appends to costs_planning_for"
##		end
end

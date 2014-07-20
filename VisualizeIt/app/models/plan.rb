class Plan < ActiveRecord::Base
	has_one :salary
	validates :salary, presence: true, numericality: true
	has_one :groceries
	validates :groceries, presence: true, numericality: true
	has_one :transportation
	validates :transportation, presence: true, numericality: true
	has_one :utilities
	validates :utilities, presence: true, numericality: true
	has_one :homeEntertainment
	validates :homeEntertainment, presence: true, numericality: true
	
		def self.salary
			salary = Plan.find(params[:salary])
			belongs_to :plan
		end

		def self.mortgage
			mortgage = Plan.find(params[:mortgage])
			belongs_to :plan
		end
		def self.groceries
			groceries = Plan.find(params[:groceries])
			belongs_to :plan
		end
		def self.transportation
			transportation = Plan.find(params[:transportation])
			belongs_to :plan
		end
		def self.utilities
			utilities = Plan.find(params[:utilities])
			belongs_to :plan
		end
		def self.homeEntertainment
			homeEntertainment = Plan.find(params[:homeEntertainment])
			belongs_to :plan
		end
		def self.kids
			kids = Plan.find(params[:kids])
			belongs_to :plan
		end
		
		def self.add_other_exp
			## create_association!(attributes = {})
		end
				## def weekly subtotal
		def self.weeklyExpenses
			weeklyExpenses=mortgage+groceries+transportation+utilities+homeEntertainment+kids
		end

		def self.classesBudget
			classesBudget = Plan.find(params[:classesBudget])/52
			belongs_to :plan
		end
		def self.vacBudget
			vacBudget = Plan.find(params[:vacBudget])/52
			belongs_to :plan
		end
		def self.socBudget
			socBudget = Plan.find(params[:socBudget])/52
			belongs_to :plan
		end
		def self.entertainBudget
			entertainBudget = Plan.find(params[:entertainBudget])/52
			belongs_to :plan
		end
		def self.weddingBudget
			weddingBudget = Plan.find(params[:weddingBudget])/52
			belongs_to :plan
		end
		def self.gymBudget
			gymBudget = Plan.find(params[:gymBudget])/52
			belongs_to :plan
		end
		def self.hobbiesBudget
			hobbiesBudget = Plan.find(params[:hobbiesBudget])/52
			belongs_to :plan
		end 
		def self.add_other_budg
			## create_association!(attributes = {})
		end

##		describe userCreated
##			it "appends to costs_planning_for"
##		end

end

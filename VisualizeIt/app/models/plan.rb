class Plan < ActiveRecord::Base
#	attr_accessible  :salary, :expenses, :budg
	def change
		has_one :salary
		has_one :expenses
		has_one :budg
	end
end

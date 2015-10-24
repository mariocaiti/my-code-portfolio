class Salary < Plan
	def change
 		create_table :salary do |s|
 			s.integer :salary
 		end
 	end 
	
    def salary
		@salary = @salary.blank? ? 0 : find(params[:salary]).to_i
	end
	
	belongs_to :plan
	validates :salary, presence: true, numericality: true#, message: "The salary entered is not a number."
end
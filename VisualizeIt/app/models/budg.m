class Budg < Plan
	def change
		create_table :budg do |b|
 			b.integer :classesBudget
			b.integer :vacBudget
			b.integer :socBudget
			b.integer :entertainBudget
			b.integer :weddingBudget
			b.integer :gymBudget
			b.integer :hobbiesBudget
			b.integer :weeklySavingsGoal
		end
	end
	
	belongs_to :plan
	
	def classesBudget
		@classesBudget = classesBudget.blank? ? 0 : find(params[:classesBudget]).to_i
	end
	
	def vacBudget
		@vacBudget = vacBudget.blank? ? 0 : find(params[:vacBudget]).to_i
	end
	
	def socBudget
		@socBudget = socBudget.blank? ? 0 : find(params[:socBudget]).to_i
	end
	
	def entertainBudget
		@entertainBudget = entertainBudget.blank? ? 0 : find(params[:entertainBudget]).to_i
	end
	
	def weddingBudget
		@weddingBudget = weddingBudget.blank? ? 0 : find(params[:weddingBudget]).to_i
	end
	
	def gymBudget
		@gymBudget = gymBudget.blank? ? 0 : find(params[:gymBudget]).to_i
	end
	
	def hobbiesBudget
		@hobbiesBudget = hobbiesBudget.blank? ? 0 : find(params[:hobbiesBudget]).to_i
	end
	
	def weeklySavingsGoal
		@weeklySavingsGoal = (@classesBudget + @vacBudget + @socBudget + @entertainBudget + @weddingBudget + @gymBudget + @hobbiesBudget) / 52
	end
end
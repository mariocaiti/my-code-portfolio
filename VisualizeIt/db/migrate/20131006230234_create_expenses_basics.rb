class CreateExpensesBasics < ActiveRecord::Migration
  def change
    create_table :expenses_basics do |t|

      t.timestamps
    end
  end
end

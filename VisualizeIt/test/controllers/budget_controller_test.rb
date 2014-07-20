require 'test_helper'

class BudgetControllerTest < ActionController::TestCase
  test "should get integer:salary" do
    get :integer:salary
    assert_response :success
  end

end

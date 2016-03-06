VisualizeIt::Application.routes.draw do
	root :to => 'intro#index'
	resources :plan, controller: 'plan' do
	# 	get 'intro/index' => 'welcome#index', via: [:get, :post]
		get 'plan/salary', to: 'plan#salary'
		get 'plan/expenses', to: 'plan#expenses'
		get 'plan/budg', to: 'plan#budg'
 		get 'plan/new', to: 'plan#grid'
	# 	get 'plan/create', to: 'plan#create'
	end
end
      # root GET    /                        intro#index
# plan_index GET    /plan(.:format)          budget#index
#            POST   /plan(.:format)          budget#create
#   new_plan GET    /plan/new(.:format)      budget#new
#  edit_plan GET    /plan/:id/edit(.:format) budget#edit
#       plan GET    /plan/:id(.:format)      budget#show
#            PATCH  /plan/:id(.:format)      budget#update
#            PUT    /plan/:id(.:format)      budget#update
#            DELETE /plan/:id(.:format)      budget#destroy
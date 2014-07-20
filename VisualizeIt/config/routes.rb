VisualizeIt::Application.routes.draw do
	root :to => 'intro#index'
	
	get 'intro/index' => 'welcome#index', via: [:get, :post]
	
	get 'plan/new', to: 'intro#index'
	get 'plan/create', to: 'plan#create'
end

##      root GET /                      intro#index
##	intro_index GET /intro/index(.:format) welcome#index
##   plan_new GET /plan/new(.:format)    intro#index
##	plan_create GET /plan/create(.:format) intro#index
##  NEEDED? plan_edit GET /plan/edit(.:format)   plan#edit
##	NEEDED? plan_update GET /plan/update(.:format) plan#update
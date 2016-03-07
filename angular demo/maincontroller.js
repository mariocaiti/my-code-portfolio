var visit_App = angular.module('Visit_App',[]);	
visit_App.controller("mainController", ['$scope', 'plan', function($scope, plan){
	$scope.intro = "Welcome to Visualize It, a basic calculator that takes your weekly income and helps you plan your budget for both immediate needs and long-term fun.";
	$scope.myPlan = plan;	//for use on the view page
 	$scope.base = function () {
		plan.newExpense("Rent or Mortgage", "enterRent", 0);
		plan.newExpense("Groceries", "enterGroceries", 0);
		plan.newExpense("Your car, commute or other transportation", "enterCommute", 0);
		plan.newExpense("Utilities", "enterUtils", 0);
		plan.newExpense("Home entertainment, cable, internet, DVD subscriptions", "enterTainment", 0);
		plan.newExpense("Kids' college fund", "enterKids", 0);

		plan.newGoal("Home", "Buying a home", "expHome", 0, "houseBudgetResult");
		plan.newGoal("Ride", "Buying a car, boat or plane", "expRide", 0, "rideBudgetResult");
		plan.newGoal("Classes", "Taking classes", "expClasses", 0, "classesBudgetResult");
		plan.newGoal("Vac", "Vacations", "expVaca", 0, "vacBudgetResult");
		plan.newGoal("Soc", "Social activities", "expSoc", 0, "socBudgetResult");
		plan.newGoal("Enter", "Entertainment, night life, theater etc.", "expNight", 0, "enterBudgetResult");
		plan.newGoal("Wedding", "Special life events, like a wedding", "expWedding", 0, "weddingBudgetResult");
		plan.newGoal("Gym", "Health, exercise, sports", "expGym", 0, "gymBudgetResult");
		plan.newGoal("Nerd", "Hobbies", "expNerd", 0, "nerdBudgetResult");
// 		for (var e in plan.expenses){	console.log(e+"\tExpense: \t"+plan.expenses[e].label+"\t"+plan.expenses[e].action+"\t"+plan.expenses[e].value);}
// 		for (var g in plan.goals) {		console.log(g+"\tGoal:\t"+plan.goals[g].name+"\t"+plan.goals[g].label+"\t"+plan.goals[g].action+"\t"+plan.goals[g].value+"\t"+plan.goals[g].chartName);}
	};
	if(plan.expenses.length == 0 && plan.goals.length == 0)
		$scope.base();
	$scope.write_SalAcknowlegemt = function (sal) {		
		if(sal == NaN || sal <= 0) {
			alert("That is not a number. Enter a number, please.");
		} else {
			plan.setSalary(sal);
			if (plan.salary<600){
				$scope.acknowledgement = "? Gee, I'm sorry. We're here to help you.";
			} else if (plan.salary>10000) {
				alert("So, you must be one of those One Percenters I've read about. Congratulations, and hello to the person managing your budget, the poor dear.");
				$scope.acknowledgement = "! Excellent!";
			}
			else {
				$scope.acknowledgement = ". OK.";
			}									
			
			console.log("\nSalary:\t"+plan.salary);
		}
	};
	$scope.setThisGoal = function (gAmt, gNm) {	// needs to be set for EACH value in the goals obj. It's only firing once!!!
 		$scope.thisGoal = (gAmt/52);	
		$scope.divNum = 0;
 		if($scope.thisGoal > 0) {
 			for(goalsList in $scope.goals) {	
 				//		
 				if(goals.hasOwnProperty(goalsList)) {
					if(goalsList.name==gNm) {
						goals[goalsList].Value=thisGoal.toFixed(2);	// this won't work w ng-change	
					//	console.log("The "+goalsList+" value should now be "+this.thisGoal+" rounded to cents. This affects the div of "+this.chartDivs[this.divNum]+".");					
					}
					//console.log(goals+" has a property of "+goalsList+" and a value of "+goals[goalsList]+".");
				}
				else {
					console.log(goals+" has no properties we can find.")
				}
				$scope.divNum += 1;
			}
 		}	
 		$scope.allGoalsBudget(plan.goals);	
 		return plan.goals;	
 	};
 		/* total set goals may not be more than weeklyBudget! */
	$scope.allGoalsBudget = function (goalsRng) {	
		$scope.weeklyBudgetRevised = plan.makeBudget;
		for(goalRecrd in goalsRng) {
			$scope.weeklyBudgetRevised -= goalsRng[goalRecrd].value;
			console.log("weeklyBudgetRevised is "+plan.makeBudget+" minus "+goalsRng[goalRecrd].value+".");
			if($scope.weeklyBudgetRevised<0) {
				alert("You do not have enough budget to save for this goal. Please review your options.");
				break;
			}	
		}
		return $scope.weeklyBudgetRevised;
	};
}]);

//function plan()




// MVVM - ask Martin Fowler
/// ECMAScript will have integration w Angular 2 (coming soon!)
//	try ngCloak vs ngHide!
// $digest() evaluates all the watches
// data-ng-model vs ng-model 
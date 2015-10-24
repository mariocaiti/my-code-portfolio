angular
.module('MyFirstApp',[])			//.directive('name', function(){}) OR .service('name', function($){})
.controller("mainController", ['$scope', function($scope){
	$scope.intro = "Welcome to Visualize It, a basic calculator that takes your weekly income and helps you plan your budget for both immediate needs and long-term fun.";
	$scope.enterSalary=0;					//1. base salary
	$scope.acknowledgement = "";
	$scope.write_SalAcknowlegemt = function (sal) {
		if(sal == NaN) {
			alert("Please make sure you entered a number. Thanks.");
		} else if (sal<600){
			$scope.acknowledgement = "? Gee, I'm sorry. We're here to help you.";
		} else if (sal>10000) {
			alert("So, you must be one of those One Percenters I've read about. Congratulations, and hello to the person managing your budget, the poor dear.");
			$scope.acknowledgement = "! Excellent!";
		}
		else {
			$scope.acknowledgement = ". OK.";
		}
	};
	$scope.expenses = {						//2. expenses
		enterRent: 0,			
		enterGroceries: 0,
		enterCommute: 0,
		enterUtils: 0,
		enterTainment: 0,
		enterKids: 0
	};
	$scope.getExpenses = function (eR, eG, eC, eU, eT, eK) {
		$scope.weeklyExpenses = eR+eG+eC+eU+eT+eK;
		return $scope.weeklyExpenses;
	};

	$scope.goals ={							//3. goals the user is saving for!
		expHome: 0.0,
		expRide: 0.0,
		expClasses: 0.0, 
		expVaca: 0.0, 
		expSoc: 0.0, 
		expNight: 0.0, 
		expWedding: 0.0, 
		expGym: 0.0, 
		expNerd: 0.0
	};
	$scope.makeBudget = function (eS, wE) {
		$scope.weeklyBudget = eS - wE;
		if ($scope.weeklyBudget<0)
			alert("You are spending more than you make! Try your best to cut back on your planned expenses.");
		else {
			return $scope.weeklyBudget;
		}
 	};
 	$scope.setThisGoal = function (gAmt, gNm) {	// needs to be set for EACH value in the goals obj. It's only firing once!!!
 		$scope.thisGoal = (gAmt/52);	
 		$scope.chartDivs = ["houseBudgetResult", "rideBudgetResult", "classesBudgetResult","vacBudgetResult","socBudgetResult","enterBudgetResult","weddingBudgetResult","gymBudgetResult","nerdBudgetResult"];
		$scope.divNum = 0;
 		if($scope.thisGoal > 0) {
 			for(goalsList in $scope.goals) {			
 				if($scope.goals.hasOwnProperty(goalsList)) {
					if(goalsList==gNm) {
						$scope.goals[goalsList]=$scope.thisGoal.toFixed(2);	// this won't work w ng-change	
					//	console.log("The "+goalsList+" value should now be "+$scope.thisGoal+" rounded to cents. This affects the div of "+$scope.chartDivs[$scope.divNum]+".");					
					}
					//console.log($scope.goals+" has a property of "+goalsList+" and a value of "+$scope.goals[goalsList]+".");
				}
				else {
					console.log($scope.goals+" has no properties we can find.")
				}
				$scope.divNum += 1;
			}
 		}	
 		$scope.allGoalsBudget($scope.goals);	
 		return $scope.goals;	//works
 	};
 		/* total set goals may not be more than weeklyBudget! */
	$scope.allGoalsBudget = function (goalsRng) {	
		$scope.weeklyBudgetRevised=$scope.weeklyBudget;
		for(goalRecrd in goalsRng) {
			$scope.weeklyBudgetRevised = $scope.weeklyBudgetRevised - (goalsRng[goalRecrd]);
			console.log("$scope.weeklyBudgetRevised is "+$scope.weeklyBudget+" minus "+goalsRng[goalRecrd]+".");
			if($scope.weeklyBudgetRevised<0) {
				alert("You do not have enough budget to save for this goal. Please review your options.");
				break;
			}	
		}
		return $scope.weeklyBudgetRevised;
	};
}]);
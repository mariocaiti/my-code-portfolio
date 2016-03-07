visit_App
.factory('plan', function (){
	return {
		salary: 0,
		setSalary: function (s) {
			this.salary = s;
		},
		expenses: [],
		newExpense: function (l, a, v){
			this.expenses.push({
				label: l,
				action: a,
				value: v
			});
		},
		setExpenseAmt: function (n, v) {
			for (var e in this.expenses){
				console.log(e+"\tExpense: \t"+this.expenses[e].label+"\t"+this.expenses[e].action+"\t"+this.expenses[e].value);
				if (e == n) {
					this.expenses[e].value = v;	//console.log(e+"\tExpense updated to: \t"+this.expenses[e].label+"\t"+this.expenses[e].action+"\t"+this.expenses[e].value);
					this.setWeeklyExpenses();
					return this.expenses[e];
				}
			}
		},
		weeklyExpenses: 0,
		setWeeklyExpenses: function () {
			var eRecap = 0;
			for (var e in this.expenses){
				eRecap += this.expenses[e].value;
			}
			this.weeklyExpenses = eRecap;	
		//	console.log("plan.weeklyExpenses is up to "+this.weeklyExpenses);
			return this.weeklyExpenses;
		},
		goals: [],
		newGoal: function (n, l, a, v, c) {
			this.goals.push({
				name: n,
				label: l,
				action: a,
				value: v,
				chartName: c
			});
		},
		setGoal: function (gAmt, gNm) {	// needs to be set for EACH value in the goals obj. It's only firing once!!!
		//	var thisGoal = (gAmt/52);	
			var divNum = 0;
			if(gAmt > 0) {
				for(gl in this.goals) {	
					if(this.goals.hasOwnProperty(gl)) {
						if(this.goals[gl].action==gNm) {
							this.goals[gl].value=gAmt.toFixed(2);	// this won't work w ng-change	
							console.log("The "+this.goals[gl].name+" value should now be "+this.goals[gl].value+" rounded to cents.");					
						}
						//console.log(goals+" has a property of "+goalsList+" and a value of "+goals[goalsList]+".");
					}
					else {
						console.log(this.goals+" has no properties we can find.")
					}
					divNum++;
				}
			}	
			this.allGoalsBudget();	
			return this.goals;	
		},
		weeklyBudget: 0,
		makeBudget: function () {
			weeklyBudget = this.salary - this.setWeeklyExpenses();
			if (weeklyBudget<0)
				alert("You are spending more than you make! Try your best to cut back on your planned expenses.");
			else {
				return weeklyBudget;
			}
		},
		allGoalsBudget: function () {	
			var weeklyBudgetRevised = this.makeBudget();
			for(gr in this.goals) {
				weeklyBudgetRevised -= this.goals[gr].value;
				console.log("weeklyBudgetRevised is "+this.makeBudget()+" minus "+this.goals[gr].value+".");
				if(weeklyBudgetRevised<0) {
					alert("You do not have enough budget to save for this goal. Please review your options.");
					break;
				}	
			}
			return weeklyBudgetRevised;
		}
	};
});			//service or factory?
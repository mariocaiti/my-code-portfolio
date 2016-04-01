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
			//	console.log(e+"\tExpense: \t"+this.expenses[e].label+"\t"+this.expenses[e].action+"\t"+this.expenses[e].value);
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
			this.weeklyExpenses = eRecap;			//	console.log("plan.weeklyExpenses is up to "+this.weeklyExpenses);
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
		setGoal: function (gAmt, gNm) {	
			var divNum = 0;
			if(gAmt > 0) {
				if (this.makeBudget() < 0) 
					alert("Sorry, but you do not have enough to save for this goal.");
				else {
					for(gl in this.goals) {	
						if(this.goals.hasOwnProperty(gl)) {
							if(this.goals[gl].action==gNm) {
								this.goals[gl].value=parseFloat(gAmt).toFixed(2);	// this won't work w ng-change	
								console.log("The "+this.goals[gl].name+" value should now be "+this.goals[gl].value+" while the weekly budget is "+this.weeklyBudget);					
							}
						}
						else {
							console.log(this.goals+" has no properties we can find.")
						}
						divNum++;
					}
				}
			}		
			return this.goals;	
		},
		weeklyBudget: 0,
		makeBudget: function () {
			if ( (this.salary - this.setWeeklyExpenses() ) < 0)
				alert("You are spending more than you make! Try your best to cut back on your planned expenses.");
			else {
				this.weeklyBudget = this.salary - this.setWeeklyExpenses();
				for(gr in this.goals) {
					 this.weeklyBudget -= parseInt(this.goals[gr].value);					
				}
				return this.weeklyBudget;
			}
		}
	};
});			
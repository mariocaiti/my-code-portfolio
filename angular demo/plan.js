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
					this.expenses[e].value = v;	console.log(e+"\tExpense updated to: \t"+this.expenses[e].label+"\t"+this.expenses[e].action+"\t"+this.expenses[e].value);
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
			console.log("plan.weeklyExpenses is up to "+this.weeklyExpenses);
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
		
		weeklyBudget: 0,
		makeBudget: function (wS, wE) {
			weeklyBudget = wS - wE;
			if (weeklyBudget<0)
				alert("You are spending more than you make! Try your best to cut back on your planned expenses.");
			else {
				return weeklyBudget;
			}
		}
	};
});			//service or factory?
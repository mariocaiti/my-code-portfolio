visit_App
.factory('plan', function (){
	var weeklyExpenses = 0;
	var weeklyBudget = 0;
//	this.newPlan = function() <-- do in ctrler
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
		getWeeklyExpenses: function () {
			for (var e in plan.expensesBase) 
				weeklyExpenses += e.value;
			return weeklyExpenses;
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
		makeBudget: function (eS, wE) {
			weeklyBudget = eS - wE;
			if (weeklyBudget<0)
				alert("You are spending more than you make! Try your best to cut back on your planned expenses.");
			else {
				return weeklyBudget;
			}
		}
	};
});			//service or factory?
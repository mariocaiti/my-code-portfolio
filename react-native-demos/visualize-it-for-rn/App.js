import React from 'react';
import { 
	Button, 
	TouchableHighlight, 
	StyleSheet, 
	Text, TextInput, 
	View, ScrollView, KeyboardAvoidingView, Platform,
	Animated, Easing,
	} from 'react-native';
import { withNavigation, createStackNavigator } from 'react-navigation';

class Intro extends React.Component {
	constructor(){
        super();
        this.state = {
        	zoom: new Animated.Value(0),
        }
    }
    componentDidMount() {
		Animated.timing(                  	// Animate over time
		  this.state.zoom, {
			  toValue:32,
			  easing: Easing.in(),
			  duration: 2000,
		}).start();                        			// Starts the animation
	}
  render() {
    return (
      <View style={styles.base}>
        <Text style={styles.baseText}>Welcome to Visualize It, a basic calculator that takes your weekly income and helps you plan your budget for both immediate needs and
         long-term fun. 
        </Text>
        <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('First')}>
          	<Animated.Text style={{fontSize: this.state.zoom}}>
          		Poke Me To Get Started
          	</Animated.Text>
        </TouchableHighlight>
        <Text>
        	Technical Specs!:{"\n"}
        	This is a project I use to learn new languages. I've done this in:{"\n"}
        	{"\t"}Python (with Flask){"\n"}
        	{"\t"}Angular JS (with Bootstrap for CSS)   {"\n"}     	
        	{"\t"}Actionscript 3 (do NOT judge! :) ){"\n"}
        	And I'm finishing this in Android Studio since I can still do Java things for tablets, TVs, and who knows what else.
        </Text>
      </View>
    );
  }
}

class Salary extends React.Component {
	constructor() {
		super();
		this.state = {
			salary: 0
    	};
    }

  render() {
    return (
      <View style={styles.base}>
        <Text style={styles.baseText}>OK, how much do you make weekly?</Text>
        <View style={styles.numInputField}>
        	<Text style={styles.numInputDollarMarker}>$</Text>
			<TextInput 
				style={styles.numInput}
				keyboardType = 'numeric'
				value={this.state.text}
				onChangeText={(text) => this.setState({text})}     	
			/>
			<Button
			  title="Next"
			  onPress={() => this.props.navigation.navigate('Second', {
				salary: this.state.text,
			  })}
			/>
        </View>
      </View>
    );
  }
}
					
class Expenses extends React.Component {	
  	constructor(){
        super();
        this.state = {
            text:'A budget will appear here as you switch from box to box!',
            expenses: [
				{kind: 'Rent', 			label: 'Rent or Mortgage',				val: 0	},
				{kind: 'Groceries', 	label: 'Groceries', 									val: 0	},
				{kind: 'Utilites', 				label: 'Utilities', 												val: 0	},
				{kind: 'Transportation', 	label: 'Car or Commute', 											val: 0	},
				{kind: 'Insurance',					label: 'Insurance, Business Fees, Taxes', 					val:0	},
				{kind: 'QualityOfLife', 			label: 'Home Entertainment and other Activities', 				val: 0	}
			],
			budget: 0
        }
    }

  	render() {
  		const setSalary = this.props.navigation.getParam('salary'),
  					keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -26;
  		let 	enterExp = this.state.expenses.map((e, i) => {
					return <View key={i} style={styles.numInputField}>
						<Text style={styles.numInputLabel}>{e.label}: </Text> 
						<Text style={styles.numInputDollarMarker}>$</Text>
						<TextInput 
							style = {styles.numInput}
							keyboardType = 'numeric'
							value={e.val}
							onChangeText = {(txt) => {
								e.val = Number.parseInt(txt);
								let setBudget = this.state.expenses.reduce((a, c) => {
									return a - c.val;
								}, Number.parseInt(setSalary)), 
								msg = (Number.parseInt(setBudget) <= 0)
									? "You are spending too much! Please try to cut back where you can. You can't save anything with your budget!"
									: "This leaves us with $"+Number.parseInt(setBudget)+" to work with.";
								this.setState({
									text: msg,
									budget: Number.parseInt(setBudget)
								});
							}}	
						/>
					</View>;
				}
		);	
		return (
				<KeyboardAvoidingView 
					style={styles.calc}
					behavior="position"
					keyboardVerticalOffset={keyboardVerticalOffset}>
					<Text style={styles.calcHeaderText}>
						${setSalary}, OK.{"\n"}
						Now we need a breakdown of what you spend on a weekly basis.{"\n"}You know, divide your monthly bill by 4.
					</Text>
				
					<Text>{this.state.text}</Text>
					{enterExp}
					<Button
					  title="Next"
					  onPress={() => this.props.navigation.navigate('Third' , {
						setBudget: this.state.budget,
					  })}
					/>	
				</KeyboardAvoidingView>	
		);
	}
}

class Goals extends React.Component {
  	constructor(){
        super();
        this.state = {
        	text: 'Enter a name to remember it by, and then a weekly amount.',
        	goalsList: [
        		{label: '', val:0, customColor:''}
        	],
        	grGrab: [],
        	nextGprompt: ''
        };
    }
				
  	render() {
  		const updBudget = this.props.navigation.getParam('setBudget'),
  					keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -38;
    	let showGoals = this.state.goalsList.map((g, i) => {
				let 	colorLettrs = ['a', 'b', 'c', 'd', 'e', 'f'],
						cn = "#",
						glGrab = '',
						gvGrab = 0;
				
				for (var x=0; x<6; x++) {
					cn += colorLettrs[Math.floor(Math.random() * 6)];
				}
		
				return (<View key={i}>
						<View key={i} style={styles.numInputFieldG}>
							<TextInput 
								style={styles.vInputLabel}
								onChangeText = {(txt) => {
									glGrab = txt;		console.log("g.label might be\t"+glGrab);
									return glGrab;
								}}
								onBlur = {(txt) => {	
									g.label = glGrab;
									g.customColor = cn;
									console.log("Blur changed.\tBackground color is "+g.customColor+".\n\tAnd we entered "+glGrab+" for a thing to save for. \n");	
								}}
								/> 
							<Text style={styles.numInputDollarMarker}>$</Text>
							<TextInput 
								style = {styles.numInput}
								keyboardType = 'numeric'
								value={g.val}
								onChangeText = {(txt) => {
										g.val = Number.parseInt(txt);
										let limitGoals = this.state.goalsList.reduce((s, c) => {
											console.log("Subtracting "+c.val+"\trepresenting "+c.label+"\tfrom "+s);
											return s - c.val;
										}, Number.parseInt(updBudget)),
										msg = (Number.parseInt(limitGoals) <= 0)
											? "\nYou don't have enough money for this."
											: "\nYou want to save $"+(g.val >= 0 ? g.val : 0)+" per week for "+g.label+". Good!";
										this.setState({
											text: msg,
											nextGprompt: "Another?"
										});
										this.state.grGrab[i] = g.label+": $"+g.val;
									}
								}
							/>
						</View>
						<View key={i} style={{
							backgroundColor: g.customColor, 
							height: (g.val > 0 ? g.val : 1)			
							}}>
							<Text>
								{this.state.grGrab[i]}
							</Text>
						</View>
					</View>)
				});
		return (
			<KeyboardAvoidingView 
					style={styles.calc}
					behavior="position"
					keyboardVerticalOffset={keyboardVerticalOffset}>
				<Text style={styles.calcHeaderText}>
							Then ${updBudget} is what you should be saving every week. So let's break down what you can put that towards every week.{"\n"}
							Type something into the box below, and it will show your weekly goals as compared to your weekly savings budget.{"\n"}
							{this.state.text}
				</Text>
				{showGoals}
				<TouchableHighlight
					onPress={() => {	
											this.setState({
												goalsList: this.state.goalsList.concat({label: 'Next Goal', val:0, customColor:''}),
												nextGprompt: ''												
											});	
										}}>
					<Text>{this.state.nextGprompt}</Text>
				</TouchableHighlight>
				<Text>{"\n"}Thank you for using this tool! My plan is to keep this Expo account up to date with neat stuff for you to use and get value from.
				</Text>
			</KeyboardAvoidingView>
    	);
	}
}

const RootStack = createStackNavigator(
  {
    Home: Intro,
    First: Salary,
    Second: Expenses,
	Third: Goals
/*     Last: Results	*/
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  baseText: {
    	fontSize: 25,
    	margin: 7,
    },
  calc: {
  	flex: 1,
    backgroundColor: '#fff',
  },
  calcHeaderText: {
    	fontSize: 17,
    	margin: 7,
    },
  numInputField: {
  	flexDirection: 'row',
  	backgroundColor: '#def',
  	height: 35,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
	margin: 1.5
  },
  numInputLabel:	{
  	justifyContent: 'flex-start',
  	width:208
  } ,
  numInputDollarMarker: {
  	justifyContent: 'flex-start',
  	width: 8
  },
  numInput: {
  	justifyContent: 'flex-start',
  	width: 105
  },
  vInputLabel:	{
  	justifyContent: 'flex-start',
  	width:177
  } ,
  numInputFieldG: {
  	flexDirection: 'row',
  	height: 35,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
	margin: 1.5
  },
  goalsLabel: {
  	flexDirection: 'row',
  	height: 35,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
	margin: 1.5
  }
  
  });

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

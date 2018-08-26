import React, { Component } from 'react';
import {
	Alert, AppRegistry,
	TouchableHighlight, 
	StyleSheet, 
	Animated, Easing, 
	Text, 
	View 
	} from 'react-native';

export default class App extends React.Component {    
	constructor(){
        super();
        this.state = {
        	text: 'Touch Me For Creative Challenges!',
            stratsList: [
			"Ghost echoes",
			"Use an old idea.",
			"Breathe more deeply",
			"State the problem in words as clearly as possible.",
			"Bridges -build -burn",
			"Mute and continue",
			"Abandon normal instruments",
			"Use an unacceptable color",
			"Do the washing up",
			"What mistakes did you make last time?",
			"Discard an axiom",
			"Only one element of each kind.",
			"Tape your mouth",
			"The tape is now the music",
			"Lost in useless territory",
			"What are the sections sections of? Imagine a caterpillar moving",
			"Think of the radio",
			"What would your closest friend do?",
			"How would you have done it?",
			"What to increase? What to reduce?",
			"A line has two sides",
			"Mechanicalize something idiosyncratic",
			"You are an engineer",
			"Are there sections? Consider transitions.",
			"Humanize something free of error",
			"Try faking it!",
			"Emphasize the flaws",
			"Honour thy error as a hidden intention",
			"Ask your body",
			"Emphasize repetitions",
			"Tidy up",
			"Convert a melodic element into a rhythmic element",
			"Trust in the you of now",
			"Look closely at the most embarrassing details and amplify them",
			"Cascades",
			"Imagine the piece as a set of disconnected events",
			"Children -speaking -singing",
			"[blank white card]",
			"The most important thing is the thing most easily forgotten",
			"Do the washing up",
			"Do we need holes?",
			"Work at a different speed",
			"What is the reality of the situation?",
			"Emphasize differences",
			"Don't stress one thing more than another",
			"Turn it upside down",
			"Make a sudden, destructive, unpredictable action; incorporate",
			"Be dirty",
			"Lowest common denominator",
			"Is there something missing?",
			"Ask people to work against their better judgement",
			"Give the game away",
			"Question the heroic approach",
			"Repetition is a form of change",
			"Distorting time",
			"What are you really thinking about just now?",
			"Change instrument roles",
			"Don't be afraid of things because they're easy to do",
			"Spectrum analysis",
			"Get your neck massaged",
			"Define an area as `safe' and use it as an anchor",
			"You don't have to be ashamed of using your own ideas",
			"Retrace your steps",
			"Take a break",
			"It is quite possible (after all)"
			],
			slideAnim: new Animated.Value(0),
        }
    }
    
    componentDidMount() {
		Animated.timing(                  	// Animate over time
		  this.state.slideAnim, {
			  toValue: -400,
			  easing: Easing.in(),
			  duration: 3000,
		}).start();                        			// Starts the animation
	}
   	render() {
   		let { slideAnim } = this.state;
		return (
			<View  style={styles.container}>
		  		<View>
					<Text style={styles.headline}>Oblique Strategies was created and written by Peter Schmidt and Brian Eno.</Text>
				</View>
				<View>
					<TouchableHighlight onPress={() => {
						let sMsg = this.state.stratsList[Math.floor(Math.random() * this.state.stratsList.length)];
						this.setState({
							text: sMsg
						});
						console.log("\n\tAnd sMsg is now "+this.state.text);
					}}>
		  				<View>
		  						<Animated.Text style={[styles.strategyText, {
									  transform:	[{translateX: slideAnim}]
									}
									]}>
									{this.state.text}
								</Animated.Text>
						</View>
		  			</TouchableHighlight>
		  		</View>
				
		  	</View>
		);
  	}
}/*	`translateX` supplied to `Text` has been deprecated. Use the transform prop instead.*/

const styles = StyleSheet.create({
  container: {
	flex: 1,
  	flexDirection: 'column',
	justifyContent: 'flex-start',
    alignItems: 'flex-start',
    top: 11,
  },
  headline: {
  	fontSize:30.3,
  	margin:12,
  	top: 16,
  },
  strategyText: {
    fontSize:19,
  	margin:8,
  	left:400
  },
});

AppRegistry.registerComponent('obliquestrategies', () => App);

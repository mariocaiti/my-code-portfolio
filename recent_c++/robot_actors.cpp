/*						Robots Acting? A C++ project by Mario Caiti
					Characters and dialogue by R. Stevens http://dieselsweeties.com/archive.php?s=1564
					"This work is licensed under a Creative Commons Attribution-NonCommercial 2.5 License, but don't be a dick about it, ok?" - R Stevens
*/
#include <stdio.h>      /* printf */
#include <stdlib.h>     /* system, NULL, EXIT_FAILURE */
#include<iostream>
#include <string>
#include <cstring>

using namespace std;

class Line {
private:
	char character[13];
	char wryly[42];
	char dialog[69];
	char midline[42];
	char addtl_dialog[101];
public:
	Line();					//make it
	Line(const char * c, const char * w, const char * d, const char * m, const char * a);
	~Line();				//break it
	void nextLine(string v, Line l);
};
Line::Line() {
	strcpy(character, "character");
	strcpy(wryly, "actor instruction");
	strcpy(dialog, "dialogue line");
	strcpy(midline, "optional stage instruction, breath");
	strcpy(addtl_dialog, "more dialogue as needed");
}
Line::Line(const char * c, const char * w, const char * d, const char * m, const char * a) {
	strncpy(character, c, 13);
	strncpy(wryly, w, 42);
	strncpy(dialog, d, 69);
	strncpy(midline, m, 42);
	strncpy(addtl_dialog, a, 101);
}
Line::~Line() {
	cout << "You're off the sketch!" << endl;
}
void Line::nextLine(string v, Line l) 
{
	char OK;
	if(v=="Bruce") {
			cout <<"TORPOR"<<endl;
	} else if(v=="Ralph") {
			cout <<"RED ROBOT #63"<<endl;	//etc
	} else {
		cout <<"A ghost?!"<<endl;
	}
	if(strcmp(l.wryly, "")!=0)	{
		cout <<l.wryly << endl;
	}
	cout << l.dialog << endl;
	cout <<"Say the line? (just hit Y):";
	cin >> OK;
	if (OK == 'Y'||OK == 'y')
	{	
		system(("say -v "+v+" \""+l.dialog+"\"").c_str());
	}	
	if(strcmp(l.midline, "")!=0)	{
		cout << l.midline << endl;
	}
	cout << l.addtl_dialog << endl;
	if(strcmp(l.addtl_dialog, "")!=0)	{
		cout <<"Say the line? (just hit Y):";
		cin >> OK;
		if (OK == 'Y'||OK == 'y')
		{	
			system(("say -v "+v+" \""+l.addtl_dialog+"\"").c_str());
		}	
	}
}

int main ()
{
	string vox[4] = {"Junior", "Ralph", "Bruce", "Albert"};	//Torpor, RR!, Larry?, Uncle Grandpa
	Line s1_l1("Junior", "", "Torpor strong Torpor lift things when asked nicely", "", "");
	Line s1_l2("Ralph","(exasperated)","Yes we know Torpor That is pretty much all you ever say ever", "", "");
	Line s1_l3("Junior", "", "Torpor strong Torpor lift things when asked nicely", "", "");
	Line s1_l4("Ralph","","I remember This isnt Memento", "(sigh)", "You lift things but what do you want to do with your life");
	s1_l1.nextLine(vox[2], s1_l1);
	s1_l2.nextLine(vox[1], s1_l2);
	s1_l3.nextLine(vox[2], s1_l3);
	s1_l4.nextLine(vox[1], s1_l4);
}

/*	clang++ -std=c++11 -stdlib=libc++ robot_actors.cpp -o robotScene 
OR
	g++ -std=c++0x robot_actors.cpp -o robotScene
THEN
	./robotScene
*/
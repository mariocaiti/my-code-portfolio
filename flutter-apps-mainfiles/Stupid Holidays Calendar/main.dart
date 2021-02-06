import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:async' show Future;
import 'package:intl/intl.dart';                        // required for date formats
import 'package:flutter/services.dart' show rootBundle;

void main() => runApp(MyApp());

// if this doesn't run    -> xattr -cr .
// echo $PATH | tr ':' '\n' to check the path

class StupidHoliday {
  final String formattedDate;
  final String stupidHoliday;
  final String about;
  final String altHoliday;
  final String altAbout;
  final String funFacts;
  StupidHoliday(this.formattedDate, this.stupidHoliday, this.about, this.altHoliday, this.altAbout, this.funFacts);
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stupid Holidays Calendar!',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE). Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        brightness: Brightness.dark,

        buttonColor: Colors.blueGrey,
      ),
      home: MyHomePage(title: 'Stupid Holidays Calendar'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning that it has a State object (defined below) that contains fields that affect
  // how it looks. This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

String mo, dayOfWk, dayOfMoDesc, dayOfMo, displayDay = '', matchDate;                //basic date imfo
List parseWeekdayInMoFromFormattedDate = new List();
String displayHolidayName = '', displayHolidayBlurb = '', displayAltHolidayName = '', displayAltHolidayBlurb = '';    // for final display
int weekdayOfMoActual;
List<StupidHoliday> holidaysList = new List<StupidHoliday>();

class _MyHomePageState extends State<MyHomePage> {
  DateTime selectedDate = DateTime.now();

  Future<List> holidaysData() async {
    String holidayData = await rootBundle.loadString("assets/StupidHolidaysCalendar_jsonDataByObject.json");
    Map jsonDataHolidays = jsonDecode(holidayData);
    List hData = jsonDataHolidays['data'];
    for(var h in hData) {
      StupidHoliday thisHoliday = new StupidHoliday(h['Date'], h['Today\'s Stupid Holiday'], h['About'], h['Other Stupid Holidays'], h['Alt About'], h['Fun Facts']);
      if(thisHoliday != null) {
        holidaysList.add(thisHoliday);
 //       print(thisHoliday.toString()+" added to holidaysList.");  //sanity check
      }
    }   
    return hData;
  }
  // blessings to https://dartpad.dev/e5a99a851ae747e517b75ac221b73529 for the base time picker recipe below!
  Future<Null> _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2021, 1),
        lastDate: DateTime(2101));

    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        holidayInfo(picked);
      });
    }
  }

  void holidayInfo (DateTime p) {                                                       // decipher date data into printable date and MATCH with info in csv file
    print(p);
    displayHolidayName = "";
    displayHolidayBlurb = "";
    displayAltHolidayName = "";
    displayAltHolidayBlurb = "";

    mo = new  DateFormat.MMM().format(p);
    dayOfWk = new DateFormat.EEEE().format(p);
    dayOfMoDesc = new DateFormat.MMMMd().format(p);
    dayOfMo= new DateFormat.d().format(p);
    matchDate = new DateFormat.Md().format(p);

    weekdayOfMoActual = int.parse(dayOfMo);
    print(matchDate+" is "+dayOfWk+" #"+numWeekdayOfMo(weekdayOfMoActual).toString()+", "+dayOfMoDesc);  //sanity check
    displayDay = '${dayOfWk}, ${dayOfMoDesc}';
    bool dayPicked = false;

    for(var l in holidaysList) {
      if(l.formattedDate.isEmpty) {
        displayHolidayName = "No Stupid Holiday Today!";
        displayHolidayBlurb = "Know of a stupid holiday that should go here? Write us at ";
        displayAltHolidayName = "";
        displayAltHolidayBlurb = "";
      } else {
        if(!(matchDate.isEmpty)) {
          if(dayPicked) break;
          print("Checking date "+matchDate.toString()+" against "+l.formattedDate);
          //first grab annual holiday by day if it has one
          if (l.formattedDate.compareTo(matchDate.toString()) == 0) {
            displayHolidayName = l.stupidHoliday;
            displayHolidayBlurb = l.about;
            displayAltHolidayName = l.altHoliday;
            displayAltHolidayBlurb = l.altAbout;
            dayPicked = true;
          }
          //then check for holidays that happen once a month. Might happen on same day!
          parseWeekdayInMoFromFormattedDate = l.formattedDate.split(" ");           //result is [Month, InstanceOfWeekday, Weekday]
          if(parseWeekdayInMoFromFormattedDate[0].compareTo(mo) == 0) {
            if(parseWeekdayInMoFromFormattedDate[2].compareTo(dayOfWk)  == 0) {
              print("parseWeekdayInMoFromFormattedDate is "+parseWeekdayInMoFromFormattedDate.toString());
              switch(numWeekdayOfMo(weekdayOfMoActual)) { // or numWeekdayOfMo(weekdayOfMoActual) ?
                case 1:
                  print("Weekday #"+weekdayOfMoActual.toString()+" of "+dayOfWk);
                  if(parseWeekdayInMoFromFormattedDate[1].toString().compareTo("1st") == 0) {
                    if(dayPicked) {
                      displayHolidayName = l.stupidHoliday;
                      displayHolidayBlurb = l.about;
                    } else {
                      displayAltHolidayName = l.stupidHoliday;
                      displayAltHolidayBlurb = l.about;
                    }
                    dayPicked = true;
                  }
                  break;
                case 2:
                  print("Weekday #"+weekdayOfMoActual.toString()+" of "+dayOfWk);
                  if(parseWeekdayInMoFromFormattedDate[1].toString().compareTo("2nd") == 0) {
                    if(dayPicked) {
                      displayHolidayName = l.stupidHoliday;
                      displayHolidayBlurb = l.about;
                    } else {
                      displayAltHolidayName = l.stupidHoliday;
                      displayAltHolidayBlurb = l.about;
                    }
                    dayPicked = true;
                  }
                  break;
                case 3:
                  print("Weekday #"+weekdayOfMoActual.toString()+" of "+dayOfWk);
                  if(parseWeekdayInMoFromFormattedDate[1].toString().compareTo("3rd") == 0) {
                    if(dayPicked) {
                      displayHolidayName = l.stupidHoliday;
                      displayHolidayBlurb = l.about;
                    } else {
                      displayAltHolidayName = l.stupidHoliday;
                      displayAltHolidayBlurb = l.about;
                    }
                    dayPicked = true;
                  }
                  break;
                case 4:
                  print("Weekday #"+weekdayOfMoActual.toString()+" of "+dayOfWk);
                  if(parseWeekdayInMoFromFormattedDate[1].toString().compareTo("4th") == 0) {
                    if(dayPicked) {
                      displayHolidayName = l.stupidHoliday;
                      displayHolidayBlurb = l.about;
                    } else {
                      displayAltHolidayName = l.stupidHoliday;
                      displayAltHolidayBlurb = l.about;
                    }
                    dayPicked = true;
                  }
                  break;
                case 5:
                  print("Fifth and final possible instance of "+dayOfWk);
                  if(parseWeekdayInMoFromFormattedDate[1].toString().compareTo("Last") == 0) {
                    if(dayPicked) {
                      displayHolidayName = l.stupidHoliday;
                      displayHolidayBlurb = l.about;
                    } else {
                      displayAltHolidayName = l.stupidHoliday;
                      displayAltHolidayBlurb = l.about;
                    }
                    dayPicked = true;
                  }
                  break;
                default:
                  displayHolidayName = "No Stupid Holiday Today!";
                  displayHolidayBlurb = "Know of a stupid holiday that should go here? Write us at ";
                  displayAltHolidayName = "";
                  displayAltHolidayBlurb = "";
                  dayPicked = false;
                  break;
              } //end switch
            }   // end second if
          }     // end first if


        } else {
          displayHolidayName = "";
          displayHolidayBlurb = "We are working on this.";
          displayAltHolidayName = "";
          displayAltHolidayBlurb = "";
          dayPicked = false;
          break;
        }
      }
    }
  }

  int numWeekdayOfMo (int w) {                                                      // determine number weekday, e.g. 3rd Thursday
    int n=1;                                                                        // represents # of days in this month
    int x=0;
    while (x <= w) {                                                                // iterate through weeks
      x+=7;
      if(x <= w) {
        n++;
  //      print("n is " + n.toString());                                            // sanity check
      }
    }
    return n;
  }

  void initState() {
    super.initState();
    holidaysData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
                "Your Guide To Stupid Holidays",
              style: TextStyle(fontSize: 30),
            ),
            SizedBox(height: 20.0,),
            RaisedButton(
              onPressed: () => _selectDate(context),
              child: Text('Select a date'),
            ),
            Text(
                displayDay,
                style: TextStyle(fontSize: 20)
            ),

            Text(
                displayHolidayName??'',
                style: TextStyle(fontSize: 20)
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
              child: Text(
                  displayHolidayBlurb??'We are working on this',
                  style: TextStyle(fontSize: 17)
              ),
            ),

            Text(
                displayAltHolidayName??'',
                style: TextStyle(fontSize: 20)
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(5, 5, 5, 5),
              child: Text(
                  displayAltHolidayBlurb??'We are working on this',
                  style: TextStyle(fontSize: 17)
              ),
            ),

            Padding(
              padding: EdgeInsets.fromLTRB(5, 55, 5, 5),
              child: Text(
                  "About This App and Who Created It"
              ),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(5, 55, 5, 5),
              child: Text(
                  "Support This App and it's creator"
              ),
            ),
          ],
        ),
      ),
    );
  }
}

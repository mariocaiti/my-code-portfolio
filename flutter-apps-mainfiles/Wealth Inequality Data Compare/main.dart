import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

void main() async {
  runApp(new MyApp());
}

class Stat {
  final String name;
  final double population;  // needs to be recast as a double?! will be 1 for a person
  final int value;          // doesn't need to be a float I mean WTF Italy?
  Stat(this.name, this.population, this.value);
}

class Listing {
  final String display;
  final int val;
  final bool isPerson;
  Listing(this.display, this.val, this.isPerson);
}
// blessings to https://pusher.com/tutorials/flutter-listviews for this base recipe!

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('Rich People, Poor Nations')),
          body: BodyLayout(),
        ));
  }
}

class BodyLayout extends StatefulWidget {
  @override
  BodyLayoutState createState() {
    return new BodyLayoutState();
  }
}

class BodyLayoutState extends State<BodyLayout> {
  List<Listing> formatList = new List<Listing>();

  //  parse data here. https://cogitas.net/parse-json-dart-flutter/ helped with this.
  //  see also: https://javiercbk.github.io/json_to_dart/ and https://medium.com/swlh/the-alternative-easy-peasy-way-of-parsing-json-data-with-dart-flutter-8054a6720a95

  Future<List> richPersonsList() async {
    String richPplData = await rootBundle.loadString("assets/richppl_manualUpdateQuarantine2020json.json");   //print(richPplData);
    Map jsonDataPpl = jsonDecode(richPplData);
    List pplInfo = jsonDataPpl['RichPeople'];
    for(var p in pplInfo) {         //print(p.toString());
      Stat richPersonInfo = new Stat(p['person'], 1.0, p['netWorth']);
      String display = richPersonInfo.name+", " +
          "one person and their family, has a personal wealth of \$" +
          richPersonInfo.value.toString();
      orderList(display, richPersonInfo.value, true);
    }
    return pplInfo;
  }

  int avgGDPs(int x, int y) {       //    print("Fuck you");
    return (x>0) ? ((x+y)/2).round() : y;
  }

  Future<List> poorNationsList() async {
    String poorNatsData = await rootBundle.loadString("assets/nationsGDP_dataAug2020.json");                // print(poorNatsData);
    Map jsonResultNats = jsonDecode(poorNatsData);
    List natInfo = jsonResultNats['data'];
    for (var n in natInfo) {      //print(n.toString());
      Stat countryInfo = new Stat(n['country'], double.parse(n['pop']), avgGDPs(n['imfGDP'], n['unGDP']));
      String displayPop = "";
      if (countryInfo.population > 1000) {
        double showMillions = countryInfo.population / 1000;
        displayPop = showMillions.round().toString() + " million";
      } else {
        displayPop = countryInfo.population.round().toString() + " thousand";
      }
      String display = countryInfo.name+", " + "population of "+ displayPop +
          " persons, has an estimated GDP of \$" + countryInfo.value.toString();
      orderList(display, countryInfo.value, false);
    }
    return natInfo;
  }

  List<Listing> orderList(String l, int v, bool p) {
    formatList.sort((b, a) => a.val.compareTo(b.val));
    Listing next = new Listing(l, v, p);
    formatList.add(next);
    // for(int x=0; x<formatList.length; x++) {
    //   print(formatList[x].display + " person? " +
    //       formatList[x].isPerson.toString());
    // }
    return formatList;
  }
// end data parsing
  void initState() {
    super.initState();
    richPersonsList();
    poorNationsList();
  }

  @override
  Widget build(BuildContext context) {
    return _myListView();
  }

  Widget _myListView() {
    return ListView.builder(
      itemCount: formatList.length,
      itemBuilder: (context, index) {
        return Material(
            color: (formatList[index].isPerson==true) ? Color.fromARGB(100, 0, 200, 0) : Color.fromARGB(100, 180, 120, 20),
            textStyle: TextStyle(fontFamily: 'Arial', fontWeight: FontWeight.bold),
            child: ListTile(
              title: Text(formatList[index].display),

            ),
            );
      },
    );
  }
}
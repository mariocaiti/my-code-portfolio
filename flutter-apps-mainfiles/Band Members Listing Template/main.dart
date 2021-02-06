import 'dart:ui';

import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Navigation Basics',
    home: MainMenu(),
  ));
}

class Performer {
  final String performer;
  final String about;
  Performer(this.performer, this.about);
}

class AlbumInfo {
  final String assetAddr;
  final List<Performer> ensemble;
  AlbumInfo(this.assetAddr, this.ensemble);
}

String artistName = "";
String artistInfo = "";

class MainMenu extends StatelessWidget {
  List<AlbumInfo> albumListing = [
    AlbumInfo('assets/KetilBjornstad_SvanteHenryson_NightSong_album.jpeg', [
      Performer('Ketil Bjornstad', 'Buck Mulligan Penelope ineluctable modality of the visible stately letter Howth Head the scrotumtightening sea soft portals of discovery.'),
      Performer('Svante Henryson', 'Met him pike hoses Davy Byrne’s Sirens rhododendrons kidneys Bloom stately.')
    ]),
    AlbumInfo('assets/vanKeulen_BirminghamSO_PaavoJarvi_cover.jpeg', [
      Performer('Erkki-Sven Tuur', 'Met him pike hoses Davy Byrne’s Sirens rhododendrons kidneys Bloom stately.'),
      Performer('Isabelle van Keulen', ''),
      Performer('Paavo Jarvi', 'Met him pike hoses Davy Byrne’s Sirens rhododendrons kidneys Bloom stately.')
    ]),
    AlbumInfo('assets/ChickCorea_return2Forever_cover.jpeg', [
      Performer('Chick Corea', ''),
      Performer('Joe Farrell', ''),
      Performer('Flora Purim', 'Met him pike hoses Davy Byrne’s Sirens rhododendrons kidneys Bloom stately.'),
      Performer('Stanley Clarke', 'Buck Mulligan Penelope ineluctable modality of the visible stately letter Howth Head the scrotumtightening sea soft portals of discovery.'),
      Performer('Airto Moreira', ''),
      Performer('Neville Porter', 'Frseeeeeeeeeeeeeeeeeeeefrong Stephen Rudy soft faintly scented urine Sandycove Molly. Love Nausicaa Tinbad the Tailor')
    ]),
    AlbumInfo('assets/TerjeRypdal_waves_cover.jpeg', [
      Performer('Terje Rypdal', 'Met him pike hoses Davy Byrne’s Sirens rhododendrons kidneys Bloom stately.')
    ]),
    AlbumInfo('assets/JakobBro_Gefion_cover.jpeg', [
      Performer('Jakob Bro', 'Frseeeeeeeeeeeeeeeeeeeefrong Stephen Rudy soft faintly scented urine Sandycove Molly. Love Nausicaa Tinbad the Tailor'),
      Performer('Thomas Morgan', 'Buck Mulligan Penelope ineluctable modality of the visible stately letter Howth Head the scrotumtightening sea soft portals of discovery.'),
      Performer('Jon Christensen', '')
    ]),
    AlbumInfo('assets/Abercrombie_Hammer_DeJohnette_Timeless_cover.jpeg', [
      Performer('John Abercrombie', ''),
      Performer('Jan Hammer', 'Buck Mulligan Penelope ineluctable modality of the visible stately letter Howth Head the scrotumtightening sea soft portals of discovery.'),
      Performer('Jack De Johnette', 'Frseeeeeeeeeeeeeeeeeeeefrong Stephen Rudy soft faintly scented urine Sandycove Molly. Love Nausicaa Tinbad the Tailor')
    ])
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ECM Album Covers'),
      ),
      body: ListView.builder(
          itemCount: albumListing.length,
          itemBuilder: (context, index) {
            return Row(
              children: <Widget>[
                Image.asset(
                    albumListing[index].assetAddr,
                    height: 150,
                    width: 150,
                ),
                SizedBox(
                  height: 150,
                  width: 250,
                  child: ListView.builder(
                      itemCount: albumListing[index].ensemble.length,
                      itemBuilder: (BuildContext contxt, int indx) {
                        return Material(
                          color: Color.fromARGB(10, 10, 10, 10),
                          textStyle: TextStyle(fontFamily: 'Arial', fontWeight: FontWeight.bold),

                          child: ListTile(
                            leading: FlatButton(
                              child: Text(albumListing[index].ensemble[indx].performer),
                              onPressed: () {
                                artistName =albumListing[index].ensemble[indx].performer + "\n";
                                artistInfo = "\n" + albumListing[index].ensemble[indx].about;
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => ArtistDetails()),
                                );
                              },
                            ),

                          ),
                        );

                        /*  Viewports expand in the scrolling direction to fill their container.
                        In this case, a vertical viewport was given an unlimited amount of vertical space in which to expand.
                        This situation typically happens when a scrollable widget is nested inside another scrollable widget.
                        If this widget is always nested in a scrollable widget there is no need to use a viewport because there will always be enough vertical space for the children.
                        In this case, consider using a Column instead. Otherwise, consider using the "shrinkWrap" property (or a ShrinkWrappingViewport)
                        to size the height of the viewport to the sum of the heights of its children. */
                      }
                  ),
                ),

              ],
            );
          },
      )
        // child:
      );
  }
}

class ArtistDetails extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("About"+artistName),
      ),
      body: Column(
        children: <Widget>[
          Text(artistInfo),
          RaisedButton(
            onPressed: () {
              artistInfo = "";  //TODO make nice visually, add data from json or wherever
              Navigator.pop(context);
            },
            child: Text('Go back!'),
          )
        ],
      ),
    );
  }
}
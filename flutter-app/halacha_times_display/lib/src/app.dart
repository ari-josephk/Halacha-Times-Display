import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'settings/settings_controller.dart';

/// The Widget that configures your application.
class MyApp extends StatelessWidget {
  MyApp({
    super.key,
    required this.settingsController,
  });

  final SettingsController settingsController;
  final WebViewController webViewController = WebViewController();

  final List<String> cities = [
    'Ashdod',
    'Atlanta',
    'Austin',
    'Baghdad',
    'Beer Sheva',
    'Berlin',
    'Baltimore',
    'Bogota',
    'Boston',
    'Budapest',
    'Buenos Aires',
    'Buffalo',
    'Chicago',
    'Cincinnati',
    'Cleveland',
    'Dallas',
    'Denver',
    'Detroit',
    'Eilat',
    'Gibraltar',
    'Haifa',
    'Hawaii',
    'Helsinki',
    'Houston',
    'Jerusalem',
    'Johannesburg',
    'Kiev',
    'La Paz',
    'Livingston',
    'Las Vegas',
    'London',
    'Los Angeles',
    'Marseilles',
    'Miami',
    'Minneapolis',
    'Melbourne',
    'Mexico City',
    'Montreal',
    'Moscow',
    'New York',
    'Omaha',
    'Ottawa',
    'Panama City',
    'Paris',
    'Pawtucket',
    'Petach Tikvah',
    'Philadelphia',
    'Phoenix',
    'Pittsburgh',
    'Providence',
    'Portland',
    'Saint Louis',
    'Saint Petersburg',
    'San Diego',
    'San Francisco',
    'Sao Paulo',
    'Seattle',
    'Sydney',
    'Tel Aviv',
    'Tiberias',
    'Toronto',
    'Vancouver',
    'White Plains',
    'Washington DC',
    'Worcester'
  ];

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.leanBack);

    int backgroundTime = 10;
    String city = 'Jerusalem';

    void reloadWebview() {
      webViewController.loadRequest(Uri.parse(
          'https://halacha-times-display.vercel.app/?city=$city&backgroundReloadMinutes=$backgroundTime'));
    }

    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    void toggleDrawer() async {
      print("test");
      if (scaffoldKey.currentState!.isDrawerOpen) {
        scaffoldKey.currentState!.openEndDrawer();
      } else {
        scaffoldKey.currentState!.openDrawer();
      }
    }

    void openDrawer() async {
      if(!scaffoldKey.currentState!.isDrawerOpen) scaffoldKey.currentState!.openDrawer();
    }

    return KeyboardListener(
      focusNode: FocusNode(),
      onKeyEvent: (KeyEvent event) {
        if (event.logicalKey == LogicalKeyboardKey.select) {
          openDrawer();
        }
      },
      child: Scaffold(
        body: Stack(
          children: [
            WebViewWidget(
                controller: webViewController
                  ..setJavaScriptMode(JavaScriptMode.unrestricted)
                  ..setBackgroundColor(const Color(0x00000000))
                  ..setNavigationDelegate(
                    NavigationDelegate(
                      onProgress: (int progress) {
                        // Update loading bar.
                      },
                      onPageStarted: (String url) {},
                      onPageFinished: (String url) {},
                      onWebResourceError: (WebResourceError error) {},
                      onNavigationRequest: (NavigationRequest request) {
                        if (request.url.startsWith('https://')) {
                          return NavigationDecision.navigate;
                        }
                        return NavigationDecision.prevent;
                      },
                    ),
                  )
                  ..loadRequest(Uri.parse(
                      'https://halacha-times-display.vercel.app/?city=Jerusalem'))),
            GestureDetector(
                onTap: () {
                  toggleDrawer();
                },
                child: MaterialApp(
                    home: Scaffold(
                  key: scaffoldKey,
                  backgroundColor: Colors.transparent,
                  drawer: Drawer(
                    child: ListView(
                      padding: EdgeInsets.zero,
                      children: <Widget>[
                        DrawerHeader(
                          decoration: BoxDecoration(
                            color: Colors.blue,
                          ),
                          child: Text(
                            'Settings',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                            ),
                          ),
                        ),
                        ListTile(
                          title: Text('Select City'),
                          trailing: StatefulBuilder(
                            builder:
                                (BuildContext context, StateSetter setState) {
                              return DropdownButton<String>(
                                value: city,
                                items: cities.map((String value) {
                                  return DropdownMenuItem<String>(
                                    value: value,
                                    child: Text(value),
                                  );
                                }).toList(),
                                onChanged: (value) {
                                  setState(() {
                                    city = value!;
                                  });
                                  reloadWebview();
                                },
                              );
                            },
                          ),
                        ),
                        ListTile(
                          title: Text('Change Background Time (in minutes)'),
                          trailing: SizedBox(
                            width: 50,
                            child: StatefulBuilder(
                              builder:
                                  (BuildContext context, StateSetter setState) {
                                return TextField(
                                  keyboardType: TextInputType.number,
                                  decoration: InputDecoration(
                                    border: OutlineInputBorder(),
                                  ),
                                  controller: TextEditingController(
                                      text: backgroundTime.toString()),
                                  onChanged: (value) {
                                    setState(() {
                                      backgroundTime = int.parse(value);
                                    });
                                    reloadWebview();
                                  },
                                );
                              },
                            ),
                          ),
                        ),
                        ListTile(
                          title: Text('Close Drawer'),
                          trailing: IconButton(
                            icon: Icon(Icons.close),
                            onPressed: () {
                              scaffoldKey.currentState!.openEndDrawer();
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                )))
          ],
        ),
      ),
    );
  }
}

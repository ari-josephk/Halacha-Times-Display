import 'package:flutter/material.dart';
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
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Halacha Times Display'),
        ),
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
                trailing: DropdownButton<String>(
                  items: cities.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                  onChanged: (_) {},
                ),
              ),
                ListTile(
                title: Text('Change Background Time (in minutes)'),
                trailing: SizedBox(
                  width: 50,
                  child: TextField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) {
                    // Handle the change in background time
                  },
                  ),
                ),
              ),
            ],
          ),
        ),
        body: WebViewWidget(
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
      ),
    );
  }
}

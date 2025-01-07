import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
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

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
      primarySwatch: Colors.grey,
      ),
      home: Scaffold(
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
            items: <String>['Jerusalem', 'New York', 'London'].map((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
            }).toList(),
            onChanged: (_) {},
          ),
          ),
          ListTile(
          title: Text('Select Number'),
          trailing: DropdownButton<int>(
            items: List<int>.generate(10, (int index) => index + 1).map((int value) {
            return DropdownMenuItem<int>(
              value: value,
              child: Text(value.toString()),
            );
            }).toList(),
            onChanged: (_) {},
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
          ..loadRequest(
            Uri.parse('https://halacha-times-display.vercel.app/?city=Jerusalem'))),
      ),
    );
  }
}

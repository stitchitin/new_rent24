try:
    from kivy.uix.webview import WebView
    print("WebView module available")
except ModuleNotFoundError:
    print("WebView module NOT available")

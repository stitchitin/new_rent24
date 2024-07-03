from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from cefpython3 import cefpython as cef

class CEFWebView(BoxLayout):
    def __init__(self, url, **kwargs):
        super(CEFWebView, self).__init__(**kwargs)

        self._url = url
        self._initialize_cef()
        self._create_browser()

    def _initialize_cef(self):
        settings = {
            "cache_path": "/path/to/cefpython_cache"  # Replace with your desired cache path
        }
        cef.Initialize(settings=settings)

    def _create_browser(self):
        cef_browser = cef.CreateBrowserSync(url=self._url)
        # ... (add code to handle browser events, if needed)

    def on_unload(self):
        cef.Shutdown()  # Cleanup CEF resources

class WebsiteApp(App):
    def build(self):
        return CEFWebView(url="https://rent24ng.com/")

if __name__ == '__main__':
    WebsiteApp().run()

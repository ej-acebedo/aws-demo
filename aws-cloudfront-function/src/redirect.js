function handler(event) {
    var request = event.request;
    var headers = request.headers;
  
    var isMobile = headers['cloudfront-is-mobile-viewer'] && headers['cloudfront-is-mobile-viewer'].value === 'true';
    var isDesktop = headers['cloudfront-is-desktop-viewer'] && headers['cloudfront-is-desktop-viewer'].value === 'true';
  
    var redirectUrls = {
      'isMobile': 'https://media.tutorialsdojo.com/public/cf-function-demo-mobile-gif.gif',
      'isDesktop': 'https://media.tutorialsdojo.com/public/cf-function-demo-desktop-gif.gif',
      'Default': 'https://tutorialsdojo.com'
    };
  
    var redirectUrl;
    var statusDescription;
  
    if (isMobile) {
      redirectUrl = redirectUrls.isMobile;
      statusDescription = 'Mobile device detected';
    } else if (isDesktop) {
      redirectUrl = redirectUrls.isDesktop;
      statusDescription = 'Desktop device detected';
    } else {
      redirectUrl = redirectUrls.Default;
      statusDescription = 'Else!';
    }
  
    var response = {
      statusCode: 302,
      statusDescription: statusDescription,
      headers: {
        location: { value: redirectUrl }
      }
    };
  
    return response;
  }
  
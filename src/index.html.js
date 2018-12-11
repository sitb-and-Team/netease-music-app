const PROFILE_API = {
  development: '',
  beta: 'http://user.spdb.com',
  production: 'http://user.spdb.com'
};

module.exports = function ({htmlWebpackPlugin}) {
  const {debug, env} = htmlWebpackPlugin.options;
  const {PROFILE = 'development'} = env;

  const api = debug ? `http://' + location.hostname + ':' + location.port + '/api` : PROFILE_API[PROFILE];
  return `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <title id="htmlTitle"></title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta id="eqMobileViewport" name="viewport"
        content="width=320, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <script type="text/javascript">
    window.config = {
      api: '${api}'
    };
  </script>
</head>
<body>
<noscript>
  您的浏览器需要启用JavaScript才能访问该网页.<br/>
  You need to enable JavaScript to this app.
</noscript>
<div id="application">正在加载...</div>
</body>
</html>
`;
};

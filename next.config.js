const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  
    withSaas({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
    })
);

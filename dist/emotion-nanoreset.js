function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var core = require('@emotion/core');

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var reset = "\nhtml,\nbody,\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\ncode,\nem,\nimg,\nsmall,\nstrong,\nsub,\nsup,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\nfooter,\nheader,\nnav,\nsection,\ntime,\naudio,\nvideo {\n  font-size: 100%;\n  font-weight: inherit;\n  margin: 0;\n  padding: 0;\n  vertical-align: baseline;\n  border: 0;\n  background-color: transparent;\n}\n\nhtml {\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    \"Segoe UI\",\n    Roboto,\n    Oxygen-Sans,\n    Ubuntu,\n    Cantarell,\n    \"Helvetica Neue\",\n    sans-serif;\n  line-height: 1.15;\n  overflow-y: scroll;\n  box-sizing: border-box;\n  height: 100%;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  background-repeat: no-repeat;\n}\n\nbody {\n  height: 100%;\n  line-height: 1;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsmall,\nhgroup,\nsummary {\n  display: block;\n}\n\nimg,\nembed,\niframe,\nobject,\naudio,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\niframe {\n  border: 0;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\nblockquote,\nq {\n  quotes: none;\n}\n\nblockquote::before,\nblockquote::after,\nq::before,\nq::after {\n  content: \"\";\n  content: none;\n}\n\nul,\nli {\n  list-style: none;\n}\n\nsup {\n  vertical-align: text-top;\n}\n\nsub {\n  vertical-align: text-bottom;\n}\n\ntable {\n  border-spacing: 0;\n  border-collapse: collapse;\n}\n\ncaption,\nth,\ntd {\n  font-weight: normal;\n  text-align: left;\n  vertical-align: top;\n}\n\ninput {\n  line-height: normal;\n  border-radius: 0;\n}\n\ninput,\nselect {\n  vertical-align: middle;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n  text-transform: none;\n  border: 0;\n}\n\ninput[type=\"radio\"] {\n  vertical-align: text-bottom;\n}\n\ninput[type=\"checkbox\"] {\n  vertical-align: bottom;\n}\n\ninput::-ms-clear {\n  display: none;\n}\n\ninput::-ms-reveal {\n  display: none;\n}\n\nstrong,\nb {\n  font-weight: bold;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nabbr,\nacronym {\n  cursor: help;\n  text-decoration: none;\n  border-bottom: 0.1em dotted;\n}\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\nlabel,\ninput[type=\"file\"],\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"],\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n[disabled] {\n  cursor: default;\n}\n\nimg {\n  border-style: none;\n}\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: monospace;\n}\n\n";

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Nanoreset = function Nanoreset() {
  return React.createElement(core.Global, {
    styles: core.css(_templateObject(), reset)
  });
};

module.exports = Nanoreset;

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.setState({ milliseconds: this.state.milliseconds + 1 });
            if (this.state.milliseconds >= 100) {
                this.setState({ seconds: this.state.seconds + 1 });
                this.setState({ milliseconds: 0 });
            }
            if (this.state.seconds >= 60) {
                this.setState({ minutes: this.state.minutes + 1 });
                this.setState({ seconds: 0 });
            }
        }
    }, {
        key: 'format',
        value: function format() {
            return pad0(this.state.minutes) + ':' + pad0(this.state.seconds) + ':' + pad0(Math.floor(this.state.milliseconds));
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({ running: false });
            clearInterval(this.watch);
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement('div', { className: 'container' }, React.createElement('div', { className: 'controls' }, React.createElement('a', { onClick: this.start.bind(this), className: 'button', href: '#' }, 'Start'), React.createElement('a', { onClick: this.stop.bind(this), className: 'button', href: '#' }, 'Stop'), React.createElement('a', { onClick: this.reset.bind(this), className: 'button', href: '#' }, 'Reset')), React.createElement('div', { className: 'stopwatch' }, this.format()));
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(Stopwatch);
        }
    }]);

    return App;
}(React.Component);

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById("app"));

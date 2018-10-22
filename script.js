class Stopwatch extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            milliseconds: 0, 
        }
    }

    start () {
        if (!this.state.running) {
            this.setState ({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

	reset () {
        if (!this.state.running) {
            this.setState ({
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            });
        }
    }

    step () {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate () {
        this.setState ({milliseconds: this.state.milliseconds + 1});
        if (this.state.milliseconds >= 100) {
            this.setState ({seconds: this.state.seconds + 1});
            this.setState ({milliseconds: 0});
        }
        if (this.state.seconds >= 60) {
            this.setState ({minutes: this.state.minutes + 1});
            this.setState ({seconds: 0});
        }
    }

	format () {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.milliseconds))}`;
	}

    stop () {
        this.setState ({running: false});
        clearInterval(this.watch);
    }

    render() {

        return React.createElement ('div', {className: 'container'},
            React.createElement ('div', {className: 'controls'},
                React.createElement('a', {onClick: this.start.bind(this), className: 'button', href:'#'}, 'Start'),
                React.createElement('a', {onClick: this.stop.bind(this), className: 'button', href:'#'}, 'Stop'),
                React.createElement('a', {onClick: this.reset.bind(this), className: 'button', href:'#'}, 'Reset'),
                ),
            React.createElement('div', {className: 'stopwatch'}, this.format()),
        )
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class App extends React.Component {
    render() {
        return React.createElement(Stopwatch)
    }
}

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById("app"));
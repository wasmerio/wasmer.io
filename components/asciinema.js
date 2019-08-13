import * as React from "react";
import { Terminal } from "xterm";
import * as className from "classnames";
import FontFaceObserver from "fontfaceobserver-es";

import "./asciinema.css";

export default class Asciinema extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onInput = data => {
      this.props.onInput && this.props.onInput(data);
    };
    this.state = {
      isFocused: true,
      played: false
    };
  }
  applyAddon(addon) {
    Terminal.applyAddon(addon);
  }
  componentDidMount() {
    if (this.props.options && this.props.options.fontFamily) {
      let font = new FontFaceObserver(this.props.options.fontFamily);
      font.load().then(() => {
        this.initXTerm();
      });
    } else {
      this.initXTerm();
    }
  }

  initXTerm(nextProps) {
    if (this.props.addons) {
      this.props.addons.forEach(s => {
        const addon = require(`xterm/dist/addons/${s}/${s}.js`);
        Terminal.applyAddon(addon);
      });
    }
    this.xterm = new Terminal(this.props.options);
    this.xterm.open(this.container);
    // this.xterm.on("focus", this.focusChanged.bind(this, true));
    // this.xterm.on("blur", this.focusChanged.bind(this, false));
    this.xterm.focus();
    if (this.props.onContextMenu) {
      this.xterm.element.addEventListener(
        "contextmenu",
        this.onContextMenu.bind(this)
      );
    }
    if (this.props.play) {
      this.play();
    }
  }
  play() {
    if (this.state.played) {
      return;
    }
    this.setState({ played: true });
    let [data, ...operations] = this.props.cast;
    for (let [time, type, value] of operations) {
      // console.log(time, type, value);
      setTimeout(() => {
        if (value.startsWith("#")) {
          value = `\u001b[2m${value}`;
        }
        if (this.xterm) {
          this.xterm.write(
            value.replace("\u001b[01;32m➜  \u001b[36m~", "\u001b[36m~")
          );
        }
      }, (time * 1000) / 2.5);
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this.xterm) {
      this.xterm.destroy();
      this.xterm = null;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.play) {
      this.play();
    }
  }
  getTerminal() {
    return this.xterm;
  }
  write(data) {
    this.xterm && this.xterm.write(data);
  }
  writeln(data) {
    this.xterm && this.xterm.writeln(data);
  }
  focus() {
    if (this.xterm) {
      this.xterm.focus();
    }
  }
  focusChanged(focused) {
    this.setState({
      isFocused: focused
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  }
  resize(cols, rows) {
    this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
  }
  setOption(key, value) {
    this.xterm && this.xterm.setOption(key, value);
  }
  refresh() {
    this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
  }
  onContextMenu(e) {
    this.props.onContextMenu && this.props.onContextMenu(e);
  }
  render() {
    const terminalClassName = className(
      "ReactXTerm",
      this.state.isFocused ? "ReactXTerm--focused" : null,
      this.props.className
    );
    return (
      <div ref={ref => (this.container = ref)} className={terminalClassName} />
    );
  }
}
export { Terminal, Asciinema };

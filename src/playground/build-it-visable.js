class ToggleVisability extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggleVisability = this.handleToggleVisability.bind(this);
    this.state = {
      visability: false,
    };
  }

  handleToggleVisability() {
    this.setState((prevState) => {
      return {
        visability: !prevState.visability,
      };
    }
);
  };

  render() {
    return (
      <div>
    <h1>Visibility toggle</h1>
    <button onClick={this.handleToggleVisability}>
      {
        this.state.visability
          ? 'Hide details'
          : 'Show details'
      }
    </button>
    {
      this.state.visability && (<div>
        <p>Hey. These are some details you can now see!</p>
      </div>)
    }
  </div>
);
  }
}

ReactDOM.render(<ToggleVisability />, document.getElementById('app'));

/*let visability = false;

const toggleVisability = () => {
  visability = !visability;
  render();
};

const render = () => {
  const jsx = (
    <div>
      <h1>Visibility toggle</h1>
      <button onClick={toggleVisability}>
        {visability ? 'Hide details' : 'Show details'}
      </button>
      {visability && (
        <div>
          <p>Hey. These are some details you can now see!</p>
        </div>
      )}
    </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
};

render();*/

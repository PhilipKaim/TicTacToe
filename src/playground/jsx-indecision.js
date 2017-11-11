console.log('App.js is running!');

const app = {
  title: 'Indecision App',
  subtitle: 'App to make decisions for you',
  options: [],
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const removeAll = (e) => {
  app.options.length = 0;
  render();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {/*if not there it will return a boolean, so nothing will render there*/}
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What
      should I do?</button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {
                app.options.map((item) => <li key={item}>{item}</li>
              )
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option'/>
        <button>Add option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('app');
render();

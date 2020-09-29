import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Layout from './layout';

const outerTheme = createMuiTheme({
  // Typography: {
  //   secondary: {
  //     main: orange[500],
  //   },
  // },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Title: "SPORT BUFF" };
  }

  render() {
    const { Title } = this.state;
    return (
      <div>
        {/* <h1>{Title}</h1> */}
        <ThemeProvider theme={outerTheme}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Layout} Title={Title} />
              {/* <Layout Title={Title} /> */}
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;

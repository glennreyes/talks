// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import Spectacle CodeSlide
import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Montserrat"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["fade"]}
        transitionDuration={500}
        theme={theme}
        bgColor="primary"
        progress="bar"
        textColor="secondary"
      >

        <Slide>
          <Heading size={5} lineHeight={1.4}>
            Leveraging
          </Heading>
          <Heading size={2} lineHeight={1.4}>
            code-splitting
          </Heading>
          <Heading size={5} lineHeight={1.4}>
            in React Apps
          </Heading>
          <Text margin="100px 0 0" textColor="tertiary" bold>
            @glnnrys
          </Text>
        </Slide>

        <Slide>
          <Heading size={1}>
            What's <span style={{ whiteSpace: "nowrap" }}>code-splitting?</span>
          </Heading>
          <Heading size={1} lineHeight={1.8}>🤔</Heading>
        </Slide>

        <Slide>
          <BlockQuote>
            <Quote textColor="secondary">
              "It allows you to split your code into various bundles which you can then load on demand"
            </Quote>
            <Cite>webpack.js.org</Cite>
          </BlockQuote>
        </Slide>

        <Slide>
          <Heading size={1}>Why split code?</Heading>
          <Heading size={1} lineHeight={1.8}>🤔</Heading>
        </Slide>

        <Slide>
          <Heading size={1}>[insert photo spinner]</Heading>
        </Slide>

        <Slide>
          <Heading size={1}>[insert photo low band width]</Heading>
        </Slide>

        <Slide>
          <Heading size={1}>[insert photo showing that loading monolithic bundles in the middle of nowhere sucks]</Heading>
        </Slide>

        <Slide>
          <Heading size={1}>[insert photo mobile trend]</Heading>
        </Slide>

        <Slide>
          <Heading size={1}>How?</Heading>
        </Slide>

        <Slide>
          <Heading size={3}>import();</Heading>
          <Heading size={2} lineHeight={1.8}>🎉</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>import();</Heading>
          <List>
            <ListItem>TC39 proposal: Stage 3</ListItem>
            <ListItem>Returns a Promise</ListItem>
            <ListItem>Webpack 2 support</ListItem>
          </List>
        </Slide>

        <Slide>

          <Heading size={4} lineHeight={1.8}>Synchronous</Heading>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
`import Newsfeed from '../Newsfeed';

// Render newsfeed
document.getElementById('newsfeed').innerHTML = Newsfeed.getHTML();`
            }
          />

          <br />

          <Heading size={4} lineHeight={1.8}>Asynchronous</Heading>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
`// Render newsfeed
import('../Newsfeed').then(module => {
  document.getElementById('newsfeed').innerHTML = module.getHTML();
});`
            }
          />
        </Slide>

        <Slide>
          <Heading size={1}>How in React?</Heading>
        </Slide>

        <Slide>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
"<AsyncLoad component={() => import('../Newsfeed')} />"
            }
          />
        </Slide>

        <CodeSlide
          transition={[]}
          lang="js"
          code={
`import React from 'react';

class AsyncLoad extends React.Component {

  state = {
    AsyncComponent: null,
  }

  componentDidMount() {
    this.props.component()
      .then(module => module.default)
      .then(AsyncComponent =>
        this.setState(
          () => ({ AsyncComponent })
        )
      )
  }

  render() {
    const { isLoading, ...props } = this.props;
    const { AsyncComponent } = this.state;

    if (AsyncComponent) {
      return (
        <AsyncComponent {...props} />
      );
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return null;
  }
}`
          }
          ranges={[
            { loc: [0, 1] },
            { loc: [4, 6] }
          ]}
        />

        <Slide>
          <Heading size={1}>Useful patterns</Heading>

          <List>
            <ListItem>Pattern 1</ListItem>
            <ListItem>Pattern 2</ListItem>
            <ListItem>Pattern 3</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={1}>Recap</Heading>

          <List>
            <ListItem>Recap 1</ListItem>
            <ListItem>Recap 2</ListItem>
            <ListItem>Recap 3</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={1}>Thank you!</Heading>

          <Text margin="100px 0 0" textColor="tertiary" bold>
            @glnnrys
          </Text>
        </Slide>

      </Deck>
    );
  }
}

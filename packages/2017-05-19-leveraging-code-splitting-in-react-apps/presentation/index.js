// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading as HeadingDefault,
  Image,
  ListItem as ListItemDefault,
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


const images = {
  feross: require("../assets/feross.png"),
  lowBandwidth: require("../assets/lowBandwidth.gif"),
  mobileTrend: require("../assets/mobileTrend.jpg"),
  spinner: require("../assets/spinner.gif"),
  thinkingFace: require("../assets/thinkingFace.png")
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#7e6b8f",
  tertiary: "#da3e52",
  quartenary: "#61dafb",
  twitter: "#1da1f2",
  black: "#000"
}, {
  primary: "\"Avenir Next\", Oxygen, sans-serif",
  secondary: "\"Oxygen Mono\", monospace"
});

const ranges = {
  simple: [
    { loc: [0, 17] },
    { loc: [18, 37] }
  ],
  detail: [
    { loc: [0, 1] },
    { loc: [2, 3] },
    { loc: [4, 7] },
    { loc: [8, 17] },
    { loc: [9, 10] },
    { loc: [10, 16] },
    { loc: [12, 15] },
    { loc: [18, 37] },
    { loc: [19, 24] },
    { loc: [25, 30] },
    { loc: [31, 34] },
    { loc: [35, 38] }
  ]
};

// Custom components

const Heading = (props) => (
  <HeadingDefault size={4} bold={false} {...props} />
);

const ListItem = (props) => (
  <Appear>
    <ListItemDefault {...props} />
  </Appear>
);

const TwitterHandle = () => (
  <Text margin="1em 0 0" textColor="twitter">
    @glnnrys
  </Text>
);

// Deck

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        bgColor="primary"
        controls={false}
        progress="bar"
        theme={theme}
        transition={["fade"]}
        transitionDuration={300}
      >

        <Slide>
          <Heading>
            Leveraging code-splitting<br />
            in React apps
          </Heading>
          <TwitterHandle />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>What's code-splitting?</li>
            </ul>
          }
        >
          <Image src={images.thinkingFace} width={140} />
        </Slide>

        <Slide>
          <BlockQuote>
            <Heading>
              "It allows you to split your code into various bundles which you can then load on demand"
            </Heading>
            <Cite textColor="secondary">webpack.js.org</Cite>
          </BlockQuote>
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Why code-splitting?</li>
            </ul>
          }
        >
          <Image src={images.thinkingFace} width={140} />
        </Slide>

        <Slide>
          <Image src={images.spinner} width="25%" />
        </Slide>

        <Slide>
          <Image src={images.lowBandwidth} width="50%" />
        </Slide>

        <Slide>
          <Heading>Load code as needed</Heading>
        </Slide>

        {/* <Slide>
          <Heading size={1}>[insert photo showing that loading monolithic bundles in the middle of nowhere sucks]</Heading>
        </Slide> */}

        <Slide bgImage={images.mobileTrend} />

        <Slide
          notes={
            <ul>
              <li>How?</li>
            </ul>
          }
        >
          <Image src={images.thinkingFace} width={140} />
        </Slide>

        {/* <Slide
          notes={
            <ul>
              <li>Add chart comparison between vendor/async (js) & css splitting</li>
            </ul>
          }>
        </Slide> */}


        <Slide>
          <Heading size={2}>import();</Heading>
          <List>
            <ListItem>TC39 proposal: Stage 3</ListItem>
            <ListItem>syntax-dynamic-plugin</ListItem>
            <ListItem>Returns a Promise</ListItem>
            <ListItem>Webpack 2 support</ListItem>
          </List>
        </Slide>

        <Slide>

          <Heading>Synchronous</Heading>
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

          <Heading>Asynchronous</Heading>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
`// Render newsfeed
import('../Newsfeed').then(module => {
  document.getElementById('newsfeed').innerHTML = module.default.getHTML();
});`
            }
          />
        </Slide>

        <Slide>
          <Heading size={4}>How in React?</Heading>
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
    const {
      isLoading,
      ...props,
    } = this.props;
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
}





`
          }
          ranges={ranges.simple}
        />

        <Slide>
          <CodePane
            lang="jsx"
            style={{ fontSize: "2rem" }}
            source={
`<AsyncLoad
  component={() => import('../Newsfeed')}
/>`
            }
          />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>
                Consider vendor splitting for long term caching
              </li>
              <li>
                Split at route (react-router) or component level
              </li>
              <li>
                What to code split
              </li>
            </ul>
          }
        >
          <Heading>Splitting strategy</Heading>

          <List ordered>
            <ListItem>Consider vendor splitting</ListItem>
            <ListItem>Split at Route & Component level</ListItem>
            <ListItem>Consider what to code split</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Recap</Heading>

          <List>
            <ListItem>Recap 1</ListItem>
            <ListItem>Recap 2</ListItem>
            <ListItem>Recap 3</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Don't over-engineer</Heading>
        </Slide>

        <Slide>
          <Image src={images.feross} width="80%" />
        </Slide>

        <Slide>
          <Heading>Thank you!</Heading>
          <TwitterHandle />
        </Slide>

      </Deck>
    );
  }
}

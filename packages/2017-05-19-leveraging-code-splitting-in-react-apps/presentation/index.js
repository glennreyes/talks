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
  List as ListDefault,
  ListItem as ListItemDefault,
  Slide,
  Text
} from "spectacle";

// Import Spectacle CodeSlide
import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import components
import Async from "../components/async";
import Bundle from "../components/bundle";
// import Comparison from "../components/comparison";
import Vendor from "../components/vendor";

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
    { loc: [0, 15] },
    { loc: [16, 32] }
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

const List = (props) => (
  <ListDefault style={{ listStyle: "none" }} {...props} />
);

const ListItem = ({ ...props, children }) => (
  <Appear>
    <ListItemDefault {...props}>
      {`✨ ${children}`}
    </ListItemDefault>
  </Appear>
);

const TwitterHandle = () => (
  <Text margin="1em 0 0" textColor="twitter">
    Glenn Reyes | @glnnrys
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

        <Slide>
          <BlockQuote>
            <Heading>
              "It allows you to split your code into various bundles which you can then load on demand"
            </Heading>
            <Cite textColor="secondary">webpack.js.org</Cite>
          </BlockQuote>
        </Slide>

        <Slide>
          <Heading>
            Monolythic bundle
          </Heading>
          <Bundle />
        </Slide>

        <Slide>
          <Heading>
            Common chunks
          </Heading>
          <Vendor />
        </Slide>

        <Slide>
          <Heading>
            Async chunks
          </Heading>
          <Async />
        </Slide>

        <Slide>
          <Heading>
            /feed
          </Heading>
          <Async feed />
        </Slide>

        <Slide>
          <Heading>
            /profile
          </Heading>
          <Async profile />
        </Slide>

        <Slide>
          <Heading>
            /404
          </Heading>
          <Async notfound />
        </Slide>

        {/* <Slide
          notes={
            <ul>
              <li>What's code-splitting?</li>
            </ul>
          }
        >
          <Image src={images.thinkingFace} width={140} />
        </Slide> */}

        {/* <Slide
          notes={
            <ul>
              <li>Why code-splitting?</li>
            </ul>
          }
        >
          <Image src={images.thinkingFace} width={140} />
        </Slide> */}

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
              <li>comparison between vendor/async (js) & css splitting</li>
            </ul>
          }
        >
          <Comparison />
        </Slide> */}

        {/* <Slide
          notes={
            <ul>
              <li>We focus on async code-splitting</li>
            </ul>
          }
        >
          <Comparison focus />
        </Slide> */}


        <Slide>
          <Heading>import()</Heading>
          <List>
            <ListItem>TC39 proposal: Stage 3</ListItem>
            <ListItem>syntax-dynamic-plugin</ListItem>
            <ListItem>Returns a Promise</ListItem>
            <ListItem>Webpack 2 support</ListItem>
            <ListItem>Formerly require.ensure() / System.import()</ListItem>
          </List>
        </Slide>

        <Slide>

          <Heading>Sync import</Heading>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
`import MyModule from '../MyModule';

console.log(MyModule);`
            }
          />

          <br />

          <Heading>Async import</Heading>
          <CodePane
            lang="jsx"
            style={{ fontSize: "1.25rem" }}
            source={
`import('../MyModule').then(module => {
  console.log(module.default);
});`
            }
          />
        </Slide>

        <Slide>
          <Heading size={4}>How in React?</Heading>
        </Slide>

        <CodeSlide
          lang="js"
          ranges={ranges.simple}
          code={
`class AsyncLoad extends React.Component {

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
    const { isLoading, ...props } =
      this.props;
    const { AsyncComponent } = this.state;

    if (AsyncComponent) {
      return <AsyncComponent {...props} />;
    }

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return null;
  }
}


















`
          }
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
                Start splitting vendors for long term caching
              </li>
              <li>
                Split at route or component level
              </li>
              <li>
                What to code split
              </li>
            </ul>
          }
        >
          <Heading>Splitting strategy</Heading>

          <List ordered>
            <ListItem>Start with vendor splitting</ListItem>
            <ListItem>Split at Route level</ListItem>
            <ListItem>Split at Component level</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Final thoughts</Heading>

          <List>
            <ListItem>Final thought 1</ListItem>
            <ListItem>Final thought 2</ListItem>
            <ListItem>Final thought 3</ListItem>
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

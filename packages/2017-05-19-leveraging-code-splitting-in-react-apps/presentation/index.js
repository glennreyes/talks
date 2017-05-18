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
import "normalize.css";
import "spectacle/lib/themes/default/index.css";


const images = {
  feross: require("../assets/feross.png"),
  lowBandwidth: require("../assets/lowBandwidth.gif"),
  mobileTrend: require("../assets/mobileTrend.jpg"),
  spinner: require("../assets/spinner.gif")
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
  <ListItemDefault {...props}>
    {`✨ ${children}`}
  </ListItemDefault>
);

const Signature = () => (
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
          <Signature />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>What is code-splitting?</li>
              <li>The new webpack docs notes</li>
            </ul>
          }
        >
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
              <li>No code-splitting</li>
              <li>Giant bundle</li>
              <li>Load unnecessary code</li>
            </ul>
          }
        >
          <Heading>
            Monolithic bundle
          </Heading>
          <Bundle />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Split modules into a vendor chunk that (almost) never changes</li>
              <li>Eg. node_modules</li>
              <li>Long-term caching</li>
              <li>In webpack: Common chunks plugin</li>
            </ul>
          }
        >
          <Heading>
            Common chunks
          </Heading>
          <Vendor />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Split further</li>
              <li>Difference: load chunk asynchronously</li>
              <li>In your HTML element tree webpack appends another script-tag for you</li>
            </ul>
          }
        >
          <Heading>
            Async chunks
          </Heading>
          <Async async />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Loads exact code for your feed page</li>
              <li>Profile & 404 related code are not loaded</li>
            </ul>
          }
        >
          <Heading>
            /feed
          </Heading>
          <Async feed />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Loads exact code for your profile page</li>
            </ul>
          }
        >
          <Heading>
            /profile
          </Heading>
          <Async profile />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Loads exact code for your 404 page</li>
            </ul>
          }
        >
          <Heading>
            /404
          </Heading>
          <Async notfound />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Why do we want to code split?</li>
              <li>We aim to reduce the time of showing this spinner</li>
            </ul>
          }
        >
          <Image src={images.spinner} width="25%" />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Apps with mono bundles can tend to feel like this</li>
            </ul>
          }
        >
          <Image src={images.lowBandwidth} width="50%" />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>What we want is to load only the code that is needed right now</li>
            </ul>
          }
        >
          <Heading>Load code as needed</Heading>
        </Slide>

        <Slide
          bgImage={images.mobileTrend}
          notes={
            <ul>
              <li>We engineers are priviledged</li>
              <li>We have fiber power internet connection</li>
              <li>Outside more & more users using internet through smartphones</li>
              <li>Users (in most cases) with low 3G will thank you!</li>
            </ul>
          }
        />

        <Slide
          notes={
            <ul>
              <li>Dynamic import have arrived!</li>
              <li>Function-like syntactic form to load modules asynchronously</li>
              <li>import() Returns a Promise of the the module</li>
              <li>TC39 proposal: Stage 3</li>
              <li>If you want Babel to understand it: syntax-dynamic-plugin</li>
              <li>Webpack v2 support</li>
            </ul>
          }
          maxWidth="80%"
        >
          <Heading>import()</Heading>
          <List>
            <ListItem>Function-like syntactic form</ListItem>
            <ListItem>Load modules asynchronously</ListItem>
            <ListItem>TC39 proposal: Stage 3</ListItem>
            <ListItem>syntax-dynamic-plugin</ListItem>
            <ListItem>Webpack v2 support</ListItem>
          </List>
        </Slide>

        <Slide
          notes={
            <ul>
              <li>Instead of `import MyModule from '../MyModule';`</li>
              <li>You would call import like a function and pass the path to your module</li>
              <li>Then as a result you get your module</li>
            </ul>
          }
        >
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

        <Slide
          notes={
            <ul>
              <li>How in React?</li>
              <li>Create a React Component that loads async components</li>
            </ul>
          }
        >
          <Heading>React</Heading>
          <br />
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

        <CodeSlide
          lang="js"
          ranges={ranges.simple}
          notes={
            <ul>
              <li>Add a state AsyncComponent</li>
              <li>In the componentDidMount lifecycle ...</li>
              <li>We call the function it returns a Promise of the module</li>
              <li>And then set the state</li>
              <li>In our render function we render our async component when the state has been set</li>
              <li>If not we load a loading spinner or null</li>
            </ul>
          }
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

        <Slide
          notes={
          <ul>
            <li>Benefit: Create easily split points via React components</li>
            <li>Benefit: Reusable</li>
          </ul>
        }
        >
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
              <li>How to start?</li>
              <li>Evaluate which modules don't change often (node_modules)</li>
              <li>Start splitting them into a seperate chunk (vendor) - for long term caching</li>
              <li>Good idea: Split at route, then at component level</li>
              <li>Be aware with shared modules - lead to be complex</li>
            </ul>
          }
        >
          <Heading>Splitting strategy</Heading>

          <List ordered>
            <ListItem>Split app and vendor code</ListItem>
            <ListItem>Split at Route level (async)</ListItem>
            <ListItem>Split at Component level (async)</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading>Don't over-engineer</Heading>
        </Slide>

        <Slide>
          <Image src={images.feross} width="80%" />
        </Slide>

        <Slide
          notes={
            <ul>
              <li>CS can load your code as needed</li>
              <li>Async CS will load code on demand / adds script tag to head</li>
              <li>Avoid shared modules, only do it if you have a complete vision of your components</li>
              <li>Double-check where CS makes sense (effort, etc.)</li>
              <li>Don't over-engineer</li>
            </ul>
          }
        >
          <Heading>Recap</Heading>

          <List>
            <ListItem>Load code as needed</ListItem>
            <ListItem>Code-splitting can load code on demand</ListItem>
            <ListItem>Shared modules add complexity</ListItem>
            <ListItem>Don't over-engineer!</ListItem>
          </List>

          <Appear>
            <div>
              <Heading>Thank you!</Heading>
              <Signature />
            </div>
          </Appear>
        </Slide>

      </Deck>
    );
  }
}

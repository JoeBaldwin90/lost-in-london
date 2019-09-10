const Highlight = ({ children, color }) => (
  <span className={`relative highlight highlight-${color}`}>
    <span className="relative z-2">{children}</span>
  </span>
);

const NavItem = ({ className, href, children, hover, logo }) => (
  <li className={`mh2-ns f6 f4-l tc ${className}`}>
    <a
      href={href}
      className={`no-underline black link hover-bg-${hover}`}
    >
      {logo ? (
        <img src="../images/LondonLogo.svg" className="db center logo" />
      ) : (
        children
      )}
    </a>
  </li>
);

const Nav = () => (
  <nav className="pt3 pt4-ns mb4 mb0-ns">
    <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
      {menu.map(item => (
        <NavItem {...item} />
      ))}
    </ul>
  </nav>
);

const Intro = () => (
  <div className="m-auto-ns f4 f3-m f2-l tc w-80-l">
    <div className="mb3 mb4-ns">
      <Highlight color="blue">Lost in London</Highlight> is a directory of
      alternative places to <Highlight color="red">explore</Highlight>, vibes to{" "}
      <Highlight color="yellow">feel</Highlight> and food to{" "}
      <Highlight color="blue">eat</Highlight> in{" "}
      <Highlight color="zag">London</Highlight>, England.
    </div>

    <div>
      From <Highlight color="yellow">warehouses</Highlight> and canals, to
      <Highlight color="red">food-markets</Highlight> and{" "}
      <Highlight color="blue">hidden venues</Highlight>, London is a dynamic city that
      will swallow you whole. <Highlight color="yellow">Enjoy!</Highlight>
    </div>
  </div>
);

const Overlay = ({ showInfo, title, link, description }) => (
  <div
    className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-blue overlay"
    style={{ transform: showInfo ? "none" : "translateY(-100%)" }}
  >
    <div>
      <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">
        <a
          href={link}
          target="_blank"
          className="link black hover-bg-red"
        >
          {title}
        </a>
      </h1>
      <p className="lh-title lh-copy-ns mv0 black f6 measure-l">
        {description}
      </p>
    </div>
  </div>
);

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    // Default state
    this.state = {
      showInfo: false
    };
    // Bind custom method to 'this' component
    this.toggleInfo = this.toggleInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  toggleInfo() {
    this.setState((prevState, props) => ({
      showInfo: !prevState.showInfo
    }));
  }

  closeInfo() {
    this.setState({
      showInfo: false
    });
  }

  render() {
    const { title, description, link, image, className } = this.props;
    const { showInfo } = this.state;
    return (
      <div
        className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${className}`}
        onMouseEnter={this.toggleInfo}
        onMouseLeave={this.closeInfo}
      >
        <div className="relative">
          <Overlay {...this.props} {...this.state} />
          <img src={`../images/${image}`} className="db w-100" />
        </div>
      </div>
    );
  }
}

const App = () => (
  <div>
    <div className="min-vh-100 ph4 flex flex-column">
      <Nav />
      <Intro />
    </div>
    <div className="mt4 mt0-ns flex flex-wrap container">
      {attractions.map(attraction => (
        <Attraction {...attraction} />
      ))}
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

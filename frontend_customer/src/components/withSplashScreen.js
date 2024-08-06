import React, { Component } from "react";
import introVideo from "../assets/intro.mp4"; // Import the MP4 file

const splashContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full viewport height
  backgroundColor: '#000', // Optional: background color
};

const videoStyle = {
  width: '100%', // Adjust the width as needed
  maxWidth: '600px', // Optional: maximum width
  height: 'auto', // Maintain aspect ratio
};

function SplashMessage() {
  return (
    <div style={splashContainerStyle}>
      <video style={videoStyle} autoPlay muted>
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        // Put here your await requests/ API requests
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 4000); // Adjust the timeout duration if needed
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return <SplashMessage />;

      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flvjs from 'flv.js';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  // 1.- component first renders and attempt to build the player
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id)
    this.buildPlayer(); //first time the component is rendered, we fetch stream but also call buildPlayer
  }

  //2.- if our render fetch the stream succssessfully in the future and component rerenders, componentDidUpdate would be called and will atempt to call buildPlayer aswell
  componentDidUpdate() {
    this.buildPlayer();
  }

  //4.- this will be called whenever we finish our stream to tell the app that it doesnt have to keep looking for information to build the video
  componentWillUnmount() {
    this.player.destroy();
  }

  //3.- if is allready builded, it wont try to build it
  buildPlayer() {
    if(this.player || !this.props.stream) { //to see if when we first load the page we have loaded our stream if we do not have our stream, we return
      return;
    }

    const { id } = this.props.match.params;
    this.player = flvjs.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();

  }

  render() {
    if(!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%'}} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);

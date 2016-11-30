import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import Level from '../blocks/level'
import { fetchLevel } from '../../actions/level'

class LevelPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLevel(this.props.routeParams.id))
  }

  // incrementSteps() {
  //   const { dispatch } = this.props;
  //   dispatch(gameIncrementSteps());
  // }

  render() {
    var level = this.props.level
    if (! level) {
      return null;
    }

    return (
      <div>
        <SiteMenu active="site_play" />
        <div className="row">
          <div className="col-lg-12">
            <p className="pull-left">
              Steps: {this.props.steps}
            </p>
            <p className="pull-right">
              <button className="btn btn-primary" data-toggle="modal" data-target="#view_controls_modal">View Controls</button>
              <button className="btn btn-danger">Reset Puzzle</button>
            </p>
            <br/>
            <br/>
            <Level level={level}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    level: state.levelState.current,
    steps: state.levelState.steps,
  }
}

export default connect(mapStateToProps)(LevelPage)

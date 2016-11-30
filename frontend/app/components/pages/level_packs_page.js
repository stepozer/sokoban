import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import LevelPacks from '../blocks/level_packs'
import { fetchLevelPacks } from '../../actions/level_pack'

class LevelPacksPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLevelPacks())
  }

  render() {
    return (
      <div>
        <SiteMenu active="site_play" />
        <div className="row">
          <div className="col-lg-12">
            <h4>Official Puzzle Packs</h4>
            <hr/>
            <LevelPacks level_packs={this.props.level_packs}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    level_packs: state.levelPackState.all
  }
}

export default connect(mapStateToProps)(LevelPacksPage)

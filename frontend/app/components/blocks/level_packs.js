import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

var LevelPacks = React.createClass({
  render: function() {
    if (! this.props.level_packs) {
      return null;
    }

    var levelPacksTemplate = this.props.level_packs.map(function(level_pack, index)  {
      return (
        <tr key={index}>
          <td width="1">
            <img src={level_pack.image} alt="" />
          </td>
          <td>
            <h4>
              <Link to={{pathname: '/play/'+level_pack.slug }}>{level_pack.name}</Link>
            </h4>
            <p>
              <strong>{level_pack.levels_count}</strong> puzzle
            </p>
            <p>
              {level_pack.description}
            </p>
          </td>
        </tr>
      )
    });

    return (
      <table className="table table-striped table-hover table-borderless">
        <tbody>
          {levelPacksTemplate}
        </tbody>
      </table>
    );
  }
});

function mapStateToProps (state) {
  return  {
    level_packs: state.level_packs.all
  }
}

module.exports = connect(mapStateToProps)(LevelPacks)

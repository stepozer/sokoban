import React from 'react'
import { Link } from 'react-router'

module.exports = React.createClass({
  componentDidMount: function() {
    $.get('http://localhost:3000/api/v1/level_packs', function (result) {
      this.setState({
        level_packs: result,
      });
      console.log(this.state.level_packs)
    }.bind(this));
  },
  render: function() {
    if (! this.state) {
      return null;
    }
    var levelPacksTemplate  = this.state.level_packs.map(function(level_pack, index)  {
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

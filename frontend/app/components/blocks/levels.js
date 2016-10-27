import React from 'react'
import { Link } from 'react-router'

var Levels = React.createClass({
  render: function() {
    if (! this.props.levels) {
      return null;
    }

    var chunks = [this.props.levels]

    var levelsTemplate = chunks.map(function(chunk, index) {
      return (
        <div className="row">
          <% chunk.each do |level| %>
            <div className="col-md-3" style="margin-bottom:25px;">
              <div className="row">
                <div className="col-md-7">
                  <div style="border:1px solid #f5f5f5; padding:2px;text-align:center;">
                  { level.image }
                  </div>
                </div>
                <div className="col-md-5">
                  <h4>#{level.name}</h4>
                  <p>
                    <small><strong>{level.solutions_count}</strong> solved</small>
                  </p>
                </div>
              </div>
            </div>
          <% end %>
        </div>
      )
    });

    return (
      {levelsTemplate}
    );
  }
});

module.exports = Levels

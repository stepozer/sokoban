var SiteHelpPage = React.createClass({
  render: function()  {
    return (
      <div>
        <SiteMenu active="site_help" />
        <div className="row">
          <div className="col-lg-12">
            <h4>Getting Started</h4>
            <hr/>
            <p>
              <strong>Play as a Guest</strong>
            </p>
            <p>
              To start playing puzzles as a guest, simply click on the Play tab and select
              the puzzle you would like to play.
            </p>
            <p>
              <strong>Sign Up for an Account</strong>
            </p>
            <p>
              Signing up for an account at Sokoban Online is free and easy. Simply follow
              this link to begin the sign up process. Signing up will give you a Sokoban
              Online Basic account. To learn more about the Basic account, please refer
              to the Types of Members section in the Help tab.
            </p>
          </div>
        </div>
      </div>
    );
  }
});

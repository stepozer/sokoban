var SiteIndexPage = React.createClass({
  render: function()  {
    return (
      <div>
        <SiteMenu active="site_index" />
        <div className="jumbotron">
          <h2>Welcome to Sokoban Game World!</h2>
          <p className="lead">
             On this site you can play to the classic puzzle game, Sokoban.
          </p>
          <p>
            <a href="/play" className="btn btn-lg btn-success">Play Sokoban</a>
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h4>Ready to Play Sokoban Puzzles?</h4>
            <hr/>
            <p>
              If you aren't a member of Sokoban Online, we recommend that you sign
              up for an account with us, it's free! If you already have an account
              with us, use the form in the top right-hand corner to login. If you're
              here and you just want to check things out, feel free to play any of the
              puzzles as a guest. Keep in mind that your scores will not be recorded
              when playing as a guest.
            </p>
          </div>
          <div className="col-lg-6">
            <h4>I'm New Here, I Need Help!</h4>
            <hr/>
            <p>
              First time playing Sokoban Online? Don't have a clue how the game is
              played? You're in luck! We have two ways for you to learn the game:
            </p>
            <ul>
              <li>
                Want to jump right in and start playing? Then check out the Tutorial Puzzles.
              </li>
              <li>
                Want to read about how the game is played before playing it? Then
                take a look at the How to Play section.
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h4>Newly Added puzzles</h4>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
});

function Home(props) {
  if (props.game.game_state === 0) {
    return (
      <div className="board-item home start-btn-container">
        <div className="play-btn" onClick={() => props.initGame()}></div>
      </div>
    );
  }

  const cells = [];

  cells.push(
    <div key={"home-cell-red-green"} className="home-cell cell-red-green"></div>
  );
  cells.push(
    <div
      key={"home-cell-green-blue"}
      className="home-cell cell-green-blue"
    ></div>
  );
  cells.push(
    <div key={"home-cell-center"} className="home-cell cell-center"></div>
  );
  cells.push(
    <div
      key={"home-cell-yellow-red"}
      className="home-cell cell-yellow-red"
    ></div>
  );
  cells.push(
    <div
      key={"home-cell-blue-yellow"}
      className="home-cell cell-blue-yellow"
    ></div>
  );

  for (const color of colors) {
    const classnames = [];
    classnames.push("home-cell");
    classnames.push("cell-" + color);

    const coins = [];
    const coinClass = [];
    if (props.actor_positions[board_metadata[color].finish]) {
      classnames.push("occupied");

      let coinvPos = 0;
      for (const coin of props.actor_positions[board_metadata[color].finish]) {
        coinClass.push("coin");
        coinClass.push("coin-" + color);
        coinClass.push("coin-" + coinvPos);
        coins.push(
          <div
            key={"home-coin-" + color + "-" + coinvPos}
            className={coinClass.join(" ")}
          ></div>
        );
        coinvPos++;
      }
    }
    cells.push(
      <div key={"home-cell-" + color} className={classnames.join(" ")}>
        {coins}
      </div>
    );
  }

  return <div className="board-item home">{cells}</div>;
}

function Jail(props) {
  const cells = [];
  const playable_colors = [];
  const assigned_players_map = {};

  // Populate from game metadata
  for (const player of props.game.players) {
    playable_colors.push(player.color);
    assigned_players_map[player.color] = player.type;
  }

  for (let i = 0; i < 25; i++) {
    const classnames = [];
    let clickAction = "";
    const coins = [];
    const action_icon = [];
    const player_icon = [];
    const cellId = board_metadata[props.color].finish + i + 100;

    // Jail cells
    if (board_metadata[props.color].jail.coin_cells.includes(cellId)) {
      classnames.push("jail-cell");
      classnames.push("cell-" + cellId);

      if (props.actor_positions[board_metadata[props.color].finish]) {
        for (const coin of props.actor_positions[
          board_metadata[props.color].finish
        ]) {
          if (board_init[props.color][coin.coin].jail_pos === cellId) {
            classnames.push("icon-cell far fa-home");
          }
        }
      }

      const cell_actor = props.actor_positions[cellId]
        ? props.actor_positions[cellId].find(
            cell_actor => cell_actor.player === props.color
          )
        : undefined;

      if (cell_actor && cell_actor.status !== 2) {
        classnames.push("occupied");

        const coinClass = [];
        coinClass.push("coin");
        coinClass.push("coin-" + cell_actor.player);
        coinClass.push("coin-0");

        // Check if coin is active for play
        if (props.game.board_active && cell_actor.status === 1) {
          coinClass.push("glow");
          coinClass.push("active");
          clickAction = "playCoin";
        }

        coins.push(
          <div key={"jail-coin-" + i} className={coinClass.join(" ")}></div>
        );

        if (assigned_players_map[cell_actor.player] === "BOT") {
          player_icon.push(
            <div
              key={"jail-bot-player-" + i}
              className={
                "active-player-icon player-icon-" +
                cell_actor.player +
                " icon-cell far fa-robot"
              }
            ></div>
          );
        }
      }
    }
    // Center cell to show dice
    else if (board_metadata[props.color].jail.dice_roll_cell === cellId) {
      classnames.push("cell-" + props.color);
      classnames.push("occupied");

      const actionClass = [];
      let content = "";
      if (playable_colors[props.game.active_player] == props.color) {
        if (props.game.board_active) {
          actionClass.push("dice-face");
          actionClass.push("icon-cell");
          actionClass.push("far fa-dice-" + dice_face[props.game.dice_roll]);
        } else if (props.game.game_state === 2) {
          actionClass.push("action-button dice");
          actionClass.push("spinner");
          content = 127922;
          clickAction = "rollDice";
        } else if (props.game.game_state === 3) {
          actionClass.push("action-button trophy");
          actionClass.push("zoominout");
          content = 127942;
          clickAction = "gaveOver";
        }

        action_icon.push(
          <div key={"jail-action-" + i} className={actionClass.join(" ")}>
            {String.fromCodePoint(content)}
          </div>
        );

        if (assigned_players_map[props.color] === "BOT") {
          player_icon.push(
            <div
              key={"jail-bot-player-" + i}
              className={
                "active-player-icon player-icon-" +
                props.color +
                " icon-cell far fa-robot"
              }
            ></div>
          );
        }
      } else if (playable_colors[props.game.prev_player] == props.color) {
        classnames.push("dice-face");
        classnames.push("icon-cell");
        classnames.push("far fa-dice-" + dice_face[props.game.prev_roll]);
        classnames.push("fade-out");
      }
    }
    // Corner cell to show player icon
    else if (board_metadata[props.color].jail.player_icon_cell === cellId) {
      classnames.push("cell-" + props.color);
      classnames.push("icon-cell");

      const assignedclass = [];
      assignedclass.push("player-icon");
      assignedclass.push("player-icon-" + props.color);
      assignedclass.push("far");
      if (assigned_players_map[props.color] === "HUMAN") {
        assignedclass.push("fa-user");
        if (
          props.game.game_state === 2 &&
          playable_colors[props.game.active_player] == props.color
        ) {
          assignedclass.push("shake");
        }
      }
      if (assigned_players_map[props.color] === "BOT") {
        assignedclass.push("fa-robot");
      }

      player_icon.push(
        <div ey={"jail-player-" + i} className={assignedclass.join(" ")}></div>
      );
    } else {
      classnames.push("cell-" + props.color);
    }

    let clickFunc = undefined;
    if (clickAction === "playCoin") {
      clickFunc = () =>
        props.coinClickHandler(
          props.game.active_player,
          props.actor_positions[cellId][0].coin,
          props.game.dice_roll
        );
    } else if (clickAction === "rollDice") {
      clickFunc = () => props.diceClickHandler(props.game.active_player);
    } else if (clickAction === "gaveOver") {
      clickFunc = () => props.trophyClickHandler();
    }

    cells.push(
      <div
        key={"jail-cell-" + props.color + "-" + i}
        className={classnames.join(" ")}
        onClick={clickFunc}
      >
        {coins}
        {action_icon}
        {player_icon}
      </div>
    );
  }

  let classnames = [];
  classnames.push("board-item");
  classnames.push("jail");
  classnames.push("jail-" + props.color);
  if (!assigned_players_map[props.color]) {
    classnames.push("disabled");
  }
  return <div className={classnames.join(" ")}>{cells}</div>;
}

function Playground(props) {
  const cells = [];
  const rows = props.cells.length;
  const cols = props.cells[0].length;
  const playable_colors = [];
  const assigned_players_map = {};

  // Populate from game metadata
  for (const player of props.game.players) {
    playable_colors.push(player.color);
    assigned_players_map[player.color] = player.type;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const coins = [];
      const player_icon = [];
      let cellActor = undefined;
      let canClick = false;
      const cellId = props.cells[i][j];

      // Prepare classes for cell
      let classnames = [];
      classnames.push("cell-" + cellId);
      classnames.push("play-cell");

      if (cellId >= 100) {
        classnames.push("cell-" + props.color);
      }
      if (
        board_metadata[props.color] &&
        board_metadata[props.color].start == cellId
      ) {
        classnames.push("cell-" + props.color);
      }
      if (safe_cells.includes(cellId)) {
        classnames.push("icon-cell far fa-life-ring");
      }

      // Check for cell occupancy
      if (props.actor_positions[cellId]) {
        classnames.push("occupied");

        // Determine cell actor
        cellActor = props.actor_positions[cellId].find(
          cell_actor =>
            cell_actor.player === playable_colors[props.game.active_player]
        );
        cellActor = cellActor || props.actor_positions[cellId][0];

        // Handle multiple coins in cell
        let coinvPos = 0;
        let isCellActor = false;
        if (props.actor_positions[cellId].length > 1) {
          for (const coin of props.actor_positions[cellId]) {
            // Determine active coin
            if (
              !isCellActor &&
              coin.player === playable_colors[props.game.active_player]
            ) {
              isCellActor = true;
            } else {
              coins.push(
                <div
                  key={"playground-coin-" + coinvPos}
                  className={"coin coin-" + coin.player + " coin-" + coinvPos}
                ></div>
              );
              coinvPos++;
            }
          }
        }

        // Add coin DOM for active coin
        const coinClass = [];
        coinClass.push("coin");
        coinClass.push("coin-" + cellActor.player);
        coinClass.push("coin-" + coinvPos);

        if (props.game.board_active && cellActor.status === 1) {
          coinClass.push("glow");
          coinClass.push("active");
          canClick = true;
        }

        coins.push(
          <div
            key={"playground-coin-" + coinvPos}
            className={coinClass.join(" ")}
          ></div>
        );

        if (assigned_players_map[cellActor.player] === "BOT") {
          player_icon.push(
            <div
              key={"playground-player"}
              className={
                "active-player-icon player-icon-" +
                cellActor.player +
                " icon-cell far fa-robot"
              }
            ></div>
          );
        }
      }

      cells.push(
        <div
          key={"playground-cell-" + cellId}
          className={classnames.join(" ")}
          onClick={
            canClick
              ? () =>
                  props.coinClickHandler(
                    props.game.active_player,
                    cellActor.coin,
                    props.game.dice_roll
                  )
              : undefined
          }
        >
          {coins}
          {player_icon}
        </div>
      );
    }
  }

  let classnames = [];
  classnames.push("board-item");
  classnames.push("playground");
  classnames.push("playground-" + props.color);
  classnames.push("rows-" + rows);
  classnames.push("cols-" + cols);

  return <div className={classnames.join(" ")}>{cells}</div>;
}

function Board(props) {
  const coin_position_map = getPositionMap(props.board);

  const board = [];
  board.push(
    <Home
      key="home"
      game={props.game}
      actor_positions={coin_position_map}
      initGame={props.initGame}
    />
  );

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    board.push(
      <Jail
        key={"jail-" + i}
        color={color}
        actor_positions={coin_position_map}
        game={props.game}
        coinClickHandler={props.coinClickHandler}
        diceClickHandler={props.diceClickHandler}
        trophyClickHandler={props.resetGame}
      />
    );
    board.push(
      <Playground
        key={"playground-" + i}
        color={color}
        cells={board_metadata[color].cells}
        actor_positions={coin_position_map}
        game={props.game}
        coinClickHandler={props.coinClickHandler}
      />
    );
  }

  if (props.game.game_state > 1) {
    // Show reset button
    board.push(
      <div key={"top-menu"} className="top-menu">
        <span
          title="Game Wiki"
          className="icon far fa-question"
          onClick={() =>
            window.open(
              "https://en.wikipedia.org/wiki/Ludo_(board_game)",
              "_blank"
            )
          }
        ></span>
        <span
          title="Reset Game"
          className="icon fas fa-times"
          onClick={() => {
            if (window.confirm("Reset the game?")) {
              props.resetGame();
            }
          }}
        ></span>
      </div>
    );
  }

  return <div className="board-container">{board}</div>;
}

function AssignmentBox(props) {
  if (props.game.game_state === 1) {
    // Assigned players map
    const assigned_players_map = {};
    for (const player of props.game.players) {
      assigned_players_map[player.color] = player.type;
    }

    const drag_items = [];
    drag_items.push(
      <div
        key="drag-item-human"
        className="drag-item icon-cell fad fa-user-tie"
        draggable="true"
        onDragStart={event => {
          event.target.classList.toggle("drag");
          props.playerDragStartHandler(event, "HUMAN");
        }}
        onDragEnd={event => {
          event.target.classList.toggle("drag");
        }}
      ></div>
    );
    if (props.game.players.length > 0) {
      drag_items.push(
        <div key="drag-item-partition" className="drag-item-partition"></div>
      );

      drag_items.push(
        <div
          key="drag-item-bot"
          className="drag-item icon-cell fad fa-robot"
          draggable="true"
          onDragStart={event => {
            event.target.classList.add("drag");
            props.playerDragStartHandler(event, "BOT");
          }}
          onDragEnd={event => {
            event.target.classList.remove("drag");
          }}
        ></div>
      );
    }

    const drop_items = [];
    for (const color of colors) {
      const assignedPlayer = [];

      const dropclass = [];
      dropclass.push("drop-item");
      dropclass.push("cell-" + color);

      if (assigned_players_map[color]) {
        const assignedclass = [];
        assignedclass.push("assigned-item");
        assignedclass.push("player-icon-" + color);
        assignedclass.push("far");
        if (assigned_players_map[color] === "HUMAN") {
          assignedclass.push("fa-user");
        }
        if (assigned_players_map[color] === "BOT") {
          assignedclass.push("fa-robot");
        }
        assignedPlayer.push(<div className={assignedclass.join(" ")}></div>);
        assignedPlayer.push(
          <div
            key={"drop-item-undo-" + color}
            className="undo icon-cell far fa-minus-circle"
            onClick={() => props.playerUndoHandler(color)}
          ></div>
        );

        drop_items.push(
          <div key={"drop-item-" + color} className={dropclass.join(" ")}>
            {assignedPlayer}
          </div>
        );
      } else {
        dropclass.push("droppable");

        drop_items.push(
          <div
            key={"drop-item-" + color}
            className={dropclass.join(" ")}
            onDragOver={event => {
              event.preventDefault();
              event.target.classList.add("hover");
            }}
            onDragLeave={event => {
              event.target.classList.remove("hover");
            }}
            onDrop={event => {
              event.target.classList.remove("hover");
              props.playerDropHandler(event, color);
            }}
          ></div>
        );
      }
    }

    const contents = [];
    // Show draggable section till all players not assigned
    if (props.game.players.length < 4) {
      contents.push(
        <div key="dragzone" className="dragzone">
          {drag_items}
        </div>
      );
      contents.push(
        <div key="direction-zone" className="direction-zone">
          <i className="icon-cell far fa-arrow-alt-down updown"></i>
        </div>
      );
    }
    contents.push(
      <div key="dropzone" className="dropzone">
        {drop_items}
      </div>
    );

    // Show next button only after two players are assigned
    if (props.game.players.length > 1) {
      contents.push(
        <div
          key="next-zone"
          className="next-zone"
          onClick={() => props.startClickHandler()}
        >
          <i className="icon-cell fas fa-chevron-right"></i>
        </div>
      );
    }

    return (
      <div className="assignment-box">
        <div className="contents">{contents}</div>
      </div>
    );
  } else {
    return "";
  }
}

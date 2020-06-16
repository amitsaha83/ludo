var players = ["red", "green", "blue", "yellow"];
var safe_cells = [0, 8, 13, 21, 26, 34, 39, 47];

var board_metadata = {
  green: {
    start: 0,
    turn: 50,
    finish: 104,
    dice: 216,
    jail: [210, 212, 220, 222],
    cells: [[49, 50, 51], [48, 151, 0], [47, 100, 1], [46, 101, 2], [45, 102, 3], [44, 103, 4]]
  },
  blue: {
    start: 13,
    turn: 11,
    finish: 117,
    dice: 229,
    jail: [223, 225, 233, 235],
    cells: [[5, 6, 7, 8, 9, 10], [116, 115, 114, 113, 112, 11], [17, 16, 15, 14, 13, 12]]
  },
  yellow: {
    start: 26,
    turn: 24,
    finish: 130,
    dice: 242,
    jail: [236, 238, 246, 248],
    cells: [[30, 129, 18], [29, 128, 19], [28, 127, 20], [27, 126, 21], [26, 125, 22], [25, 24, 23]]
  },
  red: {
    start: 39,
    turn: 37,
    finish: 143,
    dice: 255,
    jail: [249, 251, 259, 261],
    cells: [[38, 39, 40, 41, 42, 43], [37, 138, 139, 140, 141, 142], [36, 35, 34, 33, 32, 31]]
  }
};

var board_init = {
  green: {
    G1: { status: 0, jail_pos: 210, pos: 210, next_pos: 210 },
    G2: { status: 0, jail_pos: 212, pos: 212, next_pos: 212 },
    G3: { status: 0, jail_pos: 220, pos: 220, next_pos: 220 },
    G4: { status: 0, jail_pos: 222, pos: 222, next_pos: 222 }
  },
  blue: {
    B1: { status: 0, jail_pos: 223, pos: 223, next_pos: 223 },
    B2: { status: 0, jail_pos: 225, pos: 225, next_pos: 225 },
    B3: { status: 0, jail_pos: 233, pos: 233, next_pos: 233 },
    B4: { status: 0, jail_pos: 235, pos: 235, next_pos: 235 }
  },
  yellow: {
    Y1: { status: 0, jail_pos: 236, pos: 236, next_pos: 236 },
    Y2: { status: 0, jail_pos: 238, pos: 238, next_pos: 238 },
    Y3: { status: 0, jail_pos: 246, pos: 246, next_pos: 246 },
    Y4: { status: 0, jail_pos: 248, pos: 248, next_pos: 248 }
  },
  red: {
    R1: { status: 0, jail_pos: 249, pos: 249, next_pos: 249 },
    R2: { status: 0, jail_pos: 251, pos: 251, next_pos: 251 },
    R3: { status: 0, jail_pos: 259, pos: 259, next_pos: 259 },
    R4: { status: 0, jail_pos: 261, pos: 261, next_pos: 261 }
  }
};

var game_init = {
  game_state: 0,
  board_active: 0,
  active_player: -1,
  dice_roll: -1
};

var getPositionMap = function getPositionMap(board) {
  var coin_position_map = {};
  for (var player in board) {
    for (var coin in board[player]) {
      var coin_meta = board[player][coin];
      var status = coin_meta.status;
      if (coin_position_map[coin_meta.pos]) {
        coin_position_map[coin_meta.pos].push({ player: player, coin: coin, status: status });
      } else {
        coin_position_map[coin_meta.pos] = [{ player: player, coin: coin, status: status }];
      }
    }
  }

  return coin_position_map;
};
var _jsxFileName = "src/display-board.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Home(props) {
  if (props.game.game_state === 0) {
    return React.createElement(
      "div",
      { className: "board-item home start-btn-container", __source: {
          fileName: _jsxFileName,
          lineNumber: 4
        },
        __self: this
      },
      React.createElement("div", { className: "play-btn", onClick: function onClick() {
          return props.startGame();
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 5
        },
        __self: this
      })
    );
  }

  var cells = [];

  cells.push(React.createElement("div", { key: "home-cell-red-green", className: "home-cell cell-red-green", __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }));
  cells.push(React.createElement("div", {
    key: "home-cell-green-blue",
    className: "home-cell cell-green-blue",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }));
  cells.push(React.createElement("div", { key: "home-cell-center", className: "home-cell cell-center", __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }));
  cells.push(React.createElement("div", {
    key: "home-cell-yellow-red",
    className: "home-cell cell-yellow-red",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }));
  cells.push(React.createElement("div", {
    key: "home-cell-blue-yellow",
    className: "home-cell cell-blue-yellow",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }));

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = players[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var player = _step.value;

      var classnames = [];
      classnames.push("home-cell");
      classnames.push("cell-" + player);

      var coins = [];
      var coinClass = [];
      if (props.actor_positions[board_metadata[player].finish]) {
        classnames.push("occupied");

        var coinvPos = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = props.actor_positions[board_metadata[player].finish][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var coin = _step2.value;

            coinClass.push("coin");
            coinClass.push("coin-" + player);
            coinClass.push("coin-" + coinvPos);
            coins.push(React.createElement("div", {
              key: "home-coin-" + player,
              className: coinClass.join(" "),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 53
              },
              __self: this
            }));
            coinvPos++;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      cells.push(React.createElement(
        "div",
        { key: "home-cell-" + player, className: classnames.join(" "), __source: {
            fileName: _jsxFileName,
            lineNumber: 62
          },
          __self: this
        },
        coins
      ));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return React.createElement(
    "div",
    { className: "board-item home", __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    },
    cells
  );
}

function Jail(props) {
  var _this = this;

  var cells = [];

  var _loop = function _loop(i) {
    var classnames = [];
    var clickAction = "";
    var coins = [];
    var coinClass = [];
    var cellId = board_metadata[props.color].finish + i + 100;

    // Jail cells
    if (board_metadata[props.color].jail.includes(cellId)) {
      classnames.push("jail-cell");
      classnames.push("cell-" + cellId);

      if (props.actor_positions[board_metadata[props.color].finish]) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = props.actor_positions[board_metadata[props.color].finish][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var coin = _step3.value;

            if (board_init[props.color][coin.coin].jail_pos === cellId) {
              classnames.push("icon-cell fa fa-home");
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      var cell_actor = props.actor_positions[cellId] ? props.actor_positions[cellId].find(function (cell_actor) {
        return cell_actor.player === props.color;
      }) : undefined;

      if (cell_actor && cell_actor.status !== 2) {
        classnames.push("occupied");
        coinClass.push("coin");
        coinClass.push("coin-" + cell_actor.player);
        coinClass.push("coin-0");

        // Check if coin is active for play
        if (props.game.board_active && cell_actor.status == 1) {
          coinClass.push("glow");
          coinClass.push("active");
          clickAction = "playCoin";
        }

        coins.push(React.createElement("div", { key: "jail-coin-" + i, className: coinClass.join(" "), __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          },
          __self: _this
        }));
      }
    }
    // Center cell to show dice
    else if (board_metadata[props.color].dice === cellId) {
        classnames.push("cell-" + props.color);
        if (players[props.game.active_player] == props.color) {
          if (props.game.board_active) {
            classnames.push("dice-face");
            classnames.push("face-" + props.game.dice_roll);
          } else if (props.game.game_state === 1) {
            classnames.push("action-button dice");
            classnames.push("spinner");
            clickAction = "rollDice";
          } else if (props.game.game_state === 2) {
            classnames.push("action-button trophy");
            classnames.push("zoominout");
            clickAction = "gaveOver";
          }
        } else if (players[props.game.prev_player] == props.color) {
          classnames.push("dice-face");
          classnames.push("face-" + props.game.prev_roll);
          classnames.push("fade-out");
        }
      } else {
        classnames.push("cell-" + props.color);
      }

    var clickFunc = undefined;
    if (clickAction === "playCoin") {
      clickFunc = function clickFunc() {
        return props.coinClickHandler(props.game.active_player, props.actor_positions[cellId][0].coin, props.game.dice_roll);
      };
    } else if (clickAction === "rollDice") {
      clickFunc = function clickFunc() {
        return props.diceClickHandler(props.game.active_player);
      };
    } else if (clickAction === "gaveOver") {
      clickFunc = function clickFunc() {
        return props.trophyClickHandler();
      };
    }

    cells.push(React.createElement(
      "div",
      {
        key: "jail-cell-" + i,
        className: classnames.join(" "),
        onClick: clickFunc,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: _this
      },
      coins
    ));
  };

  for (var i = 0; i < 25; i++) {
    _loop(i);
  }

  var classnames = [];
  classnames.push("board-item");
  classnames.push("jail");
  classnames.push("jail-" + props.color);
  return React.createElement(
    "div",
    { className: classnames.join(" "), __source: {
        fileName: _jsxFileName,
        lineNumber: 174
      },
      __self: this
    },
    cells
  );
}

function Playground(props) {
  var _this2 = this;

  var cells = [];
  var rows = props.cells.length;
  var cols = props.cells[0].length;

  for (var i = 0; i < rows; i++) {
    var _loop2 = function _loop2(j) {
      var coins = [];
      var cellActor = undefined;
      var canClick = false;
      var cellId = props.cells[i][j];

      // Prepare classes for cell
      var classnames = [];
      classnames.push("cell-" + cellId);
      classnames.push("play-cell");

      if (cellId >= 100) {
        classnames.push("cell-" + props.color);
      }
      if (board_metadata[props.color] && board_metadata[props.color].start == cellId) {
        classnames.push("cell-" + props.color);
      }
      if (safe_cells.includes(cellId)) {
        classnames.push("icon-cell fa fa-life-ring");
      }

      // Check for cell occupancy
      if (props.actor_positions[cellId]) {
        classnames.push("occupied");

        // Determine cell actor
        cellActor = props.actor_positions[cellId].find(function (cell_actor) {
          return cell_actor.player === players[props.game.active_player];
        });
        cellActor = cellActor || props.actor_positions[cellId][0];

        // Handle multiple coins in cell
        var coinvPos = 0;
        var isCellActor = false;
        if (props.actor_positions[cellId].length > 1) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = props.actor_positions[cellId][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var coin = _step4.value;

              // Determine active coin
              if (!isCellActor && coin.player === players[props.game.active_player]) {
                isCellActor = true;
              } else {
                coins.push(React.createElement("div", {
                  key: "playground-coin-" + coinvPos,
                  className: "coin coin-" + coin.player + " coin-" + coinvPos,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 230
                  },
                  __self: _this2
                }));
                coinvPos++;
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }

        // Add coin DOM for active coin
        var _coinClass = [];
        _coinClass.push("coin");
        _coinClass.push("coin-" + cellActor.player);
        _coinClass.push("coin-" + coinvPos);

        if (props.game.board_active && cellActor.status === 1) {
          _coinClass.push("glow");
          _coinClass.push("active");
          canClick = true;
        }

        coins.push(React.createElement("div", {
          key: "playground-coin-" + coinvPos,
          className: _coinClass.join(" "),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 253
          },
          __self: _this2
        }));
      }

      cells.push(React.createElement(
        "div",
        {
          key: "playground-cell-" + cellId,
          className: classnames.join(" "),
          onClick: canClick ? function () {
            return props.coinClickHandler(props.game.active_player, cellActor.coin, props.game.dice_roll);
          } : undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 261
          },
          __self: _this2
        },
        coins
      ));
    };

    for (var j = 0; j < cols; j++) {
      _loop2(j);
    }
  }

  var classnames = [];
  classnames.push("board-item");
  classnames.push("playground");
  classnames.push("playground-" + props.color);
  classnames.push("rows-" + rows);
  classnames.push("cols-" + cols);

  return React.createElement(
    "div",
    { className: classnames.join(" "), __source: {
        fileName: _jsxFileName,
        lineNumber: 288
      },
      __self: this
    },
    cells
  );
}

function Board(props) {
  var coin_position_map = getPositionMap(props.board);

  var board = [];
  board.push(React.createElement(Home, {
    key: "home",
    game: props.game,
    actor_positions: coin_position_map,
    startGame: props.startGame,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 296
    },
    __self: this
  }));

  for (var i = 0; i < players.length; i++) {
    var color = players[i];
    board.push(React.createElement(Jail, {
      key: "jail-" + i,
      color: color,
      actor_positions: coin_position_map,
      game: props.game,
      coinClickHandler: props.coinClickHandler,
      diceClickHandler: props.diceClickHandler,
      trophyClickHandler: props.resetGame,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 307
      },
      __self: this
    }));
    board.push(React.createElement(Playground, {
      key: "playground-" + i,
      color: color,
      cells: board_metadata[color].cells,
      actor_positions: coin_position_map,
      game: props.game,
      coinClickHandler: props.coinClickHandler,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 318
      },
      __self: this
    }));
  }

  if (props.game.game_state > 0) {
    var _React$createElement;

    // Show reset button
    board.push(React.createElement(
      "div",
      { key: "top-menu", className: "top-menu", __source: {
          fileName: _jsxFileName,
          lineNumber: 332
        },
        __self: this
      },
      React.createElement(
        "span",
        {
          title: "Game Wiki",
          className: "icon info",
          onClick: function onClick() {
            return window.open("https://en.wikipedia.org/wiki/Ludo_(board_game)", "_blank");
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 333
          },
          __self: this
        },
        "\u24D8"
      ),
      React.createElement(
        "span",
        (_React$createElement = {
          title: "Reset Game",
          className: "icon close",
          onClick: function onClick() {
            return props.resetGame();
          }
        }, _defineProperty(_React$createElement, "onClick", function onClick() {
          if (window.confirm("Reset the game?")) {
            props.resetGame();
          }
        }), _defineProperty(_React$createElement, "__source", {
          fileName: _jsxFileName,
          lineNumber: 345
        }), _defineProperty(_React$createElement, "__self", this), _React$createElement),
        "\xD7"
      )
    ));
  }

  return React.createElement(
    "div",
    { className: "board-container", __source: {
        fileName: _jsxFileName,
        lineNumber: 361
      },
      __self: this
    },
    board
  );
}
var _jsxFileName = "src/game.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.state = {
      game: Object.assign({}, game_init),
      board: JSON.parse(JSON.stringify(board_init)) // Deep clone
    };

    _this.startGame = _this.startGame.bind(_this);
    _this.resetGame = _this.resetGame.bind(_this);
    _this.rollDice = _this.rollDice.bind(_this);
    _this.play = _this.play.bind(_this);
    return _this;
  }

  _createClass(Game, [{
    key: "startGame",
    value: function startGame() {
      var game = Object.assign({}, this.state.game);
      this.setState({
        game: Object.assign({}, game, {
          game_state: 1,
          active_player: 0
        })
      });
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.setState({
        game: Object.assign({}, game_init),
        board: JSON.parse(JSON.stringify(board_init)) // Deep clone
      });
    }
  }, {
    key: "nextPlayer",
    value: function nextPlayer(player) {
      return (player + 1) % players.length;
    }
  }, {
    key: "nextPosition",
    value: function nextPosition(curr_pos, dice_roll, home_turn, finish) {
      var next_pos = -1;
      if (curr_pos > 200) {
        next_pos = curr_pos;
      } else if (curr_pos >= 100) {
        // special handling for 151
        var cpos = curr_pos === 151 ? curr_pos - 52 : curr_pos;

        next_pos = cpos + dice_roll;
        next_pos = next_pos <= finish ? next_pos : curr_pos;
      } else {
        next_pos = (curr_pos + dice_roll) % 52;
        // Check for home run
        if (curr_pos <= home_turn && home_turn < curr_pos + dice_roll) {
          next_pos = next_pos + 100;
        }
      }
      return next_pos;
    }
  }, {
    key: "rollDice",
    value: function rollDice(player_idx) {
      var board = Object.assign({}, this.state.board);
      var game = Object.assign({}, this.state.game);

      var canPlay = false;
      var player = players[player_idx];

      // Dice Roll
      var dice_roll = Math.floor(Math.random() * 6 + 1);
      // const dice_roll = parseInt(document.getElementById("dice").value);

      // Calculate status and next position for player coins
      for (var coin in board[player]) {
        var curr_position = board[player][coin].pos;

        // Ignore coins who have finished
        if (curr_position === board_metadata[player].finish) {
          continue;
        }

        // Compute next position
        var next_position = this.nextPosition(curr_position, dice_roll, board_metadata[player].turn, board_metadata[player].finish);

        // On dice roll outcome 6
        if (dice_roll == 6) {
          // Activate jailed coins
          if (curr_position > 200) {
            canPlay = true;
            board[player][coin].status = 1;
            board[player][coin].next_pos = board_metadata[player].start;
          }
          // Activate board coins
          else if (curr_position < 52) {
              canPlay = true;
              board[player][coin].status = 1;
              board[player][coin].next_pos = next_position;
            }
        }
        // Other dice roll outcomes
        else {
            if (next_position != curr_position) {
              canPlay = true;
              board[player][coin].status = 1;
              board[player][coin].next_pos = next_position;
            }
          }
      }

      if (canPlay) {
        game = Object.assign({}, game, {
          board_active: 1,
          active_player: player_idx,
          dice_roll: dice_roll,
          prev_player: undefined,
          prev_roll: undefined
        });
      } else {
        var next_player_idx = this.nextPlayer(player_idx);
        game = Object.assign({}, game, {
          board_active: 0,
          active_player: next_player_idx,
          dice_roll: -1,
          prev_player: player_idx,
          prev_roll: dice_roll
        });
      }

      this.setState({
        game: game,
        board: board
      });
    }
  }, {
    key: "play",
    value: function play(player_idx, coin, dice_roll) {
      var game = Object.assign({}, this.state.game);
      var board = Object.assign({}, this.state.board);
      var coin_position_map = getPositionMap(board);

      var player = players[player_idx];
      var player_next_pos = board[player][coin].next_pos;

      var playAgain = false;
      var gaveOver = false;

      // Handle next_pos having existing player
      if (!safe_cells.includes(player_next_pos)) {
        // Fetching existing_player, if any, from next_pos
        var existing_player = coin_position_map[player_next_pos] ? coin_position_map[player_next_pos][0] : undefined;

        // Handle next_pos has another coin of different player, send coin to jail
        if (existing_player && existing_player.player != player) {
          var jail_position = board[existing_player.player][existing_player.coin].jail_pos;
          board[existing_player.player][existing_player.coin].pos = jail_position;
          board[existing_player.player][existing_player.coin].next_pos = jail_position;
          playAgain = true;
        }
      }

      // Handle next_pos is home/finish
      if (player_next_pos === board_metadata[player].finish) {
        board[player][coin].pos = player_next_pos;
        board[player][coin].status = 2;

        // Check game over condition
        if (Object.values(board[player]).every(function (coin) {
          return coin.status === 2;
        })) {
          gaveOver = true;
        } else {
          playAgain = true;
        }
      } else {
        // Move the active coin
        if (board[player][coin].status === 1) {
          board[player][coin].pos = player_next_pos;
        }

        // Remove active status of other coins for player
        for (var _coin in board[player]) {
          if (board[player][_coin].status === 1) {
            board[player][_coin].status = 0;
          }
        }
      }

      if (gaveOver) {
        game = Object.assign({}, game, {
          game_state: 2,
          board_active: 0,
          active_player: player_idx,
          dice_roll: -1
        });
      }
      // Player rolls again
      else if (playAgain || dice_roll == 6) {
          game = Object.assign({}, game, {
            board_active: 0,
            active_player: player_idx,
            dice_roll: -1
          });
        }
        // Next player's turn
        else {
            var next_player_idx = this.nextPlayer(player_idx);
            game = Object.assign({}, game, {
              board_active: 0,
              active_player: next_player_idx,
              dice_roll: -1
            });
          }

      this.setState({
        game: game,
        board: board
      });
    }
  }, {
    key: "render",
    value: function render() {
      var game = [];

      game.push(React.createElement(Board, {
        key: "board",
        board: this.state.board,
        game: this.state.game,
        startGame: this.startGame,
        resetGame: this.resetGame,
        coinClickHandler: this.play,
        diceClickHandler: this.rollDice,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        },
        __self: this
      }));

      return React.createElement(
        "div",
        { className: "game-container", __source: {
            fileName: _jsxFileName,
            lineNumber: 242
          },
          __self: this
        },
        game
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 246
  },
  __self: this
}), document.getElementById("root"));

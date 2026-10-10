'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowRotateRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaKeyboard,
  FaTrophy,
} from 'react-icons/fa6';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type GameMode = 'snake' | 'tetris' | 'breakout';
type TetrisPiece = { shape: number[][]; color: number; x: number; y: number };
type TetrisState = {
  board: number[][];
  piece: TetrisPiece;
  score: number;
  lines: number;
  over: boolean;
};
type BreakoutState = {
  bricks: boolean[][];
  ball: Point;
  dx: number;
  dy: number;
  paddleX: number;
  score: number;
  lives: number;
  over: boolean;
  won: boolean;
};

const SIZE = 16;
const START_SNAKE: Point[] = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
];
const DIR_VECTOR: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};
const TETRIS_COLS = 10;
const TETRIS_ROWS = 18;
const TETROMINOES: number[][][] = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
];
const BREAKOUT_COLS = 14;
const BREAKOUT_ROWS = 16;
const BRICK_ROWS = 4;
const PADDLE_ROW = 14;
const PADDLE_WIDTH = 4;

function getRandomFood(snake: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) {
        free.push({ x, y });
      }
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 12, y: 4 };
}

function samePoint(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function makeTetrisPiece(): TetrisPiece {
  const index = Math.floor(Math.random() * TETROMINOES.length);
  return {
    shape: TETROMINOES[index].map((row) => [...row]),
    color: index + 1,
    x: 3,
    y: 0,
  };
}

function createTetrisState(): TetrisState {
  const board = Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0));
  return { board, piece: makeTetrisPiece(), score: 0, lines: 0, over: false };
}

function collides(
  board: number[][],
  piece: TetrisPiece,
  xOffset = 0,
  yOffset = 0,
  shape = piece.shape,
) {
  return shape.some((row, rowIndex) =>
    row.some((filled, colIndex) => {
      if (!filled) return false;
      const x = piece.x + colIndex + xOffset;
      const y = piece.y + rowIndex + yOffset;
      if (x < 0 || x >= TETRIS_COLS || y >= TETRIS_ROWS) return true;
      return y >= 0 && Boolean(board[y]?.[x]);
    }),
  );
}

function lockTetrisPiece(state: TetrisState): TetrisState {
  const board = state.board.map((row) => [...row]);
  let overflow = false;

  state.piece.shape.forEach((row, rowIndex) => {
    row.forEach((filled, colIndex) => {
      if (!filled) return;
      const x = state.piece.x + colIndex;
      const y = state.piece.y + rowIndex;
      if (y < 0) {
        overflow = true;
      } else if (y < TETRIS_ROWS && x >= 0 && x < TETRIS_COLS) {
        board[y][x] = state.piece.color;
      }
    });
  });

  const keptRows = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = TETRIS_ROWS - keptRows.length;
  const nextBoard = [
    ...Array.from({ length: cleared }, () => Array(TETRIS_COLS).fill(0)),
    ...keptRows,
  ];
  const nextPiece = makeTetrisPiece();
  const nextState: TetrisState = {
    board: nextBoard,
    piece: nextPiece,
    score: state.score + ([0, 100, 300, 500, 800][cleared] ?? 800),
    lines: state.lines + cleared,
    over: overflow || collides(nextBoard, nextPiece),
  };
  return nextState;
}

function moveTetrisPiece(state: TetrisState, dx: number, dy: number): TetrisState {
  if (state.over) return state;
  if (!collides(state.board, state.piece, dx, dy)) {
    return {
      ...state,
      piece: { ...state.piece, x: state.piece.x + dx, y: state.piece.y + dy },
      score: dy > 0 ? state.score + 1 : state.score,
    };
  }
  return dy > 0 ? lockTetrisPiece(state) : state;
}

function rotateTetrisPiece(state: TetrisState): TetrisState {
  if (state.over) return state;
  const rotated = state.piece.shape[0].map((_, colIndex) =>
    state.piece.shape.map((row) => row[colIndex]).reverse(),
  );
  for (const shift of [0, -1, 1, -2, 2]) {
    if (!collides(state.board, state.piece, shift, 0, rotated)) {
      return {
        ...state,
        piece: { ...state.piece, x: state.piece.x + shift, shape: rotated },
      };
    }
  }
  return state;
}

function hardDropTetrisPiece(state: TetrisState): TetrisState {
  if (state.over) return state;
  let piece = { ...state.piece };
  while (!collides(state.board, piece, 0, 1)) {
    piece = { ...piece, y: piece.y + 1 };
  }
  const distance = piece.y - state.piece.y;
  return lockTetrisPiece({ ...state, piece, score: state.score + distance * 2 });
}

function createBreakoutState(): BreakoutState {
  return {
    bricks: Array.from({ length: BRICK_ROWS }, () => Array(BREAKOUT_COLS).fill(true)),
    ball: { x: 7, y: 12 },
    dx: 1,
    dy: -1,
    paddleX: 5,
    score: 0,
    lives: 3,
    over: false,
    won: false,
  };
}

function stepBreakout(state: BreakoutState): BreakoutState {
  if (state.over || state.won) return state;

  let dx = state.dx;
  let dy = state.dy;
  let nx = state.ball.x + dx;
  let ny = state.ball.y + dy;
  let bricks = state.bricks;
  let score = state.score;

  if (nx < 0 || nx >= BREAKOUT_COLS) {
    dx *= -1;
    nx = state.ball.x + dx;
  }
  if (ny < 0) {
    dy = 1;
    ny = state.ball.y + dy;
  }

  if (ny >= 0 && ny < BRICK_ROWS && bricks[ny]?.[nx]) {
    bricks = bricks.map((row) => [...row]);
    bricks[ny][nx] = false;
    score += 10;
    dy *= -1;
    ny = state.ball.y + dy;
  }

  if (ny === PADDLE_ROW && dy > 0 && nx >= state.paddleX && nx < state.paddleX + PADDLE_WIDTH) {
    dy = -1;
    if (nx <= state.paddleX) dx = -1;
    if (nx >= state.paddleX + PADDLE_WIDTH - 1) dx = 1;
    ny = state.ball.y + dy;
  }

  if (ny > PADDLE_ROW) {
    const lives = state.lives - 1;
    if (lives <= 0) {
      return { ...state, score, lives: 0, over: true };
    }
    return {
      ...state,
      bricks,
      score,
      lives,
      ball: { x: state.paddleX + 1, y: PADDLE_ROW - 1 },
      dx: Math.random() < 0.5 ? -1 : 1,
      dy: -1,
    };
  }

  const won = bricks.every((row) => row.every((brick) => !brick));
  return { ...state, bricks, score, ball: { x: nx, y: ny }, dx, dy, won };
}

export function SnakeGame() {
  const [mode, setMode] = useState<GameMode>('snake');
  const [snake, setSnake] = useState<Point[]>(START_SNAKE);
  const [food, setFood] = useState<Point>({ x: 12, y: 4 });
  const [queuedDirection, setQueuedDirection] = useState<Direction>('right');
  const [running, setRunning] = useState(true);
  const [snakeOver, setSnakeOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snakeBest, setSnakeBest] = useState(0);
  const [tetris, setTetris] = useState<TetrisState>(createTetrisState);
  const [tetrisBest, setTetrisBest] = useState(0);
  const [breakout, setBreakout] = useState<BreakoutState>(createBreakoutState);
  const [breakoutBest, setBreakoutBest] = useState(0);
  const [flash, setFlash] = useState(false);
  const directionRef = useRef<Direction>('right');

  useEffect(() => {
    // Keep server-rendered and first client-rendered markup identical, then randomize after hydration.
    setFood(getRandomFood(START_SNAKE));
  }, []);

  useEffect(() => {
    const storedSnake = Number(window.localStorage.getItem('rizki-snake-best') ?? '0');
    const storedTetris = Number(window.localStorage.getItem('rizki-tetris-best') ?? '0');
    const storedBreakout = Number(window.localStorage.getItem('rizki-breakout-best') ?? '0');
    setSnakeBest(Number.isFinite(storedSnake) ? storedSnake : 0);
    setTetrisBest(Number.isFinite(storedTetris) ? storedTetris : 0);
    setBreakoutBest(Number.isFinite(storedBreakout) ? storedBreakout : 0);
  }, []);

  useEffect(() => {
    directionRef.current = queuedDirection;
  }, [queuedDirection]);

  useEffect(() => {
    if (!running || mode !== 'snake' || snakeOver) return;
    const speed = Math.max(82, 145 - score * 5);
    const timer = window.setInterval(() => {
      setSnake((current) => {
        const nextDirection = directionRef.current;
        const head = current[0];
        const delta = DIR_VECTOR[nextDirection];
        const nextHead = { x: head.x + delta.x, y: head.y + delta.y };
        const hitWall = nextHead.x < 0 || nextHead.x >= SIZE || nextHead.y < 0 || nextHead.y >= SIZE;
        const ateFood = samePoint(nextHead, food);
        const bodyToCheck = ateFood ? current : current.slice(0, -1);
        const hitSelf = bodyToCheck.some((segment) => samePoint(segment, nextHead));

        if (hitWall || hitSelf) {
          setRunning(false);
          setSnakeOver(true);
          setFlash(true);
          window.setTimeout(() => setFlash(false), 280);
          return current;
        }

        const nextSnake = [nextHead, ...current];
        if (ateFood) {
          const nextScore = score + 1;
          setScore(nextScore);
          setSnakeBest((previous) => {
            const nextBest = Math.max(previous, nextScore);
            window.localStorage.setItem('rizki-snake-best', String(nextBest));
            return nextBest;
          });
          setFood(getRandomFood(nextSnake));
          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, speed);
    return () => window.clearInterval(timer);
  }, [food, mode, running, score, snakeOver]);

  useEffect(() => {
    if (!running || mode !== 'tetris' || tetris.over) return;
    const speed = Math.max(190, 620 - Math.floor(tetris.lines / 2) * 45);
    const timer = window.setInterval(() => {
      setTetris((current) => moveTetrisPiece(current, 0, 1));
    }, speed);
    return () => window.clearInterval(timer);
  }, [mode, running, tetris.lines, tetris.over]);

  useEffect(() => {
    if (!running || mode !== 'breakout' || breakout.over || breakout.won) return;
    const timer = window.setInterval(() => setBreakout((current) => stepBreakout(current)), 190);
    return () => window.clearInterval(timer);
  }, [breakout.over, breakout.won, mode, running]);

  useEffect(() => {
    window.localStorage.setItem('rizki-tetris-best', String(tetrisBest));
  }, [tetrisBest]);

  useEffect(() => {
    window.localStorage.setItem('rizki-breakout-best', String(breakoutBest));
  }, [breakoutBest]);

  const changeDirection = useCallback((next: Direction) => {
    if (OPPOSITE[directionRef.current] === next) return;
    setQueuedDirection(next);
  }, []);

  const restartSnake = useCallback((direction: Direction = 'right') => {
    const fresh = START_SNAKE.map((point) => ({ ...point }));
    setSnake(fresh);
    setFood(getRandomFood(fresh));
    setScore(0);
    setQueuedDirection(direction);
    directionRef.current = direction;
    setSnakeOver(false);
    setFlash(false);
    setRunning(true);
  }, []);

  const restartTetris = useCallback(() => {
    setTetris(createTetrisState());
    setRunning(true);
  }, []);

  const restartBreakout = useCallback(() => {
    setBreakout(createBreakoutState());
    setRunning(true);
  }, []);

  const moveTetris = useCallback((dx: number, dy: number) => {
    setTetris((current) => moveTetrisPiece(current, dx, dy));
    setRunning(true);
  }, []);

  const rotateTetris = useCallback(() => {
    setTetris((current) => rotateTetrisPiece(current));
    setRunning(true);
  }, []);

  const dropTetris = useCallback(() => {
    setTetris((current) => hardDropTetrisPiece(current));
    setRunning(true);
  }, []);

  const movePaddle = useCallback((dx: number) => {
    setBreakout((current) => ({
      ...current,
      paddleX: Math.max(0, Math.min(BREAKOUT_COLS - PADDLE_WIDTH, current.paddleX + dx)),
    }));
    setRunning(true);
  }, []);

  const move = useCallback((direction: Direction) => {
    if (mode === 'snake') {
      if (snakeOver) {
        restartSnake(direction);
      } else {
        changeDirection(direction);
        setRunning(true);
      }
      return;
    }
    if (mode === 'tetris') {
      if (direction === 'left') moveTetris(-1, 0);
      if (direction === 'right') moveTetris(1, 0);
      if (direction === 'down') moveTetris(0, 1);
      if (direction === 'up') rotateTetris();
      return;
    }
    if (direction === 'left') movePaddle(-2);
    if (direction === 'right') movePaddle(2);
    if (direction === 'up') setRunning(true);
  }, [changeDirection, mode, movePaddle, moveTetris, restartSnake, rotateTetris, snakeOver]);

  const actionA = useCallback(() => {
    if (mode === 'snake') {
      if (snakeOver) restartSnake();
      else setRunning(true);
      return;
    }
    if (mode === 'tetris') {
      rotateTetris();
      return;
    }
    if (breakout.over || breakout.won) restartBreakout();
    else setRunning(true);
  }, [breakout.over, breakout.won, mode, restartBreakout, restartSnake, rotateTetris, snakeOver]);

  const actionB = useCallback(() => {
    if (mode === 'snake') restartSnake();
    else if (mode === 'tetris') dropTetris();
    else restartBreakout();
  }, [dropTetris, mode, restartBreakout, restartSnake]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const mapping: Record<string, Direction> = {
        arrowup: 'up',
        w: 'up',
        arrowdown: 'down',
        s: 'down',
        arrowleft: 'left',
        a: 'left',
        arrowright: 'right',
        d: 'right',
      };
      if (key === ' ' || key === 'enter') {
        event.preventDefault();
        if (mode === 'tetris') dropTetris();
        else if (mode === 'breakout') actionA();
        else setRunning((value) => !value);
        return;
      }
      if (key === 'escape') {
        setRunning((value) => !value);
        return;
      }
      const direction = mapping[key];
      if (!direction) return;
      if (mode === 'breakout' && direction !== 'left' && direction !== 'right') return;
      event.preventDefault();
      move(direction);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [actionA, dropTetris, mode, move]);

  useEffect(() => {
    if (tetris.score > tetrisBest) {
      setTetrisBest(tetris.score);
      window.localStorage.setItem('rizki-tetris-best', String(tetris.score));
    }
  }, [tetris.score, tetrisBest]);

  useEffect(() => {
    if (breakout.score > breakoutBest) {
      setBreakoutBest(breakout.score);
      window.localStorage.setItem('rizki-breakout-best', String(breakout.score));
    }
  }, [breakout.score, breakoutBest]);

  const cells = useMemo(
    () => Array.from({ length: SIZE * SIZE }, (_, index) => ({
      x: index % SIZE,
      y: Math.floor(index / SIZE),
    })),
    [],
  );

  const tetrisCells = useMemo(() => {
    const board = tetris.board.map((row) => [...row]);
    tetris.piece.shape.forEach((row, rowIndex) => {
      row.forEach((filled, colIndex) => {
        const x = tetris.piece.x + colIndex;
        const y = tetris.piece.y + rowIndex;
        if (filled && y >= 0 && y < TETRIS_ROWS && x >= 0 && x < TETRIS_COLS) {
          board[y][x] = tetris.piece.color;
        }
      });
    });
    return board.flat();
  }, [tetris]);

  const breakoutCells = useMemo(
    () => Array.from({ length: BREAKOUT_ROWS * BREAKOUT_COLS }, (_, index) => ({
      x: index % BREAKOUT_COLS,
      y: Math.floor(index / BREAKOUT_COLS),
    })),
    [],
  );

  const scoreNow = mode === 'snake' ? score : mode === 'tetris' ? tetris.score : breakout.score;
  const bestNow = mode === 'snake' ? snakeBest : mode === 'tetris' ? tetrisBest : breakoutBest;
  const scoreLabel = mode === 'tetris' ? 'POINTS' : mode === 'breakout' ? 'POINTS' : 'SCORE';
  const currentOver = mode === 'snake' ? snakeOver : mode === 'tetris' ? tetris.over : breakout.over || breakout.won;
  const statusText = currentOver
    ? (mode === 'breakout' && breakout.won ? 'ALL BRICKS CLEARED' : 'GAME OVER')
    : running ? 'SYSTEM RUNNING' : 'SYSTEM PAUSED';
  const modeLabel = mode === 'breakout' ? 'BRICK BREAKER' : mode.toUpperCase();
  const controlsHint = mode === 'snake'
    ? 'D-PAD MOVE  /  B RESTART'
    : mode === 'tetris'
      ? 'D-PAD MOVE  /  A ROTATE  /  B DROP'
      : 'D-PAD LEFT/RIGHT  /  A RESUME';
  const statusLedOn = running && !currentOver;

  const chooseMode = (next: GameMode) => {
    setMode(next);
    setRunning(true);
    if (next === 'snake' && snakeOver) restartSnake();
  };

  const nextMode = () => {
    const modes: GameMode[] = ['snake', 'tetris', 'breakout'];
    chooseMode(modes[(modes.indexOf(mode) + 1) % modes.length]);
  };

  const restartActiveGame = () => {
    if (mode === 'snake') restartSnake();
    else if (mode === 'tetris') restartTetris();
    else restartBreakout();
  };

  return (
    <section className="snake-section arcade-section" data-reveal>
      <div className="snake-copy">
        <span className="section-index">06 / POCKET-ARCADE</span>
        <h2>Pick your<br /><span>pixel poison.</span></h2>
        <p>
          Three tiny classics, one pocket-sized console. Chase a high score in Snake,
          stack clean lines in Tetris, or break every brick. Your best scores stay on this device.
        </p>

        <div className="snake-console arcade-console">
          <div className="snake-console-row">
            <span><FaKeyboard /> {mode === 'snake' ? 'WASD / ARROWS' : mode === 'tetris' ? 'ARROWS / SPACE' : 'LEFT / RIGHT'}</span>
            <span><FaTrophy /> BEST {String(bestNow).padStart(2, '0')}</span>
          </div>
          <div className="snake-score">
            <strong>{String(scoreNow).padStart(2, '0')}</strong>
            <span>{scoreLabel}</span>
          </div>
          <div className="arcade-console-note">
            {mode === 'snake' && 'Eat the pixel. Avoid yourself.'}
            {mode === 'tetris' && String(tetris.lines).padStart(2, '0') + ' LINES CLEARED'}
            {mode === 'breakout' && String(breakout.lives).padStart(2, '0') + ' LIVES LEFT'}
          </div>
          <button className="snake-reset" onClick={restartActiveGame} data-cursor>
            <FaArrowRotateRight /> {currentOver ? 'PLAY AGAIN' : 'RESTART GAME'}
          </button>
        </div>

        <p className="arcade-controls-hint">{controlsHint}</p>
      </div>

      <div className={flash ? 'snake-gameboy shake' : 'snake-gameboy'}>
        <div className="gameboy-top">
          <span className="gameboy-brand">RIZKI BOY</span>
          <span className="gameboy-model">DMG-01 // RR</span>
        </div>

        <div className="gameboy-library" role="group" aria-label="Choose a Game Boy game">
          <button
            className={mode === 'snake' ? 'gameboy-game-tab is-active' : 'gameboy-game-tab'}
            aria-pressed={mode === 'snake'}
            onClick={() => chooseMode('snake')}
          >
            <span className="game-tab-icon" aria-hidden="true">↝</span>
            SNAKE
          </button>
          <button
            className={mode === 'tetris' ? 'gameboy-game-tab is-active' : 'gameboy-game-tab'}
            aria-pressed={mode === 'tetris'}
            onClick={() => chooseMode('tetris')}
          >
            <span className="game-tab-icon" aria-hidden="true">▦</span>
            TETRIS
          </button>
          <button
            className={mode === 'breakout' ? 'gameboy-game-tab is-active' : 'gameboy-game-tab'}
            aria-pressed={mode === 'breakout'}
            onClick={() => chooseMode('breakout')}
          >
            <span className="game-tab-icon" aria-hidden="true">▤</span>
            BRICKS
          </button>
        </div>

        <div className="gameboy-screen-frame">
          <div className="gameboy-screen">
            <div className="gameboy-screen-header">
              <span>{modeLabel}</span>
              <span>{String(scoreNow).padStart(2, '0')}</span>
            </div>

            {mode === 'snake' && (
              <div className="snake-board" role="img" aria-label="Snake game board">
                {cells.map((cell) => {
                  const snakeIndex = snake.findIndex((segment) => samePoint(segment, cell));
                  const isHead = snakeIndex === 0;
                  const isFood = samePoint(food, cell);
                  return (
                    <div className="snake-cell" key={cell.y * SIZE + cell.x}>
                      {isFood && (
                        <motion.span
                          className="snake-food"
                          animate={{ scale: [1, 1.45, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                      {snakeIndex >= 0 && (
                        <motion.span
                          layout
                          className={isHead ? 'snake-segment snake-head' : 'snake-segment'}
                          transition={{ layout: { duration: 0.08 } }}
                        >
                          {isHead && <span className="snake-eyes">••</span>}
                        </motion.span>
                      )}
                    </div>
                  );
                })}
                {snakeOver && <div className="arcade-board-overlay"><strong>GAME OVER</strong><span>Press A to retry</span></div>}
              </div>
            )}

            {mode === 'tetris' && (
              <div className="arcade-board-wrap tetris-board-wrap">
                <div className="tetris-board" role="img" aria-label="Tetris board">
                  {tetrisCells.map((cell, index) => (
                    <div
                      className={cell ? 'tetris-cell filled tetris-color-' + cell : 'tetris-cell'}
                      key={index}
                    />
                  ))}
                </div>
                {tetris.over && (
                  <div className="arcade-board-overlay"><strong>GAME OVER</strong><span>Press A to retry</span></div>
                )}
              </div>
            )}

            {mode === 'breakout' && (
              <div className="arcade-board-wrap breakout-board-wrap">
                <div className="breakout-board" role="img" aria-label="Brick Breaker board">
                  {breakoutCells.map((cell) => {
                    const isBrick = cell.y < BRICK_ROWS && Boolean(breakout.bricks[cell.y]?.[cell.x]);
                    const isBall = samePoint(cell, breakout.ball);
                    const isPaddle = cell.y === PADDLE_ROW
                      && cell.x >= breakout.paddleX
                      && cell.x < breakout.paddleX + PADDLE_WIDTH;
                    const className = [
                      'breakout-cell',
                      isBrick ? 'brick brick-color-' + (cell.y % 4 + 1) : '',
                      isBall ? 'ball' : '',
                      isPaddle ? 'paddle' : '',
                    ].filter(Boolean).join(' ');
                    return <div className={className} key={cell.y * BREAKOUT_COLS + cell.x} />;
                  })}
                </div>
                {(breakout.over || breakout.won) && (
                  <div className="arcade-board-overlay">
                    <strong>{breakout.won ? 'YOU WIN!' : 'GAME OVER'}</strong>
                    <span>Press A to play again</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="gameboy-led-row">
          <span className={statusLedOn ? 'led-on' : 'led-off'} />
          <small>{currentOver ? 'END OF LEVEL' : running ? 'POWER ON' : 'PAUSED'}</small>
        </div>

        <div className="gameboy-controls">
          <div className="dpad" aria-label="Directional pad">
            <button className="dpad-up" onClick={() => move('up')} aria-label={mode === 'tetris' ? 'Rotate piece up' : 'Move up'}>
              <FaChevronUp />
            </button>
            <button className="dpad-left" onClick={() => move('left')} aria-label="Move left"><FaChevronLeft /></button>
            <button className="dpad-center" aria-hidden="true" tabIndex={-1} />
            <button className="dpad-right" onClick={() => move('right')} aria-label="Move right"><FaChevronRight /></button>
            <button className="dpad-down" onClick={() => move('down')} aria-label="Move down"><FaChevronDown /></button>
          </div>

          <div className="gameboy-action-area">
            <button className="gb-button gb-b" onClick={actionB} aria-label={mode === 'tetris' ? 'B button: hard drop' : 'B button: restart game'}>B</button>
            <button className="gb-button gb-a" onClick={actionA} aria-label={mode === 'tetris' ? 'A button: rotate piece' : 'A button: play or resume'}>A</button>
          </div>
        </div>

        <div className="gameboy-menu">
          <button onClick={nextMode} data-cursor aria-label="Select next game">SELECT</button>
          <button onClick={() => setRunning((value) => !value)} data-cursor>{running ? 'PAUSE' : 'START'}</button>
        </div>

        <div className="gameboy-speaker" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>

        <div className="gameboy-toggle-row">
          <span>POWER</span>
          <button
            className={statusLedOn ? 'power-toggle on' : 'power-toggle'}
            onClick={() => setRunning((value) => !value)}
            data-cursor
            aria-label={running ? 'Pause game' : 'Resume game'}
          >
            <span />
          </button>
          <span>{statusLedOn ? 'ON' : 'OFF'}</span>
        </div>

        <div className="snake-status">
          <span className={statusLedOn ? 'led-on' : 'led-off'} />
          {statusText}
        </div>
      </div>
    </section>
  );
}

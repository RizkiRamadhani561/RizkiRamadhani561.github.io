'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRotateRight, FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaKeyboard, FaTrophy } from 'react-icons/fa6';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';

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

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(START_SNAKE);
  const [food, setFood] = useState<Point>(() => getRandomFood(START_SNAKE));
  const [direction, setDirection] = useState<Direction>('right');
  const [queuedDirection, setQueuedDirection] = useState<Direction>('right');
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [flash, setFlash] = useState(false);
  const directionRef = useRef<Direction>('right');

  useEffect(() => {
    const saved = Number(window.localStorage.getItem('rizki-snake-best') ?? '0');
    if (Number.isFinite(saved)) setBest(saved);
  }, []);

  useEffect(() => {
    directionRef.current = queuedDirection;
  }, [queuedDirection]);

  const changeDirection = useCallback((next: Direction) => {
    if (OPPOSITE[directionRef.current] === next) return;
    setQueuedDirection(next);
  }, []);

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
      const next = mapping[key];
      if (!next) return;
      event.preventDefault();
      changeDirection(next);
      setRunning(true);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [changeDirection]);

  useEffect(() => {
    if (!running) return;
    const speed = Math.max(82, 145 - score * 5);
    const timer = window.setInterval(() => {
      setSnake((current) => {
        const nextDirection = directionRef.current;
        setDirection(nextDirection);

        const head = current[0];
        const delta = DIR_VECTOR[nextDirection];
        const nextHead = { x: head.x + delta.x, y: head.y + delta.y };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= SIZE;

        const ateFood = samePoint(nextHead, food);
        const bodyToCheck = ateFood ? current : current.slice(0, -1);
        const hitSelf = bodyToCheck.some((segment) => samePoint(segment, nextHead));

        if (hitWall || hitSelf) {
          setRunning(false);
          setFlash(true);
          window.setTimeout(() => setFlash(false), 280);
          return current;
        }

        const nextSnake = [nextHead, ...current];
        if (ateFood) {
          const nextScore = score + 1;
          setScore(nextScore);
          setBest((previous) => {
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
  }, [food, running, score]);

  const reset = () => {
    const fresh = START_SNAKE.map((point) => ({ ...point }));
    setSnake(fresh);
    setFood(getRandomFood(fresh));
    setScore(0);
    setDirection('right');
    setQueuedDirection('right');
    directionRef.current = 'right';
    setFlash(false);
    setRunning(true);
  };

  const cells = useMemo(
    () =>
      Array.from({ length: SIZE * SIZE }, (_, index) => ({
        x: index % SIZE,
        y: Math.floor(index / SIZE),
      })),
    [],
  );

  return (
    <section className="snake-section" data-reveal>
      <div className="snake-copy">
        <span className="section-index">06 / SNAKE//PLAYGROUND</span>
        <h2>Break the pattern.<br /><span>Play the system.</span></h2>
        <p>
          A small interactive experiment built directly into the portfolio. Guide the snake,
          collect the pixels, beat your best score, and watch the board speed up.
        </p>

        <div className="snake-console">
          <div className="snake-console-row">
            <span><FaKeyboard /> WASD / ARROWS</span>
            <span><FaTrophy /> BEST {best}</span>
          </div>
          <div className="snake-score">
            <strong>{String(score).padStart(2, '0')}</strong>
            <span>SCORE</span>
          </div>
          <button className="snake-reset" onClick={reset} data-cursor>
            <FaArrowRotateRight /> {running ? 'RESTART RUN' : 'PLAY AGAIN'}
          </button>
        </div>
      </div>

      <div className={flash ? 'snake-machine crash' : 'snake-machine'}>
        <div className="snake-machine-head">
          <span>RIZKI://SNAKE_ENGINE</span>
          <div><i /><i /><i /></div>
        </div>

        <div className="snake-board-wrap">
          <div className="snake-board" aria-label="Snake game board">
            {cells.map((cell) => {
              const snakeIndex = snake.findIndex((segment) => samePoint(segment, cell));
              const isHead = snakeIndex === 0;
              const isFood = samePoint(food, cell);

              return (
                <div className="snake-cell" key={cell.y * SIZE + cell.x}>
                  {isFood && (
                    <motion.span
                      className="snake-food"
                      animate={{ scale: [1, 1.55, 1], rotate: [0, 90, 180] }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  {snakeIndex >= 0 && (
                    <motion.span
                      layout
                      className={isHead ? 'snake-segment snake-head' : 'snake-segment'}
                      transition={{ layout: { duration: 0.09 } }}
                    >
                      {isHead && <span className="snake-eyes">••</span>}
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="snake-status">
          <span className={running ? 'led-on' : 'led-off'} />
          {running ? 'SYSTEM RUNNING' : 'SYSTEM CRASHED — HIT RESTART'}
        </div>
      </div>

      <div className="snake-controls" aria-label="Snake controls">
        <button onClick={() => changeDirection('up')} aria-label="Move up"><FaChevronUp /></button>
        <div>
          <button onClick={() => changeDirection('left')} aria-label="Move left"><FaChevronLeft /></button>
          <button onClick={() => changeDirection('down')} aria-label="Move down"><FaChevronDown /></button>
          <button onClick={() => changeDirection('right')} aria-label="Move right"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

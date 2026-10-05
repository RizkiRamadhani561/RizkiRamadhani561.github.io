'use client';

import { motion } from 'framer-motion';
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

      <div className={flash ? 'snake-gameboy shake' : 'snake-gameboy'}>
        <div className="gameboy-top">
          <span className="gameboy-brand">RIZKI BOY</span>
          <span className="gameboy-model">DMG-01 // RR</span>
        </div>

        <div className="gameboy-screen-frame">
          <div className="gameboy-screen">
            <div className="gameboy-screen-header">
              <span>SNAKE</span>
              <span>{String(score).padStart(2, '0')}</span>
            </div>
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
            </div>
          </div>
        </div>

        <div className="gameboy-led-row">
          <span className={running ? 'led-on' : 'led-off'} />
          <small>{running ? 'POWER ON' : 'GAME OVER'}</small>
        </div>

        <div className="gameboy-controls">
          <div className="dpad" aria-label="Directional pad">
            <button className="dpad-up" onClick={() => { changeDirection('up'); setRunning(true); }} aria-label="Move up"><FaChevronUp /></button>
            <button className="dpad-left" onClick={() => { changeDirection('left'); setRunning(true); }} aria-label="Move left"><FaChevronLeft /></button>
            <button className="dpad-center" aria-hidden="true" tabIndex={-1} />
            <button className="dpad-right" onClick={() => { changeDirection('right'); setRunning(true); }} aria-label="Move right"><FaChevronRight /></button>
            <button className="dpad-down" onClick={() => { changeDirection('down'); setRunning(true); }} aria-label="Move down"><FaChevronDown /></button>
          </div>

          <div className="gameboy-action-area">
            <button className="gb-button gb-b" onClick={reset} aria-label="B button: restart">
              B
            </button>
            <button className="gb-button gb-a" onClick={() => setRunning(true)} aria-label="A button: resume">
              A
            </button>
          </div>
        </div>

        <div className="gameboy-menu">
          <button onClick={reset} data-cursor>SELECT</button>
          <button onClick={() => setRunning((value) => !value)} data-cursor>{running ? 'PAUSE' : 'START'}</button>
        </div>

        <div className="gameboy-speaker" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>

        <div className="gameboy-toggle-row">
          <span>POWER</span>
          <button
            className={running ? 'power-toggle on' : 'power-toggle'}
            onClick={() => setRunning((value) => !value)}
            data-cursor
            aria-label={running ? 'Turn game off' : 'Turn game on'}
          >
            <span />
          </button>
          <span>{running ? 'ON' : 'OFF'}</span>
        </div>

        <div className="snake-status">
          <span className={running ? 'led-on' : 'led-off'} />
          {running ? 'SYSTEM RUNNING' : 'SYSTEM PAUSED / CRASHED'}
        </div>
      </div>
    </section>
  );
}

<script setup lang="ts">
import {ref, reactive, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';

interface PuzzlePiece {
  style: Record<string, string>; // Style properties for the puzzle piece
  correctIndex: number; // The correct index of the piece in the puzzle
}

const gridWidth = 5; // Number of puzzle pieces per row
const gridHeight = 3; // Number of puzzle rows

const router = useRouter();

/**
 * Calculates the size of each puzzle piece based on the window size.
 *
 * @returns The size of each puzzle piece in pixels.
 */
const calculatePieceSize = () => {
  let units = 4;
  if (window.innerWidth <= 576) {
    units = 1;
  } else if (window.innerWidth <= 992) {
    units = 2;
  }
  return Math.min(window.innerWidth / (gridWidth + units), window.innerHeight / (gridHeight + units));
}

const pieceSize = ref(calculatePieceSize());
const puzzlePieces = reactive<PuzzlePiece[]>([]);
const dragIndex = ref(null as number | null);
const correctlyPlacedCount = ref(0);
const totalPieces = ref(gridWidth * gridHeight);

/**
 * Computes the style for the puzzle container grid.
 *
 * @returns The style object for the puzzle container.
 */
const puzzleContainerStyle = computed(() => {
  return {
    gridTemplateColumns: `repeat(${gridWidth}, ${pieceSize.value}px)`,
    gridTemplateRows: `repeat(${gridHeight}, ${pieceSize.value}px)`,
  };
});

/**
 * Prepares the puzzle pieces with their correct styles and indices.
 *
 * @returns An array of puzzle pieces.
 */
const preparePuzzlePieces = () => {
  let pieces: PuzzlePiece[] = [];

  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      const index = row * gridWidth + col;
      pieces.push({
        style: {
          backgroundImage: 'url(/src/assets/404.svg)',
          backgroundSize: `${gridWidth * pieceSize.value}px ${gridHeight * pieceSize.value}px`,
          backgroundPosition: `-${col * pieceSize.value}px -${row * pieceSize.value}px`,
          width: `${pieceSize.value}px`,
          height: `${pieceSize.value}px`,
        },
        correctIndex: index,
      });
    }
  }
  return pieces;
}

/**
 * Shuffles an array of puzzle pieces randomly, ensuring the puzzle is not already solved.
 *
 * @param array The array of puzzle pieces to shuffle.
 * @returns The shuffled array of puzzle pieces.
 */
const shuffleArray = (array: PuzzlePiece[]) => {
  do {
    array.sort(() => Math.random() - 0.5);
  } while (array.every((piece, index) => piece.correctIndex === index));
  return array;
}

/**
 * Handler for when a drag event starts.
 *
 * @param index The index of the puzzle piece being dragged.
 */
const dragStart = (index: number) => {
  dragIndex.value = index;
}

/**
 * Handler for when a drop event occurs.
 *
 * @param index The index of the puzzle piece being dropped on.
 */
const drop = (index: number) => {
  if (dragIndex.value !== null) {
    const draggedPiece = puzzlePieces[dragIndex.value];
    const droppedPiece = puzzlePieces[index];

    // Swap the pieces
    puzzlePieces.splice(index, 1, draggedPiece);
    puzzlePieces.splice(dragIndex.value, 1, droppedPiece);

    // Update counter after drop
    correctlyPlacedCount.value = puzzlePieces.filter((piece, i) => piece.correctIndex === i).length;

    // Check for completion and redirect if completed
    if (correctlyPlacedCount.value === totalPieces.value) {
      setTimeout(() => router.push({ name: 'PortfolioView' }), 750); // Timeout of 750ms before redirect
    }
  }
}

/**
 * Handler for when the window is resized.
 * Recalculates the piece size and updates the puzzle pieces.
 */
const onResize = () => {
  pieceSize.value = calculatePieceSize();
  const pieces = preparePuzzlePieces();
  pieces.forEach(piece => {
    const puzzlePieceIndex = puzzlePieces.findIndex(puzzlePiece => puzzlePiece.correctIndex === piece.correctIndex);
    puzzlePieces[puzzlePieceIndex].style = piece.style;
  });
}

onMounted(() => {
  // Build puzzle
  const pieces = preparePuzzlePieces();
  totalPieces.value = pieces.length;
  puzzlePieces.push(...shuffleArray(pieces));
  console.log(totalPieces, puzzlePieces);

  // Events
  window.addEventListener('resize', onResize);
});
</script>

<template>
  <section class="section-container center">
    <div class="container">
      <h3>The page you are looking for does not exist.</h3>
      <div class="puzzle-container">
        <div
            class="puzzle"
            :style="puzzleContainerStyle"
        >
          <div
              v-for="(piece, index) in puzzlePieces"
              :key="index"
              :style="piece.style"
              class="puzzle-piece"
              draggable="true"
              @dragstart="dragStart(index)"
              @dragover.prevent
              @drop="drop(index)"
          />
        </div>
        <p class="text-alternative">
          Solve the puzzle to return to homepage :
          <span class="puzzle-score">{{ correctlyPlacedCount }}/{{ totalPieces }}</span>
        </p>
      </div>
      <button @click="router.push({ name: 'PortfolioView' })" class="btn text-button">
        Click to crack the code
      </button>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 100svh;
  max-height: 100svh;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.puzzle {
  display: grid;
  justify-content: center;
  gap: 1px;
  margin: 0 auto;
}
.puzzle-piece {
  box-sizing: border-box;
  filter: var(--404-puzzle-filter);
}
.puzzle-piece:hover {
  cursor: pointer;
}
.puzzle-container p {
  margin-top: 2rem;
}
.puzzle-score {
  color: var(--color-primary);
}
svg {
  fill: white !important;
}
@media (max-width: 768px) {
  .container {
    justify-content: space-evenly;
  }
}
</style>



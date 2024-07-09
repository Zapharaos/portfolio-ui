<script lang="ts">

  const gridWidth = 5; // Number of puzzle pieces per row
  const gridHeight = 3; // Number of puzzle rows

  // Since a square piece is required, calculate the smallest size based on the window dimensions.
  const additionalUnits = 4;

  function calculatePieceSize() {
    let currentUnits = additionalUnits
    if (window.innerWidth <= 576) {
      currentUnits = 1;
    }
    else if (window.innerWidth <= 992) {
      currentUnits = 2;
    }
    return Math.min(window.innerWidth / (gridWidth + currentUnits), window.innerHeight / (gridHeight + currentUnits));
  }

  // Interface for a Puzzle Piece
  interface PuzzlePiece {
    style: Record<string, string>; // Style properties for the puzzle piece
    correctIndex: number; // The correct index of the piece in the puzzle
  }

  export default {
    data() {
      return {
        pieceSize: calculatePieceSize(),
        puzzlePieces: [] as PuzzlePiece[], // Array of puzzle pieces
        dragIndex: null as number | null, // Index of the currently dragged piece
        correctlyPlacedCount: 0, // Number of correctly placed pieces
        totalPieces: gridWidth * gridHeight, // Total number of puzzle pieces
      };
    },
    computed: {
      puzzleContainerStyle() {
        return {
          gridTemplateColumns: `repeat(${gridWidth}, ${this.pieceSize}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${this.pieceSize}px)`,
        };
      },
    },
    methods: {
      /**
       Redirect to home page
       */
      redirect(){
        this.$router.push({ name: 'PortfolioView' });
      },
      /**
       * Prepares an array of puzzle pieces with their styles and correct positions.
       */
      preparePuzzlePieces() {
        let pieces: PuzzlePiece[] = [];

        for (let row = 0; row < gridHeight; row++) {
          for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            pieces.push({
              style: {
                backgroundImage: 'url(/src/assets/404.svg)',
                backgroundSize: `${gridWidth * this.pieceSize}px ${gridHeight * this.pieceSize}px`,
                backgroundPosition: `-${col * this.pieceSize}px -${row * this.pieceSize}px`,
                width: `${this.pieceSize}px`,
                height: `${this.pieceSize}px`,
              },
              correctIndex: index,
            });
          }
        }
        return pieces;
      },
      /**
       * Shuffles an array using the Fisher-Yates shuffle algorithm.
       * @param array The array to shuffle.
       * @returns The shuffled array.
       */
      shuffleArray(array: PuzzlePiece[]) {
        do {
          array.sort(() => Math.random() - 0.5);
        } while (array.every((piece, index) => piece.correctIndex === index));
        return array;
      },
      /**
       * Captures the index of the piece being dragged.
       * @param index The index of the piece in the puzzlePieces array.
       */
      dragStart(index: number) {
        this.dragIndex = index;
      },
      /**
       * Handles dropping a piece onto another piece.
       * Swaps the positions of the dragged and dropped pieces,
       * updates the correctly placed count, and checks for completion.
       * @param index The index of the drop target piece.
       */
      drop(index: number) {
        if (this.dragIndex !== null) {
          const draggedPiece = this.puzzlePieces[this.dragIndex];
          const droppedPiece = this.puzzlePieces[index];

          // Swap the pieces
          this.puzzlePieces.splice(index, 1, draggedPiece);
          this.puzzlePieces.splice(this.dragIndex, 1, droppedPiece);

          // Reassign the array to itself to ensure reactivity
          this.puzzlePieces = [...this.puzzlePieces];

          // Update counter after drop
          this.correctlyPlacedCount = this.puzzlePieces.filter((piece, i) => piece.correctIndex === i).length;

          // Check for completion and redirect if completed
          if (this.correctlyPlacedCount === this.totalPieces) {
            setTimeout(() => this.redirect(), 750); // Timeout of 750ms before redirect
          }
        }
      },
      onResize() {
        this.pieceSize = calculatePieceSize();
        const pieces = this.preparePuzzlePieces();
        pieces.forEach(piece => {
          const puzzlePieceIndex = this.puzzlePieces.findIndex(puzzlePiece => puzzlePiece.correctIndex === piece.correctIndex);
          this.puzzlePieces[puzzlePieceIndex].style = piece.style;
        })
      },
    },
    mounted() {
      // Build puzzle
      const pieces = this.preparePuzzlePieces();
      this.totalPieces = pieces.length;
      this.puzzlePieces = this.shuffleArray(pieces);

      // Events
      window.addEventListener('resize', this.onResize);
    },
  };
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
        <p class="grey-text">
          Solve the puzzle to return to homepage :
          <span class="puzzle-score">{{ correctlyPlacedCount }}/{{ totalPieces }}</span>
        </p>
      </div>
      <button @click="redirect" class="btn text-button">
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
}
.puzzle-container p {
  margin-top: 2rem;
}
.puzzle-score {
  color: orange;
}
@media (max-width: 768px) {
  .container {
    justify-content: space-evenly;
  }
}
</style>



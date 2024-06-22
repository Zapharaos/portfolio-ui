<template>
  <div class="not-found">
    <h1>The page you are looking for does not exist.</h1>
    <button @click="redirect">GO BACK HOME</button>
    <div class="puzzle-description">
      <p>Solve the puzzle or click on the above button to return to homepage!</p>
      <p class="puzzle-score">{{ correctlyPlacedCount }}/{{ totalPieces }}</p>
    </div>
    <div
      class="puzzle-container"
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
      ></div>
    </div>
  </div>
</template>

<script lang="ts">

  const gridWidth = 5; // Number of puzzle pieces per row
  const gridHeight = 3; // Number of puzzle rows

  // Since a square piece is required, calculate the smallest size based on the window dimensions.
  const pieceSize = Math.min(window.innerWidth / (gridWidth + 2), window.innerHeight / (gridHeight + 2));

  // Interface for a Puzzle Piece
  interface PuzzlePiece {
    style: Record<string, string>; // Style properties for the puzzle piece
    correctIndex: number; // The correct index of the piece in the puzzle
  }

  export default {
    data() {
      return {
        puzzlePieces: [] as PuzzlePiece[], // Array of puzzle pieces
        dragIndex: null as number | null, // Index of the currently dragged piece
        correctlyPlacedCount: 0, // Number of correctly placed pieces
        totalPieces: gridWidth * gridHeight, // Total number of puzzle pieces
      };
    },
    computed: {
      puzzleContainerStyle() {
        return {
          gridTemplateColumns: `repeat(${gridWidth}, ${pieceSize}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${pieceSize}px)`,
        };
      },
    },
    methods: {
      /**
       Redirect to home page
       */
      redirect(){
        this.$router.push({ name: 'Home' });
      },
      /**
       * Creates an array of puzzle pieces with their styles and correct positions.
       */
      createPuzzlePieces() {
        let pieces: PuzzlePiece[] = [];

        for (let row = 0; row < gridHeight; row++) {
          for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            pieces.push({
              style: {
                backgroundImage: 'url(/src/assets/404.svg)',
                backgroundSize: `${gridWidth * pieceSize}px ${gridHeight * pieceSize}px`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                width: `${pieceSize}px`,
                height: `${pieceSize}px`,
              },
              correctIndex: index,
            });
          }
        }

        this.totalPieces = pieces.length;
        this.puzzlePieces = this.shuffleArray(pieces);
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
    },
    mounted() {
      this.createPuzzlePieces();
    },
  };
</script>

<style scoped>
.not-found {
  text-align: center;
}
.puzzle-description {
  margin: 7% auto;
}
.puzzle-score {
  color: orange;
}
.puzzle-container {
  display: grid;
  justify-content: center;
  gap: 1px;
  margin: 0 auto;
}
.puzzle-piece {
  box-sizing: border-box;
}
</style>



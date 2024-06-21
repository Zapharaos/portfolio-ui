<template>
  <div class="not-found">
    <h1>The page you are looking for does not exist.</h1>
    <p>Solve the puzzle or click below to return to homepage.</p>
    <div class="puzzle-container">
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

  interface PuzzlePiece {
    style: Record<string, string>;
    correctIndex: number;
  }

  export default {
    data() {
      return {
        puzzlePieces: [] as PuzzlePiece[],
        dragIndex: null as number | null,
      };
    },
    methods: {
      createPuzzlePieces() {
        let pieces: PuzzlePiece[] = [];
        const gridWidth = 5; // Number of pieces per row
        const gridHeight = 3; // Number of rows

        // TODO : responsive
        /*const pieceWidth = 100; // Width of each piece in pixels
        const pieceHeight = 100; // Height of each piece in pixels*/

        const pieceSize = Math.min(window.innerWidth / (gridWidth + 1), window.innerHeight / (gridHeight + 1));
        const puzzleWidth = pieceSize * gridWidth;
        const puzzleHeight = pieceSize * gridHeight;

        console.log(window.innerWidth, window.innerHeight)
        console.log(window.innerWidth / (gridWidth + 1), window.innerHeight / (gridHeight + 1))
        console.log(pieceSize, puzzleWidth, puzzleHeight);

        for (let row = 0; row < gridHeight; row++) {
          for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            pieces.push({
              style: {
                backgroundImage: 'url(/src/assets/404.svg)',
                /*backgroundSize: `${gridWidth * pieceWidth}px ${gridHeight * pieceHeight}px`,
                backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
                width: `${pieceWidth}px`,
                height: `${pieceHeight}px`,*/
                backgroundSize: `${gridWidth * pieceSize}px ${gridHeight * pieceSize}px`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                width: `${pieceSize}px`,
                height: `${pieceSize}px`,
              },
              correctIndex: index,
            });
          }
        }

        this.puzzlePieces = this.shuffleArray(pieces);
        //this.puzzlePieces = pieces;
      },
      shuffleArray(array: PuzzlePiece[]) {
        return array.sort(() => Math.random() - 0.5);
      },
      dragStart(index: number) {
        this.dragIndex = index;
      },
      drop(index: number) {
        if (this.dragIndex !== null) {
          const draggedPiece = this.puzzlePieces[this.dragIndex];
          const droppedPiece = this.puzzlePieces[index];

          // Swap the pieces
          this.puzzlePieces.splice(index, 1, draggedPiece);
          this.puzzlePieces.splice(this.dragIndex, 1, droppedPiece);

          // Reassign the array to itself to ensure reactivity
          this.puzzlePieces = [...this.puzzlePieces];
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
  /*padding: 20px;*/
}
.puzzle-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* gridWidth */
  grid-template-rows: repeat(3, 1fr); /* gridHeight */
  gap: 1px; /* Optional: space between pieces */
  margin: 0 auto;
}

.puzzle-piece {
  box-sizing: border-box;
}
</style>



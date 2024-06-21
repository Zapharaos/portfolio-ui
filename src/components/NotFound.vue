<template>
  <div class="not-found">
    <h1>The page you are looking for does not exist.</h1>
    <button>GO BACK HOME</button>
    <p>Solve the puzzle or click on the above button to return to homepage!</p>
    <p class="puzzle-score">{{ correctlyPlacedCount }}/{{ totalPieces }}</p>
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

  interface PuzzlePiece {
    style: Record<string, string>;
    correctIndex: number;
  }

  export default {
    data() {
      return {
        puzzlePieces: [] as PuzzlePiece[],
        dragIndex: null as number | null,
        correctlyPlacedCount: 0,
        totalPieces: gridWidth * gridHeight,
      };
    },
    computed: {
      puzzleContainerStyle() {
        return {
          gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
        };
      },
    },
    methods: {
      createPuzzlePieces() {
        let pieces: PuzzlePiece[] = [];

        const pieceSize = Math.min(window.innerWidth / (gridWidth + 2), window.innerHeight / (gridHeight + 2));

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

          // Update counter after drop
          this.correctlyPlacedCount = this.puzzlePieces.filter((piece, i) => piece.correctIndex === i).length;
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
.puzzle-container {
  display: grid;
  gap: 1px;
  margin: 0 auto;
}

.puzzle-piece {
  box-sizing: border-box;
}
.puzzle-score {
  color: orange;
}
</style>



<template>
  <div class="not-found">
    <h1>404 Not Found</h1>
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
  export default {
    data() {
      return {
        puzzlePieces: [],
        dragIndex: null,
      };
    },
    methods: {
      createPuzzlePieces() {
        const pieces = [];
        const gridSize = 4; // Assuming a 4x4 grid
        for (let i = 0; i < gridSize * gridSize; i++) {
          pieces.push({
            style: {
              backgroundImage: 'url(/path-to-your-404-image.jpg)',
              backgroundSize: `${gridSize * 100}%`,
              backgroundPosition: `${(i % gridSize) * 100}% ${Math.floor(i / gridSize) * 100}%`,
              order: i,
            },
            correctIndex: i,
          });
        }
        this.puzzlePieces = this.shuffleArray(pieces);
      },
      shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      dragStart(index) {
        this.dragIndex = index;
      },
      drop(index) {
        const temp = this.puzzlePieces[index];
        this.$set(this.puzzlePieces, index, this.puzzlePieces[this.dragIndex]);
        this.$set(this.puzzlePieces, this.dragIndex, temp);
        this.dragIndex = null;
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
  padding: 20px;
}
.puzzle-container {
  display: flex;
  flex-wrap: wrap;
  width: 400px; /* Adjust based on your image size */
  margin: 0 auto;
}
.puzzle-piece {
  width: 100px; /* Adjust based on your image size and grid size */
  height: 100px; /* Adjust based on your image size and grid size */
  box-sizing: border-box;
  border: 1px solid #ddd;
}
</style>



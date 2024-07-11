import { expect, describe, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NotFound from '@/views/NotFound.vue';
import {useRouter} from "vue-router";

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

describe('NotFound.vue', () => {

  test('navigates to home on button click', async () => {
    const push = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockImplementationOnce(() => ({
      push,
    }));

    const wrapper = mount(NotFound, {
      global: {
        stubs: ["router-link", "router-view"]
      }
    });

    await wrapper.find('button').trigger('click');

    // Assert that the mocked router push function was called
    // once and with the expected arguments for navigating to Home
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({ name: 'PortfolioView' });
  });

  test('createPuzzlePieces creates pieces with same background size and varying positions', () => {
    const wrapper = mount(NotFound);

    const pieces = wrapper.vm.puzzlePieces;

    // Assert same background size for all pieces
    const backgroundSize = pieces[0].style.backgroundSize;
    const width = pieces[0].style.width;
    const height = pieces[0].style.height;
    expect(width).toEqual(height)
    expect(pieces.every(piece =>
      piece.style.backgroundSize === backgroundSize && piece.style.width === width && piece.style.height === height
    )).toBe(true);

    // Helper function to check if positions overlap
    const isPositionOverlapping = (position1: any, position2: any) => {
      const [x1, y1] = position1.split('px ');
      const [x2, y2] = position2.split('px ');

      // Check if any corner of piece2 falls within piece1's boundaries
      return (
        (x2 >= x1 && x2 < x1 + width) &&
        (y2 >= y1 && y2 < y1 + height) ||
        (x2 + width > x1 && x2 + width <= x1 + width) &&
        (y2 >= y1 && y2 < y1 + height) ||
        (x2 >= x1 && x2 < x1 + width) &&
        (y2 + height > y1 && y2 + height <= y1 + height) ||
        (x2 + width > x1 && x2 + width <= x1 + width) &&
        (y2 + height > y1 && y2 + height <= y1 + height)
      );
    };

    // Assert no overlapping positions
    expect(pieces.every((piece, index) => {
      for (let i = 0; i < index; i++) {
        if (isPositionOverlapping(piece.style.backgroundPosition, pieces[i].style.backgroundPosition)) {
          return false;
        }
      }
      return true;
    })).toBe(true);
  });

  test('shuffleArray shuffles the order of elements', () => {
    const wrapper = mount(NotFound);

    const originalPieces = [... wrapper.vm.puzzlePieces]
    const shuffledPieces = wrapper.vm.shuffleArray(originalPieces);

    // Assert that no element has its correctIndex at its current index
    // after shuffling (meaning the order is different)
    expect(shuffledPieces.every((piece, index) => piece.correctIndex === index)).toEqual(false);
    // Assert that the length of the shuffled array remains the same
    expect(shuffledPieces.length).toBe(originalPieces.length);
  });

  test('dragStart sets dragIndex on drag start', async () => {
    const wrapper = mount(NotFound);

    // Generate a random index within the puzzlePieces array length
    const index = Math.floor(Math.random() * wrapper.vm.puzzlePieces.length);
    wrapper.vm.dragStart(index)

    // Assert that the dragIndex in the component's data is set to the chosen index
    expect(wrapper.vm.dragIndex).toBe(index);
  });

  test('drop swaps pieces', async () => {
    const wrapper = mount(NotFound);

    // Copying previous correctIndex values before performing a drag-and-drop
    const prevCorrectIndexAt0 = wrapper.vm.puzzlePieces[0].correctIndex;
    const prevCorrectIndexAt1 = wrapper.vm.puzzlePieces[1].correctIndex;

    // Running swap functions
    wrapper.vm.dragStart(0);
    wrapper.vm.drop(1);

    // Assert that the correctIndex values of the pieces are swapped after drop
    expect(wrapper.vm.puzzlePieces[0].correctIndex).toBe(prevCorrectIndexAt1);
    expect(wrapper.vm.puzzlePieces[1].correctIndex).toBe(prevCorrectIndexAt0);

    // Assert that dragIndex is reset to null after drop
    expect(wrapper.vm.dragIndex).toBeNull;
  });

  test('finishing puzzle and redirecting to home', async () => {
    const push = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockImplementationOnce(() => ({
      push,
    }));

    const wrapper = mount(NotFound, {
      global: {
        stubs: ["router-link", "router-view"],
      }
    });

    // Assert that the puzzle has yet to be solved
    expect(wrapper.vm.correctlyPlacedCount).not.toBe(wrapper.vm.totalPieces);

    // Solving puzzle
    wrapper.vm.puzzlePieces.sort((a: any, b: any) => a.correctIndex - b.correctIndex);

    // Still need to call the drop function to officially trigger the end of the puzzle
    // Let's switch back and forth two items
    wrapper.vm.dragStart(0);
    wrapper.vm.drop(1);
    wrapper.vm.dragStart(1);
    wrapper.vm.drop(0);

    // Wait for the timeout using await and advance time by 1s
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Assert that pieces are placed correctly
    expect(wrapper.vm.correctlyPlacedCount).toBe(wrapper.vm.totalPieces);

    // Assert that the mocked router push function was called once
    // and with the expected arguments for navigating to Home
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({ name: 'PortfolioView' });
  });
});

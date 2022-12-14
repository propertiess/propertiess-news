import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useCountRenderedItems } from '@/hooks';
import { wrapperProvider } from '@/utils/helpers/wrapperProvider';

const setup = () =>
  renderHook(() => useCountRenderedItems(10, 100), {
    wrapper: wrapperProvider
  });

describe('useCountRenderedItems', () => {
  test('countRenderedItems should be 10', () => {
    const { result } = setup();
    expect(result.current.countRenderedItems).toBe(10);
  });
});

describe('incrementCountRenderedItems', () => {
  test("shouldn't increment count", () => {
    const { result } = setup();

    act(() => {
      result.current.incrementCountRenderedItems(
        false,
        {} as IntersectionObserverEntry
      );
    });

    expect(result.current.countRenderedItems).toBe(10);
  });

  test(' should increment count on ten', () => {
    const { result } = setup();

    act(() => {
      result.current.incrementCountRenderedItems(
        true,
        {} as IntersectionObserverEntry
      );
    });

    expect(result.current.countRenderedItems).toBe(20);
  });

  test('count should be qual to', () => {
    const { result } = setup();

    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.incrementCountRenderedItems(
          true,
          {} as IntersectionObserverEntry
        );
      });
    }

    expect(result.current.countRenderedItems).toBe(100);

    act(() => {
      result.current.incrementCountRenderedItems(
        true,
        {} as IntersectionObserverEntry
      );
    });

    expect(result.current.countRenderedItems).toBe(100);
  });
});

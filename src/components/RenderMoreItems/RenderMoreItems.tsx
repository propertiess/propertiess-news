import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { InView } from 'react-intersection-observer';
import { Loader } from '@/components';

interface Props extends HTMLAttributes<unknown> {
  countRenderedItems: number;
  to: number;
  renderMore: (inView: any, entry: IntersectionObserverEntry) => void;
}

const RenderMoreItems: FC<PropsWithChildren<Props>> = ({
  countRenderedItems,
  to,
  renderMore
}) => {
  return (
    <>
      {countRenderedItems !== to && !!to && (
        <InView as='li' onChange={renderMore}>
          <Loader />
        </InView>
      )}
    </>
  );
};

export { RenderMoreItems };

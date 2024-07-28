import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { justifyBetween, Row } from '@market-duck/components/Flex/Flex';
import { Tag } from '@market-duck/components/Tag/Tag';
import { MouseEvent, UIEventHandler, useEffect, useRef, useState } from 'react';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
  .carousel {
    width: 100%;
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    border-radius: ${AppRadii.M};
    clip: auto;
  }
  .item {
    width: 100%;
    flex: 0 0 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .carauselBtnContainer {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 ${AppSpcing.XS};
    z-index: 1;
    > button > svg {
      width: 24px;
      height: 24px;
    }
  }

  .indicator {
    position: absolute;
    right: 10px;
    bottom: 8px;
  }
`;

interface FeedImageSliderProps {
  imgSrcs?: string[];
}

export const FeedImageSlider = ({ imgSrcs }: FeedImageSliderProps) => {
  const [curIdx, setCurIdx] = useState<number>(0);
  const [indicator, setIndicator] = useState<number>(0);
  const slideRef = useRef<HTMLUListElement>(null);
  const imgLen = imgSrcs?.length ?? 0;

  const scrollHandler: UIEventHandler<HTMLUListElement> = (e) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const clientWidth = e.currentTarget.clientWidth;
    const index = scrollLeft / clientWidth;
    setIndicator(Math.round(index));
    if (Number.isInteger(index)) setCurIdx(index);
  };

  const slideHandler = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    if (curIdx < imgLen - 1 && id === 'increase') {
      setCurIdx((prev) => prev + 1);
    } else if (curIdx > 0 && id === 'decrease') {
      setCurIdx((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      const itemToScroll = slideRef.current.children[curIdx];
      itemToScroll?.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [curIdx]);

  return (
    <Wrap>
      <ul className="carousel" onScroll={scrollHandler} ref={slideRef}>
        {imgSrcs &&
          imgSrcs.map((url) => {
            return (
              <li className="item" key={url}>
                <img src={url} />
              </li>
            );
          })}
      </ul>
      <Row className="carauselBtnContainer" justify={justifyBetween}>
        <button id="decrease" onClick={slideHandler}>
          <ChevronLeftIcon />
        </button>
        <button id="increase" onClick={slideHandler}>
          <ChevronRightIcon />
        </button>
      </Row>
      <Tag color="secondary" className="indicator" text={`${indicator + 1} / ${imgLen}`} />
    </Wrap>
  );
};

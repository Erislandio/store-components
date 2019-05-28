import React, { useRef } from 'react'
import BlurredLoader from '../BlurredLoader'
import Video from '../Video'
import useZoom from './Zoom'
import { useRuntime } from 'vtex.render-runtime'
import classNames from 'classnames'

import styles from '../../styles.css'

const Slide = ({
  slide,
  onLoad,
  onClick,
  isCurrent,
  setThumb,
  id,
  zoomProps: { zoomType, desktopTrigger, zoomScale },
}) => {
  const divref = useRef()
  const { zoom, out, pan, style, isActive: isZoomActive } = useZoom(
    divref,
    zoomScale
  )

  const {
    hints: { desktop },
  } = useRuntime()

  const desktopTriggers = {
    'on-hover': {
      onMouseEnter: zoom,
      onMouseLeave: out,
    },
    'on-click': {
      onClick: e => (isZoomActive ? out() : zoom(e)),
    },
  }

  if (!isCurrent && isZoomActive) {
    out()
  }

  const zoomProps = slide.type === 'image' &&
    desktop &&
    zoomType === 'in-page' && {
      ...desktopTriggers[desktopTrigger],
      onMouseMove: pan,
    }

  const slideComp = {
    image: (
      <BlurredLoader
        loaderType="SPINNER"
        loaderUrl={slide.thumbUrl}
        realUrls={slide.urls}
        bestUrlIndex={slide.bestUrlIndex}
        alt={slide.alt}
        onload={onLoad}
        onClick={onClick}
      />
    ),
    video: (
      <Video
        url={slide.src}
        setThumb={setThumb && setThumb()}
        playing={isCurrent}
        id={id}
      />
    ),
  }

  const slideClasses = classNames('swiper-slide center-all', {
    [`${styles.slideZoomed}`]: isZoomActive,
  })

  return (
    <div
      className={slideClasses}
      {...zoomProps}
      style={{ ...style }}
      ref={divref}
      onClick={onClick}
    >
      {slideComp[slide.type]}
    </div>
  )
}

export default Slide
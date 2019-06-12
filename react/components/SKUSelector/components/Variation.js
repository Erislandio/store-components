import PropTypes from 'prop-types'
import React, { useState, useCallback, memo } from 'react'
import { Button } from 'vtex.styleguide'
import { IOMessage } from 'vtex.native-types'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor } from '../utils'
import { variationShape } from '../utils/proptypes'

import styles from '../styles.css'
import { imageUrlForSize, VARIATION_IMG_SIZE } from '../../module/images'

const ITEMS_VISIBLE_THRESHOLD = 2

const Variation = ({ variation, maxSkuPrice, seeMoreLabel, maxItems, selectedItem }) => {
  const displayImage = isColor(variation.name)
  const { options } = variation
  const [showAll, setShowAll] = useState(false)
  const visibleItemsWhenCollapsed = maxItems - ITEMS_VISIBLE_THRESHOLD

  const shouldCollapse = !showAll && options.length > maxItems

  const overflowQuantity = options.length - visibleItemsWhenCollapsed

  const displayOptions = options.slice(0, shouldCollapse ? visibleItemsWhenCollapsed : options.length)

  const showAllAction = useCallback(() => setShowAll(true), [])

  return (
    <div
      className={`${styles.skuSelectorSubcontainer} ${
        styles.skuSelectorSubcontainer
      }--${variation.name} flex flex-column mb7`}
    >
      <div className={`${styles.skuSelectorNameContainer} ma1`}>
        <span
          className={`${
            styles.skuSelectorName
          } c-muted-2 db t-small overflow-hidden mb3`}
        >
          {variation.name}
        </span>
        <div className="inline-flex flex-wrap ml2 flex items-center">
          {displayOptions.map(option => {
            const [skuImage] = option.images || [null]
            return (
              <SelectorItem
                isSelected={option.label === selectedItem}
                key={`${option.label}-${variation.name}`}
                isAvailable={option.available}
                maxPrice={maxSkuPrice}
                onClick={option.onSelectItem}
                isImage={displayImage}
                variationValue={option.label}
                imageUrl={skuImage && imageUrlForSize(stripUrl(skuImage.imageUrl), VARIATION_IMG_SIZE)}
                imageLabel={skuImage && skuImage.imageLabel}
              />
            )
          })}
          {!showAll && shouldCollapse && (
            <div className={styles.seeMoreButton}>
              <Button variation="tertiary" onClick={showAllAction} size="small" collapseLeft>
                <IOMessage id={seeMoreLabel} values={{ quantity: overflowQuantity }} data-testid="seeMoreLabel" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Variation.propTypes = {
  /** Variation Object */
  variation: variationShape,
  /** Max price of SKU */
  maxSkuPrice: PropTypes.number,
  seeMoreLabel: PropTypes.string,
  maxItems: PropTypes.number,
  /** Label of selected option in this variation. Example: "Small" */
  selectedItem: PropTypes.string,
}

export default memo(Variation)

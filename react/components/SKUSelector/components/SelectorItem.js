import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { FormattedNumber } from 'react-intl'
import classNames from 'classnames'

import styles from '../styles.css'

const getDiscount = (maxPrice, price) => {
  let discount = 0
  if (maxPrice && price) {
    discount = 1 - price / maxPrice
  }
  return discount
}

/**
 * Inherits the components that should be displayed inside the Selector component.
 */
const SelectorItem = ({
  isAvailable = true,
  isSelected = false,
  maxPrice,
  price,
  onClick,
  isImage,
  variationValue,
  imageUrl,
  imageLabel,
}) => {
  const discount = getDiscount(maxPrice, price)
  console.log('testa SelectorItem render')

  return (
    <div
      role="button"
      tabIndex={0}
      className={classNames(
        styles.skuSelectorItem,
        `${styles.skuSelectorItem}--${variationValue}`,
        'relative di pointer flex items-center outline-0',
        {
          [styles.skuSelectorItemImage]: isImage,
        }
      )}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick(e)}
    >
      <div
        className={classNames(
          styles.frameAround,
          'absolute b--action-primary br3 bw1',
          {
            ba: isSelected,
          }
        )}
      />
      <div
        className={classNames(
          'w-100 h-100 ba br2 b b--muted-4 z-1 c-muted-5 flex items-center overflow-hidden',
          {
            'hover-b--muted-2': !isSelected,
          }
        )}
      >
        <div
          className={classNames('absolute absolute--fill', {
            [styles.diagonalCross]: !isAvailable,
          })}
        />
        <div
          className={classNames({ 'c-on-base center pl5 pr5 z-1': !isImage })}
        >
          {isImage && imageUrl ? (
            <img 
              src={imageUrl}
              alt={imageLabel}
            />
          ) : (
            <span className="c-on-base t-body">
              {variationValue}
            </span>
          )}
        </div>
      </div>
      {discount > 0 && (
        <span className={`${styles.skuSelectorBadge} b`}>
          <FormattedNumber value={discount} style="percent" />
        </span>
      )}
    </div>
  )
}

SelectorItem.propTypes = {
  /** Children components */
  children: PropTypes.node,
  /** Function that is called when the item is clicked */
  onClick: PropTypes.func,
  /** Flag that indicates if the sku is available */
  isAvailable: PropTypes.bool,
  /** Flag that indicates if the current item is selected */
  isSelected: PropTypes.bool,
  /** Max sku price */
  maxPrice: PropTypes.number,
  /** Price of the current sku */
  price: PropTypes.number,
  /** SKU's ID */
  skuId: PropTypes.string,
  /** True if it's an image variation */
  isImage: PropTypes.bool,
  /** Value of the variation */
  variationValue: PropTypes.string.isRequired,
}

export default memo(SelectorItem)

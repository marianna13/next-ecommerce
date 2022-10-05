import { useState } from 'react';
import { useRouter } from 'next/router';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { useForm } from "react-hook-form";
import Link from 'next/link';

// data
import productsTypes from './../../utils/data/products-types';
import productsColors from './../../utils/data/products-colors';
import productsSizes from './../../utils/data/products-sizes';
import { useSession, getSession } from "next-auth/react";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const ProductsFilter = () => {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { data: session, status } = useSession();

  const addQueryParams = () => {
    // query params changes
  }

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
          Применить фильтр <i className="icon-down-open"></i>
      </button>
      
      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>
        {status === "authenticated" &&
      <div className="add-product-btn">
          <div className="products-filter__block__content">
            <button className='btn btn--rounded btn--yellow'><Link href="/addproduct" >
            <a>Добавить продукт</a>
          </Link></button>
          </div>
        </div>
      }
        <div className="products-filter__block">
          <button type="button">Категория</button>
          <div className="products-filter__block__content">
            {productsTypes.map(type => (
              <Checkbox 
                key={type.id} 
                name="product-type" 
                label={type.name} 
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Цена</button>
          <div className="products-filter__block__content">
            <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
          </div>
        </div>

        <button type="submit" className="btn btn-submit btn--rounded btn--yellow">Применить</button>
      </div>
    </form>
  )
}
  
export default ProductsFilter
  
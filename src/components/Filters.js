import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      color: colors,
      max_price,
      price,
      shipping,
      min_price,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const color = getUniqueValues(all_products, 'colors');

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              onChange={updateFilters}
              value={text}
              className="search-input"
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            {categories.map((c, index) => {
              return (
                <button
                  type="button"
                  name="category"
                  key={index}
                  onClick={updateFilters}
                  className={`${
                    c.toLowerCase() === category ? 'active' : null
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="form-control">
            <h5>companies</h5>
            <select
              name="company"
              id="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((company, index) => (
                <option value={company} key={index}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {color.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      name="color"
                      data-color="all"
                      className={`${
                        colors === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      All
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={index}
                      name="color"
                      style={{ background: c }}
                      data-color={c}
                      onClick={updateFilters}
                      className={`${
                        c === colors ? 'color-btn active' : 'color-btn'
                      }`}
                    >
                      {c === colors ? <FaCheck /> : null}
                    </button>
                  );
                }
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              value={price}
              max={max_price}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="free-shipping">Free shipping</label>
            <input
              type="checkbox"
              id="free-shipping"
              name="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
        </form>
        <button className="clear-btn" onClick={clearFilters}>
          clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;

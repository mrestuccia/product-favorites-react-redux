import React from 'react';
import { connect } from 'react-redux';
import { destroyProduct } from './productsReducer';
import { setFavorite, unsetFavorite } from './authReducer';

const ProductListItem = ({ auth, product, destroy, setFavorite, unsetFavorite }) => {
  console.log('auth', auth);
  return (
    <li className="list-group-item">
      {product.name}
      {(typeof auth.user !== 'undefined') ?
        (auth.user.bestId === product.id) ? (
          <button onClick={unsetFavorite} className="btn btn-success pull-right">Unset Favorite</button>
        ) : (
          <button onClick={setFavorite} className="btn btn-primary pull-right">Set As Favorite</button>
          ) :
        (null)
      }
      <button onClick={destroy} className="btn btn-danger pull-right">x</button>
      <br style={{ clear: 'both' }} />
    </li>);
};

const ProductList = ({ products, auth, destroy, setFavorite, unsetFavorite }) => {
  console.log('auth id', auth);
  return (
    <ul className="list-group">
      {
        products.map(product => {
          return (
            <ProductListItem key={product.id} auth={auth} product={product} setFavorite={() => setFavorite(auth.user, product)} unsetFavorite={() => unsetFavorite()} destroy={() => destroy(product)} />
          );
        })
      }
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    destroy: (product) => dispatch(destroyProduct(product)),
    setFavorite: (user, product) => dispatch(setFavorite(user, product)),
    unsetFavorite: () => dispatch(unsetFavorite()),
  }
);

const mapStateToProps = (state) => (
  {
    products: state.products,
    auth: state.auth
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

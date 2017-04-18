import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from './productsReducer';


class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ name: ev.target.value });
  }
  onSubmit(ev){
    const { ap } = this.props;

    ev.preventDefault();
    ap( { name: this.state.name });
    this.setState({name: ''});
  }

  render() {

    return (
      <form className="form-group" onSubmit={(ev) => this.onSubmit(ev) }>
        <input className="form-control" type="text" value={this.state.name} onChange={this.onChange} />
        <button type="submit" className="btn btn-submit">Add</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => (
  {
    products: state.products
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    ap: (product) => dispatch(addProduct(product))
  }
);



export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);

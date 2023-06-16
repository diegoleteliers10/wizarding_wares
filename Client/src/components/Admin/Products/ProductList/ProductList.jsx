import data from '../../../../assets/data.json'
import { Link } from 'react-router-dom'
import './ProductList.css'

const ProductList = () => {

  return (
    <div className="product-list">
      <table >
        <thead>
          <tr>
            <th>Producto</th>
            <th>Estado</th>
            <th>Precio</th>
            {/* <th>Categoria</th> */}
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.isActive === true ? 'Activo' : 'Inhabilitado'}</td>
                <td>{product.price}</td>
                {/* <td>{product.category}</td> */}
                <td>{product.stock}</td>
                <td>
                    <Link to='/editProduct'>
                    <button> editar </button> 
                    </Link>
                    <button>eliminar</button>
                </td>
                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

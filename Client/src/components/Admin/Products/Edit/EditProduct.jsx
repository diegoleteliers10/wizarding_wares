import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { displayProductList, editProduct } from "../../../../redux/adminSlice";

const EditProduct = () => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.admin.edit)

    const [input, setInput] = useState({
        id: product.productId,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock,
        category: product.categoryCategoryId,
        isActive: product.isActive
      });

      const [errors, setErrors] =useState({
        name: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
        category: "",
        isActive: true
      })

      const handleChange = (event) => {
        if (event.target.name === "image") {
          setInput({
            ...input,
            [event.target.name]: event.target.files[0],
          });
        } else {
          setInput({
            ...input,
            [event.target.name]: event.target.value,
          });
        }

        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
        };
      
        const handleSelect = (event) => {
          setInput({
            ...input,
            [event.target.name]: event.target.value
          });
        };
      
        const handleCurrencyChange = (event) => {
          setInput({
            ...input,
            price: (event.target.value).replace(/\$/g, '')
          });
      
          setErrors(validate({
            ...input,
            price: event.target.value
          }));
      
        };

      const validate = (input) => {
        let errors = {};
        const { name, description, image, price, stock } = input;
        if (!name.trim() || !/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
          errors.name = 'El nombre debe contener únicamente letras';
        } else if (name.length < 3) {
          errors.name = 'El nombre debe tener al menos tres caractéres de longitud!';
        }
        return errors;
      };

      const handleSubmit = async (event) => {
        
        event.preventDefault();
        console.log(input);
        await dispatch(editProduct(input))

        .then(() => {
          dispatch(displayProductList())
          })
          .catch((error) => {
            console.log("Error al actualizar el producto:", error);
          });
      };

    return (
        <div className="flex justify-center items-center h-screen">
          <div>
            <h2>Editar "{product.name}"</h2>
    
            <div className="">
              <form onSubmit={handleSubmit} id="form" className="border-2 border-gray-300 rounded py-4 px-20 w-full shadow">
    
                <div className="formBox">
    
                  <div className="mb-4 md:mt-6 lg:mt-8">
                    <label htmlFor="name">
                      <span>Nombre</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nombre del producto"
                        onChange={handleChange}
                        value={input.name}
                        className="border rounded py-2 px-4 m-2 shadow w-full"
                        required
                      />
    
                      {errors.name && (<span>{errors.name}</span>)}
                    </label>
                  </div>
    
                  <div className="mb-4 md:mt-6 lg:mt-8 ">
                    <label htmlFor="description">
                      <span>Descripción</span>
                      <textarea
                        type="text"
                        value={input.description}
                        onChange={handleChange}
                        name="description"
                        className="border rounded py-2 px-4 m-2 w-full shadow"
                        rows="3"
                        placeholder="Escriba una descripción del producto"
                      />
                    </label>
                  </div>
    
                  {/* <div className="mb-4 md:mt-6 lg:mt-8">
                    <label htmlFor="image">
                      <span>Imágen</span>
                      <input
                        type="file"
                        name="image"
                        className="border rounded py-2 px-4 m-2 shadow w-full"
                        accept="image/*"
                        onChange={handleChange}
                        
                      />
                    </label>
                  </div> */}
    
                  <div className="mb-4 md:mt-6 lg:mt-8">
                    <label> Categoría
                      <select
                        name="category"
                        value={input.category}
                        onChange={handleSelect}
                        required
                        className="border rounded py-2 px-4 m-2 shadow w-full"
                      >
                        <option value="Libros">Libros</option>
                        <option value="Varitas">Varitas</option>
                        <option value="Indumentaria">Indumentaria</option>
                        <option value="Golosinas">Golosinas</option>
                        <option value="Quidditch">Quidditch</option>
                        <option value="Misceláneas">Misceláneas</option>
                      </select>
                    </label>
                  </div>
    
                  <div className="mb-4 md:mt-6 lg:mt-8 ">
                    <label htmlFor="price">
                      <span>Precio</span>
                      <CurrencyInput
                        id="validation-example-2-field"
                        placeholder="$0"
                        prefix="$"
                        allowDecimals={2}
                        value={input.price}
                        step={10}
                        required
                        className="border rounded py-2 px-4 m-2 shadow w-2/4"
                        onChange={handleCurrencyChange}
                      />
                    </label>
    
                    <label htmlFor="stock">
                      <span>Stock</span>
                      <input
                        type="number"
                        className="border rounded py-2 px-4 m-2 shadow w-2/4"
                        value={input.stock}
                        onChange={handleChange}
                        name="stock"
                        min="0"
                        required
                      />
                    </label>
                  </div>
    
                  <div className="mb-4 md:mt-6 lg:mt-8">
                    <label htmlFor="isActive">
                      <span>Estado</span>
                      <select
                        name="isActive"
                        className="border rounded py-2 px-4 m-2 shadow"
                        value={input.value}
                        onChange={handleSelect}
                        required
                      >
                        <option value={true}>Activado</option>
                        <option value={false}>En pausa</option>
                      </select>
                    </label>
                  </div>
    
                </div>
    
                <div className="boton">
                  <button
                    className="bg-violet-500 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-2 focus:ring focus:ring-violet-300 w-40 h-10 shadow"
                    type="submit"
                  >
                    Editar
                  </button>
                </div>
    
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditProduct;


// const value = event.target.value
//             const cat = ["Libros","Varitas","Indumentaria","Golosinas","Quidditch","Misceláneas"]
//             const id = 0
//             for (let i = 0; i < cat.length; i++) {
//                 const element = cat[i];
//                 if(value === cat[i]) id =  indexOf(cat[i]) +1
//             }
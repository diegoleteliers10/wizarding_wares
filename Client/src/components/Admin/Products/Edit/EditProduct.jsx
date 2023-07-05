import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { displayProductList, editProduct } from "../../../../redux/adminSlice";
import PopUp from "../../PopUp/PopUp";
import { BiArrowBack } from "react-icons/bi";

const EditProduct = () => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.admin.edit)
  

    function handleDisplay(){
      dispatch(displayProductList())
    }

    const [input, setInput] = useState({
        id: product.productId,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryCategoryId,
        isActive: product.isActive
      });
      console.log(input)

      const [errors, setErrors] =useState({
        name: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
        category: "",
        isActive: true
      });

      const [popUp, setPopUp] = useState(false);
      const [popUpMessage, setPopUpMessage] = useState('');

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
            //   let idCat=0
              let value=event.target.value
            //   const categorias=["Libros","Varitas","Indumentaria","Golosinas","Quidditch","Misceláneas"]
            //   let i=0
            //   for(i of categorias){
            //   if(value===i) idCat=categorias.indexOf(i)+1
            //   }
          setInput({
            ...input,
            [event.target.name]: value
          });
        };
      
        const handleCurrencyChange = (event) => {
          let value = event.target.value.replace(/\$/g, '')
          value = value.replace(/\./g, '')
          value = value.replace(/\,/g, '')
          setInput({
            ...input,
            price: value
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
        try {
          await dispatch(editProduct(input));
          setPopUpMessage('Product edited successfully');
          setPopUp(true);
          setTimeout(() => {
            dispatch(displayProductList());
          }, 2000); // Delay the execution for 2 seconds
        } catch (error) {
          console.log("Error al actualizar el producto:", error);
        }
      };

    return (
      <div>
        {
            popUp === true && (
              <PopUp trigger={popUp} setTrigger={setPopUp}>
                <h3>{popUpMessage}</h3>
              </PopUp>
        )}
        <div className="flex justify-center items-center h-screen">
          <div className="h-screen ml-2 border-2 border-gray-300 rounded py-4 px-20 w-full shadow overflow-y-scroll">
          <div className="flex">
              <button className="flex text-purple-600 items-center font-medium mb-2 hover:text-purple-700" onClick={handleDisplay}>
                <BiArrowBack className="mr-2"/>Back 
              </button>
          </div>
            <div className="text-left">
            <h2>Edit <span className="">"{product.name}"</span></h2>
              <form onSubmit={handleSubmit} id="form">
    
                <div className="formBox">
    
                  <div className="mb-4 md:mt-6 lg:mt-8">
                    <label htmlFor="name">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nombre del producto"
                        onChange={handleChange}
                        value={input.name}
                        className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                        required
                      />
    
                    </label>
                      {errors.name && (<span className="flex text-red-600">{errors.name}</span>)}
                  </div>
    
                  <div className="mb-4 md:mt-6 lg:mt-8 ">
                    <label htmlFor="description" className="w-2/3">
                      <span>Description</span>
                      <textarea
                        type="text"
                        value={input.description}
                        onChange={handleChange}
                        name="description"
                        className="border rounded py-2 px-4 m-2 w-full shadow bg-white"
                        rows="3"
                        placeholder="Describe the product"
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
                    <label> Category
                      <select
                        name="categoryId"
                        value={input.categoryId}
                        onChange={handleSelect}
                        required
                        className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                      >
                        <option value={1}>Libros</option>
                        <option value={2}>Varitas</option>
                        <option value={3}>Indumentaria</option>
                        <option value={4}>Golosinas</option>
                        <option value={5}>Quidditch</option>
                        <option value={6}>Misceláneas</option>
                      </select>
                    </label>
                  </div>
    
                  <div className="mb-4 md:mt-6 lg:mt-8 ">
                    <label htmlFor="price">
                      <span>Price</span>
                      <CurrencyInput
                        id="validation-example-2-field"
                        placeholder="$0"
                        prefix="$"
                        allowDecimals={2}
                        value={input.price}
                        step={10}
                        required
                        className="border rounded py-2 px-4 m-2 shadow w-2/4 bg-white"
                        onChange={handleCurrencyChange}
                      />
                    </label>
    
                    <label htmlFor="stock">
                      <span>Stock</span>
                      <input
                        type="number"
                        className="border rounded py-2 px-4 m-2 shadow w-2/4 bg-white"
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
                      <span>Status</span>
                      <select
                        name="isActive"
                        className="border rounded py-2 px-4 m-2 shadow bg-white"
                        value={input.isActive}
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
                    className="bg-purple-600 rounded hover:bg-purple-700 active:bg-purple-700 focus:outline-2 focus:ring focus:ring-purple-300 w-40 h-10 shadow text-white"
                    type="submit"
                  >
                    Edit product
                  </button>
                </div>
    
              </form>
            </div>
          </div>
        </div>
      </div>
      );
}

export default EditProduct;


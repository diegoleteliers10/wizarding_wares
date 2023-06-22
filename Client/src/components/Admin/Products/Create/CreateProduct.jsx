import "./CreateProduct.module.css";
import { useEffect, useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import { createProd, displayProductList } from "../../../../redux/adminSlice";
import { useDispatch } from "react-redux"
import PopUp from "../../PopUp/PopUp";
import { BiArrowBack } from "react-icons/bi";


const CreateProduct = () => {

  const dispatch = useDispatch()

  function handleDisplay(){
    dispatch(displayProductList())
  }

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    category: "",
    isActive: true
  });

  const [errors, setErrors] = useState({
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

  function convertBase64(file, callback) {
    var lector = new FileReader();
    lector.onloadend = function () {
      callback(lector.result);
    };
    lector.readAsDataURL(file);
  }

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

  const handleImageChange = (event) => {
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
    const file = event.target.files[0];
    convertBase64(file, function (base64) {
      // base 64 es el valor formateado que obtengo para pasarle al atributo src de una imagen
      document.imgProduct.src = base64;
    })
  };

  const handleSelect = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("image", input.image); // Agrega el archivo como un objeto File
    formData.append("price", input.price);
    formData.append("stock", input.stock);
    formData.append("categoryId", input.category);
    formData.append("isActive", input.isActive);
  
    // new File([input.image], input.image.name)
    dispatch(createProd(formData))
    .then(() => {
      console.log(formData);
      setInput({
          name: "",
          description: "",
          image: "",
          price: 0,
          stock: 0,
          category: "",
          isActive: true
        });
        document.imgProduct.src = 'https://images2.imgbox.com/e9/37/ASLxULJL_o.png';
        setPopUpMessage('Product created successfully');
          setPopUp(true);
      })
      .catch((error) => {
        console.log("Error al crear el producto:", error);
      });
  };



  return (
    <div>
        {
            popUp === true && (
              <PopUp trigger={popUp} setTrigger={setPopUp} display='productList'>
                <h3>{popUpMessage}</h3>
              </PopUp>
        )}
      <div className="flex justify-center items-center h-screen formContainer">
        <div className="h-screen ml-2 border-2 border-gray-300 rounded py-4 px-20 w-full shadow">

            <div className="flex">
              <button className="flex text-purple-600 items-center font-medium mb-2 hover:text-purple-700" onClick={handleDisplay}>
                <BiArrowBack className="mr-2"/>Back 
              </button>
            </div>
          <div className="text-left flex">
            <form onSubmit={handleSubmit} id="form" className="w-3/4">
          <h2>Product Creation</h2>

              <div className="formBox">

                <div className="mb-4 md:mt-6 lg:mt-8">
                  <label htmlFor="name">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Product name"
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

                <div className="mb-4 md:mt-6 lg:mt-8">
                  <label htmlFor="image" className="">
                    <span className="flex mb-2">Image</span>
                    <input
                      type="file"
                      name="image"
                      className=""
                      accept="image/*"
                      onChange={handleImageChange}
                      
                    />
                  </label>
                </div>

                <div className="mb-4 md:mt-6 lg:mt-8">
                  <label> Category
                    <select
                      name="category"
                      value={input.category}
                      onChange={handleSelect}
                      required
                      className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
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
                    <span>Price</span>
                    <CurrencyInput
                      id="validation-example-2-field"
                      placeholder="$0"
                      prefix="$"
                      allowDecimals={2}
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
                    <span>State</span>
                    <select
                      name="isActive"
                      className="border rounded py-2 px-4 m-2 shadow bg-white"
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
                  className="bg-purple-600 rounded hover:bg-purple-700 active:bg-purple-700 focus:outline-2 focus:ring focus:ring-purple-300 w-40 h-10 shadow text-white"
                  type="submit"
                >
                  Create
                </button>
              </div>

            </form>
            <div className="w-1/4 block my-auto">
            <p className="flex text-center w-full">Image Preview:</p>
            <img name='imgProduct' src="https://images2.imgbox.com/e9/37/ASLxULJL_o.png" alt="Preview Image" className="w-72 shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
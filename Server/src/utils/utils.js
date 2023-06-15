const validateString = (cadena) => {
  const abc = [
    "a","b","c","d","e","f","g","h","i",
    "j","k","l","m","n","o","p","q","r",
    "s","t","u","v","w","x","y","z"," "
  ];
  if(!cadena) throw new Error('Parametro Necesario Incompleto'); // Si No Me Pasan Argumnetos
  //if(typeof cadena !== "string") throw ('El Argumento Debe Ser Un String');
  cadena = cadena.toLowerCase();
  cadena = cadena.split("");
  let count = 0;
  cadena.forEach((elem) => {
    if(abc.includes(elem)) count++;     // p, i, k, a, c, h, u, 8, ()
    //Revisamos Si Cada 'elem' Se Encuentra En El Array De 'abc'
  })
  if(count === cadena.length) return true; //Si count tiene El Mismo Largo Que Cadena; Entonces Es Un String De Solo Letras
  return false;
};

const arrojarError = (mensaje) => {
	throw new Error(mensaje);
};

module.exports = {
	validateString,
	arrojarError
};

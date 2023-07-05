import React from "react";

const Failure = () => {
  return (
    <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center mx-auto">
        <img src="https://gamepress.gg/wizardsunite/sites/wizardsunite/files/styles/medium/public/2019-04/Whomping%20Willow-foundable.png?itok=wkiVQcPO" alt="Whomping Willow" className="w-40 mx-auto"/>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl fontMarcellus">
          Ocurrió un error con la compra
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 fontEB">
          Inténtalo nuevamente más tarde.
        </p>
        <div className="mt-8 block md:flex items-center justify-center gap-x-6">
          <div>
            <a
              href="/"
              className="btn1 btn--svg-small"
            >
              Regresar a la página principal
            </a>
          </div>
          <div>
            <a href="/FAQ" className="text-sm font-semibold text-gray-900 fontEB">
              Preguntas Frecuentes <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Failure;

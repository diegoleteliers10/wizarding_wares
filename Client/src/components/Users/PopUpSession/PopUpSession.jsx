import { GrClose } from "react-icons/gr";
import styles from './popUpSession.module.css'

function PopUpSession(props) {

  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`relative p-8 w-1/2 h-1/3 ${styles.parchmentbackground} flex flex-col rounded`}>
        <button className="absolute top-8 right-8" onClick={() => props.setTrigger(false)}>
          <GrClose/>
        </button>
        <div className="my-auto">{props.children}</div>
        <div className="flex justify-end">
          {
            props.handleConfirm && 
            <div className="">
                <button className="font-medium rounded-lg border-none px-4 py-2.5 text-sm transition duration-300 ease-in-out text-wwbrown hover:text-wwmaroon" onClick={() => props.setTrigger(false)}>
                    Cancelar
                </button>
                <button
                    className="btn1 btn--svg-small ml-2"
                    onClick={props.handleConfirm}
                >
                    Cerrar Sesión
                </button>
            </div>
          }
          
        </div>
      </div>
    </div>
  ) : null;
}

export default PopUpSession;
import { GrClose } from "react-icons/gr";
import PurchaseDetail from "../Purchases/PurchaseDetail/PurchaseDetail";

function PopUpDetail(props){
    const {products, purchaseId} = props;
    console.log(props.trigger)
    return props.trigger ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative p-8 w-3/4 h-1/2 bg-white flex flex-col rounded overflow-y-scroll">
            <button className="absolute top-8 right-8" onClick={() => props.setTrigger(false)}>
              <GrClose/>
            </button>
            <div className="my-auto"><PurchaseDetail products={products} purchaseId={purchaseId}/></div>
            
          </div>
        </div>
      ) : null;
}
export default PopUpDetail;
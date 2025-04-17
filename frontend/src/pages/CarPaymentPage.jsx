import PaymentForm from "../Components/PaymentCard";
import CarDetailPage from "../pages/CarDetailPage";
export default function CarPaymentPage(){

    return(
        <div className="carpaymentpage">
           
          <CarDetailPage />
        <PaymentForm />
        </div>
    )
}
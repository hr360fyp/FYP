import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import OrderScreen from "./screens/OrderScreen";
import AddProduct from "./screens/AddProduct";
import AddOrder from "./screens/AddOrder";
import AddTicket from "./screens/AddTicket";
import Login from "./screens/LoginScreen";
import Attendance from "./screens/Attendance";
import AddAttendance from "./screens/AddAttendance";
import Payroll from "./screens/Payroll";
import Calendar1 from "./screens/Calendar";
import TicketScreen from "./screens/TicketScreen";
import TicketScrn from "./screens/TicketScrn";
import TcktScreen from "./screens/TcktScreen";
import Feedback from "./screens/Feedback";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderEditScreen from "./screens/OrderEditScreen";
import TicketEditScreen from "./screens/TicketEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { listTickets } from "./Redux/Actions/TicketActions";
import Register from "./screens/Register";
import EmpHomeScreen from "./screens/EmpHomeScreen";
import EmpAttendance from "./screens/EmpAttendance";
import EmpFeedback from "./screens/EmpFeedback";
import EmpCalendar1 from "./screens/EmpCalendar";
import ClientHomeScreen from "./screens/ClientHomeScreen";
import ClientFeedback from "./screens/ClientFeedback";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listProducts());
      dispatch(listOrders());
      dispatch(listTickets());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          {/* Admin routes */}
          <PrivateRouter path="/" component={HomeScreen} exact roles={["Admin"]} />
          <PrivateRouter path="/register" component={Register} roles={["Admin"]} />
          <PrivateRouter path="/products" component={ProductScreen} roles={["Admin"]} />
          <PrivateRouter path="/orders" component={OrderScreen} roles={["Admin"]} />
          <PrivateRouter path="/addproduct" component={AddProduct} roles={["Admin"]} />
          <PrivateRouter path="/addorder" component={AddOrder} roles={["Admin"]} />
          <PrivateRouter path="/tickets" component={TicketScreen} roles={["Admin"]} />
          <PrivateRouter path="/addticket" component={AddTicket} roles={["Admin"]} />
          <PrivateRouter path="/payroll" component={Payroll} roles={["Admin"]} />
          <PrivateRouter path="/feedback" component={Feedback} roles={["Admin"]} />
          <PrivateRouter path="/addattendance" component={AddAttendance} roles={["Admin"]} />
          <PrivateRouter path="/attendance" component={Attendance} roles={["Admin"]} />
          <PrivateRouter path="/calendar" component={Calendar1} roles={["Admin"]} />
          <PrivateRouter path="/product/:id/edit" component={ProductEditScreen} roles={["Admin"]} />
          <PrivateRouter path="/order/:id/edit" component={OrderEditScreen} roles={["Admin"]} />
          <PrivateRouter path="/ticket/:id/edit" component={TicketEditScreen} roles={["Admin"]} />

          {/* Client routes */}
          <PrivateRouter path="/Tickt" component={TicketScrn} roles={["Client"]} />
          <PrivateRouter path="/client" component={ClientHomeScreen} exact roles={["Client"]} />
          <PrivateRouter path="/clientfeedback" component={ClientFeedback} roles={["Client"]} />
          {/* Employee routes */}
          <PrivateRouter path="/emp" component={EmpHomeScreen} exact roles={"Employee"} />
          <PrivateRouter path="/Tckt" component={TcktScreen} roles={["Employee"]} />          
          <PrivateRouter path="/empattendance" component={EmpAttendance} roles={["Employee"]} />
          <PrivateRouter path="/empfeedback" component={EmpFeedback} roles={["Employee"]} />
          <PrivateRouter path="/empcalendar" component={EmpCalendar1} roles={["Employee"]} />

          {/* Public routes */}
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

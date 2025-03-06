import CustomRoute from "./CustomRoute";
import Dashboard from "./Dashboard/Dashboard";
import EditBook from "./EditBook/EditBook";

const Routes = () => {
  return (
    <>
      <CustomRoute path="/dashboard">
        <Dashboard />
      </CustomRoute>
      <CustomRoute path="/edit">
        <EditBook />
      </CustomRoute>
    </>
  );
};

export default Routes;

import React, { useEffect, useState, useCallback } from "react";
import { login } from "../../utils/auth";
import { Notification } from "../../components/utils/Notifications";
import { getUserByPrincipal } from "../../utils/borrowerManager";
import Login from "../Login";
import CreateAccount from "../../components/userManager/CreateAccount";
import EmployerDashboard from "../Employer/EmployerDashboard";
import WorkerDashboard from "../Worker/WorkerDashboard";
import Loader from "../../components/utils/Loader";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUserByPrincipal();
      const userData = response?.Ok;
      if (userData) {
        setUser(userData);
      } else {
        console.log("User data not found.");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  console.log("user", user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          user?.fullName ? (
            <>
              <main>
                {user.userType === "Employer" ? (
                  <EmployerDashboard employer={user} />
                ) : (
                  <WorkerDashboard worker={user} />
                )}
              </main>
            </>
          ) : (
            <CreateAccount fetchUser={fetchUser} />
          )
        ) : (
          <Loader />
        )
      ) : (
        <Login login={login} />
      )}
    </>
  );
};

export default UserPage;

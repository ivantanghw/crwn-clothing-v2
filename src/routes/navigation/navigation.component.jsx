import { Fragment, useContext } from "react";
/*
 Fragment renders nth, use it to simulate one level up for Outlet 
 so that we don't use wrapping <div> which requires to render some HTML.
*/
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase.utils";

import './navigation.styles.scss';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    
    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to='/'>
            <CrwnLogo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                SHOP
            </Link>
            {
              currentUser ? (
                <span className="nav-link" onClick={SignOutUser}>
                    SIGN OUT
                </span>
              )
                : (
                  <Link className="nav-link" to='/auth'>
                      SIGN IN
                  </Link>
                )
            }
          </div>
        </div>
        <Outlet />
      </Fragment>
    );
};

export default Navigation;
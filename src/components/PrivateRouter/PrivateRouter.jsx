import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

// export { PrivateRoute };

function PrivateRoute({ children }) {
	// const { user: authUser } = useSelector((x) => x.auth);
	const { role } = useSelector((state) => state.user);

	if (role !== 'admin') {
		// not logged in so redirect to login page with the return url
		return <Navigate to='/courses' state={{ from: history.location }} />;
	}

	// authorized so return child components
	return children;
}

export default PrivateRoute;

//https://jasonwatmore.com/post/2022/06/24/react-router-6-private-route-component-to-restrict-access-to-protected-pages#:~:text=The%20react%20private%20route%20component%20renders%20child%20components,with%20a%20call%20to%20the%20useSelector%20%28%29%20hook.

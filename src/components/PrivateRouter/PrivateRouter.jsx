import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
	const { role } = useSelector((state) => state.user);
	if (role !== 'admin') {
		return <Navigate to='/courses' />;
	}
	return children;
}

export default PrivateRoute;

//https://jasonwatmore.com/post/2022/06/24/react-router-6-private-route-component-to-restrict-access-to-protected-pages#:~:text=The%20react%20private%20route%20component%20renders%20child%20components,with%20a%20call%20to%20the%20useSelector%20%28%29%20hook.
